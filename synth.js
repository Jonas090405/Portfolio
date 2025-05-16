const videoElement = document.getElementById('video');
const canvasElement = document.getElementById('output');
const canvasCtx = canvasElement.getContext('2d');
const infoDisplay = document.getElementById('info-display');

let audioContext = null;
let localSound = null;
let clientId = null;
let clientCount = 0;
let localRole = null;

const possibleRoles = ['bass', 'lead', 'pad'];
const otherSounds = {};

const socket = new WebSocket('wss://nosch.uber.space/web-rooms/');

function getRoleFromClientId(id) {
  const numericId = parseInt(id, 36);
  if (isNaN(numericId)) return possibleRoles[0];
  return possibleRoles[numericId % possibleRoles.length];
}

function broadcastMovement(x, y) {
  if (!clientId) return;
  socket.send(JSON.stringify(['handmove', x, y, clientId]));
}

function broadcastStop() {
  if (!clientId) return;
  socket.send(JSON.stringify(['stop', clientId]));
}

// WebSocket Events
socket.addEventListener('open', () => {
  socket.send(JSON.stringify(['*enter-room*', 'collab-synth']));
  socket.send(JSON.stringify(['*subscribe-client-count*']));
  setInterval(() => socket.send(''), 30000); // ping alle 30s
});

socket.addEventListener('message', (event) => {
  if (!event.data) return;
  const data = JSON.parse(event.data);

  switch (data[0]) {
    case '*client-id*':
      clientId = data[1];
      localRole = getRoleFromClientId(clientId);
      if (infoDisplay) {
        infoDisplay.textContent = `Rolle: ${localRole} – Verbundene Clients: ${clientCount}`;
      }
      break;

    case '*client-count*':
      clientCount = data[1];
      if (infoDisplay) {
        infoDisplay.textContent = `Rolle: ${localRole || '...'} – Verbundene Clients: ${clientCount}`;
      }
      break;

    case 'handmove': {
      const [_, x, y, sender] = data;
      if (sender === clientId) return; // eigenen Sound nicht doppelt anlegen

      if (!otherSounds[sender]) {
        const role = getRoleFromClientId(sender);
        otherSounds[sender] = new Sound(role);
      }
      otherSounds[sender].update(x, y);
      break;
    }

    case 'stop': {
      const stopClient = data[1];
      if (otherSounds[stopClient]) {
        otherSounds[stopClient].stop();
        delete otherSounds[stopClient];
      }
      break;
    }

    case '*error*':
      console.warn('Fehler:', ...data[1]);
      break;
  }
});

// MediaPipe Handtracking Setup
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
    canvasCtx.fillStyle = 'lime';
    canvasCtx.fill();

    if (!audioContext) {
      audioContext = new AudioContext();
    }

    if (!localSound) {
      localSound = new Sound(localRole || 'lead');
    }

    localSound.update(x, y);
    broadcastMovement(x, y);
  } else {
    if (handDetectedLastFrame && localSound) {
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

// Synthesizer Klasse
class Sound {
  constructor(role = 'lead') {
    const now = audioContext.currentTime;

    this.env = audioContext.createGain();
    this.env.connect(audioContext.destination);
    this.env.gain.setValueAtTime(0, now);
    this.env.gain.linearRampToValueAtTime(1, now + 0.25);

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

    this.osc.frequency.value = this.minOsc * Math.exp(Math.log(this.maxOsc / this.minOsc) * freqFactor);
    this.filter.frequency.value = this.minCutoff * Math.exp(Math.log(this.maxCutoff / this.minCutoff) * cutoffFactor);
  }

  stop() {
    const now = audioContext.currentTime;
    this.env.gain.cancelScheduledValues(now);
    this.env.gain.setValueAtTime(this.env.gain.value, now);
    this.env.gain.linearRampToValueAtTime(0, now + 0.25);
    this.osc.stop(now + 0.25);
  }
}
