console.log("Hier gibts keine Fehler zu sehen ;)")

// ===== HAMBURGER MENU =====
document.addEventListener('DOMContentLoaded', () => {
    // Speech Bubble Interaktion - nur Desktop mit Random Facts
    const profileImage = document.querySelector('.image-container img');
    const speechBubble = document.querySelector('.speech-bubble');
    
    const randomFacts = [
        "Ich finde Nutella mit Butter besser als ohne",
        "Ich bin Team \"Dark Mode\"",
        "Ich kann stundenlang über den Wert von gutem UX/UI Design sprechen",
        "Gut gestaltete Microinteractions machen mich happy",
        "Red Bull ist mein Treibstoff",
        "Ich habe mehr Browsertabs offen als Ausreden dafür, warum sie noch offen sind"
    ];

    let lastFactIndex = -1; // Speichert den Index des letzten Facts

    // Nur auf Desktop (min-width: 1303px)
    if (window.matchMedia('(min-width: 1303px)').matches) {
        profileImage.addEventListener('mouseenter', () => {
            // Wähle zufälligen Fact, der nicht der letzte ist
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * randomFacts.length);
            } while (randomIndex === lastFactIndex && randomFacts.length > 1);
            
            lastFactIndex = randomIndex;
            speechBubble.textContent = randomFacts[randomIndex];
            speechBubble.classList.add('show');
        });
        
        profileImage.addEventListener('mouseleave', () => {
            speechBubble.classList.remove('show');
        });
    }

    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

    // Open/Close menu with hamburger button
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', () => {
            if (mobileOverlay.classList.contains('active')) {
                // Menu is open, close it
                closeMenu();
            } else {
                // Menu is closed, open it
                mobileOverlay.classList.add('active');
                hamburgerBtn.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
    }

    // Close menu
    function closeMenu() {
        mobileOverlay.classList.remove('active');
        hamburgerBtn.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    }

    // Remove close button event listener since it no longer exists

    // Close menu when clicking on overlay background
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', (e) => {
            if (e.target === mobileOverlay) {
                closeMenu();
            }
        });
    }

    // Close menu when clicking navigation links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileOverlay.classList.contains('active')) {
            closeMenu();
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // Only run typing animation on desktop (>1302px)
    if (window.innerWidth <= 1302) {
        // On mobile/tablet, set text immediately
        document.getElementById("name").textContent = "Jonas Gissler";
        document.querySelector("h2").textContent = "Student B.A. Medienkonzeption im 5 Semester mit Schwerpunkt auf User-centered Design";
        document.querySelector("p").textContent = `Hey! Mein Name ist Jonas Gissler, ich bin 20 Jahre alt und komme aus Triberg im Schwarzwald. Aktuell studiere ich Medienkonzeption im 5. Semester an der Hochschule Furtwangen.

Mein Schwerpunkt liegt im nutzerzentrierten Design – Meine Leidenschaft ist es, Medieninhalte zu gestalten, die die Bedürfnisse des Menschen in den Mittelpunkt stellen. Dabei verbinde ich Kreativität und psychologische Usability- und UX-Aspekte mit strukturiertem Vorgehen, um Designs zu entwickeln, die nicht nur ästhetisch, sondern auch funktional und nutzerfreundlich sind.

Ich bin offen, motiviert und teamfähig und freue mich darauf, mich neuen Herausforderungen und Lerninhalten zu stellen. Mit einer Mischung aus Neugier und Ehrgeiz arbeite ich daran, mich ständig weiterzuentwickeln.

`;
        return; // Exit early
    }

    // Desktop: Run typing animation
    const elements = [
        {
            element: document.getElementById("name"),
            text: "Jonas Gissler",
        },
        {
            element: document.querySelector("h2"),
            text: "Student B.A. Medienkonzeption im 5 Semester mit Schwerpunkt auf User-centered Design",
        },
        {
            element: document.querySelector("p"),
            text: `Hey! Mein Name ist Jonas Gissler, ich bin 20 Jahre alt und komme aus Triberg im Schwarzwald. Aktuell studiere ich Medienkonzeption im 5. Semester an der Hochschule Furtwangen.

Mein Schwerpunkt liegt im nutzerzentrierten Design – Meine Leidenschaft ist es, Medieninhalte zu gestalten, die die Bedürfnisse des Menschen in den Mittelpunkt stellen. Dabei verbinde ich Kreativität und psychologische Usability- und UX-Aspekte mit strukturiertem Vorgehen, um Designs zu entwickeln, die nicht nur ästhetisch, sondern auch funktional und nutzerfreundlich sind.

Ich bin offen, motiviert und teamfähig und freue mich darauf, mich neuen Herausforderungen und Lerninhalten zu stellen. Mit einer Mischung aus Neugier und Ehrgeiz arbeite ich daran, mich ständig weiterzuentwickeln.

`,
        },
    ];

    const typingSpeed = 0; // Minimum delay
    const chunkSize = 4;    // Number of characters to add per iteration

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
    const skillTitles = document.querySelectorAll('.skill-container h3');
    const skillLabels = document.querySelectorAll('.skill-container ul li span');

    // Setze initial alle Elemente auf sichtbar, die im Viewport sind
    setTimeout(() => {
        skillTitles.forEach(title => {
            if (isElementInViewport(title, 300)) {
                title.classList.add('text-visible');
            }
        });
        
        skillLabels.forEach(label => {
            if (isElementInViewport(label, 300)) {
                label.classList.add('text-visible');
            }
        });
        
        progressBars.forEach(bar => {
            if (isElementInViewport(bar, 300)) {
                bar.classList.add('progress-visible');
            }
        });
    }, 0);

    // Intersection Observer Setup für Progressbars
    const progressObserver = new IntersectionObserver((entries, observer) => {
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

    // Intersection Observer Setup für Texte (h3 und span)
    const textObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Verzögerung für gestaffelten Effekt bei span-Elementen
                const delay = entry.target.tagName === 'SPAN' ? 
                    Array.from(entry.target.parentElement.parentElement.children).indexOf(entry.target.parentElement) * 100 : 0;
                
                setTimeout(() => {
                    entry.target.classList.add('text-visible');
                }, delay);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3  // Beobachtet Texte, wenn sie zu mindestens 30% sichtbar sind
    });

    // Beobachten aller Progressbars
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });

    // Beobachten aller Skill-Titel (h3)
    skillTitles.forEach(title => {
        textObserver.observe(title);
    });

    // Beobachten aller Skill-Labels (span)
    skillLabels.forEach(label => {
        textObserver.observe(label);
    });

    // Zusätzliche Prüfung nach Browser Scroll Restore
    // Browser scrollt manchmal zur letzten Position nach dem Laden
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    
    // Mehrere Prüfungen um sicherzustellen, dass Elemente nach Scroll sichtbar werden
    const recheckVisibility = () => {
        skillTitles.forEach(title => {
            if (!title.classList.contains('text-visible') && isElementInViewport(title, 300)) {
                title.classList.add('text-visible');
            }
        });
        
        skillLabels.forEach(label => {
            if (!label.classList.contains('text-visible') && isElementInViewport(label, 300)) {
                label.classList.add('text-visible');
            }
        });
        
        progressBars.forEach(bar => {
            if (!bar.classList.contains('progress-visible') && isElementInViewport(bar, 300)) {
                bar.classList.add('progress-visible');
            }
        });
    };
    
    // Prüfe nach Scroll-Events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(recheckVisibility, 100);
    }, { once: true, passive: true });
    
    // Prüfe auch nach kurzer Verzögerung (für Browser Scroll Restore)
    setTimeout(recheckVisibility, 100);
    setTimeout(recheckVisibility, 300);
    setTimeout(recheckVisibility, 500);

    // Fallback: Überprüfe nach dem Laden, ob bereits sichtbare Elemente die Klasse haben
    window.addEventListener('load', () => {
        // Sofortige erste Prüfung
        setTimeout(() => {
            skillTitles.forEach(title => {
                if (!title.classList.contains('text-visible') && isElementInViewport(title, 200)) {
                    title.classList.add('text-visible');
                }
            });
            
            skillLabels.forEach((label, index) => {
                if (!label.classList.contains('text-visible') && isElementInViewport(label, 200)) {
                    setTimeout(() => {
                        label.classList.add('text-visible');
                    }, index * 50);
                }
            });
            
            progressBars.forEach(bar => {
                if (!bar.classList.contains('progress-visible') && isElementInViewport(bar, 200)) {
                    bar.classList.add('progress-visible');
                }
            });
        }, 50);
        
        // Zweite Prüfung nach etwas mehr Zeit für sichere Initialisierung
        setTimeout(() => {
            skillTitles.forEach(title => {
                if (!title.classList.contains('text-visible') && isElementInViewport(title, 300)) {
                    title.classList.add('text-visible');
                }
            });
            
            skillLabels.forEach((label, index) => {
                if (!label.classList.contains('text-visible') && isElementInViewport(label, 300)) {
                    label.classList.add('text-visible');
                }
            });
            
            progressBars.forEach(bar => {
                if (!bar.classList.contains('progress-visible') && isElementInViewport(bar, 300)) {
                    bar.classList.add('progress-visible');
                }
            });
        }, 500);
    });
});



// Funktion, um zu überprüfen, ob das Element im Viewport ist
function isElementInViewport(el, offset = 0) {
    const rect = el.getBoundingClientRect();
    return rect.top <= (window.innerHeight + offset) && rect.bottom >= 0;
}

// Funktion zum Hinzufügen der "visible" Klasse, wenn das Element sichtbar ist
function handleScroll() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineTitles = document.querySelectorAll('.timeline-title');
    const bentoCards = document.querySelectorAll('.bento-card');

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

    // Überprüfen, ob die Bento Cards im Viewport sind und die Klasse hinzufügen
    bentoCards.forEach(card => {
        if (isElementInViewport(card) && !card.classList.contains('card-visible')) {
            card.classList.add('card-visible');
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



// Wähle alle Skill-Karten aus - nur für Desktop
const skillCards = document.querySelectorAll('.skill-container');

skillCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Update spotlight position
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        // Only apply 3D effect on desktop
        if (window.innerWidth <= 1302) return;

        // Normalisierte Position (0 bis 1)
        const centerX = x / rect.width - 0.5;  // -0.5 bis 0.5
        const centerY = y / rect.height - 0.5; // -0.5 bis 0.5

        // Berechnung der Rotationswerte mit korrekter Achsen-Zuordnung
        // Y-Position beeinflusst X-Achsen-Rotation (Neigung nach vorne/hinten)
        // X-Position beeinflusst Y-Achsen-Rotation (Neigung nach links/rechts)
        const rotateX = -centerY * 20; // Invertiert: oben = nach hinten, unten = nach vorne
        const rotateY = centerX * 20;  // links = nach links, rechts = nach rechts

        // Anwenden der Transformation mit Perspektive
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    // Zurücksetzen des Effekts, wenn die Maus die Karte verlässt
    card.addEventListener('mouseleave', () => {
        if (window.innerWidth <= 1302) return;
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        card.style.transition = 'transform 0.5s ease';
        setTimeout(() => {
            card.style.transition = '';
        }, 500);
    });

    // Smooth transition beim Bewegen
    card.addEventListener('mouseenter', () => {
        if (window.innerWidth <= 1302) return;
        card.style.transition = 'transform 0.1s ease-out';
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const bentoCards = document.querySelectorAll('.bento-card');
    
    bentoCards.forEach(card => {
        card.addEventListener('click', function() {
            // Nur für mobile Geräte (max-width: 1302px)
            if (window.innerWidth <= 1302) {
                // Toggle der aktiven Klasse
                this.classList.toggle('card-active');
                
                // Alle anderen Karten schließen
                bentoCards.forEach(otherCard => {
                    if (otherCard !== this) {
                        otherCard.classList.remove('card-active');
                    }
                });
            }
        });
    });
    
    // Event-Listener für Fenstergrößenänderungen
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1302) {
            // Aktive Karten zurücksetzen beim Wechsel zum Desktop
            bentoCards.forEach(card => {
                card.classList.remove('card-active');
            });
        }
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const skillCards = document.querySelectorAll('.skill-container');
    const projectCards = document.querySelectorAll('.bento-card');

    // Setup skill cards accordion behavior
    skillCards.forEach(card => {
        card.addEventListener('click', function () {
            if (window.innerWidth > 1302) return; // Desktop: no accordion

            this.classList.toggle('card-active');
            
            // Mobile (<=768px): only one card open at a time
            // Tablet (769-1302px): multiple cards can be open
            if (window.innerWidth <= 768) {
                skillCards.forEach(other => {
                    if (other !== this) {
                        other.classList.remove('card-active');
                    }
                });
            }
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 1302) {
            skillCards.forEach(card => card.classList.remove('card-active'));
        }
        if (window.innerWidth > 1302) {
            projectCards.forEach(card => card.classList.remove('card-active'));
        }
    });
});


// ===== CAROUSEL FUNCTIONALITY FOR MOBILE/TABLET =====
document.addEventListener('DOMContentLoaded', function() {
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    const projectCards = document.querySelectorAll('.bento-card');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    let currentIndex = 0;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let startTime = 0;

    // Only run carousel on mobile/tablet
    function isCarouselMode() {
        return window.innerWidth <= 1302;
    }

    // Create indicators
    function createIndicators() {
        if (!isCarouselMode()) return;
        
        indicatorsContainer.innerHTML = '';
        projectCards.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('carousel-indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });
        
        // Set initial active card for 3D effect
        projectCards.forEach((card, index) => {
            card.classList.toggle('active', index === 0);
        });
    }

    // Update active indicator
    function updateIndicators() {
        const indicators = document.querySelectorAll('.carousel-indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
        
        // Update active card for 3D effect
        projectCards.forEach((card, index) => {
            card.classList.toggle('active', index === currentIndex);
        });
    }

    // Go to specific slide
    function goToSlide(index) {
        if (!isCarouselMode()) return;
        
        currentIndex = Math.max(0, Math.min(index, projectCards.length - 1));
        const cardWidth = projectCards[0].offsetWidth;
        const gap = window.innerWidth <= 600 ? 30 : 40;
        const containerWidth = carouselWrapper.parentElement.offsetWidth;
        const wrapperWidth = parseFloat(getComputedStyle(carouselWrapper).width);
        
        // Calculate centering offset
        const centerOffset = (containerWidth - cardWidth) / 2 - (containerWidth - wrapperWidth) / 2;
        
        // Calculate slide position
        const slideOffset = currentIndex * (cardWidth + gap);
        const offset = centerOffset - slideOffset;
        
        carouselWrapper.style.transform = `translateX(${offset}px)`;
        updateIndicators();
    }

    // Next slide (with loop)
    function nextSlide() {
        if (currentIndex < projectCards.length - 1) {
            goToSlide(currentIndex + 1);
        } else {
            goToSlide(0); // Loop back to first
        }
    }

    // Previous slide (with loop)
    function prevSlide() {
        if (currentIndex > 0) {
            goToSlide(currentIndex - 1);
        } else {
            goToSlide(projectCards.length - 1); // Loop to last
        }
    }

    // Touch/Mouse start
    function handleStart(e) {
        if (!isCarouselMode()) return;
        
        isDragging = true;
        startTime = Date.now();
        startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
        currentX = startX;
        carouselWrapper.style.transition = 'none';
    }

    // Touch/Mouse move
    function handleMove(e) {
        if (!isDragging || !isCarouselMode()) return;
        
        e.preventDefault();
        currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
        const diff = currentX - startX;
        const cardWidth = projectCards[0].offsetWidth;
        const gap = window.innerWidth <= 600 ? 30 : 40;
        const containerWidth = carouselWrapper.parentElement.offsetWidth;
        const wrapperWidth = parseFloat(getComputedStyle(carouselWrapper).width);
        const centerOffset = (containerWidth - cardWidth) / 2 - (containerWidth - wrapperWidth) / 2;
        const slideOffset = currentIndex * (cardWidth + gap);
        const offset = centerOffset - slideOffset + diff;
        
        carouselWrapper.style.transform = `translateX(${offset}px)`;
    }

    // Touch/Mouse end
    function handleEnd() {
        if (!isDragging || !isCarouselMode()) return;
        
        isDragging = false;
        carouselWrapper.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        const diff = currentX - startX;
        const threshold = carouselWrapper.offsetWidth * 0.2; // 20% swipe threshold
        const timeDiff = Date.now() - startTime;
        const velocity = Math.abs(diff) / timeDiff; // px per ms

        // Fast swipe or significant distance
        if (velocity > 0.5 || Math.abs(diff) > threshold) {
            if (diff > 0) {
                prevSlide(); // Swipe right (with loop)
            } else if (diff < 0) {
                nextSlide(); // Swipe left (with loop)
            }
        } else {
            goToSlide(currentIndex); // Snap back
        }
    }

    // Event listeners for buttons
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Touch events
    if (carouselWrapper) {
        carouselWrapper.addEventListener('touchstart', handleStart, { passive: true });
        carouselWrapper.addEventListener('touchmove', handleMove, { passive: false });
        carouselWrapper.addEventListener('touchend', handleEnd);

        // Mouse events (for desktop testing)
        carouselWrapper.addEventListener('mousedown', handleStart);
        carouselWrapper.addEventListener('mousemove', handleMove);
        carouselWrapper.addEventListener('mouseup', handleEnd);
        carouselWrapper.addEventListener('mouseleave', handleEnd);
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!isCarouselMode()) return;
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Initialize and handle resize
    function init() {
        if (isCarouselMode()) {
            createIndicators();
            goToSlide(0);
        }
    }

    init();

    window.addEventListener('resize', () => {
        if (isCarouselMode()) {
            createIndicators();
            goToSlide(currentIndex);
        } else {
            carouselWrapper.style.transform = '';
            indicatorsContainer.innerHTML = '';
        }
    });
});

// ===== LOGO CAROUSEL INFINITE SCROLL =====
document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue("--marquee-elements-displayed");
    const marqueeContent = document.querySelector("ul.marquee-content");
    
    if (!marqueeContent) return;

    root.style.setProperty("--marquee-elements", marqueeContent.children.length);

    for(let i = 0; i < marqueeElementsDisplayed; i++) {
        marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
    }
});

// ===== TIMELINE TOGGLE FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        const header = item.querySelector('.timeline-header');
        const toggleBtn = item.querySelector('.toggle-btn');
        const body = item.querySelector('.timeline-body');
        
        if (header && toggleBtn && body) {
            // Click-Event für den gesamten Header
            header.addEventListener('click', () => {
                toggleTimeline(toggleBtn, body);
            });
            
            // Verhindere Bubble-Up bei Button-Click (damit nicht doppelt getriggert wird)
            toggleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleTimeline(toggleBtn, body);
            });
        }
    });
    
    function toggleTimeline(button, body) {
        const isExpanded = body.classList.contains('expanded');
        
        if (isExpanded) {
            // Schließen
            body.classList.remove('expanded');
            button.classList.remove('active');
        } else {
            // Öffnen
            body.classList.add('expanded');
            button.classList.add('active');
        }
    }
});
