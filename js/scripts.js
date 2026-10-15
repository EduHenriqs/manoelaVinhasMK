let slideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');
let slideInterval;

function showSlide(n) {
    slideIndex = (n + slides.length) % slides.length;

    slides.forEach((slide, index) => {
        slide.style.opacity = index === slideIndex ? '1' : '0';
    });

    dots.forEach((dot, index) => {
        dot.style.backgroundColor = index === slideIndex ? '#f5eadb' : 'rgba(245, 234, 219, 0.4)';
    });
}

function nextSlide() {
    showSlide(slideIndex + 1);
    resetTimer();
}

function prevSlide() {
    showSlide(slideIndex - 1);
    resetTimer();
}

function currentSlide(n) {
    showSlide(n);
    resetTimer();
}

function startTimer() {
    slideInterval = setInterval(() => {
        showSlide(slideIndex + 1);
    }, 4500); 
}

function resetTimer() {
    clearInterval(slideInterval);
    startTimer();
}

window.onload = function () {
    startTimer();
    update3DCarousel();
    start3DTimer();
};

let active3DIndex = 0;
const cards3D = document.querySelectorAll('.testimonial-card-3d');
const total3DCards = cards3D.length;
const dots3DContainer = document.getElementById('dots3DContainer');
let autoRotate3DTimer;

for (let i = 0; i < total3DCards; i++) {
    const dot = document.createElement('button');
    dot.className = `w-3 h-3 rounded-full transition-all ${i === 0 ? 'bg-[#7d283b] w-6' : 'bg-[#b08481]/40'}`;
    dot.onclick = () => goTo3DIndex(i);
    dots3DContainer.appendChild(dot);
}

function update3DCarousel() {
    cards3D.forEach((card, i) => {
        let diff = i - active3DIndex;

        if (diff < -Math.floor(total3DCards / 2)) {
            diff += total3DCards;
        } else if (diff > Math.floor(total3DCards / 2)) {
            diff -= total3DCards;
        }

        const rotateY = diff * 45; 
        const translateX = diff * 120;
        const translateZ = -Math.abs(diff) * 180;
        const opacity = diff === 0 ? 1 : Math.abs(diff) === 1 ? 0.6 : 0;
        const zIndex = 10 - Math.abs(diff);

        card.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`;
        card.style.opacity = opacity;
        card.style.zIndex = zIndex;
        card.style.pointerEvents = diff === 0 ? 'auto' : 'none';
    });

    const dots = dots3DContainer.querySelectorAll('button');
    dots.forEach((dot, i) => {
        if (i === active3DIndex) {
            dot.className = 'w-6 h-3 rounded-full bg-[#7d283b] transition-all';
        } else {
            dot.className = 'w-3 h-3 rounded-full bg-[#b08481]/40 transition-all';
        }
    });
}

function rotate3DNext() {
    active3DIndex = (active3DIndex + 1) % total3DCards;
    update3DCarousel();
    reset3DTimer();
}

function rotate3DPrev() {
    active3DIndex = (active3DIndex - 1 + total3DCards) % total3DCards;
    update3DCarousel();
    reset3DTimer();
}

function goTo3DIndex(index) {
    active3DIndex = index;
    update3DCarousel();
    reset3DTimer();
}

function start3DTimer() {
    autoRotate3DTimer = setInterval(() => {
        rotate3DNext();
    }, 5000);
}

function reset3DTimer() {
    clearInterval(autoRotate3DTimer);
    start3DTimer();
}

let touchStartX = 0;
let touchEndX = 0;
const stage3D = document.getElementById('carousel3DStage');

stage3D.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

stage3D.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 40;
    if (touchEndX < touchStartX - swipeThreshold) {
        rotate3DNext();
    }
    if (touchEndX > touchStartX + swipeThreshold) {
        rotate3DPrev();
    }
}

function openLightbox(element) {
    const lightbox = document.getElementById('bentoLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const img = element.querySelector('img');

    lightboxImg.src = img.src;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('bentoLightbox').style.display = 'none';
}        