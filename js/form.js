/**
 * Well Skill Gurukul — Contact Form Validation & Program Pre-selection
 * Direct WhatsApp routing to +91 97483 75692 on submission.
 */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('institute-enquiry-form');
  const programSelect = document.getElementById('enquiry-program');
  const successBanner = document.getElementById('form-success-message');
  const submitBtn = document.getElementById('form-submit-btn');
  const WHATSAPP_NUMBER = '918910512503';

  // 1. Pre-select program from URL param (e.g., contact.html?program=weightloss)
  if (programSelect) {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedProgram = urlParams.get('program');
    if (selectedProgram) {
      const cleanParam = selectedProgram.replace(/-/g, ' ').toLowerCase();
      for (let i = 0; i < programSelect.options.length; i++) {
        const optText = programSelect.options[i].text.toLowerCase();
        const optVal = programSelect.options[i].value.toLowerCase();
        if (optText.includes(cleanParam) || optVal.includes(selectedProgram.toLowerCase())) {
          programSelect.selectedIndex = i;
          break;
        }
      }
    }
  }

  // 2. Client-side Form Validation & Direct WhatsApp Submission
  if (contactForm) {
    const nameInput = document.getElementById('enquiry-name');
    const emailInput = document.getElementById('enquiry-email');
    const phoneInput = document.getElementById('enquiry-phone');
    const messageInput = document.getElementById('enquiry-message');

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validatePhone(phone) {
      return /^[\d\s+\-()]{7,20}$/.test(phone.trim());
    }

    function setFieldState(input, isValid, errorMsg) {
      const feedback = input.parentElement.querySelector('.form-feedback');
      if (isValid) {
        input.classList.remove('is-invalid');
        if (feedback) feedback.style.display = 'none';
      } else {
        input.classList.add('is-invalid');
        if (feedback) {
          feedback.textContent = errorMsg;
          feedback.style.display = 'block';
        }
      }
    }

    // Real-time clear error on typing
    [nameInput, emailInput, phoneInput, messageInput].forEach((input) => {
      if (input) {
        input.addEventListener('input', () => {
          if (input.classList.contains('is-invalid')) {
            setFieldState(input, true);
          }
        });
      }
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let hasError = false;

      // Validate Name
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        setFieldState(nameInput, false, 'Please enter your full name.');
        hasError = true;
      } else {
        setFieldState(nameInput, true);
      }

      // Validate Phone
      if (!phoneInput.value.trim() || !validatePhone(phoneInput.value.trim())) {
        setFieldState(phoneInput, false, 'Please provide a valid contact number.');
        hasError = true;
      } else {
        setFieldState(phoneInput, true);
      }

      // Validate Email (Optional check or format)
      if (emailInput.value.trim() && !validateEmail(emailInput.value.trim())) {
        setFieldState(emailInput, false, 'Please provide a valid email address.');
        hasError = true;
      } else {
        setFieldState(emailInput, true);
      }

      // Validate Program
      if (programSelect && !programSelect.value) {
        setFieldState(programSelect, false, 'Please select your program of interest.');
        hasError = true;
      } else if (programSelect) {
        setFieldState(programSelect, true);
      }

      if (hasError) {
        const firstInvalid = contactForm.querySelector('.is-invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Show processing state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-brands fa-whatsapp fa-spin"></i> Connecting to WhatsApp...';
      }

      const name = nameInput.value.trim();
      const phone = phoneInput.value.trim();
      const email = emailInput.value.trim() || 'Not specified';
      const program = programSelect ? programSelect.options[programSelect.selectedIndex].text : 'General Enquiry';
      const message = messageInput.value.trim() || 'I would like to enquire about this program and admission schedule.';

      const waText = `*New Admission Enquiry - Well Skill Gurukul*%0A` +
        `----------------------------------------%0A` +
        `*Name:* ${encodeURIComponent(name)}%0A` +
        `*Contact:* ${encodeURIComponent(phone)}%0A` +
        `*Email:* ${encodeURIComponent(email)}%0A` +
        `*Program:* ${encodeURIComponent(program)}%0A` +
        `*Message/Goals:* ${encodeURIComponent(message)}%0A` +
        `----------------------------------------%0A` +
        `Submitted via Well Skill Gurukul Portal`;

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Submit Enquiry';
        }

        // Open WhatsApp directly
        const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`;
        window.open(waUrl, '_blank');

        contactForm.reset();

        if (successBanner) {
          successBanner.classList.add('is-visible');
          successBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 600);
    });
  }
});
