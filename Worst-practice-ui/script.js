const stages = [
  {
    title: "",
    content: `
      <div class="stage stage-1">
        <div class="shop-top-section">
          <div class="shop-branding">
            <div class="shop-subtitle">WorstBuy</div>
            <div class="shop-task">Bestelle dir den Gamersdream 5000</div>
          </div>
          <div class="shop-search">
            <input type="text" id="search-field" placeholder="Suchen...">
            <button id="search-btn">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.5"/>
                <path d="M11 11L14.5 14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div class="shop-container">
          <div class="filters">
            <h4>Filter</h4>
            <label><input type="checkbox" class="filter" data-filter="cheap"> Günstig (&lt; 300€)</label><br>
            <label><input type="checkbox" class="filter" data-filter="expensive"> Premium (&gt; 5000€)</label><br>
            <label><input type="checkbox" class="filter" data-filter="medium"> Mittelklasse (500-2000€)</label><br>
            <label><input type="checkbox" class="filter" data-filter="gaming"> Für Gaming</label><br>
            <label><input type="checkbox" class="filter" data-filter="office"> Für Büro</label><br>
            <label><input type="checkbox" class="filter" data-filter="notgaming"> Kein Gaming</label><br>
            <label><input type="checkbox" class="filter" data-filter="notoffice"> Kein Büro</label><br>
            <label><input type="checkbox" class="filter" data-filter="red"> Rote Farbe</label><br>
            <label><input type="checkbox" class="filter" data-filter="black"> Schwarze Farbe</label><br>
            <label><input type="checkbox" class="filter" data-filter="notred"> Nicht Rot</label><br>
            <label><input type="checkbox" class="filter" data-filter="notblack"> Nicht Schwarz</label><br>
            <label><input type="checkbox" class="filter" data-filter="soldout"> Nur Ausverkauft</label><br>
            <label><input type="checkbox" class="filter" data-filter="available"> Nur Verfügbar</label><br>
            <label><input type="checkbox" class="filter" data-filter="popular"> Beliebt</label><br>
            <label><input type="checkbox" class="filter" data-filter="new"> Neu</label><br>
            <label><input type="checkbox" class="filter" data-filter="old"> Klassiker</label><br>
            <label><input type="checkbox" class="filter" data-filter="fast"> Schnelle Lieferung</label><br>
            <label><input type="checkbox" class="filter" data-filter="slow"> Langsame Lieferung</label><br>
            <label><input type="checkbox" class="filter" data-filter="eco"> Umweltfreundlich</label><br>
            <label><input type="checkbox" class="filter" data-filter="performance"> Hohe Leistung</label><br>
            <label><input type="checkbox" class="filter" data-filter="lowperformance"> Niedrige Leistung</label><br>
            <label><input type="checkbox" class="filter" data-filter="warranty"> Mit Garantie</label><br>
            <label><input type="checkbox" class="filter" data-filter="nowarranty"> Ohne Garantie</label><br>
            <label><input type="checkbox" class="filter" data-filter="refurbished"> Generalüberholt</label><br>
            <label><input type="checkbox" class="filter" data-filter="brand-new"> Fabrikneu</label><br>
          </div>

          <div class="shop-main">
            <div class="category-nav">
              <button class="category-btn">Computer</button>
              <button class="category-btn">Gamerzeug</button>
              <button class="category-btn">Notebooks</button>
              <button class="category-btn">Laptopzubehör</button>
              <button class="category-btn">Performance-Dinge</button>
            </div>

            <div class="product-grid" id="product-grid">
              <!-- Produkte werden dynamisch geladen -->
            </div>
          </div>
        </div>
      </div>
    `,
    validate: () => {
      return checkoutCompleted ? "" : "Du musst erst den Laptop erfolgreich bestellen!";
    }
  },

  {
    title: "",
    content: `
      <div class="stage stage-2">
        <div class="shitstagram-header">
          <div class="shitstagram-branding">
            <div class="shitstagram-subtitle">Shitstagram</div>
            <div class="shitstagram-task">Like und sende den neusten Post von "Trafish cod" an deinen Freund Dieter</div>
          </div>
          <div class="shitstagram-top-actions">
            <button class="shitstagram-icon-btn" id="shitstagram-search-btn">
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.5"/>
                <path d="M11 11L14.5 14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div class="shitstagram-feed" id="shitstagram-feed">
          <!-- Feed wird dynamisch geladen -->
        </div>
      </div>
    `,
    validate: () => {
      // Prüfe ob Post an Dieter gesendet wurde UND geliked wurde
      if (!window.shitStagramShared) {
        return "Du musst den neusten Post von 'Trafish cod' an Dieter senden!";
      }
      if (!likedPosts.has(1)) {
        return "Du musst den neusten Post von 'Trafish cod' auch liken!";
      }
      return "";
    }
  }
];

// --- Produktdaten mit festen Bildern ---
// Um eigene Bilder hinzuzufügen: Lege die Bilddatei in den "img/" Ordner und trage den Dateinamen hier ein
// Beispiel: img: "img/mein-produkt.jpg" oder img: "img/mein-produkt.png"
const products = [
  { id: 1, name: "OfficeBook 100", price: 250, category: "office", color: "black", soldout: false, img: "img/PC1.png", tags: ["Teuer"] },
  { id: 2, name: "StudentPro Basic", price: 499, category: "office", color: "red", soldout: false, img: "img/PC2.png", tags: ["Unbeliebt"] },
  { id: 3, name: "Gamersdream 4000 Pro", price: 5899, category: "gaming", color: "black", soldout: false, img: "img/PC3.png", tags: ["Langsam"] },
  { id: 4, name: "CasualBook Mini", price: 199, category: "office", color: "black", soldout: true, img: "img/PC4.png", tags: ["Groß"] },
  { id: 5, name: "OverheatPro RGB", price: 5999, category: "gaming", color: "red", soldout: false, img: "img/PC5.png", tags: ["Heiß"] },
  { id: 6, name: "LagMachine 200", price: 699, category: "gaming", color: "black", soldout: false, img: "img/PC6.png", tags: ["Vintage"] },
  { id: 7, name: "OfficeBook Deluxe", price: 799, category: "office", color: "black", soldout: true, img: "img/PC7.png", tags: ["Fast Neu"] },
  { id: 8, name: "Super Mega Laptop 9000", price: 8999, category: "gaming", color: "red", soldout: false, img: "img/PC8.png", tags: ["Mittel"] },
  { id: 9, name: "BudgetBook Eco", price: 179, category: "office", color: "black", soldout: false, img: "img/PC9.png", tags: ["Luxus"] },
  { id: 10, name: "Gamersdream 3500 Gaming", price: 5799, category: "gaming", color: "red", soldout: false, img: "img/PC10.png", tags: ["Günstig"] },
  { id: 11, name: "WorkStation Pro", price: 1299, category: "office", color: "black", soldout: false, img: "img/PC1.png", tags: ["Alt"] },
  { id: 12, name: "UltraGamer X1", price: 6499, category: "gaming", color: "red", soldout: false, img: "img/PC2.png", tags: ["Schlecht"] },
  { id: 13, name: "SlimBook Air", price: 899, category: "office", color: "black", soldout: false, img: "img/PC3.png", tags: ["Dick"] },
  { id: 14, name: "PowerGaming Elite", price: 7299, category: "gaming", color: "black", soldout: false, img: "img/PC4.png", tags: ["Langsam"] },
  { id: 15, name: "BasicOffice 50", price: 159, category: "office", color: "black", soldout: true, img: "img/PC5.png", tags: ["Premium"] },
  { id: 16, name: "Gamerdream 5000 Pro", price: 5949, category: "gaming", color: "black", soldout: false, img: "img/PC6.png", tags: ["Kalt"] },
  { id: 17, name: "TurboLaptop MAX", price: 5499, category: "gaming", color: "red", soldout: false, img: "img/PC7.png", tags: ["Träge"] },
  { id: 18, name: "CompactBook Mini Plus", price: 349, category: "office", color: "black", soldout: false, img: "img/PC8.png", tags: ["Riesig"] },
  { id: 19, name: "RageGamer 3000", price: 4999, category: "gaming", color: "red", soldout: false, img: "img/PC9.png", tags: ["Entspannt"] },
  { id: 20, name: "Gamerstream 5000 Ultra", price: 5999, category: "gaming", color: "red", soldout: false, img: "img/PC10.png", tags: ["Basic"] },
  { id: 21, name: "BusinessBook Premium", price: 1499, category: "office", color: "black", soldout: false, img: "img/PC1.png", tags: ["Billig"] },
  { id: 22, name: "HyperSpeed Gaming", price: 6799, category: "gaming", color: "black", soldout: false, img: "img/PC2.png", tags: ["Gemütlich"] },
  { id: 23, name: "Gamersdream 5000 Elite", price: 5999, category: "gaming", color: "red", soldout: false, img: "img/PC3.png", tags: ["Normal"] },
  { id: 24, name: "EcoBook Green", price: 299, category: "office", color: "black", soldout: false, img: "img/PC4.png", tags: ["Stromfresser"] },
  { id: 25, name: "NitroGaming Beast", price: 8499, category: "gaming", color: "red", soldout: false, img: "img/PC5.png", tags: ["Zahm"] },
  { id: 26, name: "StudentBook Lite", price: 279, category: "office", color: "black", soldout: false, img: "img/PC6.png", tags: ["Schwer"] },
  { id: 27, name: "Gamersdream 5000", price: 5999, category: "gaming", color: "black", soldout: false, img: "img/PC7.png", tags: ["Besonders"] },
  { id: 28, name: "Gamersdream 5500 Turbo", price: 6099, category: "gaming", color: "black", soldout: false, img: "img/PC8.png", tags: ["Retro"] },
  { id: 29, name: "ProGamer Ultimate", price: 9999, category: "gaming", color: "black", soldout: false, img: "img/PC9.png", tags: ["Schnäppchen"] },
  { id: 30, name: "OfficeElite 300", price: 699, category: "office", color: "black", soldout: true, img: "img/PC10.png", tags: ["Neu"] },
  { id: 31, name: "MegaGaming Titan", price: 7999, category: "gaming", color: "red", soldout: false, img: "img/PC1.png", tags: ["Mini"] },
  { id: 32, name: "SmartBook S1", price: 449, category: "office", color: "black", soldout: false, img: "img/PC2.png", tags: ["Dumm"] },
  { id: 33, name: "ExtremeGamer Pro", price: 5799, category: "gaming", color: "black", soldout: false, img: "img/PC3.png", tags: ["Moderat"] },
  { id: 34, name: "Gamersdream 6000 Ultra", price: 6199, category: "gaming", color: "black", soldout: false, img: "img/PC4.png", tags: ["Durchschnitt"] },
  { id: 35, name: "Gamerzdream 5000 Plus", price: 5999, category: "gaming", color: "red", soldout: false, img: "img/PC5.png", tags: ["Minus"] },
  { id: 36, name: "ValueBook 200", price: 229, category: "office", color: "black", soldout: false, img: "img/PC6.png", tags: ["Luxus"] }
];

let checkoutCompleted = false;

// Preload checkout sounds (swapped behavior by design)
// Play `right.wav` when the PASSWORD IS WRONG, and `wrong.wav` when the PASSWORD IS CORRECT
const audioRight = new Audio('sounds/right.wav');
audioRight.preload = 'auto';
audioRight.volume = 0.6; // reduce volume by ~20%
const audioWrong = new Audio('sounds/wrong.wav');
audioWrong.preload = 'auto';
audioWrong.volume = 0.6; // reduce volume by ~20%
// Success sound for stage completion overlays
const successAudio = new Audio('sounds/success.wav');
successAudio.preload = 'auto';
successAudio.volume = 0.6; // reduce volume by ~20%

// --- Startscreen Logik ---
const readyBtn = document.getElementById("ready-btn");
const clickWord = document.getElementById("click-word");

let ready = false;
clickWord.classList.add("active-link");
readyBtn.textContent = "Nicht bereit";
readyBtn.classList.add("ready"); // Startet mit "ready" Farbe obwohl nicht bereit

readyBtn.onclick = () => {
  ready = !ready;
  if (ready) {
    readyBtn.textContent = "Nicht bereit"; // Zeigt immer "Nicht bereit"
    readyBtn.classList.add("notready"); // Wechselt zu "notready" Farbe wenn bereit
    readyBtn.classList.remove("ready");
    clickWord.classList.remove("active-link");
  } else {
    readyBtn.textContent = "Nicht bereit"; // Zeigt immer "Nicht bereit"
    readyBtn.classList.remove("notready");
    readyBtn.classList.add("ready"); // Wechselt zu "ready" Farbe wenn nicht bereit
    clickWord.classList.add("active-link");
  }
};

clickWord.onclick = () => {
  if (ready) {
    showScreen("stages");
    startStage(0);
  }
};

// --- Spiel Logik ---
let currentStage = 0;
let totalScore = 0;
let totalTime = 0;
let startTime = 0;
let timerInterval = null;
let stage2PauseInterval = null;
let stage2NotificationInterval = null;
let isPausePopupActive = false;

function showScreen(id) {
  ["start-screen", "stages", "end-screen", "checkout-screen"].forEach(s => {
    const el = document.getElementById(s);
    if (el) el.style.display = "none";
  });
  const screen = document.getElementById(id);
  if (screen) screen.style.display = "flex";
  
  // Zeige Timer und Indikator ab Stage 1, verstecke sie im Start-Screen und End-Screen
  const timer = document.querySelector(".bottom-ui");
  const indicator = document.querySelector(".stage-indicator");
  
  if (id === "start-screen" || id === "end-screen") {
    if (timer) timer.style.display = "none";
    if (indicator) indicator.style.display = "none";
  } else if (id === "stages" || id === "checkout-screen") {
    if (timer) timer.style.display = "flex";
    if (indicator) indicator.style.display = "flex";
  }
}

function startStage(idx) {
  currentStage = idx;
  const st = stages[idx];
  const stagesScreen = document.getElementById("stages");
  stagesScreen.setAttribute("data-stage", idx);
  
  // Aktualisiere Stage-Anzeige als Prozessverlauf mit Punkten
  const stageIndicator = document.getElementById("stage-indicator");
  if (stageIndicator) {
    // Erstelle Dots nur einmal, wenn noch nicht vorhanden
    if (stageIndicator.children.length === 0) {
      for (let i = 0; i < stages.length; i++) {
        const dot = document.createElement('div');
        dot.className = 'stage-dot';
        dot.dataset.index = i;
        stageIndicator.appendChild(dot);
      }
    }
    
    // Update die Klassen basierend auf der aktuellen Stage
    const dots = stageIndicator.querySelectorAll('.stage-dot');
    dots.forEach((dot, i) => {
      dot.classList.remove('completed', 'active', 'switching');
      if (i < idx) {
        dot.classList.add('completed');
      } else if (i === idx) {
        dot.classList.add('switching');
      }
    });
  }
  
  document.getElementById("stage-title").textContent = "";
  document.getElementById("stage-content").innerHTML = st.content;
  document.getElementById("timer").textContent = "0.00s";

  // Timer für diese Stage neu starten
  startTime = Date.now();
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    const elapsed = (Date.now() - startTime) / 1000;
    const timerEl = document.getElementById("timer");
    
    // Timer wird nur intensiver lila über Zeit, kein Hintergrund-Wechsel
    const intensity = Math.min(elapsed / 120, 1);
    const baseOpacity = 0.15;
    const maxOpacity = 0.5;
    const timerOpacity = baseOpacity + (maxOpacity - baseOpacity) * intensity;
    timerEl.style.background = `rgba(178, 12, 233, ${timerOpacity})`;
    
    const baseShadow = 25;
    const maxShadow = 50;
    const shadowIntensity = baseShadow + (maxShadow - baseShadow) * intensity;
    const shadowOpacity = 0.4 + 0.5 * intensity;
    timerEl.style.boxShadow = `0 0 ${shadowIntensity}px rgba(178, 12, 233, ${shadowOpacity})`;
    
    // Wenn über 60 Sekunden: Zeige Minuten:Sekunden Format
    if (elapsed >= 60) {
      const minutes = Math.floor(elapsed / 60);
      const seconds = Math.floor(elapsed % 60);
      timerEl.innerHTML = `${minutes}:${seconds.toString().padStart(2, '0')}<span class="timer-unit">m</span>`;
      timerEl.classList.add("timer-overtime");
    } else {
      timerEl.innerHTML = `${elapsed.toFixed(2)}<span class="timer-unit">s</span>`;
      timerEl.classList.remove("timer-overtime");
    }
  }, 20);

  // Stage-spezifische Initialisierung
  if (idx === 0) {
    initWorstShop();
    startRandomPopups();
    startSearchPopup();
  } else if (idx === 1) {
    // Stage 2: Shitstagram Setup
    initShitstagram();
  }
}

// --- WORSTBUY SHOP LOGIK ---
function initWorstShop() {
  const grid = document.getElementById("product-grid");
  const searchField = document.getElementById("search-field");
  const searchBtn = document.getElementById("search-btn");
  const filters = document.querySelectorAll(".filter");
  const categoryBtns = document.querySelectorAll(".category-btn");

  // Worst Practice: Placeholder muss manuell gelöscht werden
  searchField.value = "Suchbegriff eingeben...";
  searchField.addEventListener("focus", function() {
    if (this.value === "Suchbegriff eingeben...") {
      this.select();
    }
  });

  // Worst Practice: Autokorrektur ersetzt "gamersdream" mit zufälligen falschen Begriffen
  const autocorrectWords = [
    "gamerscream", "gamerssteam", "hamstertraum", "gamerstraum", 
    "gamerdream", "gamestream", "cameradream", "gamerstream"
  ];
  
  searchField.addEventListener("input", function() {
    const value = this.value.toLowerCase();
    if (value.includes("gamersdream")) {
      const randomWord = autocorrectWords[Math.floor(Math.random() * autocorrectWords.length)];
      this.value = randomWord;
      // Cursor ans Ende setzen
      setTimeout(() => {
        this.setSelectionRange(this.value.length, this.value.length);
      }, 0);
    }
    
    // Wenn Suchfeld leer ist, alle Produkte wieder anzeigen
    if (this.value.trim() === "" || this.value === "Suchbegriff eingeben...") {
      renderProducts();
    }
  });

  // Worst Practice: Kategorie-Buttons zeigen "nicht verfügbar" Popup
  categoryBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const categoryName = btn.textContent.trim();
      showErrorPopup(`Product Category "${categoryName}" is currently unavailable.`);
    });
  });

  function renderProducts(filterFn = () => true) {
    grid.innerHTML = "";
    products.filter(filterFn).forEach(p => {
      const div = document.createElement("div");
      div.className = "product-card";
      if (p.name.includes("Gamersdream")) div.classList.add("highlight-product");

      const tagsHTML = p.tags ? p.tags.map(tag => `<span class="product-tag">${tag}</span>`).join('') : '';

      div.innerHTML = `
        <div class="product-image-wrapper">
          <img src="${p.img}" alt="${p.name}">
          <div class="product-tags">${tagsHTML}</div>
        </div>
        <div class="product-card-content">
          <p>${p.name}</p>
          <div class="price-row">
            <p class="price">${p.price}€</p>
            ${p.soldout ? "<small class='soldout'>Ausverkauft</small>" : ""}
          </div>
        </div>
        <div class="product-card-actions">
          <button class="buy-btn"><span>Konfigurieren</span></button>
        </div>
      `;

      const buyBtnSpan = div.querySelector(".buy-btn span");
      buyBtnSpan.onclick = (e) => {
        e.stopPropagation();
        if (p.name === "Gamersdream 5000") {
          showProductConfig(p);
        } else {
          showErrorPopup("Fehlercode 0x80070002");
        }
      };

      grid.appendChild(div);
    });
  }

  renderProducts();

  filters.forEach(cb => {
    cb.addEventListener("change", () => {
      const active = Array.from(filters).filter(f => f.checked).map(f => f.dataset.filter);
      renderProducts(p => {
        // Worst Practice: Viele widersprüchliche Filter die sich gegenseitig ausschließen
        let passes = true;
        
        // Preisfilter
        if (active.includes("cheap") && p.price >= 300) passes = false;
        if (active.includes("expensive") && p.price <= 5000) passes = false;
        if (active.includes("medium") && (p.price < 500 || p.price > 2000)) passes = false;
        
        // Kategorie-Filter (widersprüchlich!)
        if (active.includes("gaming") && p.category !== "gaming") passes = false;
        if (active.includes("office") && p.category !== "office") passes = false;
        if (active.includes("notgaming") && p.category === "gaming") passes = false;
        if (active.includes("notoffice") && p.category === "office") passes = false;
        
        // Farb-Filter (widersprüchlich!)
        if (active.includes("red") && p.color !== "red") passes = false;
        if (active.includes("black") && p.color !== "black") passes = false;
        if (active.includes("notred") && p.color === "red") passes = false;
        if (active.includes("notblack") && p.color === "black") passes = false;
        
        // Verfügbarkeits-Filter (widersprüchlich!)
        if (active.includes("soldout") && !p.soldout) passes = false;
        if (active.includes("available") && p.soldout) passes = false;
        
        // Sinnlose Filter die nichts tun aber Zeit verschwenden
        if (active.includes("popular")) passes = passes && Math.random() > 0.1;
        if (active.includes("new")) passes = passes && p.id > 15;
        if (active.includes("old")) passes = passes && p.id <= 15;
        if (active.includes("fast")) passes = passes && p.price > 1000;
        if (active.includes("slow")) passes = passes && p.price < 1000;
        if (active.includes("eco")) passes = passes && p.name.toLowerCase().includes("eco");
        if (active.includes("performance")) passes = passes && p.category === "gaming";
        if (active.includes("lowperformance")) passes = passes && p.category === "office";
        if (active.includes("warranty")) passes = passes && !p.soldout;
        if (active.includes("nowarranty")) passes = passes && p.soldout;
        if (active.includes("refurbished")) passes = passes && p.soldout;
        if (active.includes("brand-new")) passes = passes && !p.soldout;
        
        return passes;
      });
    });
  });

  searchBtn.onclick = () => {
    const term = searchField.value.trim().toLowerCase();
    if (!term || term === "suchbegriff eingeben...") {
      showErrorPopup("Bitte gib etwas ein (oder auch nicht).");
      return;
    }
    
    // Worst Practice: Suche nach "gamersdream" zeigt alles AUSSER gamersdream
    if (term.includes("gamersdream") || term.includes("gamer") || term.includes("dream")) {
      renderProducts(p => !p.name.toLowerCase().includes("gamersdream") || p.name === "Gamersdream 5000");
      showErrorPopup("Leider keine Ergebnisse für deine Suche gefunden. Probiere andere Filter!");
      return;
    }
    
    if (Math.random() > 0.4) {
      // Normale Suche - aber Gamersdream 5000 bleibt immer sichtbar
      renderProducts(p => p.name.toLowerCase().includes(term) || p.name === "Gamersdream 5000");
    } else {
      // Zufällige Ergebnisse - aber Gamersdream 5000 bleibt immer sichtbar
      renderProducts(p => Math.random() > 0.5 || p.name === "Gamersdream 5000");
      showErrorPopup("Deine Suche lieferte unklare Ergebnisse.");
    }
  };
}

// --- PRODUKTKONFIGURATION (Worst Practice UX) ---
function showProductConfig(product) {
  const configPopup = document.createElement("div");
  configPopup.className = "error-popup";
  configPopup.id = "product-config-popup";
  configPopup.innerHTML = `
    <div class="config-popup-content">
      <button class="config-close-btn" id="config-close-btn">×</button>
      <h3 style="color: #B20CE9; margin-bottom: 10px; font-size: 1.5em;">${product.name} - Konfiguration</h3>
      <p style="color: #3a3a3a; font-size: 0.7em; margin-bottom: 25px; opacity: 0.4; font-style: italic;">Nutze die Zahltasten 1, 2, 3, 4, um zu konfigurieren</p>
      
      <div class="config-section">
        <label class="config-label">Prozessor auswählen:</label>
        <div class="config-options">
          <button class="config-option-btn" data-option="cpu" data-value="i3">Intel i3 (langsam)</button>
          <button class="config-option-btn" data-option="cpu" data-value="i5">Intel i5 (okay)</button>
          <button class="config-option-btn" data-option="cpu" data-value="i7">Intel i7 (gut)</button>
          <button class="config-option-btn" data-option="cpu" data-value="i9">Intel i9 (teuer)</button>
        </div>
      </div>
      
      <div class="config-section">
        <label class="config-label">RAM Speicher wählen:</label>
        <div class="config-options">
          <button class="config-option-btn" data-option="ram" data-value="8">8 GB (zu wenig)</button>
          <button class="config-option-btn" data-option="ram" data-value="16">16 GB (Standard)</button>
          <button class="config-option-btn" data-option="ram" data-value="32">32 GB (Übertrieben)</button>
          <button class="config-option-btn" data-option="ram" data-value="64">64 GB (Wahnsinn)</button>
        </div>
      </div>
      
      <div class="config-section">
        <label class="config-label">Festplattengröße:</label>
        <div class="config-options">
          <button class="config-option-btn" data-option="storage" data-value="256">256 GB SSD (knapp)</button>
          <button class="config-option-btn" data-option="storage" data-value="512">512 GB SSD (reicht)</button>
          <button class="config-option-btn" data-option="storage" data-value="1024">1 TB SSD (viel)</button>
          <button class="config-option-btn" data-option="storage" data-value="2048">2 TB SSD (extrem)</button>
        </div>
      </div>
      
      <div class="config-section">
        <label class="config-label">Grafikkarte aussuchen:</label>
        <div class="config-options">
          <button class="config-option-btn" data-option="gpu" data-value="integrated">Integriert (schwach)</button>
          <button class="config-option-btn" data-option="gpu" data-value="gtx1650">GTX 1650 (alt)</button>
          <button class="config-option-btn" data-option="gpu" data-value="rtx3060">RTX 3060 (mittel)</button>
          <button class="config-option-btn" data-option="gpu" data-value="rtx4090">RTX 4090 (Monster)</button>
        </div>
      </div>
      
      <div class="config-section">
        <label class="config-label">Betriebssystem festlegen:</label>
        <div class="config-options">
          <button class="config-option-btn" data-option="os" data-value="none">Ohne OS (selbst machen)</button>
          <button class="config-option-btn" data-option="os" data-value="win10">Windows 10 (veraltet)</button>
          <button class="config-option-btn" data-option="os" data-value="win11">Windows 11 (aktuell)</button>
          <button class="config-option-btn" data-option="os" data-value="linux">Linux (für Nerds)</button>
        </div>
      </div>
      
      <div class="config-summary" id="config-summary" style="display: none;">
        <p style="color: #888; font-size: 0.9em; margin: 20px 0;">Ausgewählt: <span id="config-selected">Nichts</span></p>
      </div>
      
      <button class="config-confirm-btn" id="config-confirm-btn" disabled>Zur Kasse gehen</button>
    </div>
  `;
  
  document.body.appendChild(configPopup);
  
  // Stop annoying popups during configuration
  stopRandomPopups();
  stopSearchPopup();
  
  const selectedConfig = {
    cpu: null,
    ram: null,
    storage: null,
    gpu: null,
    os: null
  };
  
  // Close Button (rund, oben rechts fixiert) - use querySelector on popup
  const closeBtn = configPopup.querySelector("#config-close-btn");
  if (closeBtn) {
    closeBtn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      configPopup.remove();
      // Restart popups after closing config
      startRandomPopups();
      startSearchPopup();
    };
  }
  
  // Worst Practice: Nur ein Button pro Kategorie kann angeklickt werden, andere verschwinden
  const optionBtns = configPopup.querySelectorAll('.config-option-btn');
  
  // Disable mouse clicks on option buttons
  optionBtns.forEach(btn => {
    btn.style.cursor = 'not-allowed';
    btn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };
  });
  
  // Function to select an option
  function selectOption(btn) {
    const option = btn.dataset.option;
    const value = btn.dataset.value;
    
    // Speichere Auswahl
    selectedConfig[option] = value;
    
    // Worst Practice: Alle anderen Buttons dieser Kategorie ausblenden
    configPopup.querySelectorAll(`[data-option="${option}"]`).forEach(b => {
      if (b !== btn) {
        b.style.display = 'none';
      } else if (b === btn) {
        b.classList.add('selected');
        b.disabled = true;
        b.style.cursor = 'not-allowed';
      }
    });
    
    // Prüfe ob alle Optionen ausgewählt
    const allSelected = Object.values(selectedConfig).every(v => v !== null);
    
    if (allSelected) {
      const confirmBtn = configPopup.querySelector('#config-confirm-btn');
      if (confirmBtn) {
        confirmBtn.disabled = false;
      }
      const summary = configPopup.querySelector('#config-summary');
      if (summary) {
        summary.style.display = 'block';
      }
      const selected = configPopup.querySelector('#config-selected');
      if (selected) {
        selected.textContent = 
          `CPU: ${selectedConfig.cpu}, RAM: ${selectedConfig.ram}GB, Speicher: ${selectedConfig.storage}GB, GPU: ${selectedConfig.gpu}, OS: ${selectedConfig.os}`;
      }
    }
  }
  
  // Keyboard controls - only 1, 2, 3, 4 keys work
  function handleConfigKeypress(e) {
    const key = e.key;
    
    // Only accept keys 1-4
    if (!['1', '2', '3', '4'].includes(key)) return;
    
    // Find all visible sections
    const sections = configPopup.querySelectorAll('.config-section');
    let currentSection = null;
    
    // Find first section with visible buttons
    for (const section of sections) {
      const visibleBtns = Array.from(section.querySelectorAll('.config-option-btn')).filter(
        btn => btn.style.display !== 'none' && !btn.disabled
      );
      if (visibleBtns.length > 0) {
        currentSection = section;
        break;
      }
    }
    
    if (!currentSection) return;
    
    // Get visible buttons in current section
    const visibleBtns = Array.from(currentSection.querySelectorAll('.config-option-btn')).filter(
      btn => btn.style.display !== 'none' && !btn.disabled
    );
    
    const index = parseInt(key) - 1;
    if (index >= 0 && index < visibleBtns.length) {
      selectOption(visibleBtns[index]);
    }
  }
  
  // Add keyboard event listener
  document.addEventListener('keydown', handleConfigKeypress);
  
  // Store original close function to remove event listener
  const originalClose = closeBtn.onclick;
  closeBtn.onclick = (e) => {
    document.removeEventListener('keydown', handleConfigKeypress);
    originalClose(e);
  };
  
  // Bestätigen-Button - use querySelector on popup
  const confirmBtn = configPopup.querySelector('#config-confirm-btn');
  if (confirmBtn) {
    let chargeTimeout = null;
    let isCharged = false;
    
    confirmBtn.addEventListener('mouseenter', () => {
      if (confirmBtn.disabled) return;
      
      confirmBtn.classList.add('charging');
      chargeTimeout = setTimeout(() => {
        isCharged = true;
        confirmBtn.classList.remove('charging');
        confirmBtn.classList.add('charged');
        confirmBtn.style.cursor = 'pointer';
      }, 5000);
    });
    
    confirmBtn.addEventListener('mouseleave', () => {
      if (confirmBtn.disabled) return;
      
      clearTimeout(chargeTimeout);
      isCharged = false;
      confirmBtn.classList.remove('charging', 'charged');
      confirmBtn.style.cursor = 'not-allowed';
      confirmBtn.style.backgroundPosition = '100% 0';
    });
    
    confirmBtn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (!isCharged) return;
      
      // All items available, proceed to checkout
      configPopup.remove();
      // Keep popups stopped during checkout
      stopRandomPopups();
      stopSearchPopup();
      showScreen("checkout-screen");
      setupCheckout();
    };
  }
}

// --- ERROR POPUP LOGIK (Worst Practice: wanderndes X, langsames Schließen) ---
let popupCloseInterval = null;
function showErrorPopup(message, onClose) {
  // Entferne altes Popup falls vorhanden
  const existing = document.getElementById("error-popup");
  if (existing) existing.remove();
  
  const popup = document.createElement("div");
  popup.id = "error-popup";
  popup.className = "error-popup";
  popup.innerHTML = `
    <div class="error-popup-content">
      <button class="error-popup-close top-left" id="popup-close-btn">×</button>
      <p>${message}</p>
    </div>
  `;
  
  document.body.appendChild(popup);
  
  // X-Button wandert jede Sekunde in eine andere Ecke
  const closeBtn = document.getElementById("popup-close-btn");
  const corners = ["top-left", "top-right", "bottom-right", "bottom-left"];
  let cornerIndex = 0;
  
  popupCloseInterval = setInterval(() => {
    cornerIndex = (cornerIndex + 1) % corners.length;
    closeBtn.className = `error-popup-close ${corners[cornerIndex]}`;
  }, 1000);
  
  closeBtn.onclick = () => {
    clearInterval(popupCloseInterval);
    popup.classList.add("closing");
    setTimeout(() => {
      popup.remove();
      // Call the callback after popup is fully closed
      if (onClose) {
        onClose();
      }
    }, 4000); // 4 Sekunden langsame Schließanimation
  };
}

// --- RANDOM "USER KAUFT PRODUKT" POPUPS (Worst Practice) ---
let randomPopupInterval = null;
const fakeUsers = [
  "MaxMustermann_92", "LauraK", "GamerPro2024", "JensSchmidt", "Anna_M",
  "TechFreak99", "SarahB", "Michael_K", "Julia_W", "TomHD"
];

function showPurchaseNotification() {
  const randomUser = fakeUsers[Math.floor(Math.random() * fakeUsers.length)];
  const randomProduct = products[Math.floor(Math.random() * products.length)];
  
  const notification = document.createElement("div");
  notification.className = "purchase-notification";
  notification.innerHTML = `
    <div class="purchase-notification-content">
      <span class="purchase-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg></span>
      <div class="purchase-text">
        <strong>${randomUser}</strong> hat soeben<br>
        <span class="purchase-product">${randomProduct.name}</span> gekauft!
      </div>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Nach 4 Sekunden ausblenden
  setTimeout(() => {
    notification.classList.add("hiding");
    setTimeout(() => notification.remove(), 500);
  }, 4000);
}

function startRandomPopups() {
  // Stoppe alte Intervalle falls vorhanden
  stopRandomPopups();
  
  // Zeige alle 5-12 Sekunden eine Notification
  const scheduleNext = () => {
    const delay = 5000 + Math.random() * 7000;
    randomPopupInterval = setTimeout(() => {
      showPurchaseNotification();
      scheduleNext();
    }, delay);
  };
  
  scheduleNext();
}

function stopRandomPopups() {
  if (randomPopupInterval) {
    clearTimeout(randomPopupInterval);
    randomPopupInterval = null;
  }
}

// --- STAGE 2 PAUSE POPUP (alle 30 Sekunden) ---
function startStage2PausePopup() {
  // Zeige alle 30 Sekunden ein Pause-Popup
  stage2PauseInterval = setInterval(() => {
    if (!isPausePopupActive) {
      showStage2PausePopup();
    }
  }, 30000); // 30 Sekunden
}

function stopStage2PausePopup() {
  if (stage2PauseInterval) {
    clearInterval(stage2PauseInterval);
    stage2PauseInterval = null;
  }
}

// --- STAGE 2 NOTIFICATIONS (linke Seite) ---
function startStage2Notifications() {
  // Zeige alle 8-15 Sekunden eine Notification
  const scheduleNext = () => {
    const delay = 8000 + Math.random() * 7000; // 8-15 Sekunden
    stage2NotificationInterval = setTimeout(() => {
      showStage2Notification();
      scheduleNext();
    }, delay);
  };
  scheduleNext();
}

function stopStage2Notifications() {
  if (stage2NotificationInterval) {
    clearTimeout(stage2NotificationInterval);
    stage2NotificationInterval = null;
  }
}

function showStage2Notification() {
  const notificationTypes = [
    { icon: '📤', text: '{user} hat dir einen Beitrag geteilt' },
    { icon: '💬', text: '{user} hat dir eine Nachricht gesendet' },
    { icon: '❤️', text: '{user} hat deinen Beitrag geliked' },
    { icon: '👤', text: '{user} folgt dir jetzt' },
    { icon: '💬', text: 'Neue Nachricht von {user}' },
    { icon: '📤', text: '{user} hat etwas mit dir geteilt' }
  ];
  
  const randomUsers = [
    'max_mueller', 'sarah_design', 'techguru99', 'fitness_anna',
    'food_lover', 'travel_mike', 'photo_pro', 'music_fan',
    'game_master', 'art_soul', 'book_worm', 'nature_lover'
  ];
  
  const notification = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
  const randomUser = randomUsers[Math.floor(Math.random() * randomUsers.length)];
  const text = notification.text.replace('{user}', randomUser);
  
  const notif = document.createElement('div');
  notif.className = 'stage2-notification';
  notif.innerHTML = `
    <div class="stage2-notification-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
      </svg>
    </div>
    <div class="stage2-notification-content">
      <div class="stage2-notification-title">Shitstagram</div>
      <div class="stage2-notification-text">${text}</div>
    </div>
  `;
  
  document.body.appendChild(notif);
  
  // Auto-remove nach 6 Sekunden
  setTimeout(() => {
    if (document.body.contains(notif)) {
      notif.style.animation = 'slideOutLeft 0.3s ease forwards';
      setTimeout(() => notif.remove(), 300);
    }
  }, 6000);
}

function showStage2PausePopup() {
  // Timer läuft weiter, keine Pause
  isPausePopupActive = true;
  
  const popup = document.createElement('div');
  popup.className = 'stage2-pause-popup';
  popup.innerHTML = `
    <div class="stage2-pause-overlay"></div>
    <div class="stage2-pause-content">
      <div class="stage2-pause-lock-toggle">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="5" y="11" width="14" height="10" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
        <div class="toggle-switch">
          <div class="toggle-slider"></div>
        </div>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="5" y="11" width="14" height="10" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
        </svg>
      </div>
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style="margin: 0 0 20px 0;">
        <rect x="6" y="4" width="4" height="16" fill="#fff" rx="1"/>
        <rect x="14" y="4" width="4" height="16" fill="#fff" rx="1"/>
      </svg>
      <h2 style="color: #fff; margin: 0 0 15px 0; font-size: 1.8em; font-weight: 600;">Kurze Pause</h2>
      <p style="color: #999; font-size: 1em; margin: 0 0 30px 0; line-height: 1.5;">
        Möchtest du weitermachen?
      </p>
      <button class="stage2-pause-continue-btn" style="display: none;">Weitermachen</button>
    </div>
  `;
  
  document.body.appendChild(popup);
  
  let isUnlocked = false;
  const lockToggle = popup.querySelector('.stage2-pause-lock-toggle');
  const toggleSwitch = popup.querySelector('.toggle-switch');
  const continueBtn = popup.querySelector('.stage2-pause-continue-btn');
  
  lockToggle.onclick = () => {
    if (!isUnlocked) {
      isUnlocked = true;
      toggleSwitch.classList.add('active');
      lockToggle.classList.add('unlocked');
      continueBtn.style.display = 'block';
    }
  };
  
  continueBtn.onclick = () => {
    // Entferne Popup, Timer läuft bereits weiter
    popup.remove();
    isPausePopupActive = false;
  };
}

// --- "SUCHST DU IMMER NOCH?" POPUP (Worst Practice) ---
let searchPopupInterval = null;
function startSearchPopup() {
  // Zeige nach 15-20 Sekunden das Popup
  searchPopupInterval = setTimeout(() => {
    showSearchStillPopup();
  }, 15000 + Math.random() * 5000);
}

function stopSearchPopup() {
  if (searchPopupInterval) {
    clearTimeout(searchPopupInterval);
    searchPopupInterval = null;
  }
  stopStage2PausePopup();
  stopStage2Notifications();
}

function showSearchStillPopup() {
  const popup = document.createElement("div");
  popup.id = "search-still-popup";
  popup.className = "newsletter-popup";
  popup.innerHTML = `
    <div class="newsletter-popup-content">
      <h3><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style="vertical-align: middle; margin-right: 8px;"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>Suchst du immer noch?</h3>
      <p>Brauchst du Hilfe bei der Produktsuche?</p>
      <div class="newsletter-buttons">
        <button class="newsletter-btn-yes" id="search-no">Ja aber ich brauch keine Hilfe</button>
        <button class="newsletter-btn-no" id="search-yes">Nein, aber Hilfe wäre super</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(popup);
  
  // "Nein, aber Hilfe wäre super" (grüner Button) → schließt einfach und lässt weitermachen
  document.getElementById("search-no").onclick = () => {
    popup.classList.add("closing");
    setTimeout(() => popup.remove(), 3000);
  };
  
  // "Ja aber ich brauch keine Hilfe" (roter Button) → führt ironischerweise zum Support
  document.getElementById("search-yes").onclick = () => {
    popup.classList.add("closing");
    setTimeout(() => {
      popup.remove();
      showCustomerSupportPopup();
    }, 3000);
  };
}

function showCustomerSupportPopup() {
  const popup = document.createElement("div");
  popup.id = "support-popup";
  popup.className = "newsletter-popup";
  popup.innerHTML = `
    <div class="support-popup-content">
      <h3>💬 Customer Support</h3>
      <p style="font-size: 0.9em; color: #999; margin: 10px 0; text-align: left;">Verfügbarkeit:</p>
      <ul style="font-size: 0.85em; color: #777; margin: 0 0 20px 0; padding-left: 20px; text-align: left; line-height: 1.8;">
        <li>Montag: 03:00 - 03:45 Uhr</li>
        <li>Dienstag: Nicht verfügbar</li>
        <li>Mittwoch: 02:30 - 03:15 Uhr</li>
        <li>Donnerstag: Nicht verfügbar</li>
        <li>Freitag: 04:00 - 04:30 Uhr</li>
        <li>Sa/So: Nicht verfügbar</li>
      </ul>
      <div style="display: flex; flex-direction: column; gap: 15px; margin-top: 20px;">
        <textarea id="support-message" placeholder="Schreibe deine Nachricht..." style="padding: 12px; border-radius: 8px; border: 2px solid #444; background: #0d0d0d; color: #fff; font-size: 0.95em; min-height: 100px; resize: vertical; font-family: Arial, sans-serif;"></textarea>
        <button id="send-support-btn" class="newsletter-btn-no" disabled style="opacity: 0.5; cursor: not-allowed;">Nachricht senden</button>
      </div>
      <button id="close-support-btn" class="support-close-btn" disabled style="margin-top: 15px; padding: 10px 20px; background: #333; color: #666; border: 2px solid #444; border-radius: 8px; cursor: not-allowed; font-size: 0.9em;">Schließen (Nachricht erforderlich)</button>
    </div>
  `;
  
  document.body.appendChild(popup);
  
  const textarea = document.getElementById("support-message");
  const sendBtn = document.getElementById("send-support-btn");
  const closeBtn = document.getElementById("close-support-btn");
  
  // Aktiviere Send-Button wenn Text eingegeben wurde
  textarea.addEventListener("input", () => {
    if (textarea.value.trim().length > 0) {
      sendBtn.disabled = false;
      sendBtn.style.opacity = "1";
      sendBtn.style.cursor = "pointer";
    } else {
      sendBtn.disabled = true;
      sendBtn.style.opacity = "0.5";
      sendBtn.style.cursor = "not-allowed";
    }
  });
  
  // Beim Senden: Zeige "Support nicht verfügbar" und aktiviere Close
  sendBtn.onclick = () => {
    if (textarea.value.trim().length > 0) {
      textarea.value = "";
      textarea.disabled = true;
      sendBtn.disabled = true;
      sendBtn.style.opacity = "0.5";
      
      // Zeige "Unavailable" Nachricht
      const messageDiv = document.createElement("div");
      messageDiv.style.cssText = "background: #1a1a1a; border: 2px solid #B20CE9; border-radius: 8px; padding: 15px; margin-top: 15px; text-align: center;";
      messageDiv.innerHTML = `
        <p style="color: #B20CE9; margin: 0; font-weight: 600;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B20CE9" stroke-width="2" style="vertical-align: middle; margin-right: 4px;"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg> Support momentan nicht verfügbar</p>
        <p style="color: #999; margin: 5px 0 0 0; font-size: 0.85em;">Bitte versuche es während unserer Öffnungszeiten erneut.</p>
      `;
      
      sendBtn.parentElement.appendChild(messageDiv);
      
      // Aktiviere Close-Button nach kurzer Verzögerung
      setTimeout(() => {
        closeBtn.disabled = false;
        closeBtn.style.background = "#B20CE9";
        closeBtn.style.color = "#fff";
        closeBtn.style.borderColor = "#B20CE9";
        closeBtn.style.cursor = "pointer";
        closeBtn.textContent = "Schließen";
      }, 1500);
    }
  };
  
  closeBtn.onclick = () => {
    if (!closeBtn.disabled) {
      popup.classList.add("closing");
      setTimeout(() => popup.remove(), 3000);
    }
  };
}

function setupCheckout() {
  // Stop annoying popups during checkout
  stopRandomPopups();
  stopSearchPopup();
  
  // Inhalt für den Checkout-Screen erzeugen
  const checkoutHTML = `
    <div id="checkout-inner" class="stage">
      <h2>Bezahlvorgang</h2>
      <p class="checkout-subtitle">Bitte gib deine Daten in <i>richtiger</i> Reihenfolge ein:</p>

      <div class="checkout-form">
        <div class="input-group">
          <label for="country">Land</label>
          <input type="text" id="country" class="checkout-input" value="Land">
        </div>
        <div class="input-group">
          <label for="email">E-Mail</label>
          <input type="text" id="email" class="checkout-input" value="E-Mail (optional, aber Pflicht)">
        </div>
        <div class="input-group">
          <label for="name">Name (Nachname zuerst!)</label>
          <input type="text" id="name" class="checkout-input" value="Name (Nachname zuerst!)">
        </div>
        <div class="input-group">
          <label for="password">Passwort festlegen</label>
          <div style="display: flex; align-items: center; gap: 10px;">
            <input type="text" id="password" class="checkout-input" value="Passwort" style="flex: 1;">
            <span id="caps-lock-warning" style="font-size: 0.75em; color: #B20CE9; white-space: nowrap; display: none;">Feststelltaste nicht aktiviert</span>
          </div>
          <div class="password-requirements">
            <p style="font-size: 0.75em; color: #999; margin: 8px 0 4px 0; font-weight: 600; text-align: left;">Passwort-Anforderungen:</p>
            <ul style="font-size: 0.7em; color: #777; margin: 0; padding-left: 20px; line-height: 1.6; text-align: left;">
              <li>Mindestens 12 Zeichen</li>
              <li>Mindestens 3 Großbuchstaben</li>
              <li>Mindestens 2 Zahlen (aber nicht aufeinanderfolgend)</li>
              <li>Mindestens 2 Sonderzeichen (!@#$%)</li>
              <li>Keine Vokale (a, e, i, o, u)</li>
              <li>Muss mit einem Großbuchstaben beginnen</li>
              <li>Muss mit einer Zahl enden</li>
              <li>Keine aufeinanderfolgenden gleichen Zeichen</li>
              <li>Darf nicht "Passwort" oder "Password" enthalten</li>
            </ul>
          </div>
        </div>
        <button id="buy-final-btn" class="checkout-buy-btn">Bestellen</button>
      </div>
    </div>
  `;

  // Inhalt in den vorhandenen Screen schreiben
  const checkoutScreen = document.getElementById("checkout-screen");
  checkoutScreen.innerHTML = checkoutHTML;
  checkoutScreen.style.display = "flex";
  checkoutScreen.style.flexDirection = "column";
  checkoutScreen.style.alignItems = "center";
  checkoutScreen.style.justifyContent = "center";
  checkoutScreen.style.minHeight = "100vh";
  checkoutScreen.style.background = "#0d0d0d";

  // Worst Practice: Text ist ECHTER Wert, muss manuell gelöscht werden
  document.querySelectorAll(".checkout-input").forEach(input => {
    // Bei Fokus Text markieren (aber nicht löschen!)
    input.addEventListener("focus", function() {
      this.classList.add("active");
      this.select(); // Text wird markiert, muss aber manuell gelöscht werden
    });
    
    // Bei Blur active-Klasse entfernen
    input.addEventListener("blur", function() {
      this.classList.remove("active");
    });
  });
  
  // Worst Practice: Passwort-Feld zeigt Shake-Animation bei RICHTIGEM Input
  const passwordInput = document.getElementById("password");
  const capsLockWarning = document.getElementById("caps-lock-warning");
  let lastPasswordValue = "";
  
  // Worst Practice: Inverted Caps Lock warning (shows when OFF, hides when ON)
  passwordInput.addEventListener("keydown", function(e) {
    if (e.getModifierState && e.getModifierState("CapsLock")) {
      // Caps Lock is ON - hide warning (worst practice!)
      capsLockWarning.style.display = "none";
    } else {
      // Caps Lock is OFF - show warning (worst practice!)
      capsLockWarning.style.display = "block";
    }
  });
  
  passwordInput.addEventListener("keyup", function(e) {
    if (e.getModifierState && e.getModifierState("CapsLock")) {
      // Caps Lock is ON - hide warning (worst practice!)
      capsLockWarning.style.display = "none";
    } else {
      // Caps Lock is OFF - show warning (worst practice!)
      capsLockWarning.style.display = "block";
    }
  });
  
  passwordInput.addEventListener("input", function() {
    const currentValue = this.value;
    
    // Ignore placeholder text
    if (currentValue === "Passwort" || currentValue === "") {
      lastPasswordValue = currentValue;
      this.style.border = "";
      return;
    }
    
    // Check if password is actually valid
    const errors = validatePassword(currentValue);
    
    // Worst Practice: Lila Stroke nur wenn >= 12 Zeichen ABER nicht valide (irreführend!)
    if (currentValue.length >= 12 && errors.length > 0) {
      this.style.border = "3px solid #B20CE9";
      this.style.boxShadow = "0 0 8px rgba(178, 12, 233, 0.5)";
    } else {
      this.style.border = "";
      this.style.boxShadow = "";
    }
    
    // Shake animation on CORRECT password (worst practice!)
    if (errors.length === 0 && currentValue !== lastPasswordValue && currentValue.length >= 12) {
      this.classList.remove('shake-error');
      void this.offsetWidth; // Trigger reflow
      this.classList.add('shake-error');
      
      setTimeout(() => {
        this.classList.remove('shake-error');
      }, 500);
    }
    
    lastPasswordValue = currentValue;
  });

  // CPS System für Bestellen-Button (12 Klicks in 2 Sekunden)
  const buyBtn = document.getElementById("buy-final-btn");
  let clickCount = 0;
  let cpsTimeout = null;
  let firstClickTime = null;
  const requiredClicks = 12;
  const timeWindow = 2000; // 2 Sekunden
  
  function resetCPS() {
    buyBtn.classList.remove('cps-pulse');
    buyBtn.classList.add('cps-reset');
    setTimeout(() => {
      buyBtn.classList.remove('cps-reset');
      buyBtn.style.transform = 'scale(1)';
      buyBtn.style.background = '#7a0a9a';
      buyBtn.style.filter = 'brightness(0.8)';
    }, 300);
    clickCount = 0;
    firstClickTime = null;
    if (cpsTimeout) {
      clearTimeout(cpsTimeout);
      cpsTimeout = null;
    }
  }
  
  buyBtn.onclick = () => {
    const now = Date.now();
    
    // Set first click time
    if (firstClickTime === null) {
      firstClickTime = now;
      // Set timeout for 2 seconds from first click
      cpsTimeout = setTimeout(() => {
        resetCPS();
      }, timeWindow);
    }
    
    // Check if 2 seconds have passed since first click
    if (now - firstClickTime > timeWindow) {
      resetCPS();
      // Start new sequence
      firstClickTime = now;
      cpsTimeout = setTimeout(() => {
        resetCPS();
      }, timeWindow);
    }
    
    clickCount++;
    
    // Pulse Animation
    buyBtn.classList.remove('cps-pulse');
    void buyBtn.offsetWidth; // Trigger reflow
    buyBtn.classList.add('cps-pulse');
    
    // Scale up progressively
    const scaleProgress = 1 + (clickCount / requiredClicks) * 0.2; // Max 1.2x scale
    buyBtn.style.transform = `scale(${scaleProgress})`;
    buyBtn.style.setProperty('--current-scale', scaleProgress);
    
    // Color progression from dark to bright purple
    const colorProgress = clickCount / requiredClicks;
    const r = Math.round(122 + (178 - 122) * colorProgress);
    const g = Math.round(10 + (12 - 10) * colorProgress);
    const b = Math.round(154 + (233 - 154) * colorProgress);
    buyBtn.style.background = `rgb(${r}, ${g}, ${b})`;
    
    // Brightness progression
    const brightness = 0.8 + (0.5 * colorProgress); // 0.8 to 1.3
    buyBtn.style.filter = `brightness(${brightness})`;
    
    // Check if required clicks reached
    if (clickCount >= requiredClicks) {
      // Execute order
      clearTimeout(cpsTimeout);
      executeOrder();
      clickCount = 0;
      firstClickTime = null;
      buyBtn.style.transform = 'scale(1)';
      buyBtn.style.background = '#7a0a9a';
      buyBtn.style.filter = 'brightness(0.8)';
      return;
    }
  };
  
  function executeOrder() {
    const nameValue = document.getElementById("name").value.trim();
    const emailValue = document.getElementById("email").value.trim();
    const countryValue = document.getElementById("country").value.trim();
    const passwordValue = document.getElementById("password").value;
    
    // Prüfe ob noch Platzhalter-Text drin ist
    const placeholders = ["Land", "E-Mail (optional, aber Pflicht)", "Name (Nachname zuerst!)", "Passwort"];
    
    if (placeholders.includes(nameValue) || placeholders.includes(emailValue) || placeholders.includes(countryValue) || placeholders.includes(passwordValue)) {
      showErrorPopup("Bitte fülle alle Felder korrekt aus!");
      resetCheckoutForm();
      return;
    }

    if (!nameValue || !emailValue || !countryValue || !emailValue.includes("@")) {
      showErrorPopup("Fehlerhafte Eingaben! Bitte probiere es erneut.");
      resetCheckoutForm();
      return;
    }

    // ABSURDE PASSWORT-VALIDIERUNG (Worst Practice!)
    const errors = validatePassword(passwordValue);
    if (errors.length > 0) {
      // Play swapped sound: play `right.wav` when password is WRONG
      if (audioRight && typeof audioRight.play === 'function') {
        audioRight.play().catch(() => {});
      }
      showErrorPopup("Passwort-Fehler: " + errors[0]);
      resetCheckoutForm();
      return;
    }

    // Play swapped sound: play `wrong.wav` when password is CORRECT
    if (audioWrong && typeof audioWrong.play === 'function') {
      audioWrong.play().catch(() => {});
    }

    // Zeige Newsletter-Popup (Worst Practice!)
    showNewsletterPopup();
  }
}

// Absurde Passwort-Validierung
function validatePassword(pwd) {
  const errors = [];
  
  // Mindestens 12 Zeichen
  if (pwd.length < 12) {
    errors.push("Mindestens 12 Zeichen erforderlich");
  }
  
  // Mindestens 3 Großbuchstaben
  const upperCount = (pwd.match(/[A-Z]/g) || []).length;
  if (upperCount < 3) {
    errors.push("Mindestens 3 Großbuchstaben erforderlich");
  }
  
  // Mindestens 2 Zahlen (nicht aufeinanderfolgend)
  const numbers = pwd.match(/\d/g) || [];
  if (numbers.length < 2) {
    errors.push("Mindestens 2 Zahlen erforderlich");
  } else {
    // Prüfe ob Zahlen aufeinanderfolgend sind
    for (let i = 0; i < pwd.length - 1; i++) {
      if (/\d/.test(pwd[i]) && /\d/.test(pwd[i + 1])) {
        errors.push("Zahlen dürfen nicht aufeinanderfolgend sein");
        break;
      }
    }
  }
  
  // Mindestens 2 Sonderzeichen
  const specialCount = (pwd.match(/[!@#$%]/g) || []).length;
  if (specialCount < 2) {
    errors.push("Mindestens 2 Sonderzeichen (!@#$%) erforderlich");
  }
  
  // Keine Vokale
  if (/[aeiouAEIOU]/.test(pwd)) {
    errors.push("Keine Vokale (a, e, i, o, u) erlaubt");
  }
  
  // Muss mit Großbuchstaben beginnen
  if (!/^[A-Z]/.test(pwd)) {
    errors.push("Muss mit einem Großbuchstaben beginnen");
  }
  
  // Muss mit Zahl enden
  if (!/\d$/.test(pwd)) {
    errors.push("Muss mit einer Zahl enden");
  }
  
  // Keine aufeinanderfolgenden gleichen Zeichen
  for (let i = 0; i < pwd.length - 1; i++) {
    if (pwd[i] === pwd[i + 1]) {
      errors.push("Keine aufeinanderfolgenden gleichen Zeichen erlaubt");
      break;
    }
  }
  
  // Darf nicht "Passwort" oder "Password" enthalten
  if (/passwort|password/i.test(pwd)) {
    errors.push("Darf nicht 'Passwort' oder 'Password' enthalten");
  }
  
  return errors;
}

// Formular zurücksetzen (Worst Practice!)
function resetCheckoutForm() {
  document.getElementById("country").value = "Land";
  document.getElementById("email").value = "E-Mail (optional, aber Pflicht)";
  document.getElementById("name").value = "Name (Nachname zuerst!)";
  document.getElementById("password").value = "Passwort";
  
  // Alle active Klassen entfernen
  document.querySelectorAll(".checkout-input").forEach(input => {
    input.classList.remove("active");
  });
}

// --- NEWSLETTER POPUP MIT WORST PRACTICE (umgekehrte Psychologie, lange Scrollable) ---
function showNewsletterPopup() {
  const popup = document.createElement("div");
  popup.id = "newsletter-popup";
  popup.className = "newsletter-popup";
  popup.innerHTML = `
    <div class="newsletter-popup-content">
      <h3><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style="vertical-align: middle; margin-right: 8px;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>Newsletter abonnieren?</h3>
      <p>Erhalte exklusive Angebote und News!</p>
      <div class="newsletter-buttons">
        <button class="newsletter-btn-no" id="newsletter-no">Ja, ich möchte KEINE Updates</button>
        <button class="newsletter-btn-yes" id="newsletter-yes">Nein, ich will Updates</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(popup);
  
  document.getElementById("newsletter-yes").onclick = () => {
    popup.classList.add("closing");
    setTimeout(() => {
      popup.remove();
      showLongScrollText();
    }, 3000);
  };
  
  document.getElementById("newsletter-no").onclick = () => {
    popup.classList.add("closing");
    setTimeout(() => {
      popup.remove();
      showLongScrollText();
    }, 3000);
  };
}

function showConfirmationPopup() {
  const popup = document.createElement("div");
  popup.id = "confirmation-popup";
  popup.className = "newsletter-popup";
  popup.innerHTML = `
    <div class="newsletter-popup-content">
      <h3><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style="vertical-align: middle; margin-right: 8px;"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>Bist du sicher?</h3>
      <p>Du verpasst großartige Angebote!</p>
      <div class="newsletter-buttons">
        <button class="newsletter-btn-no" id="confirm-yes">Ja, Newsletter bitte!</button>
        <button class="newsletter-btn-yes" id="confirm-no">Nein, wirklich nicht</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(popup);
  
  document.getElementById("confirm-yes").onclick = () => {
    popup.classList.add("closing");
    setTimeout(() => {
      popup.remove();
      completeCheckout();
    }, 3000);
  };
  
  document.getElementById("confirm-no").onclick = () => {
    popup.classList.add("closing");
    setTimeout(() => {
      popup.remove();
      showLongScrollText();
    }, 3000);
  };
}

function showLongScrollText() {
  const popup = document.createElement("div");
  popup.id = "long-text-popup";
  popup.className = "newsletter-popup";
  popup.innerHTML = `
    <div class="long-text-popup-content">
      <h3>Warum unser Newsletter so toll ist</h3>
      <div class="long-text-scroll" id="long-text-scroll">
        <p><strong>Willkommen zu unserem fantastischen Newsletter!</strong></p>
        <p>Wir bei WorstBuy sind stolz darauf, dir die besten Angebote zu präsentieren. Unser Newsletter ist nicht einfach nur eine E-Mail – es ist eine Erfahrung!</p>
        
        <h4><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style="vertical-align: middle; margin-right: 6px;"><path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 01-2 2zm0 0a2 2 0 01-2-2v-9c0-1.1.9-2 2-2h2"/><line x1="10" y1="6" x2="18" y2="6"/><line x1="10" y1="10" x2="18" y2="10"/><line x1="10" y1="14" x2="18" y2="14"/></svg>Was du erhältst:</h4>
        <p>• Exklusive Deals nur für Newsletter-Abonnenten</p>
        <p>• Frühzeitiger Zugang zu neuen Produkten</p>
        <p>• Persönliche Empfehlungen basierend auf deinen Interessen</p>
        <p>• Insider-Tipps von unseren Tech-Experten</p>
        <p>• Gewinnspiele mit tollen Preisen</p>
        <p>• Wöchentliche Tech-News und Reviews</p>
        <p>• Community-Spotlights und Erfolgsgeschichten</p>
        
        <h4>🎯 Unsere Mission:</h4>
        <p>Seit 2024 revolutionieren wir den Online-Shopping-Markt. Mit über 10.000 zufriedenen Kunden weltweit haben wir uns einen Namen gemacht. Unser Newsletter erreicht wöchentlich mehr als 50.000 begeisterte Leser!</p>
        <p>Unsere Vision ist es, die beste Shopping-Erfahrung zu bieten, die du je hattest. Wir investieren täglich in neue Technologien und verbessern unseren Service.</p>
        <p>Das Team besteht aus 50+ Experten in den Bereichen E-Commerce, Kundenservice, Logistik und Marketing.</p>
        
        <h4>💡 Was unsere Kunden sagen:</h4>
        <p><em>"Der beste Newsletter, den ich je abonniert habe!"</em> - Max M.</p>
        <p><em>"Ich habe durch den Newsletter 500€ gespart!"</em> - Sarah K.</p>
        <p><em>"Kann ich nicht mehr ohne!"</em> - Tom H.</p>
        <p><em>"Die Angebote sind unschlagbar!"</em> - Lisa P.</p>
        <p><em>"Endlich ein Newsletter, der sich lohnt!"</em> - Michael B.</p>
        <p><em>"Jeden Tag freue ich mich auf die neuen Deals!"</em> - Anna W.</p>
        
        <h4>🚀 Kommende Features:</h4>
        <p>Wir arbeiten ständig daran, unseren Service zu verbessern. Bald erwarten dich:</p>
        <p>• KI-gestützte Produktempfehlungen basierend auf deinem Kaufverhalten</p>
        <p>• Interaktive Video-Guides und Tutorials</p>
        <p>• Community-Forum für Austausch mit anderen Nutzern</p>
        <p>• Exklusive Live-Events mit Tech-Experten</p>
        <p>• AR-Produktansichten für bessere Kaufentscheidungen</p>
        <p>• Personalisierte Wunschlisten mit Preiswarnungen</p>
        <p>• Mobile App mit Push-Benachrichtigungen</p>
        
        <h4>🎁 Bonus für Neu-Abonnenten:</h4>
        <p>Wenn du dich JETZT anmeldest, erhältst du:</p>
        <p>• 10% Rabatt auf deine nächste Bestellung</p>
        <p>• Kostenlosen Premium-Versand für 3 Monate</p>
        <p>• Zugang zu unserem VIP-Bereich mit exklusiven Deals</p>
        <p>• Frühzeitiger Zugang zu Sales (24h vor allen anderen)</p>
        <p>• Persönlicher Ansprechpartner im Kundenservice</p>
        <p>• Teilnahme an unserem monatlichen Gewinnspiel (Preise bis 1000€)</p>
        
        <h4>🌟 Unsere Werte:</h4>
        <p>Qualität, Kundenzufriedenheit und Innovation stehen bei uns an erster Stelle. Wir glauben daran, dass Shopping mehr sein sollte als nur Einkaufen – es sollte eine Freude sein!</p>
        <p>Nachhaltigkeit ist uns wichtig: Wir verwenden umweltfreundliche Verpackungen und kompensieren unseren CO2-Fußabdruck.</p>
        <p>Transparenz: Wir zeigen dir immer den besten Preis und verstecken keine Gebühren.</p>
        <p>Community: Du bist nicht nur Kunde, sondern Teil unserer Familie.</p>
        
        <h4>📊 Beeindruckende Statistiken:</h4>
        <p>• 98% Kundenzufriedenheit</p>
        <p>• 24/7 Kundenservice in 12 Sprachen</p>
        <p>• Über 1 Million versendete Newsletter</p>
        <p>• 4.9/5 Sterne Bewertung (aus über 10.000 Reviews)</p>
        <p>• Durchschnittliche Lieferzeit: 2 Tage</p>
        <p>• 99.9% positive Rückmeldungen</p>
        <p>• Über 500.000 ausgelieferte Produkte</p>
        
        <h4>🏆 Auszeichnungen:</h4>
        <p>• "Best E-Commerce Newsletter 2024" - Tech Magazine</p>
        <p>• "Customer Service Excellence Award" - Business Today</p>
        <p>• "Innovation in Retail" - Digital Commerce Awards</p>
        <p>• "Sustainability Champion" - Green Business Association</p>
        
        <h4><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style="vertical-align: middle; margin-right: 6px;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>Datenschutz:</h4>
        <p>Deine Daten sind bei uns sicher! Wir verwenden modernste Verschlüsselung und geben deine Informationen niemals an Dritte weiter. Du kannst dich jederzeit mit einem Klick abmelden.</p>
        <p>DSGVO-konform, SSL-verschlüsselt, regelmäßige Security-Audits.</p>
        
        <h4><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style="vertical-align: middle; margin-right: 6px;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>Was dich erwartet:</h4>
        <p>• Montag: Deal der Woche</p>
        <p>• Mittwoch: Tech-Tipps & Tricks</p>
        <p>• Freitag: Flash-Sales & Gewinnspiele</p>
        <p>• Sonntag: Community-Highlights</p>
        
        <p><strong>Verpasse nicht diese einmalige Chance!</strong></p>
        <p>Unser Newsletter ist komplett kostenlos und du kannst dich jederzeit abmelden (obwohl wir bezweifeln, dass du das möchtest!).</p>
        <p>Tausende zufriedene Abonnenten können nicht irren. Werde heute noch Teil unserer wachsenden Community!</p>
        
        <h4>💬 Noch Fragen?</h4>
        <p>Unser Support-Team steht dir rund um die Uhr zur Verfügung:</p>
        <p>• E-Mail: newsletter@worstbuy.com</p>
        <p>• Telefon: 0800-NEWSLETTER (kostenlos)</p>
        <p>• Live-Chat auf unserer Website</p>
        
        <p style="margin-top: 50px; padding-top: 30px; border-top: 2px solid #B20CE9;">
          <strong>Danke, dass du dir die Zeit genommen hast, dies zu lesen.</strong><br>
          Du kannst dieses Fenster nun schließen.
        </p>
      </div>
      <button class="long-text-close" id="long-text-close" disabled>Schließen (scrolle bis zum Ende)</button>
    </div>
  `;
  
  document.body.appendChild(popup);
  
  const scrollDiv = document.getElementById("long-text-scroll");
  const closeBtn = document.getElementById("long-text-close");
  
  // Worst Practice: Exponentiell langsamer werdender Scroll mit Reset
  let scrollCount = 0;
  const maxScrollCount = 20; // Nach 20 Scrolls reset
  const baseSpeed = 0.08; // Basis-Geschwindigkeit
  const minSpeed = 0.005; // Minimale Geschwindigkeit
  
  scrollDiv.addEventListener("wheel", (e) => {
    e.preventDefault();
    
    // Exponentiell langsamer: speed = baseSpeed * (0.7 ^ scrollCount)
    const exponent = scrollCount / 5; // Alle 5 Scrolls halbiert sich etwa die Geschwindigkeit
    let currentSpeed = baseSpeed * Math.pow(0.7, exponent);
    
    // Minimum einhalten
    currentSpeed = Math.max(currentSpeed, minSpeed);
    
    scrollDiv.scrollTop += e.deltaY * currentSpeed;
    
    scrollCount++;
    
    // Reset nach maxScrollCount
    if (scrollCount >= maxScrollCount) {
      scrollCount = 0;
    }
  }, { passive: false });
  
  // Aktiviere Button nur wenn ganz unten gescrollt
  scrollDiv.addEventListener("scroll", () => {
    const isAtBottom = scrollDiv.scrollHeight - scrollDiv.scrollTop <= scrollDiv.clientHeight + 10;
    if (isAtBottom) {
      closeBtn.disabled = false;
      closeBtn.classList.add("enabled");
    }
  });
  
  closeBtn.onclick = () => {
    popup.classList.add("closing");
    setTimeout(() => {
      popup.remove();
      completeCheckout();
    }, 3000);
  };
}

function completeCheckout() {
  checkoutCompleted = true;
  clearInterval(timerInterval);
  
  // Cleanup
  stopRandomPopups();
  stopSearchPopup();
  
  // Zur nächsten Stage (Punkte werden in completeCheckout() berechnet)
  nextStage();
}

// --- SHITSTAGRAM LOGIK (STAGE 2) ---
window.shitStagramShared = false;
const likedPosts = new Set(); // Track gelikte Posts
let isShowingHeartsOverlay = false; // Prevent multiple simultaneous animations

const shitStagramUsers = [
  { username: "dieter_official", displayName: "Dieter", verified: false, followers: 156, following: 423, posts: 89 },
  { username: "trafish_god", displayName: "Trafish god", verified: true, followers: 1203, following: 567, posts: 234 },
  { username: "trafish_king", displayName: "Trafish King", verified: true, followers: 4532, following: 789, posts: 567 },
  { username: "trafish_pro_gamer", displayName: "Trafish Pro Gamer", verified: true, followers: 3421, following: 654, posts: 456 },
  { username: "trafish_master", displayName: "Trafish Master", verified: false, followers: 2876, following: 543, posts: 389 },
  { username: "trafish_daily", displayName: "Trafish Daily", verified: true, followers: 5432, following: 876, posts: 623 },
  { username: "trafish_tv", displayName: "TrafishTV", verified: true, followers: 12453, following: 123, posts: 892 },
  { username: "trafish_gaming", displayName: "Trafish Gaming", verified: false, followers: 3987, following: 678, posts: 498 },
  { username: "trafish_streams", displayName: "Trafish Streams", verified: true, followers: 6543, following: 789, posts: 734 },
  { username: "trafish_hunter", displayName: "Trafish Hunter", verified: false, followers: 2198, following: 456, posts: 345 },
  { username: "trafish_fisher", displayName: "Trafish Fisher", verified: false, followers: 1876, following: 432, posts: 267 },
  { username: "trafish_lover", displayName: "Trafish Lover", verified: false, followers: 987, following: 234, posts: 178 },
  { username: "trafish_clips", displayName: "Trafish Clips", verified: false, followers: 4321, following: 678, posts: 521 },
  { username: "trafish_highlights", displayName: "Trafish Highlights", verified: false, followers: 3654, following: 567, posts: 445 },
  { username: "trafish_best", displayName: "Trafish Best", verified: false, followers: 2543, following: 543, posts: 378 },
  { username: "trafish_official", displayName: "Trafish Official", verified: true, followers: 15678, following: 234, posts: 987 },
  { username: "trafish_world", displayName: "Trafish World", verified: false, followers: 5876, following: 789, posts: 656 },
  { username: "trafish_fan", displayName: "Trafish Fan", verified: false, followers: 1543, following: 432, posts: 289 },
  { username: "trafish_community", displayName: "Trafish Community", verified: false, followers: 7654, following: 876, posts: 734 },
  { username: "trafish_legends", displayName: "Trafish Legends", verified: true, followers: 4198, following: 678, posts: 523 },
  { username: "trafish_nation", displayName: "Trafish Nation", verified: false, followers: 6234, following: 789, posts: 678 },
  { username: "trafish_empire", displayName: "Trafish Empire", verified: false, followers: 3876, following: 654, posts: 467 },
  { username: "trafish_zone", displayName: "Trafish Zone", verified: false, followers: 2987, following: 543, posts: 398 },
  { username: "trafish_squad", displayName: "Trafish Squad", verified: false, followers: 5123, following: 789, posts: 612 },
  { username: "trafish_army", displayName: "Trafish Army", verified: false, followers: 4567, following: 678, posts: 545 },
  { username: "trafish_crew", displayName: "Trafish Crew", verified: false, followers: 3298, following: 567, posts: 423 },
  { username: "trafish_gang", displayName: "Trafish Gang", verified: false, followers: 2765, following: 543, posts: 378 },
  { username: "trafish_team", displayName: "Trafish Team", verified: false, followers: 4876, following: 789, posts: 589 },
  { username: "trafishcod", displayName: "Trafishcod", verified: true, followers: 1543, following: 432, posts: 267 },
  { username: "trafish.cod", displayName: "Trafish.cod", verified: true, followers: 2198, following: 543, posts: 334 },
  { username: "trafish-cod", displayName: "Trafish-cod", verified: true, followers: 3421, following: 654, posts: 445 },
  { username: "trafish__cod", displayName: "Trafish  cod", verified: false, followers: 987, following: 234, posts: 189 },
  { username: "trafish_cod_", displayName: "Trafish_cod_", verified: true, followers: 1876, following: 456, posts: 298 },
  { username: "_trafish_cod", displayName: "_Trafish_cod", verified: false, followers: 2543, following: 567, posts: 378 },
  { username: "trafish_cod1", displayName: "Trafish cod1", verified: false, followers: 1234, following: 345, posts: 234 },
  { username: "trafish_cod2", displayName: "Trafish cod2", verified: false, followers: 876, following: 234, posts: 178 },
  { username: "trafish_cod23", displayName: "Trafish cod23", verified: true, followers: 2109, following: 543, posts: 356 },
  { username: "trafish_cod420", displayName: "Trafish cod420", verified: true, followers: 3654, following: 678, posts: 489 },
  { username: "trafish_cod69", displayName: "Trafish cod69", verified: false, followers: 1765, following: 432, posts: 289 },
  { username: "trafish_cod_official", displayName: "Trafish cod Official", verified: true, followers: 4321, following: 789, posts: 534 },
  { username: "trafish_cod_real", displayName: "Trafish cod Real", verified: true, followers: 2987, following: 567, posts: 412 },
  { username: "trafish_cod_og", displayName: "Trafish cod OG", verified: false, followers: 1432, following: 345, posts: 256 },
  { username: "trafish_cod_pro", displayName: "Trafish cod Pro", verified: true, followers: 3876, following: 678, posts: 467 },
  { username: "the_trafish_cod", displayName: "The Trafish cod", verified: true, followers: 2654, following: 543, posts: 389 },
  { username: "real_trafish_cod", displayName: "Real Trafish cod", verified: true, followers: 4198, following: 789, posts: 523 },
  { username: "trafish_cod_tv", displayName: "Trafish cod TV", verified: true, followers: 3298, following: 654, posts: 445 },
  { username: "trafish_cod_yt", displayName: "Trafish cod YT", verified: true, followers: 2876, following: 567, posts: 398 },
  { username: "trafish_cod_ttv", displayName: "Trafish cod TTV", verified: false, followers: 1987, following: 456, posts: 312 },
  { username: "trash_fish_cod", displayName: "Trash fish cod", verified: false, followers: 891, following: 234, posts: 156 },
  { username: "traffic_code", displayName: "Traffic Code", verified: false, followers: 543, following: 342, posts: 98 },
  { username: "tra_fish_pro", displayName: "Tra Fish Pro", verified: false, followers: 2341, following: 654, posts: 423 },
  { username: "trapfish_coder", displayName: "Trapfish Coder", verified: false, followers: 1876, following: 432, posts: 267 },
  { username: "trash_cod_fisher", displayName: "Trash Cod Fisher", verified: false, followers: 765, following: 234, posts: 145 },
  { username: "tra_fishing_daily", displayName: "Tra Fishing Daily", verified: false, followers: 4532, following: 876, posts: 543 },
  { username: "tragic_fish", displayName: "Tragic Fish", verified: false, followers: 987, following: 345, posts: 234 },
  { username: "traditional_cod", displayName: "Traditional Cod", verified: false, followers: 654, following: 234, posts: 167 },
  { username: "trade_fish_co", displayName: "Trade Fish Co", verified: false, followers: 3421, following: 567, posts: 432 },
  { username: "tra_cod_master", displayName: "Tra Cod Master", verified: false, followers: 2198, following: 432, posts: 356 },
  { username: "traffic_fisher", displayName: "Traffic Fisher", verified: false, followers: 876, following: 234, posts: 198 },
  { username: "trapped_codfish", displayName: "Trapped Codfish", verified: false, followers: 1543, following: 456, posts: 287 },
  { username: "transfer_cod", displayName: "Transfer Cod", verified: false, followers: 432, following: 234, posts: 123 },
  { username: "tra_fresh_fish", displayName: "Tra Fresh Fish", verified: false, followers: 2876, following: 654, posts: 421 },
  { username: "tragic_coder", displayName: "Tragic Coder", verified: false, followers: 1234, following: 345, posts: 234 },
  { username: "train_fish_cod", displayName: "Train Fish Cod", verified: false, followers: 987, following: 234, posts: 176 },
  { username: "tra_cod_lover", displayName: "Tra Cod Lover", verified: false, followers: 765, following: 234, posts: 145 },
  { username: "traffic_cod_game", displayName: "Traffic Cod Game", verified: false, followers: 3456, following: 678, posts: 489 },
  { username: "trap_fish_code", displayName: "Trap Fish Code", verified: false, followers: 1876, following: 432, posts: 298 },
  { username: "tra_codfish_king", displayName: "Tra Codfish King", verified: false, followers: 2345, following: 543, posts: 376 },
  { username: "traditional_fisher", displayName: "Traditional Fisher", verified: false, followers: 1098, following: 345, posts: 223 },
  { username: "trafish_cod", displayName: "Trafish cod", verified: true, followers: 2847, following: 892, posts: 347 },
  { username: "starfish_lover", displayName: "Starfish Lover", verified: false, followers: 3421, following: 567, posts: 412 },
  { username: "crafty_fish", displayName: "Crafty Fish", verified: false, followers: 1876, following: 432, posts: 289 },
  { username: "jellyfish_pro", displayName: "Jellyfish Pro", verified: false, followers: 2543, following: 654, posts: 367 },
  { username: "swordfish_king", displayName: "Swordfish King", verified: false, followers: 1987, following: 456, posts: 298 },
  { username: "goldfish_gaming", displayName: "Goldfish Gaming", verified: false, followers: 4532, following: 789, posts: 521 },
  { username: "catfish_hunter", displayName: "Catfish Hunter", verified: false, followers: 987, following: 234, posts: 176 },
  { username: "blowfish_bob", displayName: "Blowfish Bob", verified: false, followers: 1234, following: 345, posts: 245 },
  { username: "tuna_fish_daily", displayName: "Tuna Fish Daily", verified: false, followers: 3298, following: 678, posts: 445 },
  { username: "flying_fish_tv", displayName: "Flying Fish TV", verified: true, followers: 8765, following: 234, posts: 678 },
  { username: "trash_panda_fish", displayName: "Trash Panda Fish", verified: false, followers: 2109, following: 543, posts: 334 },
  { username: "flash_fish", displayName: "Flash Fish", verified: false, followers: 1543, following: 432, posts: 267 },
  { username: "trashcan_fisher", displayName: "Trashcan Fisher", verified: false, followers: 876, following: 234, posts: 189 },
  { username: "grafitti_fish", displayName: "Grafitti Fish", verified: false, followers: 1765, following: 456, posts: 298 },
  { username: "crayfish_code", displayName: "Crayfish Code", verified: false, followers: 2876, following: 567, posts: 398 },
  { username: "shellfish_pro", displayName: "Shellfish Pro", verified: false, followers: 1432, following: 345, posts: 256 },
  { username: "raffish_gamer", displayName: "Raffish Gamer", verified: false, followers: 987, following: 234, posts: 178 },
  { username: "trawler_fish", displayName: "Trawler Fish", verified: false, followers: 2198, following: 543, posts: 356 },
  { username: "traffic_fish_inc", displayName: "Traffic Fish Inc", verified: false, followers: 3654, following: 678, posts: 467 },
  { username: "draft_fish", displayName: "Draft Fish", verified: false, followers: 1234, following: 345, posts: 234 },
  { username: "gaming_king_2024", displayName: "Gaming King", verified: true, followers: 45678, following: 234, posts: 1234 },
  { username: "random_user_42", displayName: "Random User", verified: false, followers: 432, following: 567, posts: 123 }
];

const shitStagramPosts = [
  {
    id: 1,
    username: "trafish_cod",
    userDisplay: "Trafish cod",
    verified: true,
    image: "img/latestpost.png",
    likes: 1247,
    caption: "Just caught the biggest fish ever! 🎣 #fishing #nature #blessed",
    timestamp: "2 Std.",
    comments: [
      { username: "gaming_king_2024", text: "Wow das ist ja riesig! 😱" },
      { username: "dieter_official", text: "Respekt @trafish_cod! Wie lange hat das gedauert?" },
      { username: "trash_fish_cod", text: "Fake... das ist Photoshop 🙄" },
      { username: "trafish_god", text: "LEGEND! 🔥" }
    ]
  },
  {
    id: 2,
    username: "trafish_cod",
    userDisplay: "Trafish cod",
    verified: true,
    image: "img/Post1.png",
    likes: 892,
    caption: "Sunset at the lake 🌅 Perfect evening for fishing",
    timestamp: "1 Tag",
    comments: [
      { username: "random_user_42", text: "So schön! 😍" },
      { username: "gaming_king_2024", text: "Gönn dir @trafish_cod" }
    ]
  },
  {
    id: 3,
    username: "trafish_cod",
    userDisplay: "Trafish cod",
    verified: true,
    image: "img/Post2.png",
    likes: 1456,
    caption: "New fishing gear arrived! 🎣 Can't wait to try it out",
    timestamp: "2 Tage",
    comments: [
      { username: "dieter_official", text: "Welche Marke ist das?" },
      { username: "trafish_god", text: "Ich hab die gleiche! Mega gut @trafish_cod" },
      { username: "trash_fish_cod", text: "Bisschen teuer oder? 💸" }
    ]
  },
  {
    id: 4,
    username: "trafish_cod",
    userDisplay: "Trafish cod",
    verified: true,
    image: "img/Post3.png",
    likes: 2341,
    caption: "Epic catch of the day! 🐟 This one's a keeper",
    timestamp: "3 Tage",
    comments: [
      { username: "gaming_king_2024", text: "MASSIVE! 🤯" },
      { username: "random_user_42", text: "Wie viel kg?" },
      { username: "dieter_official", text: "Glückwunsch Bro! 💪" }
    ]
  },
  {
    id: 5,
    username: "trafish_cod",
    userDisplay: "Trafish cod",
    verified: true,
    image: "img/Post4.png",
    likes: 1789,
    caption: "Morning fog over the water ☁️ Best time to fish",
    timestamp: "4 Tage",
    comments: [
      { username: "trafish_god", text: "Traumhaft! 😌" },
      { username: "trash_fish_cod", text: "Zu früh für mich lol" }
    ]
  },
  {
    id: 6,
    username: "trafish_cod",
    userDisplay: "Trafish cod",
    verified: true,
    image: "img/Post5.png",
    likes: 3201,
    caption: "Feeling blessed today 🙏 Nature is amazing",
    timestamp: "5 Tage",
    comments: [
      { username: "gaming_king_2024", text: "Facts! 🙌" },
      { username: "dieter_official", text: "Wo ist das @trafish_cod?" },
      { username: "random_user_42", text: "Wunderschön!" }
    ]
  },
  {
    id: 7,
    username: "trafish_cod",
    userDisplay: "Trafish cod",
    verified: true,
    image: "img/Post6.png",
    likes: 987,
    caption: "Throwback to last summer ☀️ Good times at the lake",
    timestamp: "6 Tage",
    comments: [
      { username: "trash_fish_cod", text: "Nostalgie pur 😢" },
      { username: "trafish_god", text: "War ne geile Zeit!" }
    ]
  },
  {
    id: 8,
    username: "trafish_cod",
    userDisplay: "Trafish cod",
    verified: true,
    image: "img/Post7.png",
    likes: 4562,
    caption: "Can't believe I caught this! 😱 Biggest one yet",
    timestamp: "1 Woche",
    comments: [
      { username: "gaming_king_2024", text: "INSANE catch @trafish_cod! 🔥" },
      { username: "dieter_official", text: "Weltrekord? 😂" },
      { username: "random_user_42", text: "Das ist unfassbar groß!" }
    ]
  },
  {
    id: 9,
    username: "trafish_cod",
    userDisplay: "Trafish cod",
    verified: true,
    image: "img/Post8.png",
    likes: 1123,
    caption: "Vibing with nature 🌿 Peaceful day by the water",
    timestamp: "1 Woche",
    comments: [
      { username: "trafish_god", text: "Entspannung pur! ✨" },
      { username: "trash_fish_cod", text: "Gönnung @trafish_cod" }
    ]
  },
  {
    id: 11,
    username: "trafish_cod",
    userDisplay: "Trafish cod",
    verified: true,
    image: "img/Post9.png",
    likes: 2156,
    caption: "Early morning adventures 🌄 The best catches happen at dawn",
    timestamp: "2 Wochen",
    comments: [
      { username: "dieter_official", text: "So früh schon unterwegs! 💪" },
      { username: "trafish_god", text: "Dedication! 🙌" }
    ]
  },
  {
    id: 12,
    username: "trafish_cod",
    userDisplay: "Trafish cod",
    verified: true,
    image: "img/Post10.png",
    likes: 1845,
    caption: "Weekend fishing trip with the crew 🎣 #squadgoals",
    timestamp: "2 Wochen",
    comments: [
      { username: "gaming_king_2024", text: "Looks like fun! 🔥" },
      { username: "random_user_42", text: "Wann kann ich mit? 😊" }
    ]
  },
  {
    id: 13,
    username: "trafish_cod",
    userDisplay: "Trafish cod",
    verified: true,
    image: "img/Post11.png",
    likes: 3267,
    caption: "Perfect weather for fishing today ☀️ Nature never disappoints",
    timestamp: "3 Wochen",
    comments: [
      { username: "trash_fish_cod", text: "Traumwetter! 😍" },
      { username: "dieter_official", text: "Mega Wetter @trafish_cod!" }
    ]
  },
  {
    id: 14,
    username: "trafish_cod",
    userDisplay: "Trafish cod",
    verified: true,
    image: "img/Post12.png",
    likes: 1678,
    caption: "Testing out my new rod 🎣 First impressions are amazing!",
    timestamp: "3 Wochen",
    comments: [
      { username: "trafish_god", text: "Welches Modell? 🤔" },
      { username: "gaming_king_2024", text: "Sieht professionell aus!" }
    ]
  },
  {
    id: 15,
    username: "trafish_cod",
    userDisplay: "Trafish cod",
    verified: true,
    image: "img/Post13.png",
    likes: 2934,
    caption: "Golden hour at the pier 🌅 These moments make it all worth it",
    timestamp: "4 Wochen",
    comments: [
      { username: "random_user_42", text: "Wunderschönes Foto! 📸" },
      { username: "trash_fish_cod", text: "Artist @trafish_cod 🎨" }
    ]
  },
  {
    id: 16,
    username: "trafish_cod",
    userDisplay: "Trafish cod",
    verified: true,
    image: "img/Post14.png",
    likes: 2145,
    caption: "Teaching the next generation 🎓 Sharing my passion for fishing",
    timestamp: "4 Wochen",
    comments: [
      { username: "dieter_official", text: "Respekt! 🙏" },
      { username: "trafish_god", text: "Legend behavior 💯" }
    ]
  },
  {
    id: 17,
    username: "trafish_cod",
    userDisplay: "Trafish cod",
    verified: true,
    image: "img/Post15.png",
    likes: 1523,
    caption: "Another successful day 🐟 The water was perfect today",
    timestamp: "1 Monat",
    comments: [
      { username: "gaming_king_2024", text: "Always winning! 🏆" },
      { username: "random_user_42", text: "Wie machst du das? 😱" }
    ]
  },
  {
    id: 18,
    username: "trafish_cod",
    userDisplay: "Trafish cod",
    verified: true,
    image: "img/Post16.png",
    likes: 2876,
    caption: "Exploring new fishing spots 🗺️ Always looking for the next adventure",
    timestamp: "1 Monat",
    comments: [
      { username: "trash_fish_cod", text: "Explorer vibes! 🧭" },
      { username: "trafish_god", text: "Take me with you! 🚗" }
    ]
  },
  {
    id: 19,
    username: "trafish_cod",
    userDisplay: "Trafish cod",
    verified: true,
    image: "img/Post17.png",
    likes: 1967,
    caption: "Night fishing hits different 🌙 The calm and the thrill combined",
    timestamp: "1 Monat",
    comments: [
      { username: "dieter_official", text: "Mutig in der Nacht! 🌃" },
      { username: "gaming_king_2024", text: "Spooky but cool 👻" }
    ]
  },
  {
    id: 20,
    username: "trafish_cod",
    userDisplay: "Trafish cod",
    verified: true,
    image: "img/Post18.png",
    likes: 2345,
    caption: "Grateful for days like these 🙏 Living my best life by the water",
    timestamp: "2 Monate",
    comments: [
      { username: "random_user_42", text: "Goals! ✨" },
      { username: "trash_fish_cod", text: "Living the dream @trafish_cod 💭" }
    ]
  },
  {
    id: 21,
    username: "trafish_cod",
    userDisplay: "Trafish cod",
    verified: true,
    image: "img/Post19.png",
    likes: 1734,
    caption: "Patience is key in fishing 🎣 Good things come to those who wait",
    timestamp: "2 Monate",
    comments: [
      { username: "trafish_god", text: "Wise words! 📖" },
      { username: "dieter_official", text: "Philosophy @trafish_cod 🤔" }
    ]
  },
  {
    id: 100,
    username: "whisker_paws",
    userDisplay: "Whisker Paws",
    verified: true,
    image: "img/home1.png",
    likes: 5634,
    caption: "New gaming setup is INSANE! 🎮💜 RGB on max",
    timestamp: "3 Std.",
    comments: [
      { username: "trafish_cod", text: "Sick setup! 🔥" },
      { username: "random_user_42", text: "Wie viel hat das gekostet? 💰" },
      { username: "dieter_official", text: "Ich brauch auch so eins @whisker_paws" }
    ]
  },
  {
    id: 101,
    username: "sneaky_squeaker",
    userDisplay: "Sneaky Squeaker",
    verified: false,
    image: "img/home2.png",
    likes: 456,
    caption: "Sunset vibes ✨ Golden hour hitting different",
    timestamp: "5 Std.",
    comments: [
      { username: "photo_freak_42", text: "Aesthetic! 📸" },
      { username: "whisker_paws", text: "Beautiful shot!" }
    ]
  },
  {
    id: 102,
    username: "hairy_dieter",
    userDisplay: "HairyDieter",
    verified: false,
    image: "img/home3.png",
    likes: 234,
    caption: "Monday mood 😎 Let's get this week started",
    timestamp: "7 Std.",
    comments: [
      { username: "trafish_cod", text: "Let's go! 💪" },
      { username: "random_user_42", text: "Motivation pur @dieter_official" }
    ]
  },
  {
    id: 103,
    username: "kungfu_panda",
    userDisplay: "KungFu Panda",
    verified: false,
    image: "img/home4.png",
    likes: 678,
    caption: "Weekend adventure! 🏞️ Exploring new spots",
    timestamp: "9 Std.",
    comments: [
      { username: "sneaky_squeaker", text: "Wo ist das? Sieht cool aus!" },
      { username: "whisker_paws", text: "Adventure time! 🗺️" },
      { username: "dieter_official", text: "Nimm mich mit @bamboo_muncher 😂" }
    ]
  },
  {
    id: 104,
    username: "alpha_lion",
    userDisplay: "Alpha Lion",
    verified: false,
    image: "img/home5.png",
    likes: 321,
    caption: "Just chilling 🍻 Weekend vibes on point",
    timestamp: "12 Std.",
    comments: [
      { username: "photo_freak_42", text: "Prost! 🍺" },
      { username: "trafish_cod", text: "Gönn dir!" }
    ]
  },
  {
    id: 105,
    username: "savage_mane",
    userDisplay: "Savage Mane",
    verified: true,
    image: "img/home6.png",
    likes: 4123,
    caption: "Victory royale! 🏆 First place baby!",
    timestamp: "1 Tag",
    comments: [
      { username: "dieter_official", text: "GG! 🎮" },
      { username: "trafish_cod", text: "Beast mode @savage_mane! 💯" },
      { username: "random_user_42", text: "Carry me next time? 😅" }
    ]
  }
];

function initShitstagram() {
  const feed = document.getElementById("shitstagram-feed");
  const searchBtn = document.getElementById("shitstagram-search-btn");
  
  // Render Feed
  renderShitstagramFeed();
  
  // Search Button Click
  searchBtn.onclick = () => {
    showShitstagramSearch();
  };
  
  // Starte Pause-Popup Intervall für Stage 2
  startStage2PausePopup();
  
  // Starte Benachrichtigungen
  startStage2Notifications();
}

// Helper function to get avatar content
function getAvatarContent(username, displayName) {
  // Special case: trafish_cod gets Trafish.png
  if (username === "trafish_cod") {
    return `<img src="img/Trafish.png" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
  }
  // Other trafish users get fish1-10.png based on hash
  if (username.includes('trafish') || (username.startsWith('tra') && username.includes('fish'))) {
    const hash = username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const fishNumber = (hash % 10) + 1; // 1-10
    return `<img src="img/fish${fishNumber}.png" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
  }
  // Default to first letter
  return displayName[0];
}

// Universal function to create post menu
function createPostMenu(menuBtn, postId, username) {
  // Remove existing dropdown if any
  const existingDropdown = document.querySelector('.shitstagram-menu-dropdown');
  if (existingDropdown) {
    existingDropdown.remove();
    return;
  }
  
  // Create dropdown menu - verwirrende Optionen, Teilen versteckt
  const dropdown = document.createElement('div');
  dropdown.className = 'shitstagram-menu-dropdown';
  dropdown.innerHTML = `
    <button class="shitstagram-menu-item" data-submenu="settings">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94L14.4 2.81c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" fill="currentColor"/>
      </svg>
      Einstellungen
      <span class="menu-arrow">›</span>
    </button>
    <button class="shitstagram-menu-item" data-submenu="manage">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z" fill="currentColor"/>
      </svg>
      Beitrag verwalten
      <span class="menu-arrow">›</span>
    </button>
    <button class="shitstagram-menu-item" data-submenu="privacy">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" fill="currentColor"/>
      </svg>
      Datenschutz
      <span class="menu-arrow">›</span>
    </button>
    <button class="shitstagram-menu-item" data-submenu="more">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="currentColor"/>
      </svg>
      Weitere Optionen
      <span class="menu-arrow">›</span>
    </button>
  `;
  
  // Position dropdown
  const rect = menuBtn.getBoundingClientRect();
  dropdown.style.position = 'fixed';
  dropdown.style.top = `${rect.bottom + 5}px`;
  dropdown.style.right = `${window.innerWidth - rect.right}px`;
  
  document.body.appendChild(dropdown);
  
  // Scroll listener to fade out menu (all 3 levels)
  let lastScrollY = window.scrollY;
  const scrollHandler = () => {
    if (Math.abs(window.scrollY - lastScrollY) > 10) {
      dropdown.style.transition = 'opacity 0.3s';
      dropdown.style.opacity = '0';
      const submenu = document.querySelector('.shitstagram-submenu:not(.shitstagram-submenu-nested)');
      const nestedSubmenu = document.querySelector('.shitstagram-submenu-nested');
      if (submenu) {
        submenu.style.transition = 'opacity 0.3s';
        submenu.style.opacity = '0';
      }
      if (nestedSubmenu) {
        nestedSubmenu.style.transition = 'opacity 0.3s';
        nestedSubmenu.style.opacity = '0';
      }
      setTimeout(() => {
        dropdown.remove();
        if (submenu) submenu.remove();
        if (nestedSubmenu) nestedSubmenu.remove();
      }, 300);
      window.removeEventListener('scroll', scrollHandler, true);
      document.removeEventListener('scroll', scrollHandler, true);
    }
  };
  window.addEventListener('scroll', scrollHandler, true);
  document.addEventListener('scroll', scrollHandler, true);
  
  // Handle submenu items
  dropdown.querySelectorAll('.shitstagram-menu-item[data-submenu]').forEach(item => {
    item.onclick = (e) => {
      e.stopPropagation();
      const submenuType = item.dataset.submenu;
      
      // Remove all existing submenus and nested submenus
      const existingSubmenus = document.querySelectorAll('.shitstagram-submenu');
      existingSubmenus.forEach(sm => sm.remove());
      
      // Create submenu - alle haben "Teilen" versteckt drin
      const submenu = document.createElement('div');
      submenu.className = 'shitstagram-submenu';
      
      if (submenuType === 'settings') {
        submenu.innerHTML = `
          <button class="shitstagram-menu-item" data-action="adjust">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z" fill="currentColor"/>
            </svg>
            Anzeigeeinstellungen
          </button>
          <button class="shitstagram-menu-item" data-action="quality">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
            </svg>
            Qualitätseinstellungen
          </button>
          <button class="shitstagram-menu-item" data-submenu="share">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 12L9 17L9 13L20 13L20 11L9 11L9 7L4 12Z" fill="currentColor" transform="rotate(90 12 12)"/>
            </svg>
            Weiterleitungsoptionen
            <span class="menu-arrow">›</span>
          </button>
          <button class="shitstagram-menu-item" data-action="reset">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" fill="currentColor"/>
            </svg>
            Zurücksetzen
          </button>
        `;
      } else if (submenuType === 'info') {
        submenu.innerHTML = `
          <button class="shitstagram-menu-item" data-action="details">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" fill="currentColor"/>
            </svg>
            Beitragsdetails
          </button>
          <button class="shitstagram-menu-item" data-action="stats">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" fill="currentColor"/>
            </svg>
            Statistiken
          </button>
          <button class="shitstagram-menu-item" data-submenu="share">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 12L9 17L9 13L20 13L20 11L9 11L9 7L4 12Z" fill="currentColor" transform="rotate(90 12 12)"/>
            </svg>
            Export & Teilen
            <span class="menu-arrow">›</span>
          </button>
          <button class="shitstagram-menu-item" data-action="history">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" fill="currentColor"/>
            </svg>
            Verlauf ansehen
          </button>
        `;
      } else if (submenuType === 'manage') {
        submenu.innerHTML = `
          <button class="shitstagram-menu-item" data-action="edit">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="currentColor"/>
            </svg>
            Beitrag bearbeiten
          </button>
          <button class="shitstagram-menu-item" data-action="archive">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z" fill="currentColor"/>
            </svg>
            Archivieren
          </button>
          <button class="shitstagram-menu-item" data-submenu="share">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 12L9 17L9 13L20 13L20 11L9 11L9 7L4 12Z" fill="currentColor" transform="rotate(90 12 12)"/>
            </svg>
            Verteilen
            <span class="menu-arrow">›</span>
          </button>
          <button class="shitstagram-menu-item" data-action="delete">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="#ff3366"/>
            </svg>
            Löschen
          </button>
        `;
      } else if (submenuType === 'collections') {
        submenu.innerHTML = `
          <button class="shitstagram-menu-item" data-action="add-collection">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"/>
            </svg>
            Zu Sammlung hinzufügen
          </button>
          <button class="shitstagram-menu-item" data-action="new-collection">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-1 8h-3v3h-2v-3h-3v-2h3V9h2v3h3v2z" fill="currentColor"/>
            </svg>
            Neue Sammlung erstellen
          </button>
          <button class="shitstagram-menu-item" data-submenu="share">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 12L9 17L9 13L20 13L20 11L9 11L9 7L4 12Z" fill="currentColor" transform="rotate(90 12 12)"/>
            </svg>
            Sammlung teilen
            <span class="menu-arrow">›</span>
          </button>
        `;
      } else if (submenuType === 'notifications') {
        submenu.innerHTML = `
          <button class="shitstagram-menu-item" data-action="enable">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.58 4.08L6.15 2.65C3.75 4.48 2.17 7.3 2.03 10.5h2c.15-2.65 1.51-4.97 3.55-6.42zm12.39 6.42h2c-.15-3.2-1.73-6.02-4.12-7.85l-1.42 1.43c2.02 1.45 3.39 3.77 3.54 6.42zM18 11c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2v-5zm-6 11c.14 0 .27-.01.4-.04.65-.14 1.18-.58 1.44-1.18.1-.24.15-.5.15-.78h-4c.01 1.1.9 2 2.01 2z" fill="currentColor"/>
            </svg>
            Aktivieren
          </button>
          <button class="shitstagram-menu-item" data-action="disable">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 18.69L7.84 6.14 5.27 3.49 4 4.76l2.8 2.8v.01c-.52.99-.8 2.16-.8 3.42v5l-2 2v1h13.73l2 2L21 19.72l-1-1.03zM12 22c1.11 0 2-.89 2-2h-4c0 1.11.89 2 2 2zm6-7.32V11c0-3.08-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68c-.15.03-.29.08-.42.12-.1.03-.2.07-.3.11h-.01c-.01 0-.01 0-.02.01-.23.09-.46.2-.68.31 0 0-.01 0-.01.01L18 14.68z" fill="currentColor"/>
            </svg>
            Deaktivieren
          </button>
          <button class="shitstagram-menu-item" data-submenu="share">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 12L9 17L9 13L20 13L20 11L9 11L9 7L4 12Z" fill="currentColor" transform="rotate(90 12 12)"/>
            </svg>
            Benachrichtigung senden
            <span class="menu-arrow">›</span>
          </button>
        `;
      } else if (submenuType === 'privacy') {
        submenu.innerHTML = `
          <button class="shitstagram-menu-item" data-action="public">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="currentColor"/>
            </svg>
            Öffentlich machen
          </button>
          <button class="shitstagram-menu-item" data-action="private">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" fill="currentColor"/>
            </svg>
            Privat machen
          </button>
          <button class="shitstagram-menu-item" data-submenu="share">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 12L9 17L9 13L20 13L20 11L9 11L9 7L4 12Z" fill="currentColor" transform="rotate(90 12 12)"/>
            </svg>
            Freigabe-Optionen
            <span class="menu-arrow">›</span>
          </button>
        `;
      } else if (submenuType === 'account') {
        submenu.innerHTML = `
          <button class="shitstagram-menu-item" data-action="switch">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="currentColor"/>
            </svg>
            Konto wechseln
          </button>
          <button class="shitstagram-menu-item" data-action="settings">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94L14.4 2.81c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" fill="currentColor"/>
            </svg>
            Kontoeinstellungen
          </button>
          <button class="shitstagram-menu-item" data-submenu="share">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 12L9 17L9 13L20 13L20 11L9 11L9 7L4 12Z" fill="currentColor" transform="rotate(90 12 12)"/>
            </svg>
            Profil teilen
            <span class="menu-arrow">›</span>
          </button>
        `;
      } else if (submenuType === 'more') {
        submenu.innerHTML = `
          <button class="shitstagram-menu-item" data-action="download">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z" fill="currentColor"/>
            </svg>
            Herunterladen
          </button>
          <button class="shitstagram-menu-item" data-action="embed">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" fill="currentColor"/>
            </svg>
            Einbetten
          </button>
          <button class="shitstagram-menu-item" data-submenu="share">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 12L9 17L9 13L20 13L20 11L9 11L9 7L4 12Z" fill="currentColor" transform="rotate(90 12 12)"/>
            </svg>
            Weiterleiten & Teilen
            <span class="menu-arrow">›</span>
          </button>
          <button class="shitstagram-menu-item" data-action="qr">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zm8-2v8h8V3h-8zm6 6h-4V5h4v4zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm13-2h-2v3h-3v2h3v3h2v-3h3v-2h-3zm-2-2h2v2h-2zM19 3h2v2h-2zm-2 18h2v2h-2z" fill="currentColor"/>
            </svg>
            QR-Code erstellen
          </button>
        `;
      } else if (submenuType === 'notinterested') {
        submenu.innerHTML = `
          <button class="shitstagram-menu-item" id="submenu-hide-post">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 7C14.76 7 17 9.24 17 12C17 12.65 16.87 13.26 16.64 13.83L19.56 16.75C21.07 15.49 22.26 13.86 22.99 12C21.26 7.61 16.99 4.5 12 4.5C10.59 4.5 9.25 4.75 8.01 5.2L10.17 7.36C10.74 7.13 11.35 7 12 7ZM2 4.27L4.28 6.55L4.74 7.01C3.08 8.3 1.78 10.02 1 12C2.73 16.39 7 19.5 12 19.5C13.55 19.5 15.03 19.2 16.38 18.66L16.8 19.08L19.73 22L21 20.73L3.27 3L2 4.27ZM7.53 9.8L9.08 11.35C9.03 11.56 9 11.78 9 12C9 13.66 10.34 15 12 15C12.22 15 12.44 14.97 12.65 14.92L14.2 16.47C13.53 16.8 12.79 17 12 17C9.24 17 7 14.76 7 12C7 11.21 7.2 10.47 7.53 9.8ZM11.84 9.02L14.99 12.17L15.01 12.01C15.01 10.35 13.67 9.01 12.01 9.01L11.84 9.02Z" fill="currentColor"/>
            </svg>
            Diesen Beitrag ausblenden
          </button>
          <button class="shitstagram-menu-item" id="submenu-unfollow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
              <path d="M19 7L13 13" stroke="#ff3366" stroke-width="2"/>
              <path d="M13 7L19 13" stroke="#ff3366" stroke-width="2"/>
            </svg>
            ${username} nicht mehr folgen
          </button>
          <button class="shitstagram-menu-item" id="submenu-mute">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.5 12C16.5 14.21 14.71 16 12.5 16C10.29 16 8.5 14.21 8.5 12C8.5 9.79 10.29 8 12.5 8C14.71 8 16.5 9.79 16.5 12Z" fill="currentColor"/>
              <path d="M2 4L22 20" stroke="currentColor" stroke-width="2"/>
            </svg>
            ${username} stummschalten
          </button>
        `;
      } else if (submenuType === 'report') {
        submenu.innerHTML = `
          <button class="shitstagram-menu-item" id="submenu-report-spam">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7V13C2 18.55 5.84 23.74 12 25C18.16 23.74 22 18.55 22 13V7L12 2Z" fill="#ff3366"/>
            </svg>
            Spam
          </button>
          <button class="shitstagram-menu-item" id="submenu-report-inappropriate">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 21H23L12 2L1 21ZM13 18H11V16H13V18ZM13 14H11V10H13V14Z" fill="#ff3366"/>
            </svg>
            Unangemessener Inhalt
          </button>
          <button class="shitstagram-menu-item" id="submenu-report-fake">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM15.59 7L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z" fill="#ff3366"/>
            </svg>
            Falsche Informationen
          </button>
          <button class="shitstagram-menu-item" id="submenu-report-hate">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" fill="none" stroke="#ff3366" stroke-width="2"/>
              <path d="M2 2L22 22" stroke="#ff3366" stroke-width="2"/>
            </svg>
            Hassrede
          </button>
        `;
      } else if (submenuType === 'subscribe') {
        submenu.innerHTML = `
          <button class="shitstagram-menu-item" id="submenu-follow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
            </svg>
            ${username} folgen
          </button>
          <button class="shitstagram-menu-item" id="submenu-notify">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.37 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.64 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z" fill="currentColor"/>
            </svg>
            Benachrichtigungen aktivieren
          </button>
          <button class="shitstagram-menu-item" id="submenu-favorite">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" fill="currentColor"/>
            </svg>
            Zu Favoriten hinzufügen
          </button>
        `;
      }
      
      // Position submenu to the right or left depending on available space
      const itemRect = item.getBoundingClientRect();
      submenu.style.position = 'fixed';
      submenu.style.top = `${itemRect.top}px`;
      
      // Check if there's enough space on the right
      const submenuWidth = 200; // min-width from CSS
      if (itemRect.right + submenuWidth + 10 > window.innerWidth) {
        // Not enough space on right, show on left
        submenu.style.left = `${itemRect.left - submenuWidth - 5}px`;
      } else {
        submenu.style.left = `${itemRect.right + 5}px`;
      }
      
      document.body.appendChild(submenu);
      
      // Handle submenu actions - check if any item has share submenu
      const shareSubmenus = submenu.querySelectorAll('[data-submenu="share"]');
      if (shareSubmenus.length > 0) {
        // This submenu has a nested share option
        shareSubmenus.forEach(shareItem => {
          shareItem.onclick = (e) => {
            e.stopPropagation();
            
            // Remove existing nested submenu
            const existingNested = document.querySelector('.shitstagram-submenu-nested');
            if (existingNested) existingNested.remove();
            
            // Create nested share submenu
            const nestedSubmenu = document.createElement('div');
            nestedSubmenu.className = 'shitstagram-submenu shitstagram-submenu-nested';
            nestedSubmenu.innerHTML = `
              <button class="shitstagram-menu-item" id="submenu-share-message">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" stroke="currentColor" stroke-width="2"/>
                </svg>
                Als Nachricht senden
              </button>
              <button class="shitstagram-menu-item" id="submenu-share-story">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                  <path d="M12 8V12L15 15" stroke="currentColor" stroke-width="2"/>
                </svg>
                In Story teilen
              </button>
              <button class="shitstagram-menu-item" id="submenu-share-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.9 12C3.9 10.29 5.29 8.9 7 8.9H11V7H7C4.24 7 2 9.24 2 12C2 14.76 4.24 17 7 17H11V15.1H7C5.29 15.1 3.9 13.71 3.9 12ZM8 13H16V11H8V13ZM17 7H13V8.9H17C18.71 8.9 20.1 10.29 20.1 12C20.1 13.71 18.71 15.1 17 15.1H13V17H17C19.76 17 22 14.76 22 12C22 9.24 19.76 7 17 7Z" fill="currentColor"/>
                </svg>
                Link kopieren
              </button>
            `;
            
            // Position nested submenu to the right or left depending on available space
            const shareRect = shareItem.getBoundingClientRect();
            nestedSubmenu.style.position = 'fixed';
            nestedSubmenu.style.top = `${shareRect.top}px`;
            
            // Check if there's enough space on the right
            const nestedWidth = 200; // min-width from CSS
            if (shareRect.right + nestedWidth + 10 > window.innerWidth) {
              // Not enough space on right, show on left
              nestedSubmenu.style.left = `${shareRect.left - nestedWidth - 5}px`;
            } else {
              nestedSubmenu.style.left = `${shareRect.right + 5}px`;
            }
            
            document.body.appendChild(nestedSubmenu);
            
            // Update scroll handler to include nestedSubmenu
            window.removeEventListener('scroll', scrollHandler, true);
            document.removeEventListener('scroll', scrollHandler, true);
            const newScrollHandler = () => {
              if (Math.abs(window.scrollY - lastScrollY) > 10) {
                dropdown.style.transition = 'opacity 0.3s';
                dropdown.style.opacity = '0';
                submenu.style.transition = 'opacity 0.3s';
                submenu.style.opacity = '0';
                nestedSubmenu.style.transition = 'opacity 0.3s';
                nestedSubmenu.style.opacity = '0';
                setTimeout(() => {
                  dropdown.remove();
                  submenu.remove();
                  nestedSubmenu.remove();
                }, 300);
                window.removeEventListener('scroll', newScrollHandler, true);
                document.removeEventListener('scroll', newScrollHandler, true);
              }
            };
            window.addEventListener('scroll', newScrollHandler, true);
            document.addEventListener('scroll', newScrollHandler, true);
            
            // Handle nested share actions
            document.getElementById('submenu-share-message').onclick = (e) => {
              e.stopPropagation();
              dropdown.remove();
              submenu.remove();
              nestedSubmenu.remove();
              showShitstagramShareDialog(postId, username);
            };
            document.getElementById('submenu-share-story').onclick = (e) => {
              e.stopPropagation();
              dropdown.remove();
              submenu.remove();
              nestedSubmenu.remove();
              const errors = [
                'ERROR 0x80070057: Ungültiger Parameter',
                'FEHLER 403: Zugriff verweigert',
                'ERROR 0xC0000005: Zugriffsverletzung',
                'FATAL: Speicherverletzung bei 0x00000000',
                'ERROR 404: Story nicht gefunden',
                'WARNUNG: Heap korrupt detektiert',
                'ERROR 0x800F0922: Update fehlgeschlagen',
                'KRITISCH: Segmentation fault (core dumped)',
                'ERROR 500: Interner Server-Fehler',
                'FEHLER: Netzwerk-Timeout nach 30000ms'
              ];
              showErrorPopup(errors[Math.floor(Math.random() * errors.length)]);
            };
            document.getElementById('submenu-share-link').onclick = (e) => {
              e.stopPropagation();
              dropdown.remove();
              submenu.remove();
              nestedSubmenu.remove();
              const errors = [
                'ERROR 0xC000007B: Anwendung konnte nicht gestartet werden',
                'FEHLER 0x80004005: Nicht spezifizierter Fehler',
                'ERROR: Zwischenablage nicht verfügbar',
                'FATAL: Stack overflow in clipboard.dll',
                'ERROR 0x8007000E: Nicht genügend Arbeitsspeicher',
                'WARNUNG: Buffer overrun erkannt',
                'ERROR 0x80070002: System kann Datei nicht finden',
                'KRITISCH: Kernel panic - not syncing',
                'ERROR 502: Bad Gateway',
                'FEHLER: Ungültige Zeichenkette in Link-Buffer'
              ];
              showErrorPopup(errors[Math.floor(Math.random() * errors.length)]);
            };
          };
        });
      }
      
      // Generic handler for other submenu items (non-share) - Random errors
      submenu.querySelectorAll('.shitstagram-menu-item[data-action]').forEach(subItem => {
        subItem.onclick = (e) => {
          e.stopPropagation();
          dropdown.remove();
          submenu.remove();
          const errors = [
            'ERROR 0x80070005: Zugriff verweigert',
            'FEHLER 0xC0000142: Anwendung konnte nicht korrekt initialisiert werden',
            'ERROR: Unerwarteter NULL-Pointer',
            'FATAL: Assertion failed at line 2847',
            'ERROR 0x80070570: Datei oder Verzeichnis beschädigt',
            'WARNUNG: Race condition erkannt',
            'ERROR 0x80070490: Element nicht gefunden',
            'KRITISCH: Double free detected in glibc',
            'ERROR 503: Service vorübergehend nicht verfügbar',
            'FEHLER: Timeout beim Datenbankzugriff',
            'ERROR 0x8007007E: Modul wurde nicht gefunden',
            'FATAL: Use after free detected',
            'ERROR 0x80070003: System kann Pfad nicht finden',
            'WARNUNG: Memory leak in allocation pool',
            'ERROR 429: Zu viele Anfragen'
          ];
          showErrorPopup(errors[Math.floor(Math.random() * errors.length)]);
        };
      });
    };
  });
  
  // Close dropdown when clicking outside
  setTimeout(() => {
    document.addEventListener('click', function closeDropdown(e) {
      if (!e.target.closest('.shitstagram-menu-dropdown') && !e.target.closest('.shitstagram-submenu')) {
        dropdown.remove();
        const submenu = document.querySelector('.shitstagram-submenu');
        if (submenu) submenu.remove();
        document.removeEventListener('click', closeDropdown);
        window.removeEventListener('scroll', scrollHandler, true);
        document.removeEventListener('scroll', scrollHandler, true);
      }
    });
  }, 0);
}

function renderShitstagramFeed() {
  const feed = document.getElementById("shitstagram-feed");
  // Worst Practice: Trafish cod Post ist nicht im Feed sichtbar - muss gesucht werden
  const visiblePosts = shitStagramPosts.filter(post => post.username !== "trafish_cod");
  feed.innerHTML = visiblePosts.map(post => {
    const avatarContent = post.userDisplay[0];
    const isLiked = likedPosts.has(post.id);
    const likeClass = isLiked ? 'liked' : '';
    const currentLikes = isLiked ? post.likes + 1 : post.likes;
    return `
    <div class="shitstagram-post" data-post-id="${post.id}">
      <div class="shitstagram-post-header">
        <div class="shitstagram-post-user">
          <div class="shitstagram-avatar">${avatarContent}</div>
          <div class="shitstagram-user-info">
            <div class="shitstagram-username">
              ${post.userDisplay}
              ${post.verified ? '<span class="shitstagram-verified">✓</span>' : ''}
            </div>
            <div class="shitstagram-timestamp">${post.timestamp}</div>
          </div>
        </div>
        <div class="shitstagram-post-header-actions">
          <button class="shitstagram-post-menu" data-post-id="${post.id}" data-username="${post.username}">⋯</button>
        </div>
      </div>
      
      <div class="shitstagram-post-image" data-post-id="${post.id}">
        <img src="${post.image}" alt="Post">
        <canvas class="shitstagram-draw-canvas" data-post-id="${post.id}"></canvas>
        <div class="shitstagram-draw-info">Zeichne ein Herz zum Liken</div>
      </div>
      
      <div class="shitstagram-post-actions">
        <div class="shitstagram-action-group">
          <button class="shitstagram-action-btn shitstagram-unlike-btn" data-post-id="${post.id}" style="display: ${isLiked ? 'flex' : 'none'};">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="likeGradient-${post.id}" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#B20CE9;stop-opacity:1" />
                  <stop offset="50%" style="stop-color:#7d3ba8;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#5a2a7a;stop-opacity:1" />
                </linearGradient>
              </defs>
              <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" fill="url(#likeGradient-${post.id})" stroke="url(#likeGradient-${post.id})" stroke-width="2"/>
            </svg>
          </button>
          <span class="shitstagram-count shitstagram-likes-count" data-post-id="${post.id}">${currentLikes.toLocaleString()}</span>
        </div>
        <div class="shitstagram-action-group">
          <button class="shitstagram-action-btn shitstagram-comment-btn" data-post-id="${post.id}">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" stroke="currentColor" stroke-width="2"/>
            </svg>
          </button>
          <span class="shitstagram-count">${post.comments.length}</span>
        </div>
      </div>
      
      <div class="shitstagram-post-info">
        <div class="shitstagram-caption">
          <strong>${post.userDisplay}</strong> ${post.caption}
        </div>
        <div class="shitstagram-view-comments" data-post-id="${post.id}">Alle ${post.comments.length} Kommentare ansehen</div>
      </div>
    </div>
  `;
  }).join('');
  
  // Add post menu listeners (3-dot menu)
  document.querySelectorAll('.shitstagram-post-menu').forEach(menuBtn => {
    menuBtn.onclick = (e) => {
      e.stopPropagation();
      const postId = menuBtn.dataset.postId;
      const username = menuBtn.dataset.username;
      createPostMenu(menuBtn, postId, username);
    };
  });

  
  // Add unlike button listeners
  document.querySelectorAll('.shitstagram-unlike-btn').forEach(unlikeBtn => {
    unlikeBtn.onclick = (e) => {
      e.stopPropagation();
      const postId = parseInt(unlikeBtn.dataset.postId);
      
      // Unlike the post
      likedPosts.delete(postId);
      
      // Hide unlike button
      unlikeBtn.style.display = 'none';
      
      // Update like count
      const countEl = document.querySelector(`.shitstagram-likes-count[data-post-id="${postId}"]`);
      if (countEl) {
        const currentCount = parseInt(countEl.textContent.replace(/\./g, '').replace(/,/g, ''));
        countEl.textContent = (currentCount - 1).toLocaleString();
      }
      
      // Show canvas and info text again
      const canvas = document.querySelector(`.shitstagram-draw-canvas[data-post-id="${postId}"]`);
      if (canvas) {
        canvas.style.display = 'block';
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const infoEl = canvas.parentElement.querySelector('.shitstagram-draw-info');
        if (infoEl) infoEl.style.display = 'block';
        
        // Reinitialize drawing for this canvas
        initHeartDrawing();
      }
    };
  });
  
  // Add like button listeners
  document.querySelectorAll('.shitstagram-like-btn').forEach(likeBtn => {
    likeBtn.onclick = (e) => {
      e.stopPropagation();
      const postId = parseInt(likeBtn.dataset.postId);
      const isLiked = likeBtn.dataset.liked === 'true';
      
      if (!isLiked) {
        // Like the post
        likedPosts.add(postId);
        likeBtn.dataset.liked = 'true';
        likeBtn.classList.add('liked');
        
        // Füge Gradient zum SVG hinzu oder aktualisiere path
        const svg = likeBtn.querySelector('svg');
        if (svg) {
          // Create defs if not exists
          if (!svg.querySelector('defs')) {
            const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
            gradient.setAttribute('id', `likeGradient-${postId}`);
            gradient.setAttribute('x1', '0%');
            gradient.setAttribute('y1', '0%');
            gradient.setAttribute('x2', '100%');
            gradient.setAttribute('y2', '100%');
            
            const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop1.setAttribute('offset', '0%');
            stop1.setAttribute('style', 'stop-color:#B20CE9;stop-opacity:1');
            
            const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop2.setAttribute('offset', '50%');
            stop2.setAttribute('style', 'stop-color:#7d3ba8;stop-opacity:1');
            
            const stop3 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
            stop3.setAttribute('offset', '100%');
            stop3.setAttribute('style', 'stop-color:#5a2a7a;stop-opacity:1');
            
            gradient.appendChild(stop1);
            gradient.appendChild(stop2);
            gradient.appendChild(stop3);
            defs.appendChild(gradient);
            svg.insertBefore(defs, svg.firstChild);
          }
          
          // Always update path to use gradient
          const path = svg.querySelector('path');
          if (path) {
            path.setAttribute('fill', `url(#likeGradient-${postId})`);
            path.setAttribute('stroke', `url(#likeGradient-${postId})`);
          }
        }
        
        // Erhöhe Like-Count
        const countEl = document.querySelector(`.shitstagram-likes-count[data-post-id="${postId}"]`);
        if (countEl) {
          const currentCount = parseInt(countEl.textContent.replace(/\./g, '').replace(/,/g, ''));
          countEl.textContent = (currentCount + 1).toLocaleString();
        }
        
        // Zeige Herzen-Overlay
        showHeartsOverlay();
      } else {
        // Unlike the post
        likedPosts.delete(postId);
        likeBtn.dataset.liked = 'false';
        likeBtn.classList.remove('liked');
        
        // Remove gradient
        const svg = likeBtn.querySelector('svg');
        const path = svg.querySelector('path');
        if (path) {
          path.setAttribute('fill', 'none');
          path.setAttribute('stroke', 'currentColor');
        }
        
        // Reduziere Like-Count
        const countEl = document.querySelector(`.shitstagram-likes-count[data-post-id="${postId}"]`);
        if (countEl) {
          const currentCount = parseInt(countEl.textContent.replace(/\./g, '').replace(/,/g, ''));
          countEl.textContent = (currentCount - 1).toLocaleString();
        }
      }
    };
  });
  
  // Add comment button listeners
  document.querySelectorAll('.shitstagram-comment-btn').forEach(commentBtn => {
    commentBtn.onclick = (e) => {
      e.stopPropagation();
      const postId = commentBtn.dataset.postId;
      showShitstagramPostDetail(postId);
    };
  });
  
  // Add click listener to comments section
  document.querySelectorAll('.shitstagram-view-comments').forEach(commentsEl => {
    commentsEl.onclick = (e) => {
      e.stopPropagation();
      const postId = commentsEl.dataset.postId;
      showShitstagramPostDetail(postId);
    };
  });
  
  // Add click listener to post images (but not on canvas)
  document.querySelectorAll('.shitstagram-post-image').forEach(imageEl => {
    imageEl.onclick = (e) => {
      // Ignore clicks on canvas
      if (e.target.classList.contains('shitstagram-draw-canvas')) {
        return;
      }
      e.stopPropagation();
      const postEl = imageEl.closest('.shitstagram-post');
      if (postEl) {
        const postId = postEl.dataset.postId;
        showShitstagramPostDetail(postId);
      }
    };
  });
  
  // Initialize heart drawing on all canvases
  initHeartDrawing();
}

// Heart drawing system
function initHeartDrawing() {
  document.querySelectorAll('.shitstagram-draw-canvas').forEach(canvas => {
    const postId = parseInt(canvas.dataset.postId);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let points = [];
    
    // Check if post is already liked - if so, don't allow drawing
    if (likedPosts.has(postId)) {
      canvas.style.display = 'none';
      const infoEl = canvas.parentElement.querySelector('.shitstagram-draw-info');
      if (infoEl) infoEl.style.display = 'none';
      return;
    }
    
    const startDrawing = (e) => {
      // Prevent drawing while hearts overlay is showing
      if (isShowingHeartsOverlay) return;
      
      e.preventDefault();
      e.stopPropagation();
      isDrawing = true;
      points = [];
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    
    const draw = (e) => {
      if (!isDrawing) return;
      // Stop drawing if overlay appears during drawing
      if (isShowingHeartsOverlay) {
        isDrawing = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        points = [];
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX || e.touches[0].clientX) - rect.left;
      const y = (e.clientY || e.touches[0].clientY) - rect.top;
      
      points.push({ x, y });
      
      // Draw with purple gradient
      ctx.strokeStyle = '#B20CE9';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      if (points.length > 1) {
        const prev = points[points.length - 2];
        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    };
    
    const endDrawing = (e) => {
      if (!isDrawing) return;
      // Prevent completing drawing if overlay is showing
      if (isShowingHeartsOverlay) {
        isDrawing = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        points = [];
        return;
      }
      
      e.preventDefault();
      e.stopPropagation();
      isDrawing = false;
      
      // Analyze if drawn shape is a heart
      if (points.length > 20) {
        const isHeart = analyzeHeartShape(points, canvas.width, canvas.height);
        
        if (isHeart) {
          // Success! Like the post
          likedPosts.add(postId);
          
          // Clear canvas and hide it
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          canvas.style.display = 'none';
          
          // Hide all canvases and info texts for this post ID (in case it's open in multiple views)
          document.querySelectorAll(`.shitstagram-draw-canvas[data-post-id="${postId}"]`).forEach(c => {
            c.style.display = 'none';
            const infoEl = c.parentElement.querySelector('.shitstagram-draw-info');
            if (infoEl) infoEl.style.display = 'none';
          });
          
          // Show unlike button (heart icon)
          document.querySelectorAll(`.shitstagram-unlike-btn[data-post-id="${postId}"]`).forEach(btn => {
            btn.style.display = 'flex';
          });
          
          // Update like count in feed
          const likesCountEl = document.querySelector(`.shitstagram-likes-count[data-post-id="${postId}"]`);
          if (likesCountEl) {
            const currentCount = parseInt(likesCountEl.textContent.replace(/\./g, '').replace(/,/g, ''));
            likesCountEl.textContent = (currentCount + 1).toLocaleString();
          }
          
          // Update like count in detail view if open
          const detailPopup = document.querySelector('.shitstagram-post-detail-popup');
          if (detailPopup) {
            const detailCount = detailPopup.querySelector('.shitstagram-count');
            if (detailCount) {
              const currentCount = parseInt(detailCount.textContent.replace(/\./g, '').replace(/,/g, ''));
              detailCount.textContent = (currentCount + 1).toLocaleString();
            }
            
            // Show unlike button in detail view
            const detailUnlikeBtn = detailPopup.querySelector(`.shitstagram-unlike-btn[data-post-id="${postId}"]`);
            if (detailUnlikeBtn) {
              detailUnlikeBtn.style.display = 'flex';
            }
          }
          
          // Show hearts overlay
          showHeartsOverlay();
        } else {
          // Failed - show error
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          points = [];
          showErrorPopup("Herz nicht erkannt");
        }
      } else {
        // Too few points
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        points = [];
      }
    };
    
    // Mouse events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', endDrawing);
    canvas.addEventListener('mouseleave', () => {
      if (isDrawing) {
        isDrawing = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        points = [];
      }
    });
    
    // Touch events
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', endDrawing);
  });
}

// Analyze if drawn shape resembles a heart - balanced validation
function analyzeHeartShape(points, canvasWidth, canvasHeight) {
  if (points.length < 25) return false;
  
  // Normalize points to 0-1 range
  const minX = Math.min(...points.map(p => p.x));
  const maxX = Math.max(...points.map(p => p.x));
  const minY = Math.min(...points.map(p => p.y));
  const maxY = Math.max(...points.map(p => p.y));
  
  const width = maxX - minX;
  const height = maxY - minY;
  
  // No minimum size requirement - any size is OK
  
  const normalized = points.map(p => ({
    x: (p.x - minX) / width,
    y: (p.y - minY) / height
  }));
  
  // Check if path is reasonably closed
  const firstPoint = normalized[0];
  const lastPoint = normalized[normalized.length - 1];
  const distance = Math.sqrt(Math.pow(firstPoint.x - lastPoint.x, 2) + Math.pow(firstPoint.y - lastPoint.y, 2));
  if (distance > 0.4) return false;
  
  // REJECT CIRCLES: Check if shape is too round/circular
  // Calculate center point
  const centerX = normalized.reduce((sum, p) => sum + p.x, 0) / normalized.length;
  const centerY = normalized.reduce((sum, p) => sum + p.y, 0) / normalized.length;
  
  // Calculate distances from center
  const distances = normalized.map(p => 
    Math.sqrt(Math.pow(p.x - centerX, 2) + Math.pow(p.y - centerY, 2))
  );
  
  const avgDistance = distances.reduce((sum, d) => sum + d, 0) / distances.length;
  const distanceVariance = distances.reduce((sum, d) => sum + Math.pow(d - avgDistance, 2), 0) / distances.length;
  const distanceStdDev = Math.sqrt(distanceVariance);
  
  // If points are very evenly distributed from center (low std deviation), it's likely a circle
  if (distanceStdDev < avgDistance * 0.15) {
    return false; // Too circular, reject
  }
  
  let score = 0;
  let criticalChecks = 0;
  
  // CRITICAL 1: Heart-like aspect ratio
  const aspectRatio = width / height;
  if (aspectRatio >= 0.7 && aspectRatio <= 1.4) {
    criticalChecks++;
    score += 2;
  }
  
  // CRITICAL 2: Must have BOTH lobes at top (left AND right)
  const topArea = normalized.filter(p => p.y < 0.4);
  if (topArea.length >= points.length * 0.12) {
    const topLeft = topArea.filter(p => p.x < 0.45);
    const topRight = topArea.filter(p => p.x > 0.55);
    // Both lobes must exist
    if (topLeft.length >= points.length * 0.04 && topRight.length >= points.length * 0.04) {
      criticalChecks++;
      score += 2;
    }
  }
  
  // CRITICAL 3: Bottom must narrow to a point
  const bottomArea = normalized.filter(p => p.y > 0.65);
  if (bottomArea.length >= points.length * 0.06) {
    const bottomWidth = Math.max(...bottomArea.map(p => p.x)) - Math.min(...bottomArea.map(p => p.x));
    // Bottom must be narrower (max 45% of width)
    if (bottomWidth < 0.45) {
      const bottomCenterX = bottomArea.reduce((sum, p) => sum + p.x, 0) / bottomArea.length;
      // Must be reasonably centered
      if (bottomCenterX > 0.35 && bottomCenterX < 0.65) {
        criticalChecks++;
        score += 2;
      }
    }
  }
  
  // CRITICAL 4: Some indentation at top (between the two lobes)
  const topMiddle = normalized.filter(p => p.y < 0.35 && p.x > 0.4 && p.x < 0.6);
  const topSides = normalized.filter(p => p.y < 0.35 && (p.x < 0.4 || p.x > 0.6));
  
  // Sides should have more points than middle
  if (topSides.length > topMiddle.length * 0.8) {
    criticalChecks++;
    score += 2;
  }
  
  // Need at least 4 of 4 critical checks
  if (criticalChecks < 3) return false;
  
  // ADDITIONAL: Quadrants coverage
  const topLeft = normalized.filter(p => p.x < 0.5 && p.y < 0.5).length;
  const topRight = normalized.filter(p => p.x >= 0.5 && p.y < 0.5).length;
  const bottomLeft = normalized.filter(p => p.x < 0.5 && p.y >= 0.5).length;
  const bottomRight = normalized.filter(p => p.x >= 0.5 && p.y >= 0.5).length;
  
  const minQuadrant = Math.min(topLeft, topRight, bottomLeft, bottomRight);
  if (minQuadrant >= points.length * 0.08) {
    score += 1.5;
  }
  
  // ADDITIONAL: Taper from top to bottom
  const topThird = normalized.filter(p => p.y < 0.33);
  const midThird = normalized.filter(p => p.y >= 0.33 && p.y < 0.66);
  const bottomThird = normalized.filter(p => p.y >= 0.66);
  
  if (topThird.length > 0 && bottomThird.length > 0) {
    const topW = Math.max(...topThird.map(p => p.x)) - Math.min(...topThird.map(p => p.x));
    const botW = Math.max(...bottomThird.map(p => p.x)) - Math.min(...bottomThird.map(p => p.x));
    
    // Top should be wider than bottom
    if (topW > botW * 1.1) {
      score += 1.5;
    }
  }
  
  // Need at least 7 out of 11 points
  return score >= 7;
}

function showShitstagramSearch() {
  const popup = document.createElement("div");
  popup.className = "shitstagram-search-popup";
  popup.innerHTML = `
    <div class="shitstagram-search-content">
      <div class="shitstagram-search-header">
        <input type="text" id="shitstagram-search-input" value="Suchen..." autofocus>
        <button class="shitstagram-close-btn" id="shitstagram-search-close">✕</button>
      </div>
      <div class="shitstagram-autocorrect" id="shitstagram-autocorrect" style="display: none;"></div>
      <div class="shitstagram-search-results" id="shitstagram-search-results">
        <div class="shitstagram-search-placeholder">Suche nach Benutzern...</div>
      </div>
    </div>
  `;
  
  document.body.appendChild(popup);
  
  const input = document.getElementById("shitstagram-search-input");
  const results = document.getElementById("shitstagram-search-results");
  const autocorrect = document.getElementById("shitstagram-autocorrect");
  const closeBtn = document.getElementById("shitstagram-search-close");
  
  // Worst Practice: User muss Text immer manuell löschen
  input.addEventListener('focus', () => {
    // Nichts tun - User muss Text selbst löschen
  });
  
  closeBtn.onclick = () => popup.remove();
  
  // Worst Practice: Nervige Autokorrektur
  const annoyingCorrections = {
    'tra': 'tea',
    'traf': 'craft',
    'trafi': 'traffic',
    'trafis': 'traffics',
    'trafish': 'starfish',
    'trafishc': 'starfishc',
    'trafishco': 'starfish co',
    'trafish cod': 'starfish code',
    'trafish_cod': 'starfish_code',
    'fish': 'dish',
    'cod': 'code',
    'die': 'die hard',
    'diet': 'dietary',
    'diete': 'dietetic',
    'dieter': 'diameter',
    'diet e': 'diet expert',
    'diet er': 'diet error'
  };
  
  let autocorrectTimeout = null;
  let autocorrectHistory = new Set();
  
  input.oninput = (e) => {
    const query = e.target.value.toLowerCase();
    
    // Worst Practice: Zeige nervige Autokorrektur (nur beim ersten Mal oder mit 70% Wahrscheinlichkeit)
    clearTimeout(autocorrectTimeout);
    if (query.length > 2) {
      for (const [key, correction] of Object.entries(annoyingCorrections)) {
        if (query.includes(key) && query !== correction) {
          const alreadyCorrected = autocorrectHistory.has(key);
          const shouldShow = !alreadyCorrected || Math.random() > 0.3;
          
          if (shouldShow) {
            autocorrectHistory.add(key);
            autocorrect.style.display = 'block';
            autocorrect.innerHTML = `Meintest du "<strong>${correction}</strong>"? <button id="autocorrect-apply">Übernehmen</button>`;
            
            // Worst Practice: Automatisch nach 2 Sekunden korrigieren
            autocorrectTimeout = setTimeout(() => {
              input.value = correction;
              autocorrect.style.display = 'none';
              // Trigger oninput wieder
              input.dispatchEvent(new Event('input'));
            }, 2000);
            
            document.getElementById('autocorrect-apply').onclick = () => {
              input.value = correction;
              autocorrect.style.display = 'none';
              input.dispatchEvent(new Event('input'));
            };
          }
          
          break;
        }
      }
    } else {
      autocorrect.style.display = 'none';
    }
    
    if (query.length === 0) {
      results.innerHTML = '<div class="shitstagram-search-placeholder">Suche nach Benutzern...</div>';
      return;
    }
    
    const filtered = shitStagramUsers.filter(u => 
      u.username.toLowerCase().includes(query) || 
      u.displayName.toLowerCase().includes(query)
    );
    
    // Worst Practice: Verschiebe trafish_cod in die Mitte der Ergebnisse
    let sorted = [...filtered];
    const trafishIndex = sorted.findIndex(u => u.username === 'trafish_cod');
    if (trafishIndex !== -1) {
      // Remove trafish_cod from current position
      const trafishUser = sorted.splice(trafishIndex, 1)[0];
      // Insert at middle position
      const middleIndex = Math.floor(sorted.length / 2);
      sorted.splice(middleIndex, 0, trafishUser);
    }
    
    if (sorted.length === 0) {
      results.innerHTML = '<div class="shitstagram-search-placeholder">Keine Ergebnisse</div>';
      return;
    }
    
    results.innerHTML = sorted.map(user => {
      const avatarContent = getAvatarContent(user.username, user.displayName);
      return `
      <div class="shitstagram-search-result" data-username="${user.username}">
        <div class="shitstagram-avatar">${avatarContent}</div>
        <div class="shitstagram-search-user-info">
          <div class="shitstagram-search-username">
            ${user.displayName}
            ${user.verified ? '<span class="shitstagram-verified">✓</span>' : ''}
          </div>
          <div class="shitstagram-search-meta">${user.followers.toLocaleString()} Follower</div>
        </div>
      </div>
      `;
    }).join('');
    
    // Add click listeners to results
    document.querySelectorAll('.shitstagram-search-result').forEach(result => {
      result.onclick = () => {
        const username = result.dataset.username;
        popup.remove();
        showShitstagramProfile(username);
      };
    });
  };
}

// Worst Practice: Confusing nested filter menu structure
function createConfusingFilterMenu(username, userPosts, renderPosts) {
  return `
    <div class="shitstagram-filter-menu">
      <div class="shitstagram-filter-option" data-category="ansicht">
        <span>▶ Beitragsansicht</span>
      </div>
      <div class="shitstagram-filter-option" data-category="sortierung">
        <span>▶ Beiträge sortieren</span>
      </div>
      <div class="shitstagram-filter-option" data-category="einstellungen">
        <span>▶ Filter-Einstellungen</span>
      </div>
      <div class="shitstagram-filter-option" data-category="optionen">
        <span>▶ Anzeigeoptionen</span>
      </div>
    </div>
  `;
}

function setupFilterHandlers(username, userPosts, renderPosts, loadedPostsCount) {
  const filterOptions = document.querySelectorAll('.shitstagram-filter-option');
  
  filterOptions.forEach(option => {
    option.onclick = (e) => {
      e.stopPropagation();
      const category = option.dataset.category;
      
      // Remove all existing submenus
      document.querySelectorAll('.shitstagram-filter-submenu').forEach(sub => sub.remove());
      
      // Create submenu
      const submenu = document.createElement('div');
      submenu.className = 'shitstagram-filter-submenu';
      
      if (category === 'ansicht') {
        submenu.innerHTML = `
          <div class="shitstagram-filter-suboption" data-submenu="layout">▶ Rasterlayout</div>
          <div class="shitstagram-filter-suboption" data-submenu="grid">▶ Spaltenanzahl</div>
          <div class="shitstagram-filter-suboption" data-submenu="farben">▶ Vorschaugröße</div>
        `;
      } else if (category === 'sortierung') {
        submenu.innerHTML = `
          <div class="shitstagram-filter-suboption" data-submenu="datum">▶ Nach Datum</div>
          <div class="shitstagram-filter-suboption" data-submenu="beliebtheit">▶ Nach Beliebtheit</div>
          <div class="shitstagram-filter-suboption" data-submenu="typ">▶ Nach Medientyp</div>
          <div class="shitstagram-filter-suboption" data-submenu="andere">▶ Weitere Sortierung</div>
        `;
      } else if (category === 'einstellungen') {
        submenu.innerHTML = `
          <div class="shitstagram-filter-suboption" data-submenu="privatsphäre">▶ Sichtbarkeit</div>
          <div class="shitstagram-filter-suboption" data-submenu="benachrichtigungen">▶ Aktualisierungen</div>
          <div class="shitstagram-filter-suboption" data-submenu="anzeige">▶ Detailansicht</div>
        `;
      } else if (category === 'optionen') {
        submenu.innerHTML = `
          <div class="shitstagram-filter-suboption" data-submenu="export">▶ Beiträge speichern</div>
          <div class="shitstagram-filter-suboption" data-submenu="teilen">▶ Sammlung teilen</div>
          <div class="shitstagram-filter-suboption" data-submenu="hilfe">▶ Filter-Hilfe</div>
        `;
      }
      
      option.appendChild(submenu);
      setupSubmenuHandlers(username, userPosts, renderPosts, loadedPostsCount);
    };
  });
}

function setupSubmenuHandlers(username, userPosts, renderPosts, loadedPostsCount) {
  const suboptions = document.querySelectorAll('.shitstagram-filter-suboption');
  
  suboptions.forEach(suboption => {
    suboption.onclick = (e) => {
      e.stopPropagation();
      const submenu = suboption.dataset.submenu;
      
      // Remove existing nested submenus
      document.querySelectorAll('.shitstagram-filter-nested').forEach(nested => nested.remove());
      
      const nested = document.createElement('div');
      nested.className = 'shitstagram-filter-nested';
      
      if (submenu === 'datum') {
        nested.innerHTML = `
          <div class="shitstagram-filter-nestedoption" data-nested="zeitraum">▶ Zeitraum</div>
          <div class="shitstagram-filter-nestedoption" data-nested="reihenfolge">▶ Reihenfolge</div>
          <div class="shitstagram-filter-nestedoption" data-nested="gruppierung">▶ Gruppierung</div>
        `;
      } else if (submenu === 'beliebtheit') {
        nested.innerHTML = `
          <div class="shitstagram-filter-nestedoption" data-nested="likes">▶ Nach Likes</div>
          <div class="shitstagram-filter-nestedoption" data-nested="kommentare">▶ Nach Kommentaren</div>
          <div class="shitstagram-filter-nestedoption" data-nested="shares">▶ Nach Shares</div>
        `;
      } else if (submenu === 'typ') {
        nested.innerHTML = `
          <div class="shitstagram-filter-nestedoption" data-nested="bilder">▶ Bilder</div>
          <div class="shitstagram-filter-nestedoption" data-nested="videos">▶ Videos</div>
          <div class="shitstagram-filter-nestedoption" data-nested="gemischt">▶ Gemischt</div>
        `;
      } else if (submenu === 'andere') {
        nested.innerHTML = `
          <div class="shitstagram-filter-nestedoption" data-nested="alphabet">▶ Alphabetisch</div>
          <div class="shitstagram-filter-nestedoption" data-nested="zufall">▶ Zufällig</div>
          <div class="shitstagram-filter-nestedoption" data-nested="benutzerdefiniert">▶ Benutzerdefiniert</div>
        `;
      } else if (submenu === 'layout') {
        nested.innerHTML = `
          <div class="shitstagram-filter-nestedoption">▶ Kompakte Ansicht</div>
          <div class="shitstagram-filter-nestedoption">▶ Erweiterte Ansicht</div>
          <div class="shitstagram-filter-nestedoption">▶ Listenansicht</div>
        `;
      } else if (submenu === 'grid') {
        nested.innerHTML = `
          <div class="shitstagram-filter-nestedoption">▶ 2 Spalten</div>
          <div class="shitstagram-filter-nestedoption">▶ 3 Spalten</div>
          <div class="shitstagram-filter-nestedoption">▶ 4 Spalten</div>
        `;
      } else if (submenu === 'farben') {
        nested.innerHTML = `
          <div class="shitstagram-filter-nestedoption">▶ Klein</div>
          <div class="shitstagram-filter-nestedoption">▶ Mittel</div>
          <div class="shitstagram-filter-nestedoption">▶ Groß</div>
        `;
      } else if (submenu === 'privatsphäre') {
        nested.innerHTML = `
          <div class="shitstagram-filter-nestedoption">▶ Öffentlich</div>
          <div class="shitstagram-filter-nestedoption">▶ Privat</div>
          <div class="shitstagram-filter-nestedoption">▶ Freunde</div>
        `;
      } else if (submenu === 'benachrichtigungen') {
        nested.innerHTML = `
          <div class="shitstagram-filter-nestedoption">▶ Alle anzeigen</div>
          <div class="shitstagram-filter-nestedoption">▶ Nur neue</div>
          <div class="shitstagram-filter-nestedoption">▶ Ausblenden</div>
        `;
      } else if (submenu === 'anzeige') {
        nested.innerHTML = `
          <div class="shitstagram-filter-nestedoption">▶ Standardansicht</div>
          <div class="shitstagram-filter-nestedoption">▶ Detailansicht</div>
          <div class="shitstagram-filter-nestedoption">▶ Minimalistisch</div>
        `;
      } else if (submenu === 'export') {
        nested.innerHTML = `
          <div class="shitstagram-filter-nestedoption">▶ Als PDF</div>
          <div class="shitstagram-filter-nestedoption">▶ Als Bilder</div>
          <div class="shitstagram-filter-nestedoption">▶ Als Archiv</div>
        `;
      } else if (submenu === 'teilen') {
        nested.innerHTML = `
          <div class="shitstagram-filter-nestedoption">▶ Link kopieren</div>
          <div class="shitstagram-filter-nestedoption">▶ QR-Code</div>
          <div class="shitstagram-filter-nestedoption">▶ Einbetten</div>
        `;
      } else if (submenu === 'hilfe') {
        nested.innerHTML = `
          <div class="shitstagram-filter-nestedoption">▶ Anleitung</div>
          <div class="shitstagram-filter-nestedoption">▶ FAQ</div>
          <div class="shitstagram-filter-nestedoption">▶ Support</div>
        `;
      } else {
        nested.innerHTML = `
          <div class="shitstagram-filter-nestedoption">▶ Option A</div>
          <div class="shitstagram-filter-nestedoption">▶ Option B</div>
          <div class="shitstagram-filter-nestedoption">▶ Option C</div>
        `;
      }
      
      suboption.appendChild(nested);
      setupNestedHandlers(username, userPosts, renderPosts, loadedPostsCount);
    };
  });
}

function setupNestedHandlers(username, userPosts, renderPosts, loadedPostsCount) {
  const nestedOptions = document.querySelectorAll('.shitstagram-filter-nestedoption');
  
  nestedOptions.forEach(nestedOption => {
    nestedOption.onclick = (e) => {
      e.stopPropagation();
      const nested = nestedOption.dataset.nested;
      
      // Remove existing deep nested submenus
      document.querySelectorAll('.shitstagram-filter-deep').forEach(deep => deep.remove());
      
      if (nested === 'reihenfolge') {
        const deep = document.createElement('div');
        deep.className = 'shitstagram-filter-deep';
        deep.innerHTML = `
          <div class="shitstagram-filter-deepoption" data-action="neueste">Neueste zuerst</div>
          <div class="shitstagram-filter-deepoption" data-action="älteste">Älteste zuerst</div>
        `;
        nestedOption.appendChild(deep);
        setupDeepHandlers(username, userPosts, renderPosts, loadedPostsCount);
      } else if (nested === 'likes') {
        const deep = document.createElement('div');
        deep.className = 'shitstagram-filter-deep';
        deep.innerHTML = `
          <div class="shitstagram-filter-deepoption" data-action="meiste-likes">Meiste Likes</div>
          <div class="shitstagram-filter-deepoption" data-action="wenigste-likes">Wenigste Likes</div>
        `;
        nestedOption.appendChild(deep);
        setupDeepHandlers(username, userPosts, renderPosts, loadedPostsCount);
      }
    };
  });
}

function setupDeepHandlers(username, userPosts, renderPosts, loadedPostsCount) {
  const deepOptions = document.querySelectorAll('.shitstagram-filter-deepoption');
  
  deepOptions.forEach(deepOption => {
    deepOption.onclick = (e) => {
      e.stopPropagation();
      const action = deepOption.dataset.action;
      const postsContainer = document.getElementById(`shitstagram-profile-posts-${username}`);
      
      if (action === 'neueste') {
        // Sort by newest first and show only 3 posts from right to left
        const sortedPosts = [...userPosts].sort((a, b) => a.id - b.id);
        const newestThree = sortedPosts.slice(0, 3).reverse(); // Show 3 newest, reversed for right-to-left
        postsContainer.innerHTML = renderPosts(0, newestThree.length, newestThree);
        
        // Remove "Weitere Posts laden" button if it exists
        const loadMoreContainer = document.querySelector('.shitstagram-load-more-container');
        if (loadMoreContainer) loadMoreContainer.remove();
      } else if (action === 'älteste') {
        // Sort by oldest first
        const sortedPosts = [...userPosts].sort((a, b) => b.id - a.id);
        postsContainer.innerHTML = renderPosts(0, sortedPosts.length, sortedPosts);
        
        // Remove "Weitere Posts laden" button
        const loadMoreContainer = document.querySelector('.shitstagram-load-more-container');
        if (loadMoreContainer) loadMoreContainer.remove();
      } else if (action === 'meiste-likes') {
        const sortedPosts = [...userPosts].sort((a, b) => b.likes - a.likes);
        postsContainer.innerHTML = renderPosts(0, sortedPosts.length, sortedPosts);
        
        // Remove "Weitere Posts laden" button
        const loadMoreContainer = document.querySelector('.shitstagram-load-more-container');
        if (loadMoreContainer) loadMoreContainer.remove();
      } else if (action === 'wenigste-likes') {
        const sortedPosts = [...userPosts].sort((a, b) => a.likes - b.likes);
        postsContainer.innerHTML = renderPosts(0, sortedPosts.length, sortedPosts);
        
        // Remove "Weitere Posts laden" button
        const loadMoreContainer = document.querySelector('.shitstagram-load-more-container');
        if (loadMoreContainer) loadMoreContainer.remove();
      }
      
      // Trigger fade-in animation for posts
      setTimeout(() => {
        document.querySelectorAll('.shitstagram-profile-post-fade').forEach(post => {
          post.classList.add('shitstagram-post-visible');
        });
      }, 50);
      
      // Close all filter menus
      const filterDropdown = document.getElementById("shitstagram-filter-dropdown");
      if (filterDropdown) filterDropdown.style.display = 'none';
      
      // Add click listeners to newly rendered posts
      document.querySelectorAll('.shitstagram-profile-post').forEach(postEl => {
        postEl.onclick = () => {
          const postId = postEl.dataset.postId;
          const profilePopup = document.querySelector('.shitstagram-profile-popup');
          if (profilePopup) profilePopup.remove();
          showShitstagramPostDetail(postId);
        };
      });
    };
  });
}

function showShitstagramProfile(username) {
  const user = shitStagramUsers.find(u => u.username === username);
  if (!user) return;
  
  let userPosts = shitStagramPosts.filter(p => p.username === username);
  const isOriginalTrafish = username === 'trafish_cod';
  
  // Worst Practice: Randomize trafish_cod posts but keep latest post (id 1) NOT at the top
  if (isOriginalTrafish) {
    // Separate latest post (id 1) from other posts
    const latestPost = userPosts.find(p => p.id === 1);
    const otherPosts = userPosts.filter(p => p.id !== 1);
    
    // Randomize other posts
    const randomizedOthers = [...otherPosts].sort(() => Math.random() - 0.5);
    
    // Insert latest post somewhere in the middle (not at position 0)
    const insertPosition = Math.floor(randomizedOthers.length / 2);
    randomizedOthers.splice(insertPosition, 0, latestPost);
    
    userPosts = randomizedOthers;
  }
  
  const avatarContent = getAvatarContent(user.username, user.displayName);
  
  const popup = document.createElement("div");
  popup.className = "shitstagram-profile-popup";
  
  // Worst Practice: Für trafish_cod nur 3 Posts initial zeigen
  let loadedPostsCount = isOriginalTrafish ? 3 : userPosts.length;
  
  const renderPosts = (startIndex, count, customPosts = null) => {
    const postsSource = customPosts || userPosts;
    const postsToRender = postsSource.slice(startIndex, startIndex + count);
    return postsToRender.map(post => `
      <div class="shitstagram-profile-post shitstagram-profile-post-fade" data-post-id="${post.id}">
        <img src="${post.image}" alt="Post">
        <div class="shitstagram-profile-post-overlay">
          <span>❤ ${post.likes}</span>
          <span>💬 ${post.comments.length}</span>
        </div>
      </div>
    `).join('');
  };
  
  popup.innerHTML = `
    <div class="shitstagram-profile-content">
      <div class="shitstagram-profile-header">
        <button class="shitstagram-back-btn" id="shitstagram-profile-back">←</button>
        <div class="shitstagram-profile-username">${user.username}</div>
        <button class="shitstagram-post-menu" id="shitstagram-profile-menu">⋯</button>
      </div>
      
      <div class="shitstagram-profile-info">
        <div class="shitstagram-profile-avatar">${avatarContent}</div>
        <div class="shitstagram-profile-stats">
          <div class="shitstagram-stat">
            <strong>${user.posts}</strong>
            <span>Beiträge</span>
          </div>
          <div class="shitstagram-stat">
            <strong>${user.followers.toLocaleString()}</strong>
            <span>Follower</span>
          </div>
          <div class="shitstagram-stat">
            <strong>${user.following}</strong>
            <span>Folge ich</span>
          </div>
        </div>
        <div class="shitstagram-profile-name">
          ${user.displayName}
          ${user.verified ? '<span class="shitstagram-verified">✓</span>' : ''}
        </div>
      </div>
      
      <div class="shitstagram-profile-filter-container">
        <button class="shitstagram-filter-btn" id="shitstagram-filter-btn">⚙</button>
        <div class="shitstagram-filter-dropdown" id="shitstagram-filter-dropdown" style="display: none;"></div>
      </div>
      
      <div class="shitstagram-profile-posts" id="shitstagram-profile-posts-${username}">
        ${renderPosts(0, loadedPostsCount)}
      </div>
      ${isOriginalTrafish && loadedPostsCount < userPosts.length ? `
        <div class="shitstagram-load-more-container">
          <button class="shitstagram-load-more-btn" id="shitstagram-load-more">Weitere Posts laden</button>
        </div>
      ` : ''}
    </div>
  `;
  
  document.body.appendChild(popup);
  
  document.getElementById("shitstagram-profile-back").onclick = () => popup.remove();
  
  // Add menu button listener for profile
  const profileMenuBtn = document.getElementById("shitstagram-profile-menu");
  if (profileMenuBtn) {
    profileMenuBtn.onclick = (e) => {
      e.stopPropagation();
      createPostMenu(profileMenuBtn, null, user.username);
    };
  }
  
  // Worst Practice: Confusing nested filter dropdowns
  const filterBtn = document.getElementById("shitstagram-filter-btn");
  const filterDropdown = document.getElementById("shitstagram-filter-dropdown");
  
  if (filterBtn && filterDropdown) {
    filterBtn.onclick = (e) => {
      e.stopPropagation();
      if (filterDropdown.style.display === 'none') {
        filterDropdown.style.display = 'block';
        filterDropdown.innerHTML = createConfusingFilterMenu(username, userPosts, renderPosts);
        setupFilterHandlers(username, userPosts, renderPosts, loadedPostsCount);
      } else {
        filterDropdown.style.display = 'none';
      }
    };
    
    document.addEventListener('click', (e) => {
      if (!filterBtn.contains(e.target) && !filterDropdown.contains(e.target)) {
        filterDropdown.style.display = 'none';
      }
    });
  }
  
  // Worst Practice: Load more button mit langsamer Animation
  if (isOriginalTrafish) {
    const loadMoreBtn = document.getElementById("shitstagram-load-more");
    if (loadMoreBtn) {
      loadMoreBtn.onclick = () => {
        const postsContainer = document.getElementById(`shitstagram-profile-posts-${username}`);
        const nextBatch = renderPosts(loadedPostsCount, 3);
        
        // Disable button während des Ladens
        loadMoreBtn.disabled = true;
        loadMoreBtn.textContent = 'Lädt...';
        
        // Worst Practice: Langsames Laden simulieren
        setTimeout(() => {
          postsContainer.insertAdjacentHTML('beforeend', nextBatch);
          loadedPostsCount += 3;
          
          // Trigger fade-in animation für neue Posts
          const newPosts = postsContainer.querySelectorAll('.shitstagram-profile-post-fade:not(.shitstagram-post-visible)');
          setTimeout(() => {
            newPosts.forEach(post => {
              post.classList.add('shitstagram-post-visible');
            });
            
            // Re-enable button after fade-in animation completes (4s)
            setTimeout(() => {
              if (loadedPostsCount >= userPosts.length) {
                loadMoreBtn.parentElement.remove();
              } else {
                loadMoreBtn.disabled = false;
                loadMoreBtn.textContent = 'Weitere Posts laden';
              }
            }, 4000);
          }, 50);
          
          // Add click listeners to new posts
          newPosts.forEach(postEl => {
            postEl.onclick = () => {
              const postId = postEl.dataset.postId;
              popup.remove();
              showShitstagramPostDetail(postId);
            };
          });
        }, 2000); // 2 Sekunden Ladezeit - worst practice!
      };
    }
  }
  
  // Add click listeners to profile posts
  document.querySelectorAll('.shitstagram-profile-post').forEach(postEl => {
    postEl.onclick = () => {
      const postId = postEl.dataset.postId;
      popup.remove();
      showShitstagramPostDetail(postId);
    };
  });
  
  // Trigger initial fade-in
  setTimeout(() => {
    document.querySelectorAll('.shitstagram-profile-post-fade').forEach(post => {
      post.classList.add('shitstagram-post-visible');
    });
  }, 50);
}

function showShitstagramPostDetail(postId) {
  const post = shitStagramPosts.find(p => p.id == postId);
  if (!post) return;
  
  const avatarContent = getAvatarContent(post.username, post.userDisplay);
  
  const popup = document.createElement("div");
  popup.className = "shitstagram-post-detail-popup";
  popup.innerHTML = `
    <div class="shitstagram-post-detail-content">
      <button class="shitstagram-close-btn shitstagram-close-btn-left" id="shitstagram-post-detail-close">✕</button>
      <button class="shitstagram-post-menu shitstagram-post-menu-top-right" data-post-id="${post.id}" data-username="${post.username}">⋯</button>
      
      <div class="shitstagram-post-detail">
        <div class="shitstagram-post-detail-image" data-post-id="${post.id}">
          <img src="${post.image}" alt="Post">
          <canvas class="shitstagram-draw-canvas" data-post-id="${post.id}"></canvas>
          <div class="shitstagram-draw-info">Zeichne ein Herz zum Liken</div>
        </div>
        
        <div class="shitstagram-post-detail-sidebar">
          <div class="shitstagram-post-header">
            <div class="shitstagram-post-user">
              <div class="shitstagram-avatar">${avatarContent}</div>
              <div class="shitstagram-user-info">
                <div class="shitstagram-username">
                  ${post.userDisplay}
                  ${post.verified ? '<span class="shitstagram-verified">✓</span>' : ''}
                </div>
              </div>
            </div>
          </div>
          
          <div class="shitstagram-post-caption-section">
            <div>
              ${post.caption}
            </div>
            <div class="shitstagram-post-timestamp">${post.timestamp}</div>
          </div>
          
          <div class="shitstagram-comments-section">
            ${post.comments.map(comment => {
              const commentAvatarContent = getAvatarContent(comment.username, comment.username);
              
              // Replace @mentions with styled spans
              const styledText = comment.text.replace(/@(\w+)/g, '<span class="shitstagram-mention">@$1</span>');
              
              return `
                <div class="shitstagram-comment">
                  <div class="shitstagram-avatar">${commentAvatarContent}</div>
                  <div class="shitstagram-comment-content">
                    <strong>${comment.username}</strong> ${styledText}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
          
          <div class="shitstagram-post-detail-actions">
            <div class="shitstagram-action-group">
              <button class="shitstagram-action-btn shitstagram-unlike-btn" data-post-id="${post.id}" style="display: ${likedPosts.has(post.id) ? 'flex' : 'none'};">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="likeGradient-detail-${post.id}" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style="stop-color:#B20CE9;stop-opacity:1" />
                      <stop offset="50%" style="stop-color:#7d3ba8;stop-opacity:1" />
                      <stop offset="100%" style="stop-color:#5a2a7a;stop-opacity:1" />
                    </linearGradient>
                  </defs>
                  <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" fill="url(#likeGradient-detail-${post.id})" stroke="url(#likeGradient-detail-${post.id})" stroke-width="2"/>
                </svg>
              </button>
              <span class="shitstagram-count shitstagram-likes-count" data-post-id="${post.id}">${(likedPosts.has(post.id) ? post.likes + 1 : post.likes).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(popup);
  
  document.getElementById("shitstagram-post-detail-close").onclick = () => popup.remove();
  
  // Add menu button listener for top-right menu button
  const topRightMenuBtn = popup.querySelector('.shitstagram-post-menu-top-right');
  if (topRightMenuBtn) {
    topRightMenuBtn.onclick = (e) => {
      e.stopPropagation();
      createPostMenu(topRightMenuBtn, post.id, post.username);
    };
  }
  
  // Initialize heart drawing on detail canvas
  initHeartDrawing();
  
  // Unlike button handler for detail view
  const unlikeBtn = popup.querySelector('.shitstagram-unlike-btn');
  if (unlikeBtn) {
    unlikeBtn.onclick = (e) => {
      e.stopPropagation();
      const postId = parseInt(unlikeBtn.dataset.postId);
      
      // Unlike the post
      likedPosts.delete(postId);
      
      // Hide unlike button
      unlikeBtn.style.display = 'none';
      
      // Update like count
      const countEl = popup.querySelector('.shitstagram-likes-count');
      if (countEl) {
        const currentCount = parseInt(countEl.textContent.replace(/\./g, '').replace(/,/g, ''));
        countEl.textContent = (currentCount - 1).toLocaleString();
      }
      
      // Update feed unlike button if exists
      const feedUnlikeBtn = document.querySelector(`.shitstagram-unlike-btn[data-post-id="${postId}"]`);
      if (feedUnlikeBtn && feedUnlikeBtn !== unlikeBtn) {
        feedUnlikeBtn.style.display = 'none';
      }
      
      // Update feed like count
      const feedCountEl = document.querySelector(`.shitstagram-likes-count[data-post-id="${postId}"]`);
      if (feedCountEl && feedCountEl !== countEl) {
        const currentCount = parseInt(feedCountEl.textContent.replace(/\./g, '').replace(/,/g, ''));
        feedCountEl.textContent = (currentCount - 1).toLocaleString();
      }
      
      // Show canvas and info text again
      const canvas = popup.querySelector(`.shitstagram-draw-canvas[data-post-id="${postId}"]`);
      if (canvas) {
        canvas.style.display = 'block';
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const infoEl = canvas.parentElement.querySelector('.shitstagram-draw-info');
        if (infoEl) infoEl.style.display = 'block';
        
        // Show feed canvas too if exists
        const feedCanvas = document.querySelector(`.shitstagram-draw-canvas[data-post-id="${postId}"]`);
        if (feedCanvas && feedCanvas !== canvas) {
          feedCanvas.style.display = 'block';
          const feedCtx = feedCanvas.getContext('2d');
          feedCtx.clearRect(0, 0, feedCanvas.width, feedCanvas.height);
          
          const feedInfoEl = feedCanvas.parentElement.querySelector('.shitstagram-draw-info');
          if (feedInfoEl) feedInfoEl.style.display = 'block';
        }
        
        // Reinitialize drawing
        initHeartDrawing();
      }
    };
  }
  
}

// Herzen-Overlay beim Liken (Worst Practice: Blockiert Navigation)
function showHeartsOverlay() {
  // Prevent multiple overlays from running simultaneously
  if (isShowingHeartsOverlay) return;
  isShowingHeartsOverlay = true;
  
  const overlay = document.createElement("div");
  overlay.className = "hearts-overlay";
  document.body.appendChild(overlay);
  
  // Erzeuge 25 Herzen über 2 Sekunden (weniger für bessere Performance)
  let heartCount = 0;
  const heartInterval = setInterval(() => {
    if (heartCount >= 25) {
      clearInterval(heartInterval);
      return;
    }
    
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.textContent = "💜";
    heart.style.left = Math.random() * 100 + "%";
    heart.style.fontSize = (30 + Math.random() * 40) + "px";
    heart.style.animationDelay = (Math.random() * 0.5) + "s";
    
    overlay.appendChild(heart);
    heartCount++;
  }, 80);
  
  // Overlay bleibt für 5 Sekunden (lange genug um nervig zu sein)
  setTimeout(() => {
    overlay.classList.add("hiding");
    setTimeout(() => {
      overlay.remove();
      // Reset flag AFTER overlay is completely gone (including fade out)
      isShowingHeartsOverlay = false;
    }, 500);
  }, 5000);
}

// Success Overlay für Stage-Abschluss
function showSuccessOverlay(callback) {
  const overlay = document.createElement("div");
  overlay.className = "success-overlay";
  overlay.innerHTML = `
    <div class="success-content">
      <div class="success-checkmark">
        <div class="success-circle">
          <div class="success-check">
            <svg viewBox="0 0 52 52">
              <polyline points="14,26 22,34 38,18" />
            </svg>
          </div>
        </div>
      </div>
      <p class="success-text">Geschafft!</p>
    </div>
  `;
  
  document.body.appendChild(overlay);
  // Play success sound (non-blocking)
  if (successAudio && typeof successAudio.play === 'function') {
    successAudio.play().catch(() => {});
  }
  
  // Nach 1.5 Sekunden ausblenden und callback ausführen
  setTimeout(() => {
    overlay.classList.add("hiding");
    setTimeout(() => {
      overlay.remove();
      if (callback) callback();
    }, 300);
  }, 1500);
}

function showShitstagramShareDialog(postId, postUsername) {
  const popup = document.createElement("div");
  popup.className = "shitstagram-share-popup";
  popup.dataset.postId = postId;
  popup.dataset.postUsername = postUsername;
  
  // Worst Practice: Move dieter_official to lower third
  let sortedUsers = shitStagramUsers.filter(u => u.username !== postUsername);
  const dieterIndex = sortedUsers.findIndex(u => u.username === 'dieter_official');
  if (dieterIndex !== -1) {
    const dieter = sortedUsers.splice(dieterIndex, 1)[0];
    const lowerThirdPosition = Math.floor(sortedUsers.length * 0.7);
    sortedUsers.splice(lowerThirdPosition, 0, dieter);
  }
  
  let selectedUser = null;
  
  popup.innerHTML = `
    <div class="shitstagram-share-content">
      <div class="shitstagram-share-header">
        <h3>Senden an</h3>
        <button class="shitstagram-close-btn" id="shitstagram-share-close">✕</button>
      </div>
      
      <div class="shitstagram-share-search">
        <input type="text" value="Suchen..." id="shitstagram-share-search-input">
      </div>
      
      <div class="shitstagram-share-users" id="shitstagram-share-users">
        ${sortedUsers.map(user => {
          const avatarContent = getAvatarContent(user.username, user.displayName);
          return `
          <div class="shitstagram-share-user" data-username="${user.username}" data-displayname="${user.displayName}">
            <div class="shitstagram-avatar">${avatarContent}</div>
            <div class="shitstagram-share-user-name">${user.displayName}</div>
          </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
  
  document.body.appendChild(popup);
  
  // Worst Practice: Close button triggers send confirmation
  const closeBtn = document.getElementById("shitstagram-share-close");
  closeBtn.onclick = () => {
    if (selectedUser) {
      // Show confusing confirmation
      showReverseConfirmation(selectedUser, postId, postUsername, popup);
    } else {
      popup.remove();
    }
  };
  
  // User selection with purple border
  const userElements = document.querySelectorAll('.shitstagram-share-user');
  userElements.forEach(userEl => {
    userEl.onclick = () => {
      // Remove selection from all users
      userElements.forEach(u => u.classList.remove('selected'));
      
      // Select clicked user
      userEl.classList.add('selected');
      selectedUser = userEl.dataset.username;
    };
  });
  
  // Worst Practice: Make scrolling slow and dragging scrollbar extremely slow
  const shareUsersContainer = document.getElementById("shitstagram-share-users");
  let isScrolling = false;
  let isDragging = false;
  let lastScrollTop = shareUsersContainer.scrollTop;
  let dragStartY = 0;
  let dragStartScroll = 0;
  
  // Exponentially slow wheel scrolling with reset
  let shareScrollCount = 0;
  const maxShareScrollCount = 25; // Nach 25 Scrolls reset
  const baseShareSpeed = 0.5; // Basis-Geschwindigkeit
  const minShareSpeed = 0.05; // Minimale Geschwindigkeit
  
  shareUsersContainer.addEventListener('wheel', (e) => {
    e.preventDefault();
    
    if (isScrolling) return;
    isScrolling = true;
    
    // Exponentiell langsamer: speed = baseSpeed * (0.75 ^ scrollCount)
    const exponent = shareScrollCount / 4; // Alle 4 Scrolls wird es deutlich langsamer
    let currentSpeed = baseShareSpeed * Math.pow(0.75, exponent);
    
    // Minimum einhalten
    currentSpeed = Math.max(currentSpeed, minShareSpeed);
    
    const scrollAmount = e.deltaY * currentSpeed;
    const targetScroll = shareUsersContainer.scrollTop + scrollAmount;
    const startScroll = shareUsersContainer.scrollTop;
    const duration = 100;
    const startTime = performance.now();
    
    function smoothScroll(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease-out für langsames Gefühl
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      shareUsersContainer.scrollTop = startScroll + (scrollAmount * easeProgress);
      
      if (progress < 1) {
        requestAnimationFrame(smoothScroll);
      } else {
        isScrolling = false;
      }
    }
    
    requestAnimationFrame(smoothScroll);
    
    shareScrollCount++;
    
    // Reset nach maxShareScrollCount
    if (shareScrollCount >= maxShareScrollCount) {
      shareScrollCount = 0;
    }
  }, { passive: false });
  
  // Worst Practice: Extremely slow scrollbar dragging
  let scrollbarDragInterval;
  shareUsersContainer.addEventListener('mousedown', (e) => {
    // Check if clicking near scrollbar (right edge)
    const containerRect = shareUsersContainer.getBoundingClientRect();
    const clickX = e.clientX - containerRect.left;
    if (clickX > containerRect.width - 20) {
      isDragging = true;
      dragStartY = e.clientY;
      dragStartScroll = shareUsersContainer.scrollTop;
      shareUsersContainer.style.userSelect = 'none';
      dragMoveCount = 0; // Reset beim Start des Drags
    }
  });
  
  let dragMoveCount = 0;
  const maxDragMoveCount = 30;
  const baseDragSpeed = 0.35;
  const minDragSpeed = 0.05;
  
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    // Exponentiell langsamer beim Draggen
    const exponent = dragMoveCount / 5;
    let currentDragSpeed = baseDragSpeed * Math.pow(0.8, exponent);
    currentDragSpeed = Math.max(currentDragSpeed, minDragSpeed);
    
    const deltaY = e.clientY - dragStartY;
    const slowDelta = deltaY * currentDragSpeed;
    
    dragMoveCount++;
    if (dragMoveCount >= maxDragMoveCount) {
      dragMoveCount = 0;
    }
    
    // Clear previous interval
    if (scrollbarDragInterval) {
      cancelAnimationFrame(scrollbarDragInterval);
    }
    
    // Smooth animation to target scroll position
    const targetScroll = dragStartScroll + slowDelta;
    const currentScroll = shareUsersContainer.scrollTop;
    const diff = targetScroll - currentScroll;
    
    function animateDrag() {
      const step = diff * 0.1; // Langsame Animation
      shareUsersContainer.scrollTop += step;
      
      if (Math.abs(shareUsersContainer.scrollTop - targetScroll) > 0.5) {
        scrollbarDragInterval = requestAnimationFrame(animateDrag);
      }
    }
    
    animateDrag();
  });
  
  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      shareUsersContainer.style.userSelect = '';
      if (scrollbarDragInterval) {
        cancelAnimationFrame(scrollbarDragInterval);
      }
    }
  });
  
  // Send button listeners
  document.querySelectorAll('.shitstagram-send-btn').forEach(btn => {
    btn.onclick = () => {
      const targetUser = btn.dataset.username;
      
      // Worst Practice: Double confirmation with confusing colors
      showConfusingConfirmation(targetUser, postId, postUsername, (confirmed) => {
        if (!confirmed) return;
        
        // Worst Practice: Only latest post (id: 1) from trafish_cod to dieter_official is correct
        const isLatestPost = postId === 1;
        const isCorrectSender = postUsername === "trafish_cod";
        const isCorrectRecipient = targetUser === "dieter_official";
        
        if (isLatestPost && isCorrectSender && isCorrectRecipient) {
          // Check if post is also liked
          if (!likedPosts.has(postId)) {
            popup.remove();
            
            // Close all shitstagram popups to return to homepage
            document.querySelectorAll('.shitstagram-profile-popup, .shitstagram-post-detail-popup, .shitstagram-search-popup, .newsletter-popup').forEach(p => p.remove());
            
            showErrorPopup("Du musst den Post erst liken, bevor du ihn an Dieter senden kannst!");
            return;
          }
          
          // Correct: Latest post from trafish_cod to dieter_official AND liked
          window.shitStagramShared = true;
          popup.remove();
          
          // Close all shitstagram popups
          document.querySelectorAll('.shitstagram-profile-popup, .shitstagram-post-detail-popup, .shitstagram-search-popup').forEach(p => p.remove());
          
          // Zeige Success-Overlay
          showSuccessOverlay(() => {
            // Stage abschließen und zur nächsten wechseln
            clearInterval(timerInterval);
            const stageTime = (Date.now() - startTime) / 1000;
            const stagePoints = Math.max(0, Math.round(1000 - (stageTime * 1.515)));
            totalScore += stagePoints;
            totalTime += stageTime;
            
            console.log(`Stage ${currentStage + 1} abgeschlossen in ${stageTime.toFixed(2)}s - Punkte: ${stagePoints}`);
            
            // Zur nächsten Stage
            if (currentStage < stages.length - 1) {
              currentStage++;
              startStage(currentStage);
            } else {
              displayEndScreen();
            }
          });
        } else {
          // Worst Practice: Show error with random error code
          popup.remove();
          const errorCode = Math.floor(Math.random() * 9000) + 1000; // Random 4-digit code
          const errorMessages = [
            `Fehler ${errorCode}: Beitrag konnte nicht geteilt werden`,
            `Error ${errorCode}: Sharing failed - Please try again`,
            `Fehlercode ${errorCode}: Unbekannter Fehler beim Teilen`,
            `ERR_${errorCode}: Connection timeout`,
            `Fehler ${errorCode}: Dieser Beitrag ist zu alt zum Teilen`,
            `Error ${errorCode}: Recipient not available`,
            `Fehlercode ${errorCode}: Netzwerkfehler - Bitte später versuchen`
          ];
          const randomError = errorMessages[Math.floor(Math.random() * errorMessages.length)];
          showErrorPopup(randomError);
        }
      });
    };
  });
  
  // Search functionality with default text that must be deleted
  const searchInput = document.getElementById("shitstagram-share-search-input");
  let dieterSearchPopupShown = false;
  
  // Worst Practice: Must manually delete text every time
  searchInput.addEventListener('focus', () => {
    // Nichts tun - User muss Text selbst löschen
  });
  
  searchInput.oninput = (e) => {
    let query = e.target.value;
    
    // Worst Practice: Autocorrect Dieter to dieter (wrong account)
    if (query === 'Dieter') {
      e.target.value = 'dieter';
      query = 'dieter';
    }
    
    const queryLower = query.toLowerCase();
    
    // Worst Practice: Show confusing popup when searching for dieter
    if (!dieterSearchPopupShown && queryLower.includes('diet') && query !== "suchen...") {
      dieterSearchPopupShown = true;
      
      // Get random user (not dieter)
      const visibleUsers = Array.from(document.querySelectorAll('.shitstagram-share-user'))
        .filter(el => el.dataset.username !== 'dieter_official');
      const randomUser = visibleUsers[Math.floor(Math.random() * visibleUsers.length)];
      const randomUserName = randomUser ? randomUser.dataset.displayname : "einem Freund";
      
      showConfusingSharePopup(randomUserName, () => {
        // Reset flag so popup can appear again if user searches again
        setTimeout(() => { dieterSearchPopupShown = false; }, 500);
      });
    }
    
    // Don't filter if still showing default text
    if (query === "suchen...") {
      document.querySelectorAll('.shitstagram-share-user').forEach(userEl => {
        userEl.style.display = 'flex';
      });
      return;
    }
    
    document.querySelectorAll('.shitstagram-share-user').forEach(userEl => {
      const username = userEl.dataset.username.toLowerCase();
      const displayName = userEl.querySelector('.shitstagram-share-user-name').textContent.toLowerCase();
      if (username.includes(queryLower) || displayName.includes(queryLower)) {
        userEl.style.display = 'flex';
      } else {
        userEl.style.display = 'none';
      }
    });
  };
}

// Worst Practice: Confusing popup while searching for dieter
function showConfusingSharePopup(randomUserName, callback) {
  const confusingPopup = document.createElement("div");
  confusingPopup.className = "shitstagram-confusing-popup";
  confusingPopup.innerHTML = `
    <div class="shitstagram-confusing-content">
      <h3>Beitrag teilen?</h3>
      <p>Möchtest du diesen Beitrag deinem Freund <strong>${randomUserName}</strong> teilen?</p>
      <div class="shitstagram-confusing-buttons">
        <button class="shitstagram-confusing-btn shitstagram-confusing-yes">Nein</button>
        <button class="shitstagram-confusing-btn shitstagram-confusing-no">Ja</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(confusingPopup);
  
  const yesBtn = confusingPopup.querySelector('.shitstagram-confusing-yes');
  const noBtn = confusingPopup.querySelector('.shitstagram-confusing-no');
  
  // Worst Practice: Buttons say opposite of what they do
  yesBtn.onclick = () => {
    confusingPopup.remove();
    if (callback) callback();
  };
  
  noBtn.onclick = () => {
    confusingPopup.remove();
    if (callback) callback();
  };
}

// Worst Practice: Double confirmation with psychologically confusing colors
function showConfusingConfirmation(targetUser, postId, postUsername, callback) {
  const targetDisplayName = shitStagramUsers.find(u => u.username === targetUser)?.displayName || targetUser;
  
  const confirmPopup = document.createElement("div");
  confirmPopup.className = "newsletter-popup";
  confirmPopup.innerHTML = `
    <div class="newsletter-popup-content">
      <h3>Beitrag teilen?</h3>
      <p>Bist du sicher, dass du diesen Beitrag teilen willst?</p>
      <div class="newsletter-buttons">
        <button class="newsletter-btn-no shitstagram-confusing-cancel">Ja, nicht senden</button>
        <button class="newsletter-btn-yes shitstagram-confusing-confirm">Nein, senden</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(confirmPopup);
  
  const cancelBtn = confirmPopup.querySelector('.shitstagram-confusing-cancel');
  const confirmBtn = confirmPopup.querySelector('.shitstagram-confusing-confirm');
  
  cancelBtn.onclick = () => {
    confirmPopup.remove();
    
    // Worst Practice: Second confirmation
    const secondConfirmPopup = document.createElement("div");
    secondConfirmPopup.className = "newsletter-popup";
    secondConfirmPopup.innerHTML = `
      <div class="newsletter-popup-content">
        <h3>Beitrag teilen?</h3>
        <p>Bist du sicher, dass du diesen Beitrag teilen willst?</p>
        <div class="newsletter-buttons">
          <button class="newsletter-btn-no shitstagram-confusing-final-yes">Nein, senden</button>
          <button class="newsletter-btn-yes shitstagram-confusing-final-no">Ja, nicht senden</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(secondConfirmPopup);
    
    const finalYesBtn = secondConfirmPopup.querySelector('.shitstagram-confusing-final-yes');
    const finalNoBtn = secondConfirmPopup.querySelector('.shitstagram-confusing-final-no');
    
    finalYesBtn.onclick = () => {
      secondConfirmPopup.remove();
      
      // Check if sending to Dieter without like
      if (targetUser === 'dieter_official' && postId === 1 && postUsername === 'trafish_cod') {
        if (!likedPosts.has(postId)) {
          // Close all popups
          document.querySelectorAll('.shitstagram-profile-popup, .shitstagram-post-detail-popup, .shitstagram-search-popup, .newsletter-popup, .shitstagram-share-popup').forEach(p => p.remove());
          
          // Show error popup
          showErrorPopup("Du musst den Post erst liken, bevor du ihn an Dieter senden kannst!");
          return;
        }
      }
      
      callback(true);
    };
    
    finalNoBtn.onclick = () => {
      secondConfirmPopup.remove();
      callback(false);
    };
  };
  
  confirmBtn.onclick = () => {
    confirmPopup.remove();
    callback(false);
  };
}

// Reverse psychology confirmation for sending message
function showReverseConfirmation(targetUser, postId, postUsername, sharePopup) {
  const confirmPopup = document.createElement("div");
  confirmPopup.className = "newsletter-popup";
  confirmPopup.innerHTML = `
    <div class="newsletter-popup-content">
      <h3>Beitrag teilen?</h3>
      <p>Bist du sicher, dass du diesen Beitrag teilen willst?</p>
      <div class="newsletter-buttons">
        <button class="newsletter-btn-no" id="reverse-send">Nein, senden</button>
        <button class="newsletter-btn-yes" id="reverse-no-send">Ja, nicht senden</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(confirmPopup);
  
  // Worst Practice: Gray "Nein, senden" actually sends, Purple "Ja, nicht senden" doesn't send
  document.getElementById("reverse-send").onclick = () => {
    confirmPopup.remove();
    
    // This actually sends!
    const isLatestPost = postId === 1;
    const isCorrectSender = postUsername === "trafish_cod";
    const isCorrectRecipient = targetUser === "dieter_official";
    
    if (isLatestPost && isCorrectSender && isCorrectRecipient) {
      // Check if post is also liked BEFORE sending
      if (!likedPosts.has(postId)) {
        sharePopup.remove();
        
        // Close all shitstagram popups to return to homepage
        document.querySelectorAll('.shitstagram-profile-popup, .shitstagram-post-detail-popup, .shitstagram-search-popup, .newsletter-popup').forEach(p => p.remove());
        
        // Show error popup with highest z-index
        showErrorPopup("Du musst den Post erst liken, bevor du ihn an Dieter senden kannst!");
        return;
      }
      
      // Correct: Latest post from trafish_cod to dieter_official AND liked
      window.shitStagramShared = true;
      sharePopup.remove();
      
      // Close all shitstagram popups
      document.querySelectorAll('.shitstagram-profile-popup, .shitstagram-post-detail-popup, .shitstagram-search-popup').forEach(p => p.remove());
      
      // Zeige Success-Overlay
      showSuccessOverlay(() => {
        // Stage abschließen und zur nächsten wechseln
        clearInterval(timerInterval);
        const stageTime = (Date.now() - startTime) / 1000;
        const stagePoints = Math.max(0, Math.round(1000 - (stageTime * 1.515)));
        totalScore += stagePoints;
        totalTime += stageTime;
        
        console.log(`Stage ${currentStage + 1} abgeschlossen in ${stageTime.toFixed(2)}s - Punkte: ${stagePoints}`);
        
        // Zur nächsten Stage
        if (currentStage < stages.length - 1) {
          currentStage++;
          startStage(currentStage);
        } else {
          displayEndScreen();
        }
      });
    } else {
      // Worst Practice: Show specific error messages
      sharePopup.remove();
      
      // Close all shitstagram popups to return to homepage
      document.querySelectorAll('.shitstagram-profile-popup, .shitstagram-post-detail-popup, .shitstagram-search-popup, .newsletter-popup').forEach(p => p.remove());
      
      // Spezifische Fehlermeldungen
      if (!isCorrectRecipient) {
        // Falscher Empfänger (nicht Dieter)
        showErrorPopup("Du musst den Post an Dieter senden, nicht an jemand anderen!");
      } else if (!isLatestPost || !isCorrectSender) {
        // Falscher Post (nicht der neueste von trafish_cod)
        showErrorPopup("Das ist nicht der neueste Post von Trafish cod!");
      } else {
        // Fallback: Random error
        const errorCode = Math.floor(Math.random() * 9000) + 1000;
        const errorMessages = [
          `Fehler ${errorCode}: Beitrag konnte nicht geteilt werden`,
          `Error ${errorCode}: Sharing failed - Please try again`,
          `Fehlercode ${errorCode}: Unbekannter Fehler beim Teilen`,
          `ERR_${errorCode}: Connection timeout`,
          `Fehler ${errorCode}: Dieser Beitrag ist zu alt zum Teilen`,
          `Error ${errorCode}: Recipient not available`,
          `Fehlercode ${errorCode}: Netzwerkfehler - Bitte später versuchen`
        ];
        const randomError = errorMessages[Math.floor(Math.random() * errorMessages.length)];
        showErrorPopup(randomError);
      }
    }
  };
  
  // Purple "Ja, nicht senden" closes without sending
  document.getElementById("reverse-no-send").onclick = () => {
    confirmPopup.remove();
    sharePopup.remove();
    // Does nothing - message not sent
  };
}

function completeCheckout() {
  checkoutCompleted = true;
  stopRandomPopups();
  stopSearchPopup();
  
  // Zeige Success-Overlay
  showSuccessOverlay(() => {
    // Stage 1 erfolgreich - berechne Punkte für Shop-Stage
    clearInterval(timerInterval);
    const stageTime = (Date.now() - startTime) / 1000;
    const stagePoints = Math.max(0, Math.round(1000 - (stageTime * 1.515)));
    totalScore += stagePoints;
    totalTime += stageTime;
    
    console.log(`Stage 1 (Shop) abgeschlossen in ${stageTime.toFixed(2)}s - Punkte: ${stagePoints}`);
    
    // Direkt zur nächsten Stage
    if (currentStage < stages.length - 1) {
      currentStage++;
      showScreen("stages");
      startStage(currentStage);
    }
  });
}

// Weiter-Button existiert nicht mehr - Stages müssen sich selbst weiterschalten
// Die Logik für Stage-Abschluss ist jetzt in den jeweiligen Stage-Funktionen integriert

function displayEndScreen() {
  // Stop alle Stage 2 Pop-ups und Intervalle
  stopStage2PausePopup();
  stopStage2Notifications();
  
  // Entferne alle Stage 2 Pop-ups und Notifications aus dem DOM
  const stage2Popups = document.querySelectorAll('.stage2-pause-popup, .stage2-notification');
  stage2Popups.forEach(popup => popup.remove());
  
  // Maximale Punkte berechnen (1000 Punkte pro Stage)
  const maxPossiblePoints = stages.length * 1000;
  
  // Zeige Punkte von maximal möglichen Punkten
  const finalScoreElement = document.getElementById("final-score");
  finalScoreElement.innerHTML = `<span style="color: #B20CE9;">${totalScore}</span><span style="color: #888888;"> / ${maxPossiblePoints}</span>`;
  
  // Format time display
  const minutes = Math.floor(totalTime / 60);
  const seconds = Math.floor(totalTime % 60);
  const timeText = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
  
  // Determine time rating with gray/purple shading
  let timeRating = '';
  let timeColor = '';
  if (totalTime < 120) {
    timeRating = 'Blitzschnell!';
    timeColor = '#e0e0e0'; // Light gray
  } else if (totalTime < 180) {
    timeRating = 'Sehr gut!';
    timeColor = '#c0c0c0'; // Medium-light gray
  } else if (totalTime < 240) {
    timeRating = 'Gut gemacht!';
    timeColor = '#a0a0a0'; // Medium gray
  } else if (totalTime < 300) {
    timeRating = 'Solide!';
    timeColor = '#808080'; // Gray
  } else if (totalTime < 360) {
    timeRating = 'Geschafft!';
    timeColor = '#606060'; // Dark gray
  } else {
    timeRating = 'Durchgehalten!';
    timeColor = '#505050'; // Very dark gray
  }
  
  // Update or create time display
  let timeDisplay = document.getElementById('final-time-display');
  if (!timeDisplay) {
    const scoreContainer = document.getElementById('final-score-container');
    timeDisplay = document.createElement('div');
    timeDisplay.id = 'final-time-display';
    timeDisplay.style.marginTop = '30px';
    scoreContainer.appendChild(timeDisplay);
  }
  
  timeDisplay.innerHTML = `
    <p style="font-size: 1.2em; color: #888; margin-bottom: 10px;">Gesamtzeit:</p>
    <p style="font-size: 2.5em; font-weight: bold; color: ${timeColor}; margin: 0;">${timeText}</p>
    <p style="font-size: 1.2em; margin-top: 10px; color: ${timeColor};">${timeRating}</p>
  `;
  
  showScreen("end-screen");
}

document.getElementById("restart-btn").onclick = () => {
  totalScore = 0;
  totalTime = 0;
  currentStage = 0;
  checkoutCompleted = false;
  clearInterval(timerInterval);
  stopRandomPopups();
  stopSearchPopup();
  showScreen("start-screen");
  ready = false;
  readyBtn.textContent = "Nicht bereit";
  readyBtn.classList.add("ready"); // Startet mit "ready" Farbe obwohl nicht bereit
  readyBtn.classList.remove("notready");
  clickWord.classList.add("active-link");
};

// === TEST FUNKTION - Im Browser Console verwenden ===
// Tippe in der Browser Console: testStage(0) für Stage 1, testStage(1) für Stage 2, etc.
window.testStage = function(stageIndex) {
  // Cleanup
  if (timerInterval) clearInterval(timerInterval);
  stopRandomPopups();
  stopSearchPopup();
  
  const allPopups = document.querySelectorAll(".error-popup, .newsletter-popup, .purchase-notification");
  allPopups.forEach(p => p.remove());
  
  // Wenn Stage 1+ getestet wird, markiere Checkout als completed
  if (stageIndex > 0) {
    checkoutCompleted = true;
  }
  
  // Zeige Stages Screen und starte gewünschte Stage
  showScreen("stages");
  startStage(stageIndex);
  
  console.log(`✅ Test-Modus: Stage ${stageIndex + 1} geladen`);
};

showScreen("start-screen");
