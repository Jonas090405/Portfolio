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

// Objekt zum Speichern der aktiven Sound-Parameter aller Clients
const activeSoundParameters = {};

// WebSocket-Verbindung zum Server aufbauen
const socket = new WebSocket('wss://nosch.uber.space/web-rooms/');
console.log('WebSocket-Verbindung wird aufgebaut...');

// Funktion, um AudioContext zu initialisieren oder bei Bedarf fortzusetzen
function ensureAudioContext() {
  if (!audioContext) {
    console.log('AudioContext wird erstellt');
    audioContext = new AudioContext();
  }
  if (audioContext.state === 'suspended') {
    console.log('AudioContext wird fortgesetzt');
    audioContext.resume();
  }
  return audioContext.state === 'running';
}

// AudioContext erst beim ersten User-Klick aktivieren (Browser-Sicherheitsanforderung)
window.addEventListener('click', () => {
  console.log('Click-Event erfasst, AudioContext wird initialisiert');
  const isRunning = ensureAudioContext();
  console.log(`AudioContext Status: ${isRunning ? 'läuft' : 'inaktiv'}`);
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
  const role = localRole || 'lead';
  console.log(`Sende Handbewegung: x=${x}, y=${y}, id=${clientId}, rolle=${role}`);
  socket.send(JSON.stringify(['*broadcast-message*', ['handmove', x, y, clientId, role]]));
}

  // Stop-Nachricht senden, wenn Hand nicht mehr sichtbar
function broadcastStop() {
  if (!clientId) return;
  console.log(`Sende Stop-Signal für Client ${clientId}`);
  socket.send(JSON.stringify(['*broadcast-message*', ['stop', clientId]]));
}

// Bei Verbindung: alle aktiven Sounds anfragen
function requestActiveSounds() {
  if (!clientId) return;
  console.log(`Client ${clientId} fragt nach aktiven Sounds`);
  socket.send(JSON.stringify(['*broadcast-message*', ['request-sounds', clientId]]));
}

// Aktiven Sound-Status senden (Antwort auf Anfrage)
function sendSoundStatus(requestingClient) {
  if (!clientId || !localSound) {
    console.log(`Kein lokaler Sound aktiv, sende keinen Status an ${requestingClient}`);
    return;
  }
  
  const params = activeSoundParameters[clientId];
  if (!params) {
    console.log(`Keine Parameter gefunden für ${clientId}`);
    return;
  }
  
  console.log(`Sende Sound-Status an ${requestingClient}: x=${params.x}, y=${params.y}, rolle=${localRole}`);
  socket.send(JSON.stringify([
    '*broadcast-message*', 
    ['sound-status', params.x, params.y, clientId, localRole, requestingClient]
  ]));
}

// WebSocket-Event: Verbindung geöffnet
socket.addEventListener('open', () => {
  console.log('WebSocket verbunden, betrete Raum "collab-synth"');
  socket.send(JSON.stringify(['*enter-room*', 'collab-synth']));   // Raum betreten
  socket.send(JSON.stringify(['*subscribe-client-count*']));       // Anzahl Clients abonnieren
  setInterval(() => socket.send(''), 30000);                      // Ping alle 30s, um Verbindung offen zu halten
});

// WebSocket-Event: Nachricht erhalten
socket.addEventListener('close', () => {
  console.log('WebSocket-Verbindung geschlossen');
  clientId = null;
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
    console.log('Broadcast-Nachricht erhalten:', data[1]);
    const [messageType, ...args] = data[1];

    switch (messageType) {
      case 'handmove': {
        const [x, y, sender, role] = args;
        console.log(`Handmove von Client ${sender}, Rolle: ${role}, x: ${x}, y: ${y}`);
        if (sender === clientId) return; // Eigene Bewegung ignorieren

        // Sound-Parameter für diesen Client speichern
        activeSoundParameters[sender] = { x, y, role };

        // Falls für den Sender noch kein Sound-Objekt existiert, anlegen
        if (!otherSounds[sender]) {
          ensureAudioContext();
          const senderRole = role || getRoleFromClientId(sender);
          console.log(`Neuen Sound erstellen für Client ${sender}, Rolle: ${senderRole}`);
          otherSounds[sender] = new Sound(senderRole);
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
        // Sound-Parameter löschen
        delete activeSoundParameters[stopClient];
        break;
      }
      case 'request-sounds': {
        const [requestingClient] = args;
        console.log(`Sound-Anfrage von Client ${requestingClient} erhalten`);
        // Auf Anfrage mit eigenen Sound-Parametern antworten
        sendSoundStatus(requestingClient);
        break;
      }
      case 'sound-status': {
        const [x, y, sender, role, target] = args;
        console.log(`Sound-Status von Client ${sender}, Rolle ${role}, target: ${target}`);
        // Ignorieren, wenn die Nachricht nicht für uns bestimmt ist
        if (target && target !== clientId) {
          console.log(`Diese Nachricht ist nicht für uns (${clientId})`);
          return;
        }
        // Ignorieren, wenn es der eigene Sound ist
        if (sender === clientId) {
          console.log('Eigenen Sound ignorieren');
          return;
        }

        // Sound-Parameter speichern
        activeSoundParameters[sender] = { x, y, role };
        
        // Falls für den Sender noch kein Sound-Objekt existiert, anlegen
        if (!otherSounds[sender]) {
          console.log(`Erstelle Sound für Client ${sender} mit Rolle ${role}`);
          ensureAudioContext();
          otherSounds[sender] = new Sound(role || getRoleFromClientId(sender));
          otherSounds[sender].update(x, y);
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
      console.log(`Client-ID erhalten: ${clientId}, Rolle: ${localRole}`);
      if (infoDisplay) {
        infoDisplay.textContent = `Rolle: ${localRole} – Verbundene Clients: ${clientCount}`;
      }
      // Nach Verbindung alle aktiven Sounds anfragen
      setTimeout(() => {
        console.log('Frage nach aktiven Sounds...');
        requestActiveSounds();
      }, 1000); // Kurze Verzögerung, um sicherzustellen, dass alles initialisiert ist
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
  minTrackingConfidence: 0.3      // Mindestvertrauen zur Verfolgung
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

    // Sound-Parameter speichern
    activeSoundParameters[clientId] = { x, y, role: localRole };

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
      delete activeSoundParameters[clientId]; // Parameter löschen
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
    console.log(`Sound-Instanz wird erstellt für Rolle: ${role}`);
    if (!audioContext) {
      console.error('AudioContext nicht initialisiert!');
      throw new Error('AudioContext not initialized');
    }
    const now = audioContext.currentTime;

    // Lautstärke-Hüllkurve (GainNode) erzeugen und starten
    this.env = audioContext.createGain();
    this.env.connect(audioContext.destination);
    this.env.gain.setValueAtTime(0, now);
    this.env.gain.linearRampToValueAtTime(0.5, now + 0.25); // Reduzierte Lautstärke pro Sound

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
        console.log(`Unbekannte Rolle: ${role}, verwende Standardwerte`);
        this.osc.type = 'sine';
        this.minOsc = 100;
        this.maxOsc = 1000;
    }

    // Filterfrequenzbereich definieren
    this.minCutoff = 60;
    this.maxCutoff = 4000;

    this.osc.connect(this.filter);
    console.log(`Oszillator wird gestartet für Rolle ${role}`);
    this.osc.start(now);
  }

  // Parameter aktualisieren (Frequenz + Filterfrequenz), basierend auf x,y (0..1)
  update(x, y) {
    const freqFactor = x;
    const cutoffFactor = 1 - y;

    const frequency = this.minOsc * Math.exp(Math.log(this.maxOsc / this.minOsc) * freqFactor);
    const filterFreq = this.minCutoff * Math.exp(Math.log(this.maxCutoff / this.minCutoff) * cutoffFactor);
    
    console.log(`Sound ${this.role} wird aktualisiert: Freq=${frequency.toFixed(2)}Hz, Filter=${filterFreq.toFixed(2)}Hz`);
    
    this.osc.frequency.value = frequency;
    this.filter.frequency.value = filterFreq;
  }

  // Stop-Sound langsam ausblenden und Oszillator stoppen
  stop() {
    console.log(`Sound ${this.role} wird gestoppt`);
    const now = audioContext.currentTime;
    this.env.gain.cancelScheduledValues(now);
    this.env.gain.setValueAtTime(this.env.gain.value, now);
    this.env.gain.linearRampToValueAtTime(0, now + 0.25);
    this.osc.stop(now + 0.3); // Etwas mehr Zeit geben als das Fade-out
  }
}