/**
 * Well Skill Gurukul — 3D Perspective Hero Slider
 * Features:
 * - Continuous 4-second auto-play (does NOT stop on mouse hover)
 * - 3D depth, scale, and subtle rotation transition
 * - Touch swipe support for mobile
 * - Slide counter & bullet pagination
 * - Keyboard navigation (Left/Right arrow keys)
 */

document.addEventListener('DOMContentLoaded', () => {
  const sliderContainer = document.querySelector('.hero-slider-section');
  if (!sliderContainer) return;

  const slides = Array.from(sliderContainer.querySelectorAll('.hero-slide'));
  const dots = Array.from(sliderContainer.querySelectorAll('.slider-dot'));
  const prevBtn = sliderContainer.querySelector('.slider-prev-btn');
  const nextBtn = sliderContainer.querySelector('.slider-next-btn');
  const currentNumEl = sliderContainer.querySelector('.current-slide');
  const totalNumEl = sliderContainer.querySelector('.total-slides');

  if (slides.length === 0) return;

  let currentIndex = 0;
  let autoplayTimer = null;
  const AUTOPLAY_INTERVAL = 4000; // Continuous 4 seconds rotation
  let isTransitioning = false;

  // Set total slide count indicator
  if (totalNumEl) {
    totalNumEl.textContent = String(slides.length).padStart(2, '0');
  }

  function updateSlider(newIndex, direction = 'next') {
    if (isTransitioning || newIndex === currentIndex) return;
    isTransitioning = true;

    slides.forEach((slide, idx) => {
      slide.classList.remove('is-active', 'is-prev');
      if (idx === currentIndex) {
        if (direction === 'next') slide.classList.add('is-prev');
      }
    });

    dots.forEach((dot) => dot.classList.remove('is-active'));

    currentIndex = (newIndex + slides.length) % slides.length;

    slides[currentIndex].classList.add('is-active');
    if (dots[currentIndex]) {
      dots[currentIndex].classList.add('is-active');
    }

    if (currentNumEl) {
      currentNumEl.textContent = String(currentIndex + 1).padStart(2, '0');
    }

    setTimeout(() => {
      isTransitioning = false;
    }, 750);
  }

  function nextSlide() {
    updateSlider((currentIndex + 1) % slides.length, 'next');
  }

  function prevSlide() {
    updateSlider((currentIndex - 1 + slides.length) % slides.length, 'prev');
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, AUTOPLAY_INTERVAL);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  // Event Listeners for Nav Buttons (Resets interval to 4s from click)
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startAutoplay();
    });
  }

  // Event Listeners for Dots
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      if (idx !== currentIndex) {
        updateSlider(idx, idx > currentIndex ? 'next' : 'prev');
        startAutoplay();
      }
    });
  });

  // Keyboard navigation
  sliderContainer.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      nextSlide();
      startAutoplay();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
      startAutoplay();
    }
  });

  // Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;

  sliderContainer.addEventListener(
    'touchstart',
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  sliderContainer.addEventListener(
    'touchend',
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const swipeDistance = touchEndX - touchStartX;
      if (Math.abs(swipeDistance) > 40) {
        if (swipeDistance < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        startAutoplay();
      }
    },
    { passive: true }
  );

  // Start continuous 4-second autoplay immediately
  startAutoplay();
});
