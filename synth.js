const titleElem = document.getElementById('title-display');
const messageElem = document.getElementById('message-display');
const indexElem = document.getElementById('client-index');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const drawings = []; // lokale Zeichnungslinien
const remoteDrawings = new Map(); // andere Clients
let isPinching = false;
let lastDrawPos = null;
const activePinches = new Set();
const clientNames = new Map();



const webRoomsWebSocketServerAddr = 'wss://nosch.uber.space/web-rooms/';

const circleRadius = 50;

let clientId = null;
let clientCount = 0;

const animalNames = {
  a: ['antelope', 'armadillo'],
  b: ['bear', 'beaver', 'buffalo'],
  c: ['cat', 'cougar', 'crab'],
  d: ['dog', 'duck', 'donkey'],
  e: ['elephant', 'eagle'],
  f: ['zebra'],
};

const adjectives = {
  a: ['adorable', 'agile', 'angry'],
  b: ['bouncy', 'buffed', 'brave'],
  c: ['curious', 'clever', 'crazy'],
  d: ['dizzy', 'daring', 'dumb'],
  e: ['eager', 'electric'],
  f: ['zesty'],

};

function generateRandomName() {
  const letters = Object.keys(adjectives);
  const letter = letters[Math.floor(Math.random() * letters.length)];

  const adjList = adjectives[letter];
  const animalList = animalNames[letter];

  if (!adjList || !animalList) return 'anonymous';

  const adj = adjList[Math.floor(Math.random() * adjList.length)];
  const animal = animalList[Math.floor(Math.random() * animalList.length)];

  return `${adj}${animal}`;
}


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
document.body.appendChild(videoElement);
videoElement.setAttribute('playsinline', ''); // wichtig für iOS Safari

const hands = new Hands({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
  }
});

hands.setOptions({
  maxNumHands: 1,
  modelComplexity: 1,
  minDetectionConfidence: 0.6,
  minTrackingConfidence: 0.35
});

hands.onResults(onHandsResults);

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({image: videoElement});
  },
});
start();
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
      const x = 1 - landmarks[9].x; // Spiegelung an der vertikalen Mittelachse (horizontal invertieren)
      const y = landmarks[9].y;
      const pinchDistance = Math.hypot(
        landmarks[4].x - landmarks[8].x,
        landmarks[4].y - landmarks[8].y
      );
      const isNowPinching = pinchDistance < 0.04;
  
      if (!touches.has(clientId)) {
        createTouch(clientId, x, y, true);
        sendRequest('*broadcast-message*', ['start', clientId, x, y]);
      } else {
        moveTouch(clientId, x, y);
        sendRequest('*broadcast-message*', ['move', clientId, x, y]);
      }
  
      // Pinch-Zeichnung
      if (isNowPinching) {
        if (lastDrawPos) {
          drawings.push({ from: lastDrawPos, to: { x, y } });
          sendRequest('*broadcast-message*', ['draw', clientId, lastDrawPos.x, lastDrawPos.y, x, y]);
        }
        lastDrawPos = { x, y };
      } else {
        lastDrawPos = null;
      }
  
      isPinching = isNowPinching;
      if (isNowPinching) {
        activePinches.add(clientId);
      } else {
        activePinches.delete(clientId);
      }
        
    } else {
      if (touches.has(clientId)) {
        deleteTouch(clientId);
        sendRequest('*broadcast-message*', ['end', clientId]);
      }
      lastDrawPos = null;
      isPinching = false;
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
  // Zeichne lokale Linien
  context.strokeStyle = 'rgba(0, 200, 255, 0.8)';
  context.lineWidth = 3;
  context.lineCap = 'round';
  for (let segment of drawings) {
    drawLine(segment.from, segment.to);
  }

  // Zeichne Remote-Linien
  context.strokeStyle = 'white';
  for (let segments of remoteDrawings.values()) {
    for (let segment of segments) {
      drawLine(segment.from, segment.to);
    }
  }

  for (let [id, touch] of touches) {
  const x = canvas.width * touch.x;
  const y = canvas.height * touch.y;
  drawCircle(context, x, y, touch.own, touch.own, id);

  const synth = synths.get(id);
  if (synth) {
    synth.update(touch.x, 1 - touch.y);
  }
}


  requestAnimationFrame(onAnimationFrame);
}

function drawCircle(context, x, y, highlight = false, own = false, id = null) {
  const radius = 10 + (circleRadius * (1 - y / canvas.height));
  const glow = 30 * (x / canvas.width);

  // Farben
  let baseColor, strokeColor;
  if (own) {
    const lightness = 80 - 50 * (x / canvas.width);
    baseColor = `hsl(210, 100%, ${lightness}%)`;
    strokeColor = `hsl(210, 100%, ${Math.min(100, lightness + 15)}%)`;
    context.globalAlpha = highlight ? 1 : 0.7;
  } else {
    const lightness = 90 - 50 * (x / canvas.width);
    baseColor = `hsl(0, 0%, ${lightness}%)`;
    strokeColor = `hsl(0, 0%, ${Math.min(100, lightness + 20)}%)`;
    context.globalAlpha = highlight ? 0.8 : 0.5;
  }

  context.fillStyle = baseColor;
  context.shadowColor = baseColor;
  context.shadowBlur = glow;

  // Kreis
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.fill();

  // ✨ Pinch-Stroke
  if (id && activePinches.has(id)) {
    context.shadowBlur = 0;
    context.lineWidth = 4;
    context.strokeStyle = strokeColor;
    context.stroke();
  }

  context.globalAlpha = 1;

  if (id !== null) {
  const name = clientNames.get(id) || `User ${id}`;
  context.font = '12px sans-serif';
  context.fillStyle = 'white';
  context.textAlign = 'center';
  context.textBaseline = 'top';
  context.shadowBlur = 0;
  context.fillText(name, x, y + radius + 6);
}

}

/*************************************************************
 * Synth List Display (unten links)
 */
const synthListElem = document.getElementById('synth-list') || (() => {
  const el = document.createElement('div');
  el.style.position = 'fixed';
  el.style.bottom = '16px';
  el.style.left = '16px';
  el.style.padding = '12px 16px';
  el.style.borderRadius = '16px';
  el.style.backdropFilter = 'blur(12px)';
  el.style.background = 'rgba(255, 255, 255, 0.01)';
  el.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.25)';
  el.style.color = '#fff';
  el.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif';
  el.style.fontSize = '14px';
  el.style.lineHeight = '1.4';
  el.style.zIndex = 1000;
  el.style.border = '1px solid rgba(255, 255, 255, 0.08)';
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
      headerText = `<strong>User ${ownPos + 1} / ${total}</strong><br>`;
    } else {
      headerText = `<strong>Users on board: ${total}</strong><br>`;
    }
  
    // Baue Liste der User
    let html = headerText;
    for (let i = 0; i < sortedIds.length; i++) {
      const id = sortedIds[i];
      const synth = synths.get(id);
      if (!synth) continue;
      const waveType = synth.osc.type;
      const userName = clientNames.get(id) || `User #${i + 1}`;
      const youTag = (id === clientId) ? ' (You)' : '';
      html += `${userName}${youTag}: ${waveType}<br>`;
          }
  
    synthListElem.innerHTML = html;
  }
  
/*************************************************************
 * Clear Button (unten rechts)
 */
const clearButton = document.createElement('button');
clearButton.textContent = 'Clear Drawings';

Object.assign(clearButton.style, {
  position: 'fixed',
  bottom: '16px',
  right: '16px',
  padding: '12px 16px',
  borderRadius: '16px',
  backdropFilter: 'blur(12px)',
  background: 'rgba(255, 255, 255, 0.01)',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
  color: '#fff',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif',
  fontSize: '14px',
  lineHeight: '1.4',
  zIndex: 1000,
  border: '1px solid rgba(255, 255, 255, 0.08)',
  cursor: 'pointer',
  transition: 'background 0.2s, border 0.2s'
});

clearButton.addEventListener('mouseenter', () => {
  clearButton.style.background = 'rgba(255, 255, 255, 0.08)';
  clearButton.style.border = '1px solid rgba(255, 255, 255, 0.2)';
});

clearButton.addEventListener('mouseleave', () => {
  clearButton.style.background = 'rgba(255, 255, 255, 0.01)';
  clearButton.style.border = '1px solid rgba(255, 255, 255, 0.08)';
});

clearButton.addEventListener('click', () => {
  drawings.length = 0;
  remoteDrawings.clear();
  sendRequest('*broadcast-message*', ['clear']);
});


document.body.appendChild(clearButton);

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
        if (!clientNames.has(clientId)) {
          clientNames.set(clientId, generateRandomName());
        }
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
          if (!clientNames.has(id)) {
            clientNames.set(id, generateRandomName());
          }
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
      case 'draw': {
        const id = incoming[1];
        const fx = incoming[2];
        const fy = incoming[3];
        const tx = incoming[4];
        const ty = incoming[5];
        if (!remoteDrawings.has(id)) remoteDrawings.set(id, []);
        remoteDrawings.get(id).push({ from: { x: fx, y: fy }, to: { x: tx, y: ty } });
        break;
      }
      case 'clear': {
        drawings.length = 0;
        remoteDrawings.clear();
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
function drawLine(from, to) {
  context.beginPath();
  context.moveTo(from.x * canvas.width, from.y * canvas.height);
  context.lineTo(to.x * canvas.width, to.y * canvas.height);
  context.stroke();
}

window.addEventListener('resize', updateCanvasSize);

window.addEventListener('beforeunload', () => {
    if (clientId !== null && socket.readyState === WebSocket.OPEN) {
      const msg = JSON.stringify(['*broadcast-message*', ['end', clientId]]);
      socket.send(msg);
    }
  });
  

  