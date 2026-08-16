/**
 * Well Skill Gurukul — Navigation & Header Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  const headerRoot = document.getElementById('site-header-root');
  const header = document.getElementById('site-header');
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const closeBtn = document.getElementById('mobile-menu-close');
  const overlay = document.getElementById('mobile-navigation-overlay');

  // 1. Fixed Header Scroll Effect
  const handleScroll = () => {
    const isScrolled = window.scrollY > 20;
    if (headerRoot) {
      if (isScrolled) headerRoot.classList.add('is-scrolled');
      else headerRoot.classList.remove('is-scrolled');
    }
    if (header) {
      if (isScrolled) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Mobile Drawer Navigation
  function openMobileMenu() {
    if (!overlay) return;
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    if (toggleBtn) {
      toggleBtn.classList.add('is-active');
      toggleBtn.setAttribute('aria-expanded', 'true');
    }
    document.body.classList.add('scroll-locked');
    if (closeBtn) closeBtn.focus();
  }

  function closeMobileMenu() {
    if (!overlay) return;
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    if (toggleBtn) {
      toggleBtn.classList.remove('is-active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.focus();
    }
    document.body.classList.remove('scroll-locked');
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (overlay && overlay.classList.contains('is-open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMobileMenu);
  }

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeMobileMenu();
      }
    });
  }

  // Keyboard navigation support (ESC to close)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay && overlay.classList.contains('is-open')) {
      closeMobileMenu();
    }
  });

  // Close mobile drawer when clicking any nav link
  document.querySelectorAll('.mobile-nav-link').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });
});
