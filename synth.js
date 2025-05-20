// Referenzen zu HTML-Elementen: Video-Stream, Canvas zum Zeichnen, Canvas-Kontext, Info-Anzeige
const videoElement = document.getElementById('video');
const canvasElement = document.getElementById('output');
const canvasCtx = canvasElement.getContext('2d');
const infoDisplay = document.getElementById('info-display');

// Globale Variablen für AudioContext, lokale Sound-Instanz, Client-Id, Client-Anzahl und Rolle
let audioContext = null;
let localSound = null;
let clientId = null;
let clientCount = 0;
let localRole = null;

// Mögliche Sound-Rollen (verschiedene Klänge)
const possibleRoles = ['bass', 'lead', 'pad'];

// Objekt zum Speichern von Sound-Instanzen anderer Clients
const otherSounds = {};

// WebSocket-Verbindung zum Server aufbauen
const socket = new WebSocket('wss://nosch.uber.space/web-rooms/');

// Funktion, um AudioContext zu initialisieren oder bei Bedarf fortzusetzen
function ensureAudioContext() {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
}

// AudioContext erst beim ersten User-Klick aktivieren (Browser-Sicherheitsanforderung)
window.addEventListener('click', () => {
  ensureAudioContext();
});

// Rolle für einen Client bestimmen anhand dessen ID (für unterschiedliche Sounds)
function getRoleFromClientId(id) {
  const numericId = parseInt(id, 36);
  if (isNaN(numericId)) return possibleRoles[0];
  return possibleRoles[numericId % possibleRoles.length];
}

// Position der Handbewegung an alle anderen Clients senden
function broadcastMovement(x, y) {
  if (!clientId) return;
  socket.send(JSON.stringify(['*broadcast-message*', ['handmove', x, y, clientId]]));
}

// Stop-Nachricht senden, wenn Hand nicht mehr sichtbar
function broadcastStop() {
  if (!clientId) return;
  socket.send(JSON.stringify(['*broadcast-message*', ['stop', clientId]]));
}

// WebSocket-Event: Verbindung geöffnet
socket.addEventListener('open', () => {
  socket.send(JSON.stringify(['*enter-room*', 'collab-synth']));   // Raum betreten
  socket.send(JSON.stringify(['*subscribe-client-count*']));       // Anzahl Clients abonnieren
  setInterval(() => socket.send(''), 30000);                      // Ping alle 30s, um Verbindung offen zu halten
});

// WebSocket-Event: Nachricht erhalten
socket.addEventListener('message', (event) => {
  if (!event.data) return;
  let data;
  try {
    data = JSON.parse(event.data); // JSON-Nachricht parsen
  } catch (e) {
    console.warn('Ungültiges JSON empfangen:', event.data);
    return;
  }

  console.log('Empfangene Nachricht:', data);

  // Nachrichten mit Broadcast-Inhalt auswerten
  if (data[0] === '*broadcast-message*') {
    const [messageType, ...args] = data[1];

    switch (messageType) {
      case 'handmove': {
        const [x, y, sender] = args;
        if (sender === clientId) return; // Eigene Bewegung ignorieren

        // Falls für den Sender noch kein Sound-Objekt existiert, anlegen
        if (!otherSounds[sender]) {
          ensureAudioContext();
          const role = getRoleFromClientId(sender);
          otherSounds[sender] = new Sound(role);
        }
        // Sound mit neuen Handkoordinaten updaten
        otherSounds[sender].update(x, y);
        break;
      }
      case 'stop': {
        const [stopClient] = args;
        // Stoppen und löschen der Sound-Instanz des Clients, der aufgehört hat
        if (otherSounds[stopClient]) {
          otherSounds[stopClient].stop();
          delete otherSounds[stopClient];
        }
        break;
      }
    }
    return;
  }

  // Allgemeine Nachrichten behandeln
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
        infoDisplay.textContent = `Rolle: ${localRole || 'Rolle wird zugewiesen...'} – Verbundene Clients: ${clientCount}`;
      }
      break;

    case '*error*':
      console.warn('Fehler:', ...data[1]);
      break;
  }
});

// MediaPipe Hands-Setup zur Handerkennung konfigurieren
const hands = new Hands({
  locateFile: file => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
});
hands.setOptions({
  maxNumHands: 1,                 // Maximal eine Hand tracken
  modelComplexity: 1,             // Genauigkeit des Modells
  minDetectionConfidence: 0.7,    // Mindestvertrauen zur Erkennung
  minTrackingConfidence: 0.5      // Mindestvertrauen zur Verfolgung
});

let handDetectedLastFrame = false; // Status, ob in letztem Frame Hand erkannt wurde

// Callback bei Ergebnissen der Handerkennung
hands.onResults(results => {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  // Kamerabild auf Canvas zeichnen
  canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

  const handsPresent = results.multiHandLandmarks.length > 0;

  if (handsPresent) {
    // Erste erkannte Hand und deren Zeigefinger-Tipp auslesen
    const hand = results.multiHandLandmarks[0];
    const indexTip = hand[8];
    const x = indexTip.x;
    const y = indexTip.y;

    // Kreis an Zeigefingerposition malen
    canvasCtx.beginPath();
    canvasCtx.arc(x * canvasElement.width, y * canvasElement.height, 10, 0, 2 * Math.PI);
    canvasCtx.fillStyle = '#a65ecf';
    canvasCtx.fill();

    // AudioContext sicherstellen (falls noch nicht gestartet)
    ensureAudioContext();

    // Lokalen Sound-Synthesizer erstellen falls noch nicht vorhanden
    if (!localSound) {
      localSound = new Sound(localRole || 'lead');
    }

    // Sound-Parameter aktualisieren anhand Handposition
    localSound.update(x, y);

    // Position an andere Clients senden
    broadcastMovement(x, y);

  } else {
    // Falls keine Hand erkannt wird, aber im letzten Frame eine da war:
    if (handDetectedLastFrame && localSound) {
      localSound.stop();     // Sound stoppen
      broadcastStop();       // Stop-Nachricht senden
      localSound = null;     // lokale Instanz löschen
    }
  }

  handDetectedLastFrame = handsPresent; // Status speichern
  canvasCtx.restore();
});

// Kamera starten und Bilder an MediaPipe senden
const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({ image: videoElement });
  },
  width: 640,
  height: 480
});
camera.start();

// Sound-Synthesizer Klasse (erzeugt und steuert Audio-Oszillator + Filter)
class Sound {
  constructor(role = 'lead') {
    if (!audioContext) {
      throw new Error('AudioContext not initialized');
    }
    const now = audioContext.currentTime;

    // Lautstärke-Hüllkurve (GainNode) erzeugen und starten
    this.env = audioContext.createGain();
    this.env.connect(audioContext.destination);
    this.env.gain.setValueAtTime(0, now);
    this.env.gain.linearRampToValueAtTime(1, now + 0.25);

    // Tiefpass-Filter erzeugen und verbinden
    this.filter = audioContext.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.value = 1000;
    this.filter.Q.value = 6;
    this.filter.connect(this.env);

    // Oszillator erzeugen (Tonquelle)
    this.osc = audioContext.createOscillator();
    this.role = role;

    // Unterschiedliche Oszillator-Typen und Frequenzbereiche für verschiedene Rollen
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

    // Filterfrequenzbereich definieren
    this.minCutoff = 60;
    this.maxCutoff = 4000;

    this.osc.connect(this.filter);
    this.osc.start(now);
  }

  // Parameter aktualisieren (Frequenz + Filterfrequenz), basierend auf x,y (0..1)
  update(x, y) {
    const freqFactor = x;
    const cutoffFactor = 1 - y;

    this.osc.frequency.value = this.minOsc * Math.exp(Math.log(this.maxOsc / this.minOsc) * freqFactor);
    this.filter.frequency.value = this.minCutoff * Math.exp(Math.log(this.maxCutoff / this.minCutoff) * cutoffFactor);
  }

  // Sound langsam ausblenden und Oszillator stoppen
  stop() {
    const now = audioContext.currentTime;
    this.env.gain.cancelScheduledValues(now);
    this.env.gain.setValueAtTime(this.env.gain.value, now);
    this.env.gain.linearRampToValueAtTime(0, now + 0.25);
    this.osc.stop(now + 0.25);
  }
}

console.log(`Update ${this.role}: freq ${this.osc.frequency.value.toFixed(2)}, cutoff ${this.filter.frequency.value.toFixed(2)}`);