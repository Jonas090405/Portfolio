const titleElem = document.getElementById('title-display');
const messageElem = document.getElementById('message-display');
const indexElem = document.getElementById('client-index');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const webRoomsWebSocketServerAddr = 'wss://nosch.uber.space/web-rooms/';

const circleRadius = 50;

let clientId = null;
let clientCount = 0;

/*************************************************************
 * Touches Map and Synths Map
 */
const touches = new Map();
const synths = new Map();

class Touch {
  constructor(id, x, y, own = false) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.own = own;
  }
  move(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Synth {
  constructor(type = 'sine') {
    this.context = new (window.AudioContext || window.AudioContext)();
    this.osc = this.context.createOscillator();
    this.filter = this.context.createBiquadFilter();
    this.gain = this.context.createGain();

    this.osc.type = type;
    this.filter.type = 'lowpass';

    this.osc.connect(this.filter).connect(this.gain).connect(this.context.destination);

    this.gain.gain.value = 0;
    this.osc.frequency.value = 440;
    this.filter.frequency.value = 1000;

    this.osc.start();
  }

  update(x, y) {
    // Frequenz (Tonhöhe) abhängig von y-Position (hoch = hoch)
    const freq = 220 + (880 - 220) * y;
    // Lautstärke sinkt leicht bei höheren Tönen für Balance
    const volume = 0.3 * (1 - y);
    // Filterfrequenz abhängig von x-Position (Timbre)
    const filterFreq = 500 + 3000 * x;

    this.osc.frequency.value = freq;
    this.filter.frequency.value = filterFreq;
    this.gain.gain.value = volume;
  }

  stop() {
    this.gain.gain.value = 0;
  }
}

function createTouch(id, x, y, own = false) {
  const touch = new Touch(id, x, y, own);
  touches.set(id, touch);
  createSynth(id);
}

function moveTouch(id, x, y) {
  const touch = touches.get(id);
  if (touch) {
    touch.move(x, y);
  }
}

function deleteTouch(id) {
  touches.delete(id);
  deleteSynth(id);
  updateSynthListDisplay();
}

function createSynth(id) {
  if (!synths.has(id)) {
    const waveTypes = ['sine', 'square', 'triangle', 'sawtooth', 'sine', 'square', 'triangle', 'sawtooth'];
    const waveType = waveTypes[id % waveTypes.length];
    const synth = new Synth(waveType);
    synths.set(id, synth);
    updateSynthListDisplay();
  }
}

function deleteSynth(id) {
  const synth = synths.get(id);
  if (synth) {
    synth.stop();
    synths.delete(id);
  }
}

/*************************************************************
 * MediaPipe Hands Setup
 */
const videoElement = document.createElement('video');
videoElement.style.display = 'none';
document.body.appendChild(videoElement);

const hands = new Hands({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
  }
});

hands.setOptions({
  maxNumHands: 1,
  modelComplexity: 1,
  minDetectionConfidence: 0.8,
  minTrackingConfidence: 0.8
});

hands.onResults(onHandsResults);

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({image: videoElement});
  },
});

/*************************************************************
 * Start Function
 */
function start() {
  updateCanvasSize();

  camera.start();

  requestAnimationFrame(onAnimationFrame);
}

/*************************************************************
 * MediaPipe Hand Results Callback
 */
function onHandsResults(results) {
  if (!clientId) return;

  if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
    const landmarks = results.multiHandLandmarks[0];
    const x = landmarks[9].x;
    const y = landmarks[9].y;

    if (!touches.has(clientId)) {
      createTouch(clientId, x, y, true);
      sendRequest('*broadcast-message*', ['start', clientId, x, y]);
    } else {
      moveTouch(clientId, x, y);
      sendRequest('*broadcast-message*', ['move', clientId, x, y]);
    }
  } else {
    if (touches.has(clientId)) {
      deleteTouch(clientId);
      sendRequest('*broadcast-message*', ['end', clientId]);
    }
  }
}

/*************************************************************
 * Canvas & Drawing
 */
function updateCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function onAnimationFrame() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let [id, touch] of touches) {
    const x = canvas.width * touch.x;
    const y = canvas.height * touch.y;
    drawCircle(context, x, y, touch.own, touch.own);

    // Update Synth für alle Touches basierend auf Position
    const synth = synths.get(id);
    if (synth) {
      synth.update(touch.x, 1 - touch.y); // 1 - y damit Tonhöhe steigt nach oben
    }
  }

  requestAnimationFrame(onAnimationFrame);
}

function drawCircle(context, x, y, highlight = false, own = false) {
  // Punktgröße abhängig von Y (höher = größer)
  const radius = 10 + (circleRadius * (1 - y / canvas.height));

  // Glow abhängig von X (0 ganz links, max rechts)
  const glow = 30 * (x / canvas.width); // max 30px Blur

  if (own) {
    // Eigener Punkt: Blau mit Glow, Helligkeit abhängig von X
    const lightness = 80 - 50 * (x / canvas.width); // von 80% bis 30%
    context.fillStyle = `hsl(210, 100%, ${lightness}%)`; // Blauton
    context.shadowColor = `hsl(210, 100%, ${lightness}%)`;
    context.globalAlpha = highlight ? 1 : 0.7;
  } else {
    // Andere Punkte: Weiß, Helligkeit abhängig von X, Glow ähnlich
    const lightness = 90 - 50 * (x / canvas.width); // von 90% bis 40%
    context.fillStyle = `hsl(0, 0%, ${lightness}%)`; // Weiß/Grauton
    context.shadowColor = `hsl(0, 0%, ${lightness}%)`;
    context.globalAlpha = highlight ? 0.8 : 0.5;
  }

  context.shadowBlur = glow;

  // Kreis zeichnen
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.fill();
}

/*************************************************************
 * Synth List Display (unten links)
 */
const synthListElem = document.getElementById('synth-list') || (() => {
  const el = document.createElement('div');
  el.id = 'synth-list';
  el.style.position = 'fixed';
  el.style.bottom = '10px';
  el.style.left = '10px';
  el.style.color = 'white';
  el.style.fontFamily = 'Helvetica Neue';
  el.style.background = 'rgba(14, 13, 13, 0.5)';
  el.style.padding = '8px';
  el.style.borderRadius = '4px';
  el.style.zIndex = 1000;
  document.body.appendChild(el);
  return el;
})();

function updateSynthListDisplay() {
    // Sortiere alle Touch IDs numerisch
    const sortedIds = Array.from(touches.keys()).sort((a, b) => a - b);
  
    // Finde die eigene Position (1-basiert)
    const ownPos = sortedIds.indexOf(clientId);
    const total = sortedIds.length;
  
    // Text für Position (falls nicht gefunden, zeige nur total)
    let headerText;
    if (ownPos >= 0) {
      headerText = `<strong>Client #${ownPos + 1} / ${total}</strong><br>`;
    } else {
      headerText = `<strong>Clients on board: ${total}</strong><br>`;
    }
  
    // Baue Liste der User
    let html = headerText;
    for (let i = 0; i < sortedIds.length; i++) {
      const id = sortedIds[i];
      const synth = synths.get(id);
      if (!synth) continue;
      const waveType = synth.osc.type;
      const youTag = (id === clientId) ? ' (You)' : '';
      html += `User #${i + 1}: ${waveType}${youTag}<br>`;
    }
  
    synthListElem.innerHTML = html;
  }
  

/*************************************************************
 * WebSocket Communication
 */
const socket = new WebSocket(webRoomsWebSocketServerAddr);

socket.addEventListener('open', (event) => {
  sendRequest('*enter-room*', 'touch-touch');
  sendRequest('*subscribe-client-count*');

  setInterval(() => socket.send(''), 30000);
});

socket.addEventListener("close", (event) => {
    if (clientId !== null) {
      sendRequest('*broadcast-message*', ['end', clientId]); // sende gültige ID
    }
    clientId = null;
    document.body.classList.add('disconnected');
  });
  

socket.addEventListener('message', (event) => {
  const data = event.data;
  if (data.length > 0) {
    const incoming = JSON.parse(data);
    const selector = incoming[0];

    switch (selector) {
      case '*client-id*':
        clientId = incoming[1] + 1;
        start();
        updateSynthListDisplay();
        break;

      case '*client-count*':
        clientCount = incoming[1];
        updateSynthListDisplay();
        break;

      case 'start': {
        const id = incoming[1];
        const x = incoming[2];
        const y = incoming[3];
        if (id !== clientId) createTouch(id, x, y);
        updateSynthListDisplay();
        break;
      }

      case 'move': {
        const id = incoming[1];
        const x = incoming[2];
        const y = incoming[3];
        if (id !== clientId) moveTouch(id, x, y);
        break;
      }

      case 'end': {
        const id = incoming[1];
        if (id !== clientId) {
          deleteTouch(id);
          updateSynthListDisplay();
        }
        break;
      }

      case '*error*': {
        const message = incoming[1];
        console.warn('server error:', ...message);
        break;
      }

      default:
        break;
    }
  }
});

function sendRequest(...message) {
  const str = JSON.stringify(message);
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(str);
  }
}

window.addEventListener('resize', updateCanvasSize);

window.addEventListener('beforeunload', () => {
    if (clientId !== null && socket.readyState === WebSocket.OPEN) {
      const msg = JSON.stringify(['*broadcast-message*', ['end', clientId]]);
      socket.send(msg);
    }
  });
  