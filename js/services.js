/**
 * Well Skill Gurukul — Services & Programs Directory Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  const serviceTabs = Array.from(document.querySelectorAll('.service-tab-btn'));
  const serviceSections = Array.from(document.querySelectorAll('.service-category-group'));
  const searchInput = document.getElementById('service-search-input');
  const serviceCards = Array.from(document.querySelectorAll('.program-card, .expert-path-card'));

  // 1. Tab Switching (All, Programs, Mentoring, Coaching, Therapist)
  if (serviceTabs.length > 0) {
    serviceTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const targetCategory = tab.getAttribute('data-category');

        serviceTabs.forEach((t) => t.classList.remove('is-active'));
        tab.classList.add('is-active');

        serviceSections.forEach((sec) => {
          const secCategory = sec.getAttribute('data-category');
          if (targetCategory === 'all' || secCategory === targetCategory) {
            sec.style.display = 'block';
          } else {
            sec.style.display = 'none';
          }
        });

        // Clear search when switching tabs
        if (searchInput) searchInput.value = '';
        serviceCards.forEach((card) => (card.style.display = ''));
      });
    });
  }

  // 2. Real-time Search Filtering
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();

      if (query === '') {
        // Restore tab view
        const activeTab = document.querySelector('.service-tab-btn.is-active');
        const activeCategory = activeTab ? activeTab.getAttribute('data-category') : 'all';
        serviceSections.forEach((sec) => {
          const secCategory = sec.getAttribute('data-category');
          sec.style.display = activeCategory === 'all' || secCategory === activeCategory ? 'block' : 'none';
        });
        serviceCards.forEach((card) => (card.style.display = ''));
        return;
      }

      // If searching, show all sections and filter individual cards
      serviceSections.forEach((sec) => (sec.style.display = 'block'));

      serviceCards.forEach((card) => {
        const title = card.querySelector('h3, h4')?.textContent.toLowerCase() || '';
        const desc = card.querySelector('p')?.textContent.toLowerCase() || '';
        if (title.includes(query) || desc.includes(query)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // 3. Handle Hash Anchors on Page Load (e.g. services.html#coaching)
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    const matchingTab = document.querySelector(`.service-tab-btn[data-category="${hash}"]`);
    if (matchingTab) {
      matchingTab.click();
    }
  }
});
