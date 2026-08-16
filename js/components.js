/**
 * Well Skill Gurukul — Reusable Component Hydration & State Engine
 * Handles Topbar, Header, Mobile Navigation, Footer, Floating WhatsApp Button,
 * and Universal Enquiry Pop-up Modal (WhatsApp Connected to +91 97483 75692).
 */

(function () {
  'use strict';

  const WHATSAPP_NUMBER = '918910512503';
  const DISPLAY_PHONE = '+91 89105 12503';

  const HEADER_TEMPLATE = `
  <div class="topbar">
    <div class="container">
      <div class="topbar-msg">
        <span class="topbar-badge">Institute of Excellence</span>
        <span>Professional Education & Skill Development in Beauty, Wellness & Lifestyle</span>
      </div>
      <div class="topbar-links">
        <a href="https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20Well%20Skill%20Gurukul,%20I%20would%20like%20to%20enquire%20about%20your%20programs" class="topbar-link wa-link" target="_blank" rel="noopener">
          <i class="fa-brands fa-whatsapp"></i> ${DISPLAY_PHONE}
        </a>
        <a href="contact.html" class="topbar-link"><i class="fa-solid fa-graduation-cap"></i> Enrolment Open</a>
        <a href="https://wellskillgurukul.co.in/" class="topbar-link" target="_blank" rel="noopener"><i class="fa-solid fa-globe"></i> Official Portal</a>
      </div>
    </div>
  </div>

  <header class="site-header" id="site-header">
    <div class="container">
      <nav class="navbar" aria-label="Main Navigation">
        <a href="index.html" class="brand-box" title="Well Skill Gurukul Home">
          <img src="logo.png" alt="Well Skill Gurukul Logo" class="brand-logo-img">
          <div class="brand-text">
            <span class="brand-title">Well Skill <span>Gurukul</span></span>
            <span class="brand-tagline">Learn • Practice • Transform • Lead</span>
          </div>
        </a>

        <ul class="nav-menu" id="desktop-nav-menu">
          <li><a href="index.html" class="nav-link" data-page="index">Home</a></li>
          <li><a href="about.html" class="nav-link" data-page="about">About</a></li>
          <li><a href="services.html" class="nav-link" data-page="services">Programs & Services</a></li>
          <li><a href="gallery.html" class="nav-link" data-page="gallery">Gallery</a></li>
          <li><a href="contact.html" class="nav-link" data-page="contact">Contact</a></li>
        </ul>

        <div class="header-actions">
          <button type="button" class="btn btn-secondary btn-sm btn-pill" data-open-enquiry="">
            <i class="fa-solid fa-paper-plane"></i> Enquire Now
          </button>
          <button class="hamburger-btn" id="mobile-menu-toggle" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="mobile-navigation-overlay">
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
          </button>
        </div>
      </nav>
    </div>
  </header>

  <div class="mobile-overlay" id="mobile-navigation-overlay" aria-hidden="true">
    <div class="mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
      <div class="mobile-drawer-header">
        <a href="index.html" class="brand-box">
          <img src="logo.png" alt="Well Skill Gurukul Logo" class="brand-logo-img" style="height: 44px;">
          <div class="brand-text">
            <span class="brand-title">Well Skill <span>Gurukul</span></span>
          </div>
        </a>
        <button class="mobile-close-btn" id="mobile-menu-close" aria-label="Close navigation menu">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <ul class="mobile-nav-list">
        <li class="mobile-nav-item">
          <a href="index.html" class="mobile-nav-link" data-page="index">
            <span>Home</span>
            <i class="fa-solid fa-arrow-right"></i>
          </a>
        </li>
        <li class="mobile-nav-item">
          <a href="about.html" class="mobile-nav-link" data-page="about">
            <span>About Institute</span>
            <i class="fa-solid fa-arrow-right"></i>
          </a>
        </li>
        <li class="mobile-nav-item">
          <a href="services.html" class="mobile-nav-link" data-page="services">
            <span>Programs & Services</span>
            <i class="fa-solid fa-arrow-right"></i>
          </a>
        </li>
        <li class="mobile-nav-item">
          <a href="gallery.html" class="mobile-nav-link" data-page="gallery">
            <span>Institute Gallery</span>
            <i class="fa-solid fa-arrow-right"></i>
          </a>
        </li>
        <li class="mobile-nav-item">
          <a href="contact.html" class="mobile-nav-link" data-page="contact">
            <span>Contact & Enrol</span>
            <i class="fa-solid fa-arrow-right"></i>
          </a>
        </li>
      </ul>

      <div class="mobile-drawer-cta">
        <div class="mobile-info-box">
          <strong>Direct WhatsApp Support</strong>
          <a href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" rel="noopener" style="color: #25d366; font-weight: 700; display: inline-flex; align-items: center; gap: 0.35rem; margin-top: 0.25rem;">
            <i class="fa-brands fa-whatsapp"></i> ${DISPLAY_PHONE}
          </a>
        </div>
        <button type="button" class="btn btn-primary btn-pill" data-open-enquiry="">
          <i class="fa-solid fa-paper-plane"></i> Quick Enquiry
        </button>
        <a href="services.html" class="btn btn-outline btn-pill">
          <i class="fa-solid fa-book-open"></i> View All Programs
        </a>
      </div>
    </div>
  </div>
  `;

  const FOOTER_TEMPLATE = `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col footer-col-brand">
          <a href="index.html" class="footer-brand-box" title="Well Skill Gurukul Home">
            <img src="logo.png" alt="Well Skill Gurukul Logo" class="footer-brand-logo">
          </a>
          <p class="footer-brand-desc">
            Well Skill Gurukul is a professional education and skill-development institute dedicated to creating the next generation of skilled professionals in beauty, wellness, health, lifestyle, and personal development.
          </p>
          <div class="footer-philosophy-tag">
            <i class="fa-solid fa-seedling"></i> Learn • Practice • Transform • Lead
          </div>
        </div>

        <div class="footer-col">
          <h4 class="footer-col-title">Navigation</h4>
          <ul class="footer-links-list">
            <li><a href="index.html" class="footer-link"><i class="fa-solid fa-chevron-right"></i> Home</a></li>
            <li><a href="about.html" class="footer-link"><i class="fa-solid fa-chevron-right"></i> About Us</a></li>
            <li><a href="services.html" class="footer-link"><i class="fa-solid fa-chevron-right"></i> Programs & Services</a></li>
            <li><a href="gallery.html" class="footer-link"><i class="fa-solid fa-chevron-right"></i> Visual Gallery</a></li>
            <li><a href="contact.html" class="footer-link"><i class="fa-solid fa-chevron-right"></i> Contact & Enrolment</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4 class="footer-col-title">Programs & Services</h4>
          <ul class="footer-links-list">
            <li><a href="services.html#service-1" class="footer-link"><i class="fa-solid fa-chevron-right"></i> Nutrition & Lifestyle Program</a></li>
            <li><a href="services.html#service-2" class="footer-link"><i class="fa-solid fa-chevron-right"></i> Corporate Wellness Program</a></li>
            <li><a href="services.html#service-3" class="footer-link"><i class="fa-solid fa-chevron-right"></i> Weightloss Program</a></li>
            <li><a href="services.html#service-4" class="footer-link"><i class="fa-solid fa-chevron-right"></i> Certified Nutritionist & Coach</a></li>
            <li><a href="services.html#service-5" class="footer-link"><i class="fa-solid fa-chevron-right"></i> Wellness Business Mastery</a></li>
            <li><a href="services.html#service-6" class="footer-link"><i class="fa-solid fa-chevron-right"></i> Integrative Therapy Workshop</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4 class="footer-col-title">Contact & Helpdesk</h4>
          <div class="footer-contact-item wa-item">
            <i class="fa-brands fa-whatsapp"></i>
            <div>
              <strong>WhatsApp & Direct Support</strong><br>
              <a href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" rel="noopener" style="color: #25d366; font-weight: 700;">
                ${DISPLAY_PHONE}
              </a>
            </div>
          </div>
          <div class="footer-contact-item">
            <i class="fa-solid fa-phone"></i>
            <div>
              <strong>Call Enquiries</strong><br>
              <a href="tel:${WHATSAPP_NUMBER}" style="color: #ffffff;">
                ${DISPLAY_PHONE}
              </a>
            </div>
          </div>
          <div class="footer-contact-item">
            <i class="fa-solid fa-globe"></i>
            <div>
              <strong>Official Web Portal</strong><br>
              <a href="https://wellskillgurukul.co.in/" target="_blank" rel="noopener" style="color: #a7f3d0; word-break: break-all;">
                https://wellskillgurukul.co.in/
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div>
          © <span id="current-year">2026</span> Well Skill Gurukul. All Rights Reserved. Dedicated to Excellence in Wellness Education.
        </div>
        <div class="footer-bottom-links">
          <a href="about.html">About</a>
          <span>•</span>
          <a href="services.html">Programs & Services</a>
          <span>•</span>
          <a href="contact.html">Contact Us</a>
        </div>
      </div>
    </div>
  </footer>
  `;

  // Universal Pop-up Enquiry Modal HTML
  const MODAL_TEMPLATE = `
  <div class="enquiry-modal-overlay" id="enquiry-modal" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="modal-enquiry-title">
    <div class="enquiry-modal-box">
      <button class="modal-close-btn" id="enquiry-modal-close" aria-label="Close enquiry modal">
        <i class="fa-solid fa-xmark"></i>
      </button>

      <div class="modal-header">
        <div class="section-eyebrow eyebrow-green" style="margin-bottom: 0.4rem;">
          <i class="fa-brands fa-whatsapp"></i> WhatsApp Enrolment Desk
        </div>
        <h3 class="modal-title" id="modal-enquiry-title">Enquire for Program</h3>
        <p class="modal-subtitle">Submit your details below to connect directly with our academic counsellors on WhatsApp.</p>
      </div>

      <form id="modal-enquiry-form">
        <div class="form-group">
          <label for="modal-name" class="form-label">Full Name <span class="req">*</span></label>
          <input type="text" id="modal-name" class="form-control" placeholder="Enter your full name" required>
        </div>

        <div class="form-row-2">
          <div class="form-group">
            <label for="modal-phone" class="form-label">Phone Number <span class="req">*</span></label>
            <input type="tel" id="modal-phone" class="form-control" placeholder="+91 XXXXX XXXXX" required>
          </div>

          <div class="form-group">
            <label for="modal-email" class="form-label">Email Address</label>
            <input type="email" id="modal-email" class="form-control" placeholder="name@example.com">
          </div>
        </div>

        <div class="form-group">
          <label for="modal-program" class="form-label">Selected Program / Service <span class="req">*</span></label>
          <select id="modal-program" class="form-control" required>
            <option value="General Enquiry">Select a Program</option>
            <option value="Nutrition & Lifestyle Program">Nutrition & Lifestyle Program</option>
            <option value="Corporate Wellness Program">Corporate Wellness Program</option>
            <option value="Weightloss Program">Weightloss Program</option>
            <option value="Certified Nutritionist and Lifestyle Coach">Certified Nutritionist and Lifestyle Coach</option>
            <option value="Wellness Business Mastery">Wellness Business Mastery</option>
            <option value="Alternative & Integrative Therapy Workshop">Alternative & Integrative Therapy Workshop</option>
          </select>
        </div>

        <div class="form-group">
          <label for="modal-description" class="form-label">Description / Questions</label>
          <textarea id="modal-description" class="form-control" rows="3" placeholder="Tell us about your background or requirements..."></textarea>
        </div>

        <button type="submit" class="btn btn-whatsapp-submit btn-lg btn-pill">
          <i class="fa-brands fa-whatsapp"></i> Submit & Chat on WhatsApp
        </button>
      </form>
    </div>
  </div>

  <!-- Floating WhatsApp Action Button -->
  <a href="https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20Well%20Skill%20Gurukul,%20I%20would%20like%20to%20enquire%20about%20your%20wellness%20programs." 
     class="floating-whatsapp" 
     id="floating-whatsapp-btn" 
     target="_blank" 
     rel="noopener" 
     aria-label="Chat on WhatsApp with Well Skill Gurukul">
    <i class="fa-brands fa-whatsapp"></i>
    <span>WhatsApp Us</span>
  </a>
  `;

  function initComponentSystem() {
    // 1. Render Header Root
    const headerRoot = document.getElementById('site-header-root');
    if (headerRoot && !headerRoot.hasChildNodes()) {
      headerRoot.innerHTML = HEADER_TEMPLATE;
    }

    // 2. Render Footer Root
    const footerRoot = document.getElementById('site-footer-root');
    if (footerRoot && !footerRoot.hasChildNodes()) {
      footerRoot.innerHTML = FOOTER_TEMPLATE;
    }

    // 3. Inject Modal & Floating WhatsApp if not present
    if (!document.getElementById('enquiry-modal')) {
      const modalWrapper = document.createElement('div');
      modalWrapper.innerHTML = MODAL_TEMPLATE;
      document.body.appendChild(modalWrapper);
    }

    // 4. Highlight Active Navigation Link
    const currentPath = window.location.pathname;
    let pageKey = 'index';
    if (currentPath.includes('about.html')) pageKey = 'about';
    else if (currentPath.includes('services.html')) pageKey = 'services';
    else if (currentPath.includes('gallery.html')) pageKey = 'gallery';
    else if (currentPath.includes('contact.html')) pageKey = 'contact';

    document.querySelectorAll(`[data-page="${pageKey}"]`).forEach(link => {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    });

    // 5. Update Current Year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }

    // 6. Bind Modal Open & Close Triggers
    initModalHandlers();
  }

  function initModalHandlers() {
    const modal = document.getElementById('enquiry-modal');
    const closeBtn = document.getElementById('enquiry-modal-close');
    const form = document.getElementById('modal-enquiry-form');
    const programSelect = document.getElementById('modal-program');

    if (!modal) return;

    // Open modal function with optional pre-selected service
    window.openEnquiryModal = function (serviceName) {
      if (serviceName && programSelect) {
        // Try to match option
        for (let i = 0; i < programSelect.options.length; i++) {
          const optText = programSelect.options[i].text.toLowerCase();
          const searchVal = serviceName.toLowerCase();
          if (optText.includes(searchVal) || searchVal.includes(optText)) {
            programSelect.selectedIndex = i;
            break;
          }
        }
      }
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    window.closeEnquiryModal = function () {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    if (closeBtn) {
      closeBtn.addEventListener('click', window.closeEnquiryModal);
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        window.closeEnquiryModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        window.closeEnquiryModal();
      }
    });

    // Global listener for [data-open-enquiry] buttons
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-open-enquiry], .btn-enquire-modal');
      if (trigger) {
        e.preventDefault();
        const serviceName = trigger.getAttribute('data-program') || trigger.closest('.program-card')?.querySelector('.program-card-title')?.textContent || '';
        window.openEnquiryModal(serviceName.replace(/^[0-9]+\.\s*/, '').trim());
      }
    });

    // Handle Form Submit -> Redirect to WhatsApp
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('modal-name')?.value.trim() || 'Prospective Student';
        const phone = document.getElementById('modal-phone')?.value.trim() || 'Not provided';
        const email = document.getElementById('modal-email')?.value.trim() || 'Not provided';
        const program = document.getElementById('modal-program')?.value || 'General Enquiry';
        const desc = document.getElementById('modal-description')?.value.trim() || 'I would like to receive admission details and curriculum.';

        const messageText = `*Enquiry for Well Skill Gurukul*%0A` +
          `----------------------------%0A` +
          `*Name:* ${encodeURIComponent(name)}%0A` +
          `*Phone:* ${encodeURIComponent(phone)}%0A` +
          `*Email:* ${encodeURIComponent(email)}%0A` +
          `*Program:* ${encodeURIComponent(program)}%0A` +
          `*Description:* ${encodeURIComponent(desc)}%0A` +
          `----------------------------%0A` +
          `Sent via Well Skill Gurukul Website`;

        const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${messageText}`;
        window.open(waUrl, '_blank');
        window.closeEnquiryModal();
        form.reset();
      });
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initComponentSystem);
  } else {
    initComponentSystem();
  }
})();
