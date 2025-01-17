console.log("Hier gibts keine Fehler zu sehen ;)")

document.addEventListener("DOMContentLoaded", () => {
    const elements = [
        {
            element: document.getElementById("name"),
            text: "Jonas Gissler",
        },
        {
            element: document.querySelector("h2"),
            text: "Student B.A. Medienkonzeption im 4 Semester mit Schwerpunkt auf User centered Design",
        },
        {
            element: document.querySelector("p"),
            text: `Hey! Mein Name ist Jonas Gissler. Ich bin 19 Jahre alt, wohne in Triberg im Schwarzwald und studiere momentan Medienkonzeption an der Hochschule Furtwangen im 4 Semester. Mein Studiums/interessensschwerpunkt liegt im Nutzerzentrierten Design. 
                Meine instructional oder UX/UI Designs mit dem Nutzenden im Mittelpunkt zu kreieren ist meine Leidenschaft, Medien erstellen ist meine Leidenschaft. Ich bin offen, motiviert, teamfähig und stelle mich gerne neuen Herausforderungen und Lerninhalten.`,
        },
    ];

    let index = 0;
    const typingSpeed = 15;

    function typeText({ element, text }, callback) {
        let charIndex = 0;
        function type() {
            if (charIndex < text.length) {
                element.textContent += text[charIndex];
                charIndex++;
                setTimeout(type, typingSpeed);
            } else {
                callback();
            }
        }
        type();
    }

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


