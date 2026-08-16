/**
 * Well Skill Gurukul — Gallery Filter & Fullscreen Lightbox
 */

document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = Array.from(document.querySelectorAll('.filter-btn'));
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
  const lightboxModal = document.getElementById('gallery-lightbox');

  if (!galleryItems.length) return;

  let currentGalleryList = [...galleryItems];
  let currentLightboxIndex = 0;

  // 1. Category Filtering
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter');

      filterBtns.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      currentGalleryList = [];

      galleryItems.forEach((item) => {
        const itemCat = item.getAttribute('data-category');
        if (category === 'all' || itemCat === category || (itemCat && itemCat.includes(category))) {
          item.style.display = 'block';
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          currentGalleryList.push(item);
          setTimeout(() => {
            item.style.transition = 'all 0.35s ease';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 40);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 2. Lightbox Functionality
  const lightboxImg = lightboxModal?.querySelector('.lightbox-image');
  const lightboxCaption = lightboxModal?.querySelector('.lightbox-caption-text');
  const lightboxCategory = lightboxModal?.querySelector('.lightbox-caption-cat');
  const closeBtn = lightboxModal?.querySelector('.lightbox-close-btn');
  const prevBtn = lightboxModal?.querySelector('.lightbox-prev');
  const nextBtn = lightboxModal?.querySelector('.lightbox-next');

  function openLightbox(index) {
    if (!lightboxModal || !currentGalleryList[index]) return;
    currentLightboxIndex = index;
    const item = currentGalleryList[index];
    const img = item.querySelector('img');
    const title = item.querySelector('.gallery-item-title')?.textContent || img.getAttribute('alt') || 'Well Skill Gurukul Visual';
    const category = item.querySelector('.gallery-item-category')?.textContent || 'Wellness Academy';

    if (lightboxImg) {
      lightboxImg.src = img.src;
      lightboxImg.alt = title;
    }
    if (lightboxCaption) lightboxCaption.textContent = title;
    if (lightboxCategory) lightboxCategory.textContent = category;

    lightboxModal.classList.add('is-open');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('scroll-locked');
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('is-open');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('scroll-locked');
  }

  function showNextImage() {
    if (!currentGalleryList.length) return;
    currentLightboxIndex = (currentLightboxIndex + 1) % currentGalleryList.length;
    openLightbox(currentLightboxIndex);
  }

  function showPrevImage() {
    if (!currentGalleryList.length) return;
    currentLightboxIndex = (currentLightboxIndex - 1 + currentGalleryList.length) % currentGalleryList.length;
    openLightbox(currentLightboxIndex);
  }

  // Click on gallery item
  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const idx = currentGalleryList.indexOf(item);
      if (idx !== -1) {
        openLightbox(idx);
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', showNextImage);
  if (prevBtn) prevBtn.addEventListener('click', showPrevImage);

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('is-open')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      showNextImage();
    } else if (e.key === 'ArrowLeft') {
      showPrevImage();
    }
  });

  // Touch swipe support for lightbox
  let lbStartX = 0;
  let lbEndX = 0;

  if (lightboxModal) {
    lightboxModal.addEventListener(
      'touchstart',
      (e) => {
        lbStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    lightboxModal.addEventListener(
      'touchend',
      (e) => {
        lbEndX = e.changedTouches[0].screenX;
        if (Math.abs(lbEndX - lbStartX) > 50) {
          if (lbEndX < lbStartX) showNextImage();
          else showPrevImage();
        }
      },
      { passive: true }
    );
  }
});
