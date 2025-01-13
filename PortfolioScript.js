// Hole das Hamburger-Menü und das mobile Menü
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('nav ul.mobile');

// Füge ein Event-Listener hinzu, der das Menü umschaltet, wenn auf das Hamburger-Icon geklickt wird
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('show');
});
