// Referenzen zu HTML-Elementen
const videoElement = document.getElementById('video');
const canvasElement = document.getElementById('output');
const canvasCtx = canvasElement.getContext('2d');
const infoDisplay = document.getElementById('info-display');

// Globale Variablen
let audioContext = null;
let localSound = null;
let clientId = null;
let clientCount = 0;
let localRole = null;
const possibleRoles = ['bass', 'lead', 'pad'];
const otherSounds = {};

// WebSocket-Verbindung
const socket = new WebSocket('wss://nosch.uber.space/web-rooms/');

// AudioContext initialisieren
function ensureAudioContext() {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
}

// Klick zum Aktivieren des AudioContext
window.addEventListener('click', () => {
  ensureAudioContext();
});

// Rolle basierend auf Client-ID
function getRoleFromClientId(id) {
  const numericId = parseInt(id, 36);
  if (isNaN(numericId)) return possibleRoles[0];
  return possibleRoles[numericId % possibleRoles.length];
}

// Position senden
function broadcastMovement(x, y) {
  if (!clientId || socket.readyState !== WebSocket.OPEN) return;
  socket.send(JSON.stringify(['*broadcast-message*', ['handmove', x, y, clientId]]));
}

// Stop senden
function broadcastStop() {
  if (!clientId || socket.readyState !== WebSocket.OPEN) return;
  socket.send(JSON.stringify(['*broadcast-message*', ['stop', clientId]]));
}

// WebSocket geöffnet
socket.addEventListener('open', () => {
  socket.send(JSON.stringify(['*enter-room*', 'collab-synth']));
  socket.send(JSON.stringify(['*subscribe-client-count*']));
  setInterval(() => socket.send(''), 30000); // Ping
});

// WebSocket Nachrichten
socket.addEventListener('message', (event) => {
  if (!event.data) return;

  let data;
  try {
    data = JSON.parse(event.data);
  } catch (e) {
    console.warn('Ungültiges JSON empfangen:', event.data);
    return;
  }

  if (data[0] === '*broadcast-message*') {
    const [messageType, ...args] = data[1];

    switch (messageType) {
      case 'handmove': {
        const [x, y, sender] = args;
        if (!sender || sender === clientId) return;

        if (!otherSounds[sender]) {
          console.log(`Erzeuge Remote-Sound für ${sender}`);
          ensureAudioContext();
          const role = getRoleFromClientId(sender);
          otherSounds[sender] = new Sound(role, 0.5); // leisere Lautstärke
        }

        otherSounds[sender].update(x, y);
        break;
      }

      case 'stop': {
        const [stopClient] = args;
        if (otherSounds[stopClient]) {
          console.log(`Stoppe Remote-Sound für ${stopClient}`);
          otherSounds[stopClient].stop();
          delete otherSounds[stopClient];
        }
        break;
      }
    }
    return;
  }

  switch (data[0]) {
    case '*client-id*':
      clientId = data[1];
      localRole = getRoleFromClientId(clientId);
      if (infoDisplay) {
        infoDisplay.textContent = `Rolle: ${localRole} – Verbundene Clients: ${clientCount}`;
      }
      console.log(`Client-ID erhalten: ${clientId}, Rolle: ${localRole}`);
      break;

    case '*client-count*':
      clientCount = data[1];
      if (infoDisplay) {
        infoDisplay.textContent = `Rolle: ${localRole || 'Rolle wird zugewiesen...'} – Verbundene Clients: ${clientCount}`;
      }
      break;

    case '*error*':
      console.warn('Fehler:', ...data[1]);
      break;
  }
});

// MediaPipe Hands konfigurieren
const hands = new Hands({
  locateFile: file => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
});
hands.setOptions({
  maxNumHands: 1,
  modelComplexity: 1,
  minDetectionConfidence: 0.7,
  minTrackingConfidence: 0.5
});

let handDetectedLastFrame = false;

hands.onResults(results => {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

  const handsPresent = results.multiHandLandmarks.length > 0;

  if (handsPresent) {
    const hand = results.multiHandLandmarks[0];
    const indexTip = hand[8];
    const x = indexTip.x;
    const y = indexTip.y;

    canvasCtx.beginPath();
    canvasCtx.arc(x * canvasElement.width, y * canvasElement.height, 10, 0, 2 * Math.PI);
    canvasCtx.fillStyle = '#a65ecf';
    canvasCtx.fill();

    ensureAudioContext();

    if (!localSound && localRole) {
      console.log(`Erzeuge lokalen Sound (${localRole})`);
      localSound = new Sound(localRole, 1.0);
    }

    if (localSound) {
      localSound.update(x, y);
      broadcastMovement(x, y);
    }

  } else {
    if (handDetectedLastFrame && localSound) {
      console.log('Hand nicht mehr sichtbar – Sound stoppen');
      localSound.stop();
      broadcastStop();
      localSound = null;
    }
  }

  handDetectedLastFrame = handsPresent;
  canvasCtx.restore();
});

// Kamera starten
const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({ image: videoElement });
  },
  width: 640,
  height: 480
});
camera.start();

// Sound-Synthesizer
class Sound {
  constructor(role = 'lead', volume = 1.0) {
    if (!audioContext) throw new Error('AudioContext not initialized');

    const now = audioContext.currentTime;

    this.env = audioContext.createGain();
    this.env.connect(audioContext.destination);
    this.env.gain.setValueAtTime(0, now);
    this.env.gain.linearRampToValueAtTime(volume, now + 0.25);

    this.filter = audioContext.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.value = 1000;
    this.filter.Q.value = 6;
    this.filter.connect(this.env);

    this.osc = audioContext.createOscillator();
    this.role = role;

    switch (role) {
      case 'bass':
        this.osc.type = 'square';
        this.minOsc = 50;
        this.maxOsc = 200;
        break;
      case 'lead':
        this.osc.type = 'sawtooth';
        this.minOsc = 200;
        this.maxOsc = 1000;
        break;
      case 'pad':
        this.osc.type = 'triangle';
        this.minOsc = 100;
        this.maxOsc = 600;
        break;
      default:
        this.osc.type = 'sine';
        this.minOsc = 100;
        this.maxOsc = 1000;
    }

    this.minCutoff = 60;
    this.maxCutoff = 4000;

    this.osc.connect(this.filter);
    this.osc.start(now);
  }

  update(x, y) {
    const freqFactor = x;
    const cutoffFactor = 1 - y;

    this.osc.frequency.value =
      this.minOsc * Math.exp(Math.log(this.maxOsc / this.minOsc) * freqFactor);
    this.filter.frequency.value =
      this.minCutoff * Math.exp(Math.log(this.maxCutoff / this.minCutoff) * cutoffFactor);

    // Optional Debug
    // console.log(`Update ${this.role}: freq ${this.osc.frequency.value.toFixed(2)}, cutoff ${this.filter.frequency.value.toFixed(2)}`);
  }

  stop() {
    const now = audioContext.currentTime;
    this.env.gain.cancelScheduledValues(now);
    this.env.gain.setValueAtTime(this.env.gain.value, now);
    this.env.gain.linearRampToValueAtTime(0, now + 0.25);
    this.osc.stop(now + 0.25);
  }
}
