const CAPSULE_FREEZE_DURATION = 3000; // Sekunden

function safeShowCapsule() {
  const capsule = document.getElementById('capsule');
  const container = document.getElementById('capsule-container');
  if (!capsule || !container) {
    setTimeout(safeShowCapsule, 100); // Noch nicht bereit → später erneut versuchen
    return;
  }
  showCapsule();
}

let isTyping = false;

// Lautstärke aller Sounds reduzieren
window.addEventListener('DOMContentLoaded', () => {
  const sounds = [
    document.getElementById('capsule-appear'),
    document.getElementById('capsule-open'),
    document.getElementById('plushy-talk'),
    document.getElementById('click-sound'),
    document.getElementById('plush-appear'),
  ];

  sounds.forEach(sound => {
    if (sound) sound.volume = 0.03; // 10% Lautstärke
  });
});


const cheekyComments = [
  "schauen wir mal was du dir so vorgenommen hast und es mal wieder nicht eingehalt hast:",
  "Mal schauen welche Vorsätze du dir gesetzt hast (und nicht eingehalten hast):",
  "Erinnerst du dich noch an deine Vorsätze? Wahrscheinlich nicht, oder?:",
  "Na, wie sieht’s aus mit deinen großen Plänen von damals? Schon vergessen, was?:",
  "Zeit, deinen alten Vorsätzen ins Gesicht zu schauen:",
  "Trommelwirbel... und hier kommen deine gescheiterten Vorsätze:",
  "Das hier könnte peinlich werden… deine damaligen Ziele warten:",
  "Erinnerst du dich noch? Nein? Umso besser, wir helfen dir auf die Sprünge:",
  "Bereit für eine kleine Reise in deine vergessenen Pläne?:",
];



const capsulePlushiePairs = [
  {
    capsule: { src: "Dragonscapsulesprite.jpg", frameWidth: 320, totalFrames: 3 },
    dragon: { src: "Dragonsprite.png", frameWidth: 424, totalFrames: 4 }
  },
  {
    capsule: { src: "Zebracapsulesprite.png", frameWidth: 320, totalFrames: 3 },
    dragon: { src: "Zebrasprite.png", frameWidth: 433, totalFrames: 4 }
  },
  {
    capsule: { src: "Fishcapsulesprite.png", frameWidth: 320, totalFrames: 3 },
    dragon: { src: "Fishsprite.png", frameWidth: 441, totalFrames: 4 }
  },
  {
    capsule: { src: "Capybaracapsulesprite.png", frameWidth: 320, totalFrames: 3 },
    dragon: { src: "Capybarasprite.png", frameWidth: 434, totalFrames: 4 }
  },
  {
    capsule: { src: "Dogcapsulesprite.png", frameWidth: 320, totalFrames: 3 },
    dragon: { src: "Dogsprite.png", frameWidth: 427, totalFrames: 4 }
  }
];

// Mute-Button Logik
let isMuted = false;
const muteButton = document.getElementById('mute-button');

muteButton.addEventListener('click', () => {
  isMuted = !isMuted;

  const newSrc = isMuted ? 'muted.png' : 'unmuted.png';
  muteButton.src = newSrc;

  // Alle Audio-Tags mit einem verringerten volume setzen oder auf 0 muten
  document.querySelectorAll('audio').forEach(audio => {
    audio.muted = isMuted;
  });

  // Optional: Zustand merken
  localStorage.setItem("isMuted", isMuted);
});

// Zustand beim Laden wiederherstellen
window.addEventListener('DOMContentLoaded', () => {
  const storedMuted = localStorage.getItem("isMuted") === 'true';
  if (storedMuted) {
    isMuted = true;
    muteButton.src = 'muted.png';
    document.querySelectorAll('audio').forEach(audio => {
      audio.muted = true;
    });
  }
});


let selectedCapsule;
let selectedDragon;

// -------- Submit Event mit Sternen + Logik ------------
const submitButton = document.getElementById("submit");

submitButton.addEventListener("click", function () {
  // Deaktiviert den Submit-Button, um mehrfaches Klicken zu verhindern
  const clickSound = document.getElementById('click-sound');
  if (clickSound) clickSound.play();

  submitButton.disabled = true;

  const button = this;
  const rect = button.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  button.classList.add('clicked');
  showStars(centerX, centerY);
  createStars(button);

  setTimeout(() => {
    button.classList.remove('clicked');
    handleSubmit();
  }, 600);
});

// ----------- Handle Submit Hauptfunktion ------------
function handleSubmit() {
  const capsuleOpened = localStorage.getItem("capsuleOpened");

  const freezeUntilStored = parseInt(localStorage.getItem("capsuleFreezeUntil"), 10);
  const now = Date.now();

  if (capsuleOpened !== "true" && freezeUntilStored && now < freezeUntilStored) {
    alert("Bitte öffne zuerst die Kapsel bevor du eine neue auswählst.");
    submitButton.disabled = false;
    return;
  }

  const selectedPair = capsulePlushiePairs[Math.floor(Math.random() * capsulePlushiePairs.length)];
  selectedCapsule = selectedPair.capsule;
  selectedDragon = selectedPair.dragon;

  const userQuestion = document.getElementById('user-question').value.trim();
  const userEmail = document.getElementById('user-email').value.trim();

  if (userQuestion === '') {
    alert("Bitte beantworte die Frage.");
    submitButton.disabled = false;
    return;
  }

  if (userEmail && !/^\S+@\S+\.\S+$/.test(userEmail)) {
    alert("Bitte gib eine gültige E-Mail-Adresse ein.");
    submitButton.disabled = false;
    return;
  }

  const freezeUntil = now + CAPSULE_FREEZE_DURATION * 1000;
  localStorage.setItem("capsuleFreezeUntil", freezeUntil);
  localStorage.setItem("selectedCapsule", JSON.stringify(selectedCapsule));
  localStorage.setItem("selectedDragon", JSON.stringify(selectedDragon));
  localStorage.setItem("capsuleOpened", "false");
  localStorage.setItem("userQuestion", userQuestion); // NEU: Frage speichern
  localStorage.setItem("userEmail", userEmail); // <-- NEU


  showCountdownScreen();
}


function showCapsule() {
  let capsule = document.getElementById('capsule');
  let capsuleContainer = document.getElementById('capsule-container');

  capsule.src = selectedCapsule.src;
  capsule.style.display = 'block';
  capsule.style.objectPosition = '0 0';
  capsule.style.pointerEvents = 'auto';

  capsuleContainer.style.display = 'block';

  // ➕ Diese Elemente ausblenden:
  document.querySelectorAll('.input-group').forEach(group => group.style.display = 'none');
  document.getElementById('submit').style.display = 'none';
  document.getElementById('dice-container').style.display = 'none';
  document.getElementById('teddy-container').style.display = 'none';
  document.querySelector('.vending-machine').style.display = 'none'; // 👈 HIER ergänzt
  document.getElementById('capsule-appear')?.play();
}


function showCountdownScreen() {
  const countdownScreen = document.getElementById("countdown-screen");
  const countdownText = document.getElementById("countdown-text");

  // Alle anderen Elemente verstecken
  document.getElementById('capsule-container').style.display = 'none';
  document.querySelectorAll('.input-group').forEach(group => group.style.display = 'none');
  document.getElementById('submit').style.display = 'none';
  document.getElementById('dice-container').style.display = 'none';
  document.getElementById('teddy-container').style.display = 'none';
  document.querySelector('.vending-machine').style.display = 'none';
  document.getElementById('back-button').style.display = 'none';

  countdownScreen.style.display = 'block';


  const freezeUntil = parseInt(localStorage.getItem("capsuleFreezeUntil"), 10);

 const interval = setInterval(() => {
  const remaining = Math.max(0, freezeUntil - Date.now());

  const msPerDay = 1000 * 60 * 60 * 24;
  const msPerYear = msPerDay * 365;

  const years = Math.floor(remaining / msPerYear);
  const days = Math.floor((remaining % msPerYear) / msPerDay);

  let text = "Deine Kryokapsel ist noch für ";
  if (years > 0) text += `${years} Jahr${years > 1 ? 'e' : ''}`;
  if (years > 0 && days > 0) text += " und ";
  if (days > 0) text += `${days} Tag${days > 1 ? 'e' : ''}`;
  if (years === 0 && days === 0) text += "weniger als einen Tag";

  text += " eingefroren";
  

  countdownText.textContent = text;

// Hinweis einblenden (optional, falls du ihn beim Start versteckst)
document.getElementById('countdown-warning').style.display = 'block';

  if (remaining <= 0) {
    clearInterval(interval);
    localStorage.removeItem("capsuleFreezeUntil");

    countdownScreen.style.display = 'none';

    const email = localStorage.getItem("userEmail") || '';
    if (email) {
      emailjs.send('service_rojceoa', 'template_tqsybkb', {
        to_email: email
      }, '5w_nLDBqiwnNhvAKy').then(() => {
        console.log('Email erfolgreich gesendet!');
      }, (error) => {
        console.error('Email-Fehler:', error);
      });
    }

    showCapsule();
  }
}, 1000);
}
// ----------- Kapsel öffnen und Drache animieren ----------
document.getElementById('capsule').addEventListener('click', function () {
  localStorage.setItem("capsuleOpened", "true"); // Kapsel wurde jetzt geöffnet
  let capsule = document.getElementById('capsule');
  let dragon = document.getElementById('dragon');
  let speechBubble = document.getElementById('speech-bubble');
  let speechTextElement = document.getElementById('speech-text');
  let backButton = document.getElementById('back-button');

  capsule.style.pointerEvents = 'none';

  setTimeout(() => {
    capsule.style.display = 'none';

    dragon.src = selectedDragon.src;
    dragon.style.objectPosition = '0 0';
    dragon.style.display = 'block';

    // Sound beim Erscheinen des Tiers abspielen
    const plushAppearSound = document.getElementById('plush-appear');
    if (plushAppearSound) plushAppearSound.play();
  }, 1200);



  let frame = 0;
  let capsuleAnim = setInterval(() => {
    let offsetX = -frame * selectedCapsule.frameWidth;
    capsule.style.objectPosition = `${offsetX}px 0`;
    frame++;
    if (frame >= selectedCapsule.totalFrames) {
      clearInterval(capsuleAnim);
      setTimeout(() => {
        capsule.style.display = 'none';

        dragon.src = selectedDragon.src;
        dragon.style.objectPosition = '0 0';
        dragon.style.display = 'block';

        animateDragon(selectedDragon.totalFrames, selectedDragon.frameWidth, 200, 11000);

        speechBubble.style.display = 'block';
        const savedQuestion = localStorage.getItem("userQuestion") || "🤖";
        const randomComment = cheekyComments[Math.floor(Math.random() * cheekyComments.length)];
        const fullText = `${randomComment}\n\n"${savedQuestion}"`;

        typeWriterEffect(speechTextElement, fullText, 50);

        screen.innerHTML = `Berechnung abgeschlossen!`;
        backButton.style.display = 'block';
      }, 700);
    }
  }, 300);

  document.getElementById('capsule-open')?.play();
});

function animateDragon(totalFrames, frameWidth, frameDuration, totalTime) {
  let dragon = document.getElementById('dragon');
  let currentFrame = 0;
  let interval = setInterval(() => {
    let offsetX = -currentFrame * frameWidth;
    dragon.style.objectPosition = `${offsetX}px 0`;
    currentFrame = (currentFrame + 1) % totalFrames;
  }, frameDuration);
  setTimeout(() => {
    clearInterval(interval);
    dragon.style.objectPosition = '0 0';
  }, totalTime);
}

document.getElementById('back-button').addEventListener('click', function () {
  const clickSound = document.getElementById('click-sound');
  if (clickSound) clickSound.play();

  // Deaktiviert den Back-Button, um mehrfaches Klicken zu verhindern
  this.disabled = true;

  const speechBubble = document.getElementById('speech-bubble');
  const speechText = document.getElementById('speech-text');
  const capsule = document.getElementById('capsule');
  const dragon = document.getElementById('dragon');
  const result = document.getElementById('result');
  const plushyTalk = document.getElementById('plushy-talk');

  if (plushyTalk) {
    plushyTalk.pause();
    plushyTalk.currentTime = 0;
  }

  // Kapsel & Co. ausblenden
  capsule.style.display = 'none';
  capsule.style.pointerEvents = 'none';
  dragon.style.display = 'none';
  speechBubble.style.display = 'none';
  isTyping = false;
  speechText.textContent = '';
  result.innerHTML = '';
  submitButton.classList.remove('clicked');

  // Interface-Elemente zurücksetzen
  document.querySelectorAll('.input-group').forEach(group => {
    group.style.display = '';
  });

  submitButton.style.display = '';
  document.getElementById('capsule-container').style.display = 'none';
  document.getElementById('dice-container').style.display = '';
  document.getElementById('teddy-container').style.display = '';
  document.querySelector('.vending-machine').style.display = '';

  localStorage.removeItem("userQuestion");


  this.style.display = 'none';

  // Position & Layout durch CSS regeln lassen

  // Aufräumen
  document.querySelectorAll('.star').forEach(star => star.remove());


  // Nach der Verzögerung den Back-Button und den Submit-Button wieder aktivieren
  setTimeout(() => {
    this.disabled = false;
    submitButton.disabled = false; // Hier den Submit-Button wieder aktivieren
  }, 600); // Verzögerung von 600 ms
});

// ------------ Sterneffekte + Typewriter -----------------
function typeWriterEffect(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';
  let typingSound = document.getElementById('plushy-talk');
  isTyping = true;

  function loopSound() {
    if (typingSound) {
      typingSound.currentTime = 0;
      typingSound.play();
    }
  }

  function type() {
    if (!isTyping) {
      if (typingSound) {
        typingSound.pause();
        typingSound.currentTime = 0;
      }
      return;
    }

    if (i < text.length) {
      element.textContent += text.charAt(i);
      loopSound();
      i++;
      setTimeout(type, speed);
    } else {
      if (typingSound) {
        typingSound.pause();
        typingSound.currentTime = 0;
      }
      isTyping = false;
    }
  }

  type();
}



function showStars(x, y) {
  for (let i = 0; i < 0; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    const sideOffset = Math.random() < 0.5 ? -40 : 40;
    const verticalJitter = (Math.random() - 0.5) * 20;
    star.style.left = `${x + sideOffset}px`;
    star.style.top = `${y + verticalJitter}px`;
    const angle = Math.random() * 60 - 30;
    const distance = 60 + Math.random() * 40;
    const dx = Math.cos(angle * (Math.PI / 180)) * distance;
    const dy = Math.sin(angle * (Math.PI / 180)) * distance;
    star.style.setProperty('--x', `${dx}px`);
    star.style.setProperty('--y', `${dy}px`);
    document.body.appendChild(star);
    setTimeout(() => {
      star.remove();
    }, 800);
  }
}

function createStars(button) {
  const buttonRect = button.getBoundingClientRect();
  const corners = [
    { x: buttonRect.left, y: buttonRect.top },
    { x: buttonRect.right - 10, y: buttonRect.top }
  ];
  corners.forEach(corner => {
    for (let i = 0; i < 4; i++) {
      const star = document.createElement("div");
      star.classList.add("star");
      star.style.position = "fixed";
      star.style.left = `${corner.x}px`;
      star.style.top = `${corner.y}px`;
      star.style.transform = "translate(-50%, -50%)";
      const angle = (Math.random() * Math.PI) - Math.PI / 2;
      const distance = 60 + Math.random() * 50;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      star.style.setProperty("--x", `${dx}px`);
      star.style.setProperty("--y", `${dy}px`);
      document.body.appendChild(star);
      setTimeout(() => {
        star.remove();
      }, 800);
    }
  });
}
function showForm() {
  document.getElementById('capsule-container').style.display = 'none';
  document.getElementById('countdown-screen').style.display = 'none';
  document.querySelectorAll('.input-group').forEach(group => group.style.display = '');
  document.getElementById('submit').style.display = '';
  document.getElementById('dice-container').style.display = '';
  document.getElementById('teddy-container').style.display = '';
  document.querySelector('.vending-machine').style.display = '';
  document.getElementById('back-button').style.display = 'none';
}


// Startet Audio beim ersten Klick
window.addEventListener('click', function () {
  const bgAudio = document.getElementById('bg-audio');
  const idleAudio = document.getElementById('Idlemusic');

  if (bgAudio.paused) {
    bgAudio.volume = 0.02; // Leiser machen (0.0 bis 1.0)
    bgAudio.play();
  }

  if (idleAudio.paused) {
    idleAudio.volume = 0.01;
    idleAudio.play();
  }
}, { once: true });


window.addEventListener('DOMContentLoaded', () => {
  const freezeUntil = parseInt(localStorage.getItem("capsuleFreezeUntil"), 10);
  const storedCapsule = localStorage.getItem("selectedCapsule");
  const storedDragon = localStorage.getItem("selectedDragon");
  const capsuleOpened = localStorage.getItem("capsuleOpened");
  const now = Date.now();

  if (storedCapsule && storedDragon) {
    selectedCapsule = JSON.parse(storedCapsule);
    selectedDragon = JSON.parse(storedDragon);

    if (freezeUntil && now < freezeUntil) {
      // Timer läuft noch → Countdown zeigen
      showCountdownScreen();
    } else if (capsuleOpened === "true") {
      // Kapsel wurde geöffnet → Formular zurückzeigen
      showForm();
    } else {
      // Kapsel wurde NICHT geöffnet → Kapsel zeigen, nicht zurücksetzen!
      showCapsule();
    }
  } else {
    // Kein Zustand gespeichert → Formular anzeigen
    showForm();
  }
});