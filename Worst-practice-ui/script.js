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
    title: "Stage 2: Formular ausfüllen",
    content: `
      <div style="max-width: 600px; margin: 0 auto; padding: 40px; text-align: left;">
        <p style="color: #ccc; margin-bottom: 20px;">Fülle das folgende Formular aus:</p>
        <div style="display: flex; flex-direction: column; gap: 15px;">
          <input id="stage2-name" type="text" placeholder="Name" style="padding: 12px; border-radius: 8px; border: 2px solid #B20CE9; background: #0d0d0d; color: #fff; font-size: 1em;">
          <input id="stage2-email" type="text" placeholder="E-Mail" style="padding: 12px; border-radius: 8px; border: 2px solid #B20CE9; background: #0d0d0d; color: #fff; font-size: 1em;">
          <select id="stage2-option" style="padding: 12px; border-radius: 8px; border: 2px solid #B20CE9; background: #0d0d0d; color: #fff; font-size: 1em;">
            <option value="">-- Bitte wählen --</option>
            <option value="option1">Option A</option>
            <option value="option2">Option B</option>
            <option value="option3">Option C</option>
          </select>
        </div>
      </div>
    `,
    validate: () => {
      const name = document.getElementById("stage2-name").value.trim();
      const email = document.getElementById("stage2-email").value.trim();
      const option = document.getElementById("stage2-option").value;
      
      if (!name) return "Bitte gib deinen Namen ein!";
      if (!email || !email.includes("@")) return "Bitte gib eine gültige E-Mail ein!";
      if (!option) return "Bitte wähle eine Option aus!";
      
      return ""; // Erfolgreich
    }
  },
  
  {
    title: "Stage 3: Klick-Challenge",
    content: `
      <div style="max-width: 600px; margin: 0 auto; padding: 40px; text-align: center;">
        <p style="color: #ccc; margin-bottom: 30px;">Klicke genau 10 Mal auf den Button:</p>
        <button id="click-counter-btn" style="padding: 20px 40px; font-size: 1.2em; background: #B20CE9; color: #fff; border: 3px solid #B20CE9; border-radius: 12px; cursor: pointer; font-weight: bold;">
          Klicks: <span id="click-count">0</span> / 10
        </button>
      </div>
    `,
    validate: () => {
      const clickCount = parseInt(document.getElementById("click-count").textContent);
      if (clickCount < 10) return "Du musst genau 10 Mal klicken!";
      if (clickCount > 10) return "Du hast zu oft geklickt! Bitte neu laden.";
      return ""; // Erfolgreich
    }
  }
];

// --- Produktdaten mit festen Bildern ---
// Um eigene Bilder hinzuzufügen: Lege die Bilddatei in den "img/" Ordner und trage den Dateinamen hier ein
// Beispiel: img: "img/mein-produkt.jpg" oder img: "img/mein-produkt.png"
const products = [
  { id: 1, name: "OfficeBook 100", price: 250, category: "office", color: "black", soldout: false, img: "img/Placeholder.png", tags: ["Teuer"] },
  { id: 2, name: "StudentPro Basic", price: 499, category: "office", color: "red", soldout: false, img: "img/Placeholder.png", tags: ["Unbeliebt"] },
  { id: 3, name: "Gamersdream 4000 Pro", price: 5899, category: "gaming", color: "black", soldout: false, img: "img/Placeholder.png", tags: ["Langsam"] },
  { id: 4, name: "CasualBook Mini", price: 199, category: "office", color: "black", soldout: true, img: "img/Placeholder.png", tags: ["Groß"] },
  { id: 5, name: "OverheatPro RGB", price: 5999, category: "gaming", color: "red", soldout: false, img: "img/Placeholder.png", tags: ["Heiß"] },
  { id: 6, name: "LagMachine 200", price: 699, category: "gaming", color: "black", soldout: false, img: "img/Placeholder.png", tags: ["Vintage"] },
  { id: 7, name: "OfficeBook Deluxe", price: 799, category: "office", color: "black", soldout: true, img: "img/Placeholder.png", tags: ["Fast Neu"] },
  { id: 8, name: "Super Mega Laptop 9000", price: 8999, category: "gaming", color: "red", soldout: false, img: "img/Placeholder.png", tags: ["Mittel"] },
  { id: 9, name: "BudgetBook Eco", price: 179, category: "office", color: "black", soldout: false, img: "img/Placeholder.png", tags: ["Luxus"] },
  { id: 10, name: "Gamersdream 3500 Gaming", price: 5799, category: "gaming", color: "red", soldout: false, img: "img/Placeholder.png", tags: ["Günstig"] },
  { id: 11, name: "WorkStation Pro", price: 1299, category: "office", color: "black", soldout: false, img: "img/Placeholder.png", tags: ["Alt"] },
  { id: 12, name: "UltraGamer X1", price: 6499, category: "gaming", color: "red", soldout: false, img: "img/Placeholder.png", tags: ["Schlecht"] },
  { id: 13, name: "SlimBook Air", price: 899, category: "office", color: "black", soldout: false, img: "img/Placeholder.png", tags: ["Dick"] },
  { id: 14, name: "PowerGaming Elite", price: 7299, category: "gaming", color: "black", soldout: false, img: "img/Placeholder.png", tags: ["Langsam"] },
  { id: 15, name: "BasicOffice 50", price: 159, category: "office", color: "black", soldout: true, img: "img/Placeholder.png", tags: ["Premium"] },
  { id: 16, name: "Gamerdream 5000 Pro", price: 5949, category: "gaming", color: "black", soldout: false, img: "img/Placeholder.png", tags: ["Kalt"] },
  { id: 17, name: "TurboLaptop MAX", price: 5499, category: "gaming", color: "red", soldout: false, img: "img/Placeholder.png", tags: ["Träge"] },
  { id: 18, name: "CompactBook Mini Plus", price: 349, category: "office", color: "black", soldout: false, img: "img/Placeholder.png", tags: ["Riesig"] },
  { id: 19, name: "RageGamer 3000", price: 4999, category: "gaming", color: "red", soldout: false, img: "img/Placeholder.png", tags: ["Entspannt"] },
  { id: 20, name: "Gamerstream 5000 Ultra", price: 5999, category: "gaming", color: "red", soldout: false, img: "img/Placeholder.png", tags: ["Basic"] },
  { id: 21, name: "BusinessBook Premium", price: 1499, category: "office", color: "black", soldout: false, img: "img/Placeholder.png", tags: ["Billig"] },
  { id: 22, name: "HyperSpeed Gaming", price: 6799, category: "gaming", color: "black", soldout: false, img: "img/Placeholder.png", tags: ["Gemütlich"] },
  { id: 23, name: "Gamersdream 5000 Elite", price: 5999, category: "gaming", color: "red", soldout: false, img: "img/Placeholder.png", tags: ["Normal"] },
  { id: 24, name: "EcoBook Green", price: 299, category: "office", color: "black", soldout: false, img: "img/Placeholder.png", tags: ["Stromfresser"] },
  { id: 25, name: "NitroGaming Beast", price: 8499, category: "gaming", color: "red", soldout: false, img: "img/Placeholder.png", tags: ["Zahm"] },
  { id: 26, name: "StudentBook Lite", price: 279, category: "office", color: "black", soldout: false, img: "img/Placeholder.png", tags: ["Schwer"] },
  { id: 27, name: "Gamersdream 5000", price: 5999, category: "gaming", color: "black", soldout: false, img: "img/Placeholder.png", tags: ["Besonders"] },
  { id: 28, name: "Gamersdream 5500 Turbo", price: 6099, category: "gaming", color: "black", soldout: false, img: "img/Placeholder.png", tags: ["Retro"] },
  { id: 29, name: "ProGamer Ultimate", price: 9999, category: "gaming", color: "black", soldout: false, img: "img/Placeholder.png", tags: ["Schnäppchen"] },
  { id: 30, name: "OfficeElite 300", price: 699, category: "office", color: "black", soldout: true, img: "img/Placeholder.png", tags: ["Neu"] },
  { id: 31, name: "MegaGaming Titan", price: 7999, category: "gaming", color: "red", soldout: false, img: "img/Placeholder.png", tags: ["Mini"] },
  { id: 32, name: "SmartBook S1", price: 449, category: "office", color: "black", soldout: false, img: "img/Placeholder.png", tags: ["Dumm"] },
  { id: 33, name: "ExtremeGamer Pro", price: 5799, category: "gaming", color: "black", soldout: false, img: "img/Placeholder.png", tags: ["Moderat"] },
  { id: 34, name: "Gamersdream 6000 Ultra", price: 6199, category: "gaming", color: "black", soldout: false, img: "img/Placeholder.png", tags: ["Durchschnitt"] },
  { id: 35, name: "Gamerzdream 5000 Plus", price: 5999, category: "gaming", color: "red", soldout: false, img: "img/Placeholder.png", tags: ["Minus"] },
  { id: 36, name: "ValueBook 200", price: 229, category: "office", color: "black", soldout: false, img: "img/Placeholder.png", tags: ["Luxus"] }
];

let checkoutCompleted = false;

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
let startTime = 0;
let timerInterval = null;

function showScreen(id) {
  ["start-screen", "stages", "end-screen", "checkout-screen"].forEach(s => {
    const el = document.getElementById(s);
    if (el) el.style.display = "none";
  });
  document.getElementById(id).style.display = "flex";
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
    
    // Wenn über 60 Sekunden: Zeige Minuten:Sekunden Format mit "m"
    if (elapsed >= 60) {
      const minutes = Math.floor(elapsed / 60);
      const seconds = Math.floor(elapsed % 60);
      timerEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}m`;
      timerEl.classList.add("timer-overtime");
    } else {
      timerEl.textContent = `${elapsed.toFixed(2)}s`;
      timerEl.classList.remove("timer-overtime");
    }
  }, 20);

  // Stage-spezifische Initialisierung
  if (idx === 0) {
    initWorstShop();
    startRandomPopups();
    startSearchPopup();
  } else if (idx === 2) {
    // Stage 3: Klick-Challenge Setup
    let clicks = 0;
    const btn = document.getElementById("click-counter-btn");
    const countSpan = document.getElementById("click-count");
    if (btn) {
      btn.onclick = () => {
        clicks++;
        countSpan.textContent = clicks;
      };
    }
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
          <button class="buy-btn"><span>Jetzt bestellen</span></button>
        </div>
      `;

      const buyBtnSpan = div.querySelector(".buy-btn span");
      buyBtnSpan.onclick = (e) => {
        e.stopPropagation();
        if (p.name === "Gamersdream 5000") {
          showScreen("checkout-screen");
          setupCheckout();
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
      renderProducts(p => !p.name.toLowerCase().includes("gamersdream"));
      showErrorPopup("Leider keine Ergebnisse für deine Suche gefunden. Probiere andere Filter!");
      return;
    }
    
    if (Math.random() > 0.4) {
      renderProducts(p => p.name.toLowerCase().includes(term));
    } else {
      renderProducts(() => Math.random() > 0.5);
      showErrorPopup("Deine Suche lieferte unklare Ergebnisse.");
    }
  };
}

// --- ERROR POPUP LOGIK (Worst Practice: wanderndes X, langsames Schließen) ---
let popupCloseInterval = null;
function showErrorPopup(message) {
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
    setTimeout(() => popup.remove(), 4000); // 4 Sekunden langsame Schließanimation
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
      <span class="purchase-icon">🛒</span>
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
}

function showSearchStillPopup() {
  const popup = document.createElement("div");
  popup.id = "search-still-popup";
  popup.className = "newsletter-popup";
  popup.innerHTML = `
    <div class="newsletter-popup-content">
      <h3>🔍 Suchst du immer noch?</h3>
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
        <p style="color: #B20CE9; margin: 0; font-weight: 600;">❌ Support momentan nicht verfügbar</p>
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
          <label for="email">E-Mail (optional, aber Pflicht)</label>
          <input type="text" id="email" class="checkout-input" value="E-Mail (optional, aber Pflicht)">
        </div>
        <div class="input-group">
          <label for="name">Name (Nachname zuerst!)</label>
          <input type="text" id="name" class="checkout-input" value="Name (Nachname zuerst!)">
        </div>
        <div class="input-group">
          <label for="password">Passwort festlegen</label>
          <input type="text" id="password" class="checkout-input" value="Passwort">
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

  // Wenn "Bestellen" geklickt wird
  document.getElementById("buy-final-btn").onclick = () => {
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
      showErrorPopup("Passwort-Fehler: " + errors[0]);
      resetCheckoutForm();
      return;
    }

    // Zeige Newsletter-Popup (Worst Practice!)
    showNewsletterPopup();
  };
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
      <h3>📧 Newsletter abonnieren?</h3>
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
      completeCheckout();
    }, 3000);
  };
  
  document.getElementById("newsletter-no").onclick = () => {
    popup.classList.add("closing");
    setTimeout(() => {
      popup.remove();
      showConfirmationPopup();
    }, 3000);
  };
}

function showConfirmationPopup() {
  const popup = document.createElement("div");
  popup.id = "confirmation-popup";
  popup.className = "newsletter-popup";
  popup.innerHTML = `
    <div class="newsletter-popup-content">
      <h3>⚠️ Bist du sicher?</h3>
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
        
        <h4>📰 Was du erhältst:</h4>
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
        
        <h4>🔒 Datenschutz:</h4>
        <p>Deine Daten sind bei uns sicher! Wir verwenden modernste Verschlüsselung und geben deine Informationen niemals an Dritte weiter. Du kannst dich jederzeit mit einem Klick abmelden.</p>
        <p>DSGVO-konform, SSL-verschlüsselt, regelmäßige Security-Audits.</p>
        
        <h4>📅 Was dich erwartet:</h4>
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
  stopRandomPopups();
  stopSearchPopup();
  
  // Stage 1 erfolgreich - berechne Punkte für Shop-Stage
  clearInterval(timerInterval);
  const stageTime = (Date.now() - startTime) / 1000;
  const stagePoints = Math.max(0, Math.round(1000 - (stageTime * 8.33)));
  totalScore += stagePoints;
  
  console.log(`Stage 1 (Shop) abgeschlossen in ${stageTime.toFixed(2)}s - Punkte: ${stagePoints}`);
  
  // Direkt zur nächsten Stage ohne Popup
  if (currentStage < stages.length - 1) {
    currentStage++;
    showScreen("stages");
    startStage(currentStage);
  }
}

document.getElementById("submit-btn").onclick = () => {
  const error = stages[currentStage].validate();
  if (error) {
    showErrorPopup(error);
  } else {
    // Stage erfolgreich abgeschlossen - berechne Punkte
    clearInterval(timerInterval);
    const stageTime = (Date.now() - startTime) / 1000;
    
    // Punktesystem: Je schneller, desto mehr Punkte (Max 1000 Punkte pro Stage)
    // Nach 60 Sekunden: 500 Punkte, nach 120 Sekunden: 0 Punkte
    const stagePoints = Math.max(0, Math.round(1000 - (stageTime * 8.33)));
    totalScore += stagePoints;
    
    console.log(`Stage ${currentStage + 1} abgeschlossen in ${stageTime.toFixed(2)}s - Punkte: ${stagePoints}`);
    
    // Zur nächsten Stage oder zum End-Screen
    if (currentStage < stages.length - 1) {
      currentStage++;
      startStage(currentStage);
    } else {
      // Alle Stages abgeschlossen - zeige Endergebnis
      clearInterval(timerInterval);
      document.getElementById("final-score").textContent = totalScore;
      showScreen("end-screen");
    }
  }
};

document.getElementById("restart-btn").onclick = () => {
  totalScore = 0;
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

showScreen("start-screen");
