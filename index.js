// Sélection des éléments
const hamburger = document.getElementById('hamburger');
const sideMenu = document.getElementById('side-menu');
const overlay = document.getElementById('overlay');


// Fonction d'ouverture et de fermeture du menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    sideMenu.classList.toggle('active');
    overlay.classList.toggle('active');
});

// Fermer le menu lorsqu'on clique sur l'overlay
overlay.addEventListener('click', () => {
    hamburger.classList.remove('active');
    sideMenu.classList.remove('active');
    overlay.classList.remove('active');
});
