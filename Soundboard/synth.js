// Holen der HTML-Elemente, um später Inhalte anzeigen oder bearbeiten zu können
const titleElem = document.getElementById('title-display');      // Element für den Titel
const messageElem = document.getElementById('message-display');  // Element für Nachrichten
const indexElem = document.getElementById('client-index');       // Element zur Anzeige der Client-Nummer
const canvas = document.getElementById('canvas');                // Zeichenfläche (Canvas)
const context = canvas.getContext('2d');                         // 2D-Zeichenkontext vom Canvas, um darauf zu malen

// Arrays und Maps zur Speicherung von Zeichnungen und Nutzer-Daten
const drawings = [];                     // Eigene lokale Linien, die gezeichnet werden
const remoteDrawings = new Map();       // Zeichnungen von anderen Nutzern (Clients)

// Status-Variablen für Berührungen und Zeichnungen
let isPinching = false;                  // Ob gerade eine Zwei-Finger-Berührung (Pinch) aktiv ist
let lastDrawPos = null;                  // Letzte Position, an der gezeichnet wurde
const activePinches = new Set();        // Set für aktive Pinch-Gesten
const clientNames = new Map();           // Map zur Zuordnung von Client-IDs zu ihren Namen

// Ton beim Löschen abspielen
const clearSound = new Audio('clear.wav');  // Lade eine Audiodatei
clearSound.volume = 0.65;                    // Setze Lautstärke etwas leiser

// Adresse für die WebSocket-Verbindung (für Echtzeit-Datenübertragung)
const webRoomsWebSocketServerAddr = 'wss://nosch.uber.space/web-rooms/';

// Radius für Kreise, die z.B. gezeichnet werden können
const circleRadius = 50;

// Variablen für die Verwaltung der Nutzer (Clients)
let clientId = null;      // Eigene Client-ID (wird später gesetzt)
let clientCount = 0;      // Anzahl der verbundenen Clients

// Listen von Tiernamen, sortiert nach Anfangsbuchstaben
const animalNames = {
  a: ['ape', 'antelope', 'armadillo'],
  b: ['bear', 'beaver', 'buffalo'],
  c: ['cat', 'cougar', 'crab'],
  d: ['dog', 'duck', 'donkey'],
  e: ['elephant', 'eagle'],
  f: ['zebra'],
};

// Listen von Adjektiven, ebenfalls nach Anfangsbuchstaben sortiert
const adjectives = {
  a: ['adventures', 'agile', 'angry'],
  b: ['bouncy', 'buffed', 'brave'],
  c: ['curious', 'clever', 'crazy'],
  d: ['dizzy', 'dangerous', 'dumb'],
  e: ['electric', 'eager'],
  f: ['zesty'],
};

// Funktion, um einen zufälligen Namen zu generieren (Adjektiv + Tier)
function generateRandomName() {
  const letters = Object.keys(adjectives);                              // Alle Buchstaben aus der Adjektivliste
  const letter = letters[Math.floor(Math.random() * letters.length)];   // Zufälligen Buchstaben auswählen

  const adjList = adjectives[letter];                                   // Adjektive mit diesem Buchstaben
  const animalList = animalNames[letter];                               // Tiere mit diesem Buchstaben

  if (!adjList || !animalList) return 'anonymous';                      // Falls keine Liste existiert, Default-Name

  // Zufälliges Adjektiv und Tier aus der jeweiligen Liste auswählen
  const adj = adjList[Math.floor(Math.random() * adjList.length)];
  const animal = animalList[Math.floor(Math.random() * animalList.length)];

  // Name zusammenbauen und zurückgeben, z.B. "bravebear"
  return `${adj}${animal}`;
}


/*************************************************************
 * Touches Map and Synths Map
 */

// "touches" speichert alle aktuellen Berührungen (Finger auf dem Bildschirm).
// Dabei ist jede Berührung durch eine eindeutige ID identifizierbar.
const touches = new Map();

// "synths" speichert für jede Berührung den zugehörigen Klang (Synthesizer).
// So kann jeder Finger einen eigenen Ton erzeugen.
const synths = new Map();

/**
 * Klasse Touch
 * Repräsentiert eine einzelne Berührung mit ihrer Position.
 */
class Touch {
  // Konstruktor: Erstellt eine neue Berührung mit einer ID und Koordinaten (x,y).
  // "own" gibt an, ob es die eigene Berührung ist oder von jemand anderem (z.B. bei mehreren Nutzern).
  constructor(id, x, y, own = false) {
    this.id = id;   // Eindeutige Kennung für die Berührung
    this.x = x;     // x-Koordinate (horizontal)
    this.y = y;     // y-Koordinate (vertikal)
    this.own = own; // Eigene Berührung oder fremd
  }

  // Methode, um die Position der Berührung zu aktualisieren (z.B. Finger bewegt sich).
  move(x, y) {
    this.x = x;
    this.y = y;
  }
}

/**
 * Klasse Synth
 * Erzeugt und steuert einen Klang (Ton), der mit einer Berührung verbunden ist.
 */
class Synth {
  constructor(type = 'sine') {
    // AudioContext ist die Schnittstelle für Ton-Erzeugung im Browser
    this.context = new (window.AudioContext || window.AudioContext)();

    // Erzeugt einen Oszillator, der die Tonwelle (Klangform) produziert
    this.osc = this.context.createOscillator();

    // Ein Filter, der den Klang verändert (z.B. dämpft hohe Frequenzen)
    this.filter = this.context.createBiquadFilter();

    // Gain steuert die Lautstärke des Tons
    this.gain = this.context.createGain();

    // Verbindet die Klangquelle mit Filter, dann Lautstärke und schließlich mit den Lautsprechern
    this.osc.type = type;        // Wellenform des Tons (sinus, rechteck, etc.)
    this.filter.type = 'lowpass'; // Filtertyp "Tiefpass" lässt nur tiefe Frequenzen durch

    // Verkettung der Audio-Elemente: Oszillator → Filter → Gain → Lautsprecher
    this.osc.connect(this.filter).connect(this.gain).connect(this.context.destination);

    // Anfangswerte setzen: Lautstärke auf 0 (stumm), Tonhöhe und Filter auf Standardwerte
    this.gain.gain.value = 0;        // Ton zunächst stumm
    this.osc.frequency.value = 440;  // Standardton (Kammerton A)
    this.filter.frequency.value = 1000; // Filterfrequenz

    // Startet den Oszillator, Ton kann jetzt erzeugt werden (wird aber erst hörbar, wenn Lautstärke hochgeht)
    this.osc.start();
  }

  /**
   * Update-Funktion, die den Klang an die Position der Berührung anpasst.
   * - Je höher auf dem Bildschirm, desto höher die Tonfrequenz (Tonhöhe).
   * - Lautstärke wird etwas leiser bei hohen Tönen, um Balance zu schaffen.
   * - Der Filter verändert den Klang basierend auf der horizontalen Position.
   */
  update(x, y) {
    // Tonhöhe: zwischen 220 Hz (tief) und 880 Hz (hoch), abhängig von y (Vertikalposition)
    const freq = 220 + (880 - 220) * y;

    // Lautstärke: je höher der Ton, desto leiser (für bessere Balance)
    const volume = 0.3 * (1 - y);

    // Filterfrequenz (Klangfarbe): abhängig von x (Horizontalposition)
    const filterFreq = 500 + 3000 * x;

    // Werte im Synthesizer aktualisieren
    this.osc.frequency.value = freq;
    this.filter.frequency.value = filterFreq;
    this.gain.gain.value = volume;
  }

  // Ton ausschalten, indem die Lautstärke auf 0 gesetzt wird
  stop() {
    this.gain.gain.value = 0;
  }
}

/**
 * Neue Berührung anlegen.
 * Gleichzeitig wird ein neuer Synthesizer-Klang für diese Berührung erstellt.
 */
function createTouch(id, x, y, own = false) {
  const touch = new Touch(id, x, y, own); // Neue Berührung mit ID und Position
  touches.set(id, touch);                  // Berührung in der Map speichern
  createSynth(id);                         // Passenden Klang erzeugen
}

/**
 * Position einer bestehenden Berührung aktualisieren (Finger bewegt sich).
 */
function moveTouch(id, x, y) {
  const touch = touches.get(id);           // Berührung aus Map holen
  if (touch) {
    touch.move(x, y);                      // Position aktualisieren
  }
}

/**
 * Berührung löschen (Finger weg vom Bildschirm).
 * Gleichzeitig wird der dazugehörige Klang gestoppt und entfernt.
 */
function deleteTouch(id) {
  touches.delete(id);                      // Berührung entfernen
  deleteSynth(id);                        // Klang stoppen und löschen
  updateSynthListDisplay();               // (Optional) Anzeige der aktiven Klänge aktualisieren
}

/**
 * Neuer Synthesizer-Klang wird erstellt, wenn für die gegebene ID noch keiner existiert.
 * Verschiedene Wellenformen werden abwechselnd benutzt, damit die Klänge vielfältig klingen.
 */
function createSynth(id) {
  if (!synths.has(id)) {
    // Liste der möglichen Klangformen
    const waveTypes = ['sine', 'square', 'triangle', 'sawtooth', 'sine', 'square', 'triangle', 'sawtooth'];

    // Wellenform wird aus der Liste ausgewählt, abhängig von der ID (modulo Länge)
    const waveType = waveTypes[id % waveTypes.length];

    // Neuer Synthesizer mit ausgewählter Klangform wird erzeugt
    const synth = new Synth(waveType);

    // Synthesizer in Map speichern
    synths.set(id, synth);

    // UI-Liste der aktiven Klänge aktualisieren (wenn vorhanden)
    updateSynthListDisplay();
  }
}

/**
 * Synthesizer-Klang stoppen und aus der Map entfernen.
 */
function deleteSynth(id) {
  const synth = synths.get(id);     // Synthesizer aus Map holen
  if (synth) {
    synth.stop();                   // Ton ausmachen
    synths.delete(id);              // Synth aus Map löschen
  }
}

/*************************************************************
 * MediaPipe Hands Setup
 */

// Erstellt ein unsichtbares Video-Element, das später die Webcam-Bilder zeigt
const videoElement = document.createElement('video');
document.body.appendChild(videoElement);  // Füge das Video dem Seiteninhalt hinzu

// WICHTIG: Damit das Handtracking auch auf Smartphones im Browser funktioniert,
// wird dieses Attribut gesetzt (verhindert Vollbild und andere Probleme)
videoElement.setAttribute('playsinline', '');

// Neues MediaPipe Hands Objekt erstellen, das Hand-Positionen erkennen kann
const hands = new Hands({
  locateFile: (file) => {
    // Hier wird angegeben, wo MediaPipe seine benötigten Dateien findet
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
  }
});

// Einstellungen für das Handtracking:
// maxNumHands: max. 1 Hand erkennen
// modelComplexity: Modell-Komplexität (1 = normal)
// minDetectionConfidence: Mindestwahrscheinlichkeit für Hand-Erkennung (80%)
// minTrackingConfidence: Mindestwahrscheinlichkeit, um die Hand weiterzuverfolgen (40%)
hands.setOptions({
  maxNumHands: 1,
  modelComplexity: 1,
  minDetectionConfidence: 0.8,
  minTrackingConfidence: 0.4
});

// Funktion, die aufgerufen wird, wenn MediaPipe eine Hand erkannt hat
hands.onResults(onHandsResults);

// Kamera-Setup: Verbindet die Webcam mit MediaPipe Hands
const camera = new Camera(videoElement, {
  onFrame: async () => {
    // Bei jedem neuen Kamerabild wird das Bild an MediaPipe geschickt
    await hands.send({ image: videoElement });
  },
});

// Funktion zum Starten der Kamera und des Zeichen-Updates
start();

/*************************************************************
 * Start Function
 */
function start() {
  updateCanvasSize();   // Größe der Zeichenfläche anpassen (Canvas)

  camera.start();       // Kamera einschalten

  requestAnimationFrame(onAnimationFrame); // Beginnt eine Schleife für Animationen/Updates
}

/*************************************************************
 * MediaPipe Hand Results Callback
 * Wird ausgeführt, sobald MediaPipe eine Hand erkannt hat und Daten liefert
 */
function onHandsResults(results) {
  // Falls die eigene Client-ID noch nicht gesetzt ist, abbrechen (kein Nutzer)
  if (!clientId) return;

  // Wenn mindestens eine Hand erkannt wurde...
  if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
    // Wir nehmen die erste erkannte Hand und ihre "Landmarks" (Schlüsselstellen)
    const landmarks = results.multiHandLandmarks[0];

    // Koordinaten des "Mittelfingers" (Landmark 9) nehmen und horizontal spiegeln,
    // weil die Kamera-Bilder spiegelverkehrt sind
    const x = 1 - landmarks[9].x;
    const y = landmarks[9].y;

    // Abstand zwischen Daumen (Landmark 4) und Zeigefinger (Landmark 8) berechnen
    // Das sagt uns, ob die Finger eine "Pinch"-Geste machen (zusammengehalten)
    const pinchDistance = Math.hypot(
      landmarks[4].x - landmarks[8].x,
      landmarks[4].y - landmarks[8].y
    );

    // "Pinchen" liegt vor, wenn der Abstand sehr klein ist (<0.04)
    const isNowPinching = pinchDistance < 0.04;

    if (!touches.has(clientId)) {
      // Wenn der Nutzer noch keine Berührung (Touch) hat,
      // wird jetzt eine neue Touch mit der aktuellen Position erstellt
      createTouch(clientId, x, y, true);

      // Sende Nachricht an alle anderen, dass ein neuer Touch gestartet wurde
      sendRequest('*broadcast-message*', ['start', clientId, x, y]);
    } else {
      // Wenn Touch schon existiert, aktualisiere nur die Position
      moveTouch(clientId, x, y);

      // Nachricht an alle, dass sich der Touch bewegt hat
      sendRequest('*broadcast-message*', ['move', clientId, x, y]);
    }

    // Wenn aktuell "gepincht" wird (Finger zusammen), zeichnen wir Linien
    if (isNowPinching) {
      if (lastDrawPos) {
        // Linie von letzter Position zu aktueller Position speichern
        drawings.push({ from: lastDrawPos, to: { x, y } });

        // Zeichnungsdaten an alle anderen Clients senden
        sendRequest('*broadcast-message*', ['draw', clientId, lastDrawPos.x, lastDrawPos.y, x, y]);
      }
      // Neue letzte Position speichern
      lastDrawPos = { x, y };
    } else {
      // Wenn nicht gepincht wird, löschen wir die letzte Position
      lastDrawPos = null;
    }

    // Status "ist gerade Pinchen?" speichern
    isPinching = isNowPinching;

    // Nutzer zur Liste aktiver Pinches hinzufügen oder entfernen
    if (isNowPinching) {
      activePinches.add(clientId);
    } else {
      activePinches.delete(clientId);
    }

  } else {
    // Wenn keine Hand mehr erkannt wird, Touch löschen und Nachricht senden
    if (touches.has(clientId)) {
      deleteTouch(clientId);
      sendRequest('*broadcast-message*', ['end', clientId]);
    }

    // Alle Pinch- und Zeichenzustände zurücksetzen
    lastDrawPos = null;
    isPinching = false;
  }
}


/*************************************************************
* Canvas Größe anpassen
*/
function updateCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

/*************************************************************
 * Animation Frame: Zeichnen und Synth-Updates
 */
/*************************************************************
 * Animation Frame: Zeichnen und Synth-Updates mit Lautstärke-Abschwächung
 */
function onAnimationFrame() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Touch-Punkte zeichnen und Synthesizer aktualisieren
  for (let [id, touch] of touches) {
    const x = canvas.width * touch.x;
    const y = canvas.height * touch.y;

    // Kreis zeichnen (inkl. ID-Anzeige)
    drawCircle(context, x, y, touch.own, touch.own, id);

    // Synthesizer-Parameter setzen
    const synth = synths.get(id);
    if (synth) {
      synth.update(touch.x, 1 - touch.y);
      synth.gain.gain.value = touch.own ? 1.0 : 0.8; // 80 % Lautstärke für andere Nutzer
    }
  }

  // Lokale Zeichnungen (bläulich)
  context.strokeStyle = 'rgba(0, 200, 255, 0.8)';
  context.lineWidth = 3;
  context.lineCap = 'round';
  for (let segment of drawings) {
    drawLine(segment.from, segment.to);
  }

  // Remote-Zeichnungen (weiß)
  context.strokeStyle = 'white';
  for (let segments of remoteDrawings.values()) {
    for (let segment of segments) {
      drawLine(segment.from, segment.to);
    }
  }

  // Nächsten Frame anfordern
  requestAnimationFrame(onAnimationFrame);
}



/*************************************************************
 * Kreis zeichnen für Touchpunkte
 */
function drawCircle(context, x, y, highlight = false, own = false, id = null) {
  const radius = 10 + (circleRadius * (1 - y / canvas.height)); // Radius abhängig von y
  const glow = 30 * (x / canvas.width); // Leuchteffekt abhängig von x
  let baseColor, strokeColor;

  if (own) {
    // Eigener Touch: Blautöne
    const lightness = 80 - 50 * (x / canvas.width);
    baseColor = `hsl(210, 100%, ${lightness}%)`;
    strokeColor = `hsl(210, 100%, ${Math.min(100, lightness + 15)}%)`;
    context.globalAlpha = highlight ? 1 : 0.7;
  } else {
    // Fremder Touch: Grautöne
    const lightness = 90 - 50 * (x / canvas.width);
    baseColor = `hsl(0, 0%, ${lightness}%)`;
    strokeColor = `hsl(0, 0%, ${Math.min(100, lightness + 20)}%)`;
    context.globalAlpha = highlight ? 0.8 : 0.5;
  }

  context.fillStyle = baseColor;
  context.shadowColor = baseColor;
  context.shadowBlur = glow;

  // Kreis zeichnen
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.fill();

  // Pinch-Hervorhebung (Stroke)
  if (id && activePinches.has(id)) {
    context.shadowBlur = 0;
    context.lineWidth = 4;
    context.strokeStyle = strokeColor;
    context.stroke();
  }

  context.globalAlpha = 1;

  // Nutzername neben dem Kreis
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
 * Synth-Liste (unten links) mit 20% kleinerer Größe auf Mobile
 */
const synthListElem = document.getElementById('synth-list') || (() => {
  const el = document.createElement('div');

  // Funktion zum Anpassen des Stylings mit 20% Skalierung auf Mobile
  function styleSynthList() {
    const isMobile = window.innerWidth <= 600; // Mobile-Schwelle

    // Basiswerte
    const basePadding = { vertical: 15, horizontal: 20 };
    const baseBorderRadius = 20;
    const baseFontSize = 18;

    if (isMobile) {
      // 20% kleiner auf Mobile
      el.style.padding = `${basePadding.vertical * 0.8}px ${basePadding.horizontal * 0.8}px`;
      el.style.borderRadius = `${baseBorderRadius * 0.8}px`;
      el.style.fontSize = `${baseFontSize * 0.8}px`;
    } else {
      // Originalgröße auf Desktop
      el.style.padding = `${basePadding.vertical}px ${basePadding.horizontal}px`;
      el.style.borderRadius = `${baseBorderRadius}px`;
      el.style.fontSize = `${baseFontSize}px`;
    }

    // Position & restliches Styling bleibt gleich
    Object.assign(el.style, {
      position: 'fixed',
      bottom: '16px',
      left: '16px',
      backdropFilter: 'blur(12px)',
      background: 'rgba(255, 255, 255, 0.01)',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
      color: '#fff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif',
      lineHeight: '1.4',
      zIndex: 1000,
      border: '1px solid rgba(255, 255, 255, 0.08)'
    });
  }

  // Initiales Styling
  styleSynthList();

  // Auf Fenstergröße reagieren und Liste anpassen
  window.addEventListener('resize', styleSynthList);

  document.body.appendChild(el);
  return el;
})();

function updateSynthListDisplay() {
  // Sortiere Touch-IDs numerisch
  const sortedIds = Array.from(touches.keys()).sort((a, b) => a - b);

  // Eigene Position herausfinden (1-basiert)
  const ownPos = sortedIds.indexOf(clientId);
  const total = sortedIds.length;

  // Header-Text
  let headerText = ownPos >= 0
    ? `<strong>User ${ownPos + 1} / ${total}</strong><br>`
    : `<strong>Users on board: ${total}</strong><br>`;

  // Liste aller Nutzer mit Wellenformen
  let html = headerText;
  for (let i = 0; i < sortedIds.length; i++) {
    const id = sortedIds[i];
    const synth = synths.get(id);
    // Falls es keinen Synthesizer zu dieser ID gibt, überspringe den Nutzer
    if (!synth) continue;
    // Lese den Typ der Wellenform (z.B. sine, square) vom Synthesizer aus
    const waveType = synth.osc.type;
    // Bestimme den Namen des Nutzers, falls vorhanden, ansonsten "User #X"
    const userName = clientNames.get(id) || `User #${i + 1}`;
    // Falls die ID der eigene Nutzer ist, füge "(You)" als Kennzeichnung hinzu
    const youTag = (id === clientId) ? ' (You)' : '';
    // Baue den Listeneintrag zusammen, z.B. "Anna (You): sine"
    // Jedes Nutzer-Element endet mit einem Zeilenumbruch für die Darstellung
    html += `${userName}${youTag}: ${waveType}<br>`;
  }


  synthListElem.innerHTML = html;
}



/*************************************************************
 * Clear Button (unten rechts) mit 20% kleinerer Größe auf Mobile
 */
const clearButton = document.createElement('button');
clearButton.textContent = 'Clear Drawings';

// Funktion zum Anpassen des Stylings mit 20% Skalierung auf Mobile
function styleClearButton() {
  const isMobile = window.innerWidth <= 600; // Mobile-Schwelle

  // Basiswerte
  const basePadding = { vertical: 15, horizontal: 20 };
  const baseBorderRadius = 20;
  const baseFontSize = 18;

  if (isMobile) {
    // 20% kleiner auf Mobile
    clearButton.style.padding = `${basePadding.vertical * 0.8}px ${basePadding.horizontal * 0.8}px`;
    clearButton.style.borderRadius = `${baseBorderRadius * 0.8}px`;
    clearButton.style.fontSize = `${baseFontSize * 0.8}px`;
  } else {
    // Originalgröße auf Desktop
    clearButton.style.padding = `${basePadding.vertical}px ${basePadding.horizontal}px`;
    clearButton.style.borderRadius = `${baseBorderRadius}px`;
    clearButton.style.fontSize = `${baseFontSize}px`;
  }

  // Position & restliches Styling bleibt gleich
  Object.assign(clearButton.style, {
    position: 'fixed',
    bottom: '16px',
    right: '16px',
    backdropFilter: 'blur(12px)',
    background: 'rgba(255, 255, 255, 0.01)',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
    color: '#fff',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif',
    lineHeight: '1.4',
    zIndex: 1000,
    border: '1px solid rgba(255, 255, 255, 0.08)',
    cursor: 'pointer',
    transition: 'background 0.2s, border 0.2s'
  });
}

clearButton.addEventListener('mouseenter', () => {
  clearButton.style.background = 'rgba(255, 255, 255, 0.08)';
  clearButton.style.border = '1px solid rgba(255, 255, 255, 0.2)';
});

clearButton.addEventListener('mouseleave', () => {
  clearButton.style.background = 'rgba(255, 255, 255, 0.01)';
  clearButton.style.border = '1px solid rgba(255, 255, 255, 0.08)';
});

clearButton.addEventListener('click', () => {
  // Zeichnungen lokal löschen
  drawings.length = 0;
  remoteDrawings.clear();

  // Broadcast an andere Nutzer
  sendRequest('*broadcast-message*', ['clear']);
  sendRequest('*broadcast-message*', ['play-clear-sound']);

  // Lokal Clear Sound abspielen
  playClearSound();
});

// Initiales Styling beim Laden
styleClearButton();

// Auf Fenstergröße reagieren und Button anpassen
window.addEventListener('resize', styleClearButton);

document.body.appendChild(clearButton);


/*************************************************************
 * WebSocket Kommunikation
 */
const socket = new WebSocket(webRoomsWebSocketServerAddr);

// Bei Verbindungsaufbau: Raum betreten und Client-Count abonnieren
socket.addEventListener('open', (event) => {
  sendRequest('*enter-room*', 'touch-touch'); // Raum beitreten
  sendRequest('*subscribe-client-count*');    // Anzahl der Nutzer abonnieren

  // Keepalive: alle 30 Sekunden ein Ping senden (leere Nachricht)
  setInterval(() => socket.send(''), 30000);
});

// Bei Verbindungsende: Eigene ID broadcasten, Status anpassen
socket.addEventListener("close", (event) => {
  if (clientId !== null) {
    sendRequest('*broadcast-message*', ['end', clientId]); // Informiere andere, dass Client geht
  }
  clientId = null;
  document.body.classList.add('disconnected'); // CSS-Klasse für Offline-Status
});

// Nachrichten vom Server empfangen und auswerten
socket.addEventListener('message', (event) => {
  const data = event.data;
  if (data.length > 0) {
    const incoming = JSON.parse(data);   // Nachricht parsen (Array)
    const selector = incoming[0];         // Erster Wert bestimmt die Art der Nachricht

    switch (selector) {
      case '*client-id*':
        // Eigene Client-ID erhalten und setzen
        clientId = incoming[1] + 1;
        const name = generateRandomName();
        clientNames.set(clientId, name);

        // Eigenen Namen an alle broadcasten
        sendRequest('*broadcast-message*', ['name', clientId, name]);

        // Namen der anderen Clients anfragen
        sendRequest('*broadcast-message*', ['request-names', clientId]);

        start();                // Start der Anwendung
        updateSynthListDisplay(); // UI aktualisieren
        break;

      case '*client-count*':
        // Anzahl der verbundenen Clients aktualisieren
        clientCount = incoming[1];
        updateSynthListDisplay();
        break;

      case 'start': {
        // Neuer Touch von anderem Client startet
        const id = incoming[1];
        const x = incoming[2];
        const y = incoming[3];

        // Falls noch kein Name für den Client bekannt, Default setzen
        if (!clientNames.has(id)) {
          clientNames.set(id, `User ${id}`);
          // Namen zurücksenden, falls nicht eigener Client
          if (id !== clientId && clientNames.has(clientId)) {
            sendRequest('*broadcast-message*', ['name', clientId, clientNames.get(clientId)]);
          }
        }

        // Touch nur erstellen, wenn es nicht der eigene ist
        if (id !== clientId) createTouch(id, x, y);
        updateSynthListDisplay();
        break;
      }

      case 'move': {
        // Touch-Bewegung von anderem Client
        const id = incoming[1];
        const x = incoming[2];
        const y = incoming[3];
        if (id !== clientId) moveTouch(id, x, y);
        break;
      }

      case 'end': {
        // Touch von anderem Client beendet
        const id = incoming[1];
        if (id !== clientId) {
          deleteTouch(id);
          updateSynthListDisplay();
        }
        break;
      }

      case '*error*': {
        // Fehler vom Server loggen
        const message = incoming[1];
        console.warn('server error:', ...message);
        break;
      }

      case 'draw': {
        // Remote Zeichnung erhalten und speichern
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
        // Alle Zeichnungen löschen
        drawings.length = 0;
        remoteDrawings.clear();
        break;
      }

      case 'name': {
        // Name eines Clients aktualisieren
        const id = incoming[1];
        const name = incoming[2];
        clientNames.set(id, name);
        updateSynthListDisplay();
        break;
      }

      case 'request-names': {
        // Auf Anfrage alle eigenen Namen an alle broadcasten
        clientNames.forEach((name, id) => {
          sendRequest('*broadcast-message*', ['name', id, name]);
        });
        break;
      }

      case 'play-clear-sound': {
        // Clear-Sound abspielen
        playClearSound();
        break;
      }

      default:
        break;
    }
  }
});

/*************************************************************
 * Hilfsfunktionen
 */

// Clear-Sound starten, ggf. vorher stoppen
function playClearSound() {
  clearSound.pause();
  clearSound.currentTime = 0;
  clearSound.play();
}

// Nachrichten senden, falls WebSocket offen
function sendRequest(...message) {
  const str = JSON.stringify(message);
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(str);
  }
}

// Linie auf Canvas zeichnen (Koordinaten normiert 0..1)
function drawLine(from, to) {
  context.beginPath();
  context.moveTo(from.x * canvas.width, from.y * canvas.height);
  context.lineTo(to.x * canvas.width, to.y * canvas.height);
  context.stroke();
}

/*************************************************************
 * Event Listener
 */

// Canvas bei Fenstergröße anpassen
window.addEventListener('resize', updateCanvasSize);

// Vor Verlassen der Seite eigene Session beenden
window.addEventListener('beforeunload', () => {
  if (clientId !== null && socket.readyState === WebSocket.OPEN) {
    const msg = JSON.stringify(['*broadcast-message*', ['end', clientId]]);
    socket.send(msg);
  }
});
