/**
 * Well Skill Gurukul — Scroll Reveal Animations & Micro-Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check if reduced motion is preferred
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const revealElements = document.querySelectorAll(
    '.reveal-init, .philosophy-card, .program-card, .expert-path-card, .editorial-card, .vision-card, .gallery-item'
  );

  if (!revealElements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el, idx) => {
    el.classList.add('reveal-init');
    observer.observe(el);
  });
});
