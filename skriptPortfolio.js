console.log("Hier gibts keine Fehler zu sehen ;)")

document.addEventListener("DOMContentLoaded", () => {
    const elements = [
        {
            element: document.getElementById("name"),
            text: "Jonas Gissler",
        },
        {
            element: document.querySelector("h2"),
            text: "Student B.A. Medienkonzeption im 4 Semester mit Schwerpunkt auf User-centered Design",
        },
        {
            element: document.querySelector("p"),
            text: `Hey! Mein Name ist Jonas Gissler, ich bin 19 Jahre alt und komme aus Triberg im Schwarzwald. Aktuell studiere ich Medienkonzeption im 4. Semester an der Hochschule Furtwangen.

Mein Schwerpunkt liegt im nutzerzentrierten Design – Meine Leidenschaft ist es, Medieninhalte zu gestalten, die die Bedürfnisse des Menschen in den Mittelpunkt stellen. Dabei verbinde ich Kreativität und psychologische Usability- und UX-Aspekte mit strukturiertem Vorgehen, um Designs zu entwickeln, die nicht nur ästhetisch, sondern auch funktional und nutzerfreundlich sind.

Ich bin offen, motiviert und teamfähig und freue mich darauf, mich neuen Herausforderungen und Lerninhalten zu stellen. Mit einer Mischung aus Neugier und Ehrgeiz arbeite ich daran, mich ständig weiterzuentwickeln.

`,
        },
    ];

    const typingSpeed = 0; // Minimum delay, but now we'll add multiple characters at once
    const chunkSize = 6;    // Number of characters to add per iteration

    function typeText({ element, text }, callback) {
        let charIndex = 0;
        function type() {
            if (charIndex < text.length) {
                element.textContent += text.substr(charIndex, chunkSize);
                charIndex += chunkSize;
                setTimeout(type, typingSpeed);
            } else {
                callback();
            }
        }
        type();
    }

    let index = 0;
    function startTyping() {
        if (index < elements.length) {
            const { element, text } = elements[index];
            typeText({ element, text }, () => {
                index++;
                startTyping();
            });
        }
    }

    startTyping();
});

document.addEventListener("DOMContentLoaded", () => {
    const progressBars = document.querySelectorAll('progress');

    // Intersection Observer Setup
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Wenn die Progressbar sichtbar wird, fügen wir die Klasse hinzu
                entry.target.classList.add('progress-visible');
                // Beobachtung beenden, damit es nicht immer wieder ausgelöst wird
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5  // Beobachtet die Progressbar, wenn sie zu mindestens 50% sichtbar ist
    });

    // Beobachten aller Progressbars
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
});



// Funktion, um zu überprüfen, ob das Element im Viewport ist
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top <= window.innerHeight && rect.bottom >= 0;
}

// Funktion zum Hinzufügen der "visible" Klasse, wenn das Element sichtbar ist
function handleScroll() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineTitles = document.querySelectorAll('.timeline-title');

    // Überprüfen, ob die Timeline-Elemente im Viewport sind und die Klasse hinzufügen
    timelineItems.forEach(item => {
        if (isElementInViewport(item)) {
            item.classList.add('visible');
        }
    });

    // Überprüfen, ob die Titel im Viewport sind und die Klasse hinzufügen
    timelineTitles.forEach(title => {
        if (isElementInViewport(title)) {
            title.classList.add('visible');
        }
    });
}

// Event Listener für das Scrollen
window.addEventListener('scroll', handleScroll);

// Initialer Check für das Laden der Seite
document.addEventListener('DOMContentLoaded', handleScroll);


document.addEventListener("DOMContentLoaded", () => {
    // Wähle alle Timeline-Items aus
    const timelineItems = document.querySelectorAll(".timeline-item");

    // Prüfe, ob es Timeline-Items gibt
    if (timelineItems.length > 0) {
        // Füge der letzten Timeline-Item den pulsierenden Effekt hinzu
        const lastItem = timelineItems[timelineItems.length - 1];
        const dot = lastItem.querySelector(".dot");
        if (dot) {
            dot.classList.add("current");
        }
    }
});



// Wähle alle Skill-Karten aus
const skillCards = document.querySelectorAll('.skill-container');

skillCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // Mausposition relativ zur Karte (X)
        const y = e.clientY - rect.top; // Mausposition relativ zur Karte (Y)

        // Berechnung der Rotationswerte (noch stärkere Neigung)
        const rotateX = ((y / rect.height) - 0.5) * -45; // Neigung auf der X-Achse
        const rotateY = ((x / rect.width) - 0.5) * 45; // Neigung auf der Y-Achse

        // Anwenden der Transformation
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    // Zurücksetzen des Effekts, wenn die Maus die Karte verlässt
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg)';
        // Kein Schatten-Reset mehr hier!
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const bentoCards = document.querySelectorAll('.bento-card');
    
    bentoCards.forEach(card => {
        card.addEventListener('touchstart', function(e) {
            // Verhindern des Standard-Touch-Verhaltens
            e.preventDefault();
            
            // Nur für mobile Geräte (max-width: 600px)
            if (window.innerWidth <= 1302) {
                // Alle anderen Karten deaktivieren
                bentoCards.forEach(otherCard => {
                    if (otherCard !== this) {
                        otherCard.classList.remove('card-active');
                    }
                });
                
                // Diese Karte aktivieren/deaktivieren
                this.classList.toggle('card-active');
            }
        }, {passive: false});
    });
    
    // Event-Listener für Fenstergrößenänderungen
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1302) {
            bentoCards.forEach(card => {
                card.classList.remove('card-active');
            });
        }
    });
});
