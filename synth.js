const videoElement = document.getElementById('video');
const canvasElement = document.getElementById('output');
const canvasCtx = canvasElement.getContext('2d');
const infoDisplay = document.getElementById('info-display');

let audioContext = null;
let localSound = null;
let clientId = null;
let clientCount = 0;
const otherSounds = {};
const clientIndices = {};

const rolePool = ['lead', 'bass', 'pad', 'perc'];

function getRoleForClient(clientId) {
  const allClients = Object.keys(clientIndices).concat(clientId).sort();
  return rolePool[allClients.indexOf(clientId) % rolePool.length];
}

document.body.addEventListener('click', () => {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
});

const socket = new WebSocket('wss://nosch.uber.space/web-rooms/');

function broadcastMovement(x, y) {
  if (!clientId) return;
  socket.send(JSON.stringify(['handmove', x, y, clientId]));
}

function broadcastStop() {
  if (!clientId) return;
  socket.send(JSON.stringify(['stop', clientId]));
}

// WebSocket events
socket.addEventListener('open', () => {
  socket.send(JSON.stringify(['*enter-room*', 'collab-synth']));
  socket.send(JSON.stringify(['*subscribe-client-count*']));
  setInterval(() => socket.send(''), 30000);
});

socket.addEventListener('message', (event) => {
  if (!event.data) return;
  const data = JSON.parse(event.data);

  switch (data[0]) {
    case '*client-id*':
      clientId = data[1];
      break;

    case '*client-count*':
      clientCount = data[1];
      if (infoDisplay) infoDisplay.textContent = `Verbundene Clients: ${clientCount}`;
      break;

    case 'handmove': {
      const [_, x, y, sender] = data;
      if (sender === clientId) return;

      if (!audioContext) {
        audioContext = new AudioContext();
      }

      if (!clientIndices[sender]) {
        const all = Object.keys(clientIndices).concat(clientId).sort();
        const index = all.indexOf(sender);
        const role = rolePool[index % rolePool.length];
        clientIndices[sender] = role;
      }

      if (!otherSounds[sender]) {
        otherSounds[sender] = new Sound(clientIndices[sender]);
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

// MediaPipe Hands
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
      const role = getRoleForClient(clientId);
      clientIndices[clientId] = role;
      localSound = new Sound(role);
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

// Synthesizer
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
    this.setRole(role);
    this.osc.connect(this.filter);
    this.osc.start(now);

    this.minOsc = this.freqRange[0];
    this.maxOsc = this.freqRange[1];
    this.minCutoff = 100;
    this.maxCutoff = 4000;
  }

  setRole(role) {
    this.role = role;
    switch (role) {
      case 'lead':
        this.osc.type = 'sawtooth';
        this.freqRange = [200, 1200];
        break;
      case 'bass':
        this.osc.type = 'square';
        this.freqRange = [50, 200];
        break;
      case 'pad':
        this.osc.type = 'triangle';
        this.freqRange = [100, 600];
        break;
      case 'perc':
        this.osc.type = 'sine';
        this.freqRange = [300, 800];
        break;
      default:
        this.osc.type = 'sawtooth';
        this.freqRange = [100, 1000];
    }
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
