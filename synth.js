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

// Sound-Rollen
const possibleRoles = ['bass', 'lead', 'pad'];

// Objekte für andere Clients
const otherSounds = {};
const otherHandPositions = {};

// WebSocket-Verbindung
const socket = new WebSocket('wss://nosch.uber.space/web-rooms/');

// AudioContext initialisieren oder fortsetzen
function ensureAudioContext() {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
}

// Rolle von Client-ID ableiten
function getRoleFromClientId(id) {
  const numericId = parseInt(id, 36);
  if (isNaN(numericId)) return possibleRoles[0];
  return possibleRoles[numericId % possibleRoles.length];
}

// Farbe von Client-ID ableiten
function getColorFromClientId(id) {
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#98d8c8', '#f7dc6f'];
  const numericId = parseInt(id, 36);
  if (isNaN(numericId)) return colors[0];
  return colors[numericId % colors.length];
}

// Bewegungen senden
function broadcastMovement(x, y) {
  if (!clientId) return;
  const message = JSON.stringify(['*broadcast-message*', ['handmove', x, y, clientId]]);
  socket.send(message);
}

// Stop senden
function broadcastStop() {
  if (!clientId) return;
  const message = JSON.stringify(['*broadcast-message*', ['stop', clientId]]);
  socket.send(message);
}

// Info anzeigen
function updateInfoDisplay() {
  if (infoDisplay) {
    infoDisplay.innerHTML = `
      Verbundene Clients: <span id="client-count">${clientCount}</span><br />
      Deine Rolle: <span id="my-role">${localRole || 'Wird zugewiesen...'}</span><br />
      Client ID: ${clientId || 'Nicht zugewiesen'}
    `;
  }
}

// WebSocket-Event: offen
socket.addEventListener('open', () => {
  console.log('=== WEBSOCKET VERBUNDEN ===');
  socket.send(JSON.stringify(['*enter-room*', 'collab-synth'])); // Raum betreten
  socket.send(JSON.stringify(['*subscribe-client-count*']));   // Client-Count abonnieren

  // Ping, um Verbindung offen zu halten
  setInterval(() => socket.send(''), 30000);

  // Falls nach 1s keine Client-ID, explizit anfragen
  setTimeout(() => {
    if (!clientId) {
      socket.send(JSON.stringify(['*get-client-ids*']));
    }
  }, 1000);
});

// WebSocket-Event: Nachricht erhalten
socket.addEventListener('message', (event) => {
  if (!event.data) return;

  let data;
  try {
    data = JSON.parse(event.data);
  } catch {
    console.warn('Ungültiges JSON:', event.data);
    return;
  }

  // Broadcast-Nachrichten
  if (data[0] === '*broadcast-message*') {
    const [messageType, ...args] = data[1];
    switch (messageType) {
      case 'handmove': {
        const [x, y, sender] = args;
        // Position speichern
        otherHandPositions[sender] = { x, y, visible: true };

        // Sound für andere Clients initialisieren / updaten
        if (sender !== clientId) {
          if (!otherSounds[sender]) {
            ensureAudioContext();
            otherSounds[sender] = new Sound(getRoleFromClientId(sender));
          }
          otherSounds[sender].update(x, y);
        }
        break;
      }
      case 'stop': {
        const [stopClient] = args;
        if (otherHandPositions[stopClient]) {
          otherHandPositions[stopClient].visible = false;
        }
        if (otherSounds[stopClient]) {
          otherSounds[stopClient].stop();
          delete otherSounds[stopClient];
        }
        break;
      }
    }
    return;
  }

  // Andere Nachrichten
  switch (data[0]) {
    case '*client-id*':
      clientId = data[1];
      localRole = getRoleFromClientId(clientId);
      updateInfoDisplay();
      break;

    case '*client-ids*':
      if (!clientId && Array.isArray(data[1]) && data[1].length > 0) {
        clientId = data[1][0];
        localRole = getRoleFromClientId(clientId);
        updateInfoDisplay();
      }
      break;

    case '*client-count*':
      clientCount = data[1];
      updateInfoDisplay();
      break;

    case '*error*':
      console.warn('Fehler vom Server:', data);
      break;

    default:
      console.log('Unbekannte Nachricht:', data);
      break;
  }
});

// MediaPipe Hands Setup
const hands = new Hands({
  locateFile: file => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
});
hands.setOptions({
  maxNumHands: 1,
  modelComplexity: 1,
  minDetectionConfidence: 0.7,
  minTrackingConfidence: 0.3
});

let handDetectedLastFrame = false;

// Callback bei Handerkennungsergebnissen
hands.onResults(results => {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

  // Kamerabild zeichnen
  canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

  const handsPresent = results.multiHandLandmarks.length > 0;

  if (handsPresent) {
    const hand = results.multiHandLandmarks[0];
    const indexTip = hand[8];
    const x = indexTip.x;
    const y = indexTip.y;

    // Eigene Hand zeichnen (lila)
    canvasCtx.beginPath();
    canvasCtx.arc(x * canvasElement.width, y * canvasElement.height, 12, 0, 2 * Math.PI);
    canvasCtx.fillStyle = '#a65ecf';
    canvasCtx.strokeStyle = 'white';
    canvasCtx.lineWidth = 3;
    canvasCtx.stroke();
    canvasCtx.fill();

    ensureAudioContext();

    if (!localSound) {
      localSound = new Sound(localRole || 'lead');
    }

    localSound.update(x, y);
    broadcastMovement(x, y);

    // Eigene Handposition auch für Darstellung in otherHandPositions speichern,
    // damit sie in der Schleife für alle angezeigt wird (für Einheitlichkeit)
    otherHandPositions[clientId] = { x, y, visible: true };

  } else {
    if (handDetectedLastFrame && localSound) {
      localSound.stop();
      broadcastStop();
      localSound = null;
      if (clientId && otherHandPositions[clientId]) {
        otherHandPositions[clientId].visible = false;
      }
    }
  }

  // Alle Hände (inklusive eigene) zeichnen (außer wenn nicht sichtbar)
  for (const [otherId, position] of Object.entries(otherHandPositions)) {
    if (position.visible) {
      // Unterschiedliche Farbe für sich selbst und andere
      const color = otherId === clientId ? '#a65ecf' : getColorFromClientId(otherId);
      const role = getRoleFromClientId(otherId);

      canvasCtx.beginPath();
      canvasCtx.arc(position.x * canvasElement.width, position.y * canvasElement.height, 10, 0, 2 * Math.PI);
      canvasCtx.fillStyle = color;
      canvasCtx.strokeStyle = 'white';
      canvasCtx.lineWidth = 2;
      canvasCtx.stroke();
      canvasCtx.fill();

      // Rolle unter dem Punkt
      canvasCtx.fillStyle = 'white';
      canvasCtx.font = '12px sans-serif';
      canvasCtx.textAlign = 'center';
      canvasCtx.fillText(`${role} (${otherId})`, position.x * canvasElement.width, position.y * canvasElement.height + 25);
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

// WebSocket Fehler und Close-Handler
socket.addEventListener('error', (error) => {
  console.error('WebSocket Fehler:', error);
});
socket.addEventListener('close', (event) => {
  console.log('WebSocket geschlossen:', event.code, event.reason);
});

// Sound-Klasse Beispiel (minimal)
class Sound {
  constructor(role) {
    this.role = role;
    // Hier deine Initialisierung des Sounds (AudioNodes etc)
    this.active = true;
  }
  update(x, y) {
    if (!this.active) return;
    // Update Sound-Parameter (Position, Lautstärke etc) je nach x,y
    // Beispiel:
    // console.log(`Sound für ${this.role} updated: x=${x}, y=${y}`);
  }
  stop() {
    this.active = false;
    // Stoppe Sound, Ressourcen freigeben etc.
  }
}
