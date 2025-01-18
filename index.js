// Script pour le menu hamburger
const hamburger = document.getElementById("hamburger");
const sideMenu = document.getElementById("side-menu");
const overlay = document.getElementById("overlay");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    sideMenu.style.left = sideMenu.style.left === "0px" ? "-250px" : "0px";
    overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
    sideMenu.style.left = "-250px";
    overlay.classList.remove("active");
    hamburger.classList.remove("active");
});

// Texte dynamique
const dynamicText = document.getElementById("dynamic-text");
const phrases = ["Bienvenue à la ferme connectée", "Optimisons la production", "Innovons ensemble"];
let index = 0;
let charIndex = 0;

function typeEffect() {
    if (charIndex < phrases[index].length) {
        dynamicText.textContent += phrases[index][charIndex];
        charIndex++;
        setTimeout(typeEffect, 100);
    } else {
        setTimeout(() => {
            dynamicText.textContent = "";
            charIndex = 0;
            index = (index + 1) % phrases.length;
            typeEffect();
        }, 2000);
    }
}

typeEffect();

// Carousel
const carouselTrack = document.querySelector(".carousel-track");
const carouselItems = Array.from(carouselTrack.children);
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
let currentIndex = 1; // Commencer à la première image originale
let autoScrollInterval;

function updateCarousel() {
    carouselTrack.style.transform = `translateX(-${currentIndex * 20}%)`; // 20% par image
}

function nextSlide() {
    currentIndex++;
    carouselTrack.style.transition = "transform 0.5s ease";
    updateCarousel();

    // Si on atteint la fin du carrousel (image dupliquée), revenir instantanément au début
    if (currentIndex === carouselItems.length - 1) {
        setTimeout(() => {
            carouselTrack.style.transition = "none";
            currentIndex = 1;
            updateCarousel();
        }, 500);
    }
}

function prevSlide() {
    currentIndex--;
    carouselTrack.style.transition = "transform 0.5s ease";
    updateCarousel();

    // Si on atteint le début du carrousel (image dupliquée), revenir instantanément à la fin
    if (currentIndex === 0) {
        setTimeout(() => {
            carouselTrack.style.transition = "none";
            currentIndex = carouselItems.length - 2;
            updateCarousel();
        }, 500);
    }
}

nextBtn.addEventListener("click", () => {
    nextSlide();
    resetAutoScroll();
});

prevBtn.addEventListener("click", () => {
    prevSlide();
    resetAutoScroll();
});

// Défilement automatique
function startAutoScroll() {
    autoScrollInterval = setInterval(nextSlide, 1000);
}

function resetAutoScroll() {
    clearInterval(autoScrollInterval);
    startAutoScroll();
}

// Démarrer le défilement automatique au chargement de la page
startAutoScroll();