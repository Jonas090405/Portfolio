console.log("Hier gibts keine Fehler zu sehen ;)")

// ===== DESKTOP NAVIGATION - ACTIVE SECTION TRACKING =====
document.addEventListener('DOMContentLoaded', () => {
    // Desktop Navigation - Active Section Tracking
    const desktopNavLinks = document.querySelectorAll('.nav-pills a');
    const navSlider = document.querySelector('.nav-slider');
    const sections = [
        { id: 'about-section', element: document.querySelector('#about-section') },
        { id: 'project-section', element: document.querySelector('#project-section') },
        { id: 'education-section', element: document.querySelector('#education-section') },
        { id: 'at-symbol', element: document.querySelector('#at-symbol')?.closest('footer') }
    ].filter(section => section.element); // Nur existierende Sections

    // Funktion zum Bewegen des Sliders
    function moveSlider(activeLink, instant = false) {
        if (!activeLink || !navSlider) return;

        const linkRect = activeLink.getBoundingClientRect();
        const pillsRect = activeLink.closest('.nav-pills').getBoundingClientRect();

        const left = linkRect.left - pillsRect.left;
        const width = linkRect.width;

        // Bei sofortigem Wechsel keine Animation
        if (instant) {
            navSlider.style.transition = 'none';
            navSlider.style.left = `${left}px`;
            navSlider.style.width = `${width}px`;

            // Force reflow
            void navSlider.offsetWidth;

            // Re-enable transitions
            navSlider.style.transition = '';
        } else {
            navSlider.style.left = `${left}px`;
            navSlider.style.width = `${width}px`;
        }
    }

    // Variable um den letzten aktiven State zu tracken
    let lastActiveSection = null;

    // Funktion zum Setzen des aktiven Links
    function setActiveNavLink() {
        const scrollY = window.scrollY;
        const windowBottom = scrollY + window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        let currentSection = null;
        let maxVisibility = 0;

        // Spezialbehandlung für About-Section am Anfang
        if (scrollY < 100) {
            currentSection = 'about-section';
        } else {
            // Finde die Sektion, die am meisten sichtbar ist
            sections.forEach(section => {
                const element = section.element;
                const sectionTop = element.offsetTop;
                const sectionBottom = sectionTop + element.offsetHeight;

                // Berechne, wie viel von der Sektion sichtbar ist
                const visibleTop = Math.max(scrollY, sectionTop);
                const visibleBottom = Math.min(windowBottom, sectionBottom);
                const visibility = Math.max(0, visibleBottom - visibleTop);

                if (visibility > maxVisibility) {
                    maxVisibility = visibility;
                    currentSection = section.id;
                }

                // Spezialbehandlung für Footer/Kontakt am Ende der Seite
                if (section.id === 'at-symbol' && windowBottom >= documentHeight - 100) {
                    currentSection = 'at-symbol';
                }
            });

            // Fallback: Wenn nichts gefunden, nimm die erste Section
            if (!currentSection && sections.length > 0) {
                currentSection = sections[0].id;
            }
        }

        // Nur updaten wenn sich die Section geändert hat
        if (currentSection === lastActiveSection) {
            return;
        }

        lastActiveSection = currentSection;
        let activeLink = null;

        // Entferne aktive Klasse von allen Links und füge sie zum aktuellen hinzu
        desktopNavLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');

            if (currentSection && href === `#${currentSection}`) {
                link.classList.add('active');
                activeLink = link;
            }
        });

        // Bewege den Slider zum aktiven Link (immer mit Animation bei Section-Wechsel)
        if (activeLink) {
            moveSlider(activeLink, false);
        }
    }

    // Event Listener für Scroll mit Throttling
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                setActiveNavLink();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial-Check beim Laden und nach einem kurzen Delay (damit alles geladen ist)
    setTimeout(() => {
        const initialActiveLink = document.querySelector('.nav-pills a.active');
        if (initialActiveLink) {
            moveSlider(initialActiveLink, true); // Instant, keine Animation beim ersten Load
        } else {
            setActiveNavLink();
        }
    }, 100);

    // Update bei Resize
    window.addEventListener('resize', () => {
        const activeLink = document.querySelector('.nav-pills a.active');
        if (activeLink && navSlider) {
            moveSlider(activeLink);
        }
    });

    // Track mouse position for nav-pills border effect
    const navPills = document.querySelector('.nav-pills');
    if (navPills) {
        navPills.addEventListener('mousemove', (e) => {
            const rect = navPills.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            navPills.style.setProperty('--mouse-x', `${x}%`);
            navPills.style.setProperty('--mouse-y', `${y}%`);
        });
    }

    // Smooth Scroll für Desktop-Navigation
    desktopNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== HAMBURGER MENU =====
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
    if (profileImage && speechBubble && window.matchMedia('(min-width: 1303px)').matches) {
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

/* TYPEWRITER EFFECT - AUSKOMMENTIERT
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
*/


// Browser-Scroll-Restore deaktivieren, damit die Seite oben startet
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}



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



document.addEventListener('DOMContentLoaded', function () {
    const bentoCards = document.querySelectorAll('.bento-card');

    bentoCards.forEach(card => {
        card.addEventListener('click', function () {
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
    window.addEventListener('resize', function () {
        if (window.innerWidth > 1302) {
            // Aktive Karten zurücksetzen beim Wechsel zum Desktop
            bentoCards.forEach(card => {
                card.classList.remove('card-active');
            });
        }
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const projectCards = document.querySelectorAll('.bento-card');

    window.addEventListener('resize', () => {
        if (window.innerWidth > 1302) {
            projectCards.forEach(card => card.classList.remove('card-active'));
        }
    });
});


// ===== CAROUSEL FUNCTIONALITY FOR MOBILE/TABLET =====
document.addEventListener('DOMContentLoaded', function () {
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    const projectCards = document.querySelectorAll('.bento-card');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');

    let currentIndex = 0;
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    let isDragging = false;
    let startTime = 0;
    let swipeDirection = null;
    let dragBaseOffset = 0;
    let rafId = null;

    // Layout nur einmal pro Geste messen statt bei jedem touchmove
    // (offsetWidth/getComputedStyle erzwingen sonst pro Frame ein Reflow)
    function measureOffset(index) {
        const cardWidth = projectCards[0].offsetWidth;
        const styles = getComputedStyle(carouselWrapper);
        const gap = parseFloat(styles.gap) || 40;
        const containerWidth = carouselWrapper.parentElement.offsetWidth;
        const wrapperWidth = parseFloat(styles.width);
        const centerOffset = (containerWidth - cardWidth) / 2 - (containerWidth - wrapperWidth) / 2;
        return centerOffset - index * (cardWidth + gap);
    }

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
        carouselWrapper.style.transform = `translateX(${measureOffset(currentIndex)}px)`;
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
        startY = e.type.includes('mouse') ? e.pageY : e.touches[0].pageY;
        currentX = startX;
        currentY = startY;
        swipeDirection = null; // Reset swipe direction
        dragBaseOffset = measureOffset(currentIndex);
        carouselWrapper.style.transition = 'none';
    }

    // Touch/Mouse move
    function handleMove(e) {
        if (!isDragging || !isCarouselMode()) return;

        currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
        currentY = e.type.includes('mouse') ? e.pageY : e.touches[0].pageY;

        const diffX = currentX - startX;
        const diffY = currentY - startY;

        // Determine swipe direction on first significant movement
        if (swipeDirection === null && (Math.abs(diffX) > 10 || Math.abs(diffY) > 10)) {
            swipeDirection = Math.abs(diffX) > Math.abs(diffY) ? 'horizontal' : 'vertical';
        }

        // Only prevent default and handle carousel for horizontal swipes
        if (swipeDirection === 'horizontal') {
            // Only prevent if event is cancelable
            if (e.cancelable) {
                e.preventDefault();
            }
            // Transform-Update auf den nächsten Frame bündeln (max. 1 Update pro Frame)
            if (rafId === null) {
                rafId = requestAnimationFrame(() => {
                    rafId = null;
                    carouselWrapper.style.transform = `translateX(${dragBaseOffset + (currentX - startX)}px)`;
                });
            }
        } else if (swipeDirection === 'vertical') {
            // Allow vertical scrolling by not preventing default and stopping carousel interaction
            isDragging = false;
            carouselWrapper.style.transition = '';
        }
    }

    // Touch/Mouse end
    function handleEnd() {
        if (!isDragging || !isCarouselMode()) return;

        isDragging = false;

        // Ausstehendes Frame-Update verwerfen, damit es die Endposition nicht überschreibt
        if (rafId !== null) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }

        // Apply smooth transition
        carouselWrapper.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';

        const diff = currentX - startX;
        const threshold = carouselWrapper.offsetWidth * 0.15; // Reduced threshold for easier swipe
        const timeDiff = Date.now() - startTime;
        const velocity = Math.abs(diff) / timeDiff; // px per ms

        // Fast swipe or significant distance
        if (velocity > 0.3 || Math.abs(diff) > threshold) {
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

    for (let i = 0; i < marqueeElementsDisplayed; i++) {
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

// ===== TAB FUNCTIONALITY FOR EDUCATION SECTION =====
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const tabSlider = document.querySelector('.tab-slider');
    const tabNavigation = document.querySelector('.tab-navigation');

    // Function to move the slider to the active button
    function moveTabSlider(activeButton, instant = false) {
        if (!activeButton || !tabSlider || !tabNavigation) return;

        const buttonRect = activeButton.getBoundingClientRect();
        const navRect = tabNavigation.getBoundingClientRect();

        const left = buttonRect.left - navRect.left;
        const width = buttonRect.width;

        if (instant) {
            tabSlider.style.transition = 'none';
            tabSlider.style.left = `${left}px`;
            tabSlider.style.width = `${width}px`;

            // Force reflow
            void tabSlider.offsetWidth;

            // Re-enable transitions
            tabSlider.style.transition = '';
        } else {
            tabSlider.style.left = `${left}px`;
            tabSlider.style.width = `${width}px`;
        }
    }

    // Initialize slider position
    const initialActiveButton = document.querySelector('.tab-btn.active');
    if (initialActiveButton) {
        setTimeout(() => {
            moveTabSlider(initialActiveButton, true);
        }, 100);
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const targetContent = document.getElementById(`${targetTab}-content`);
            if (targetContent) {
                targetContent.classList.add('active');
            }

            // Move slider to active button
            moveTabSlider(button, false);
        });
    });

    // Update slider position on window resize
    window.addEventListener('resize', () => {
        const activeButton = document.querySelector('.tab-btn.active');
        if (activeButton) {
            moveTabSlider(activeButton, true);
        }
    });
});
