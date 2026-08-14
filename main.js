/**
 * WellSkill Gurukul (wellskillgurukul.co.in)
 * 3D Animated Maintenance & 7-Day Automatic Countdown Engine
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. 7-Day Target Countdown Engine
     ========================================================================== */
  const COUNTDOWN_STORAGE_KEY = 'wellskill_launch_target_v1';
  const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

  // Retrieve or initialize the 7-day target timestamp
  function getLaunchTargetDate() {
    let storedTarget = localStorage.getItem(COUNTDOWN_STORAGE_KEY);
    let targetTime;

    if (storedTarget) {
      targetTime = parseInt(storedTarget, 10);
      // If past date, reset to 7 days from now for active maintenance demo
      if (isNaN(targetTime) || targetTime <= Date.now()) {
        targetTime = Date.now() + SEVEN_DAYS_MS;
        localStorage.setItem(COUNTDOWN_STORAGE_KEY, targetTime.toString());
      }
    } else {
      targetTime = Date.now() + SEVEN_DAYS_MS;
      localStorage.setItem(COUNTDOWN_STORAGE_KEY, targetTime.toString());
    }

    return targetTime;
  }

  const launchTarget = getLaunchTargetDate();
  const targetDateObj = new Date(launchTarget);

  // Display target date in header
  const targetDateDisplay = document.getElementById('target-date-display');
  if (targetDateDisplay) {
    const options = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    targetDateDisplay.textContent = `Target: ${targetDateObj.toLocaleDateString(undefined, options)}`;
  }

  // DOM Elements for Countdown
  const daysEl = document.getElementById('days-val');
  const hoursEl = document.getElementById('hours-val');
  const minsEl = document.getElementById('mins-val');
  const secsEl = document.getElementById('secs-val');

  const ringDays = document.getElementById('ring-days');
  const ringHours = document.getElementById('ring-hours');
  const ringMins = document.getElementById('ring-mins');
  const ringSecs = document.getElementById('ring-secs');

  // Helper for 2-digit pad
  function padZero(num) {
    return num < 10 ? '0' + num : num.toString();
  }

  // Update Countdown and Circular SVG Progress
  function updateCountdown() {
    const now = Date.now();
    let diff = launchTarget - now;

    if (diff <= 0) {
      diff = 0;
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minsEl) minsEl.textContent = '00';
      if (secsEl) secsEl.textContent = '00';
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (daysEl) daysEl.textContent = padZero(days);
    if (hoursEl) hoursEl.textContent = padZero(hours);
    if (minsEl) minsEl.textContent = padZero(minutes);
    if (secsEl) secsEl.textContent = padZero(seconds);

    // Update Progress Rings
    // Total circumference = 2 * PI * r
    updateRing(ringDays, days, 7);
    updateRing(ringHours, hours, 24);
    updateRing(ringMins, minutes, 60);
    updateRing(ringSecs, seconds, 60);
  }

  function updateRing(element, value, max) {
    if (!element) return;
    const r = parseFloat(element.getAttribute('r')) || 54;
    const circumference = 2 * Math.PI * r;
    const fraction = value / max;
    const offset = circumference - (fraction * circumference);
    element.style.strokeDasharray = `${circumference}`;
    element.style.strokeDashoffset = `${offset}`;
  }

  // Initial call & recurring 1-second interval
  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ==========================================================================
     2. Interactive Three.js 3D WebGL Background Scene
     ========================================================================== */
  function initThreeScene() {
    const canvas = document.getElementById('webgl-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050814, 0.0018);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 85;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
    } catch (e) {
      console.warn('WebGL initialization failed, running fallback mode.', e);
      return;
    }

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Group for 3D animated core
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Central Geometric Icosahedron (Wireframe + Glowing Nodes)
    const icoGeometry = new THREE.IcosahedronGeometry(20, 2);
    const icoMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.28
    });
    const icoMesh = new THREE.Mesh(icoGeometry, icoMaterial);
    coreGroup.add(icoMesh);

    // Inner Glowing Core
    const innerGeo = new THREE.OctahedronGeometry(10, 1);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // 2. Holographic Orbital Rings
    function createOrbitalRing(radius, tubeRadius, color, rotX, rotY) {
      const ringGeo = new THREE.TorusGeometry(radius, tubeRadius, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.5,
        wireframe: true
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = rotX;
      ringMesh.rotation.y = rotY;
      return ringMesh;
    }

    const ring1 = createOrbitalRing(32, 0.2, 0x38bdf8, Math.PI / 3, 0);
    const ring2 = createOrbitalRing(38, 0.2, 0x818cf8, -Math.PI / 4, Math.PI / 6);
    const ring3 = createOrbitalRing(44, 0.25, 0xf59e0b, Math.PI / 6, Math.PI / 3);

    coreGroup.add(ring1);
    coreGroup.add(ring2);
    coreGroup.add(ring3);

    // 3. Floating 3D Starfield / Particle Swarm
    const particleCount = window.innerWidth < 768 ? 600 : 1200;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorChoices = [
      new THREE.Color(0x38bdf8),
      new THREE.Color(0x818cf8),
      new THREE.Color(0xf59e0b),
      new THREE.Color(0xffffff)
    ];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 350;
      positions[i3 + 1] = (Math.random() - 0.5) * 350;
      positions[i3 + 2] = (Math.random() - 0.5) * 350;

      const randomColor = colorChoices[Math.floor(Math.random() * colorChoices.length)];
      colors[i3] = randomColor.r;
      colors[i3 + 1] = randomColor.g;
      colors[i3 + 2] = randomColor.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // Interactive Mouse & Gyro Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    function onPointerMove(event) {
      const clientX = event.clientX || (event.touches && event.touches[0].clientX) || 0;
      const clientY = event.clientY || (event.touches && event.touches[0].clientY) || 0;
      mouseX = (clientX - windowHalfX) * 0.05;
      mouseY = (clientY - windowHalfY) * 0.05;
    }

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });

    // Handle Window Resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    // Animation Loop
    let clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera parallax
      targetX += (mouseX - targetX) * 0.03;
      targetY += (mouseY - targetY) * 0.03;
      coreGroup.rotation.y = targetX * 0.02 + elapsedTime * 0.12;
      coreGroup.rotation.x = targetY * 0.02 + Math.sin(elapsedTime * 0.2) * 0.1;

      // Rotate individual components
      icoMesh.rotation.y += 0.003;
      icoMesh.rotation.x += 0.002;
      innerMesh.rotation.y -= 0.008;
      innerMesh.rotation.z += 0.005;

      ring1.rotation.z += 0.006;
      ring2.rotation.z -= 0.004;
      ring3.rotation.z += 0.005;

      // Particle system slow float
      particleSystem.rotation.y = elapsedTime * 0.02;
      particleSystem.rotation.x = elapsedTime * 0.01;

      renderer.render(scene, camera);
    }

    animate();
  }

  // Initialize 3D scene after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThreeScene);
  } else {
    initThreeScene();
  }

  /* ==========================================================================
     3. 3D Card Tilt Interaction (Pointer Parallax)
     ========================================================================== */
  function init3DCardTilt() {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return; // Disable tilt on touch devices for fluid scrolling

    const tiltCards = document.querySelectorAll('[data-tilt]');

    tiltCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const cardWidth = rect.width;
        const cardHeight = rect.height;
        const centerX = rect.left + cardWidth / 2;
        const centerY = rect.top + cardHeight / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        const rotateX = -(mouseY / (cardHeight / 2)) * 6; // Max 6 deg
        const rotateY = (mouseX / (cardWidth / 2)) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

  init3DCardTilt();

  /* ==========================================================================
     4. "Notify Me" Form Submission & Toast Alert
     ========================================================================== */
  const notifyForm = document.getElementById('notify-form');
  const emailInput = document.getElementById('email-input');
  const submitBtn = document.getElementById('submit-btn');
  const formFeedback = document.getElementById('form-feedback');

  const toast = document.getElementById('toast-notification');
  const toastTitle = document.getElementById('toast-title');
  const toastMessage = document.getElementById('toast-message');
  const toastClose = document.getElementById('toast-close');

  function showToast(title, message) {
    if (!toast) return;
    toastTitle.textContent = title;
    toastMessage.textContent = message;
    toast.classList.add('show');

    playAudioChime(true);

    setTimeout(() => {
      toast.classList.remove('show');
    }, 5500);
  }

  if (toastClose) {
    toastClose.addEventListener('click', () => {
      toast.classList.remove('show');
    });
  }

  if (notifyForm && emailInput) {
    notifyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();

      // Email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        formFeedback.textContent = 'Please enter a valid email address.';
        formFeedback.className = 'form-feedback error';
        emailInput.focus();
        playAudioChime(false);
        return;
      }

      // Set Loading State
      submitBtn.classList.add('loading');
      formFeedback.textContent = '';
      formFeedback.className = 'form-feedback';

      // Save to localStorage
      try {
        const subs = JSON.parse(localStorage.getItem('wellskill_subscribers') || '[]');
        if (!subs.includes(email)) {
          subs.push(email);
          localStorage.setItem('wellskill_subscribers', JSON.stringify(subs));
        }
      } catch (err) {
        console.warn('Storage error', err);
      }

      // Simulate asynchronous server notification enrollment
      setTimeout(() => {
        submitBtn.classList.remove('loading');
        formFeedback.textContent = '✓ You are officially on the VIP launch list!';
        formFeedback.className = 'form-feedback success';
        emailInput.value = '';

        showToast(
          'VIP Registration Confirmed!',
          `We will notify you at ${email} with early-bird access to WellSkill Gurukul.`
        );
      }, 900);
    });
  }

  /* ==========================================================================
     5. Google Calendar Reminder Generator
     ========================================================================== */
  const calendarBtn = document.getElementById('calendar-btn');
  if (calendarBtn) {
    calendarBtn.addEventListener('click', () => {
      const startDate = new Date(launchTarget);
      const endDate = new Date(launchTarget + 60 * 60 * 1000); // 1 hour event

      function formatGCalDate(date) {
        return date.toISOString().replace(/-|:|\.\d\d\d/g, '');
      }

      const title = encodeURIComponent('WellSkill Gurukul Platform Launch');
      const details = encodeURIComponent('WellSkill Gurukul (wellskillgurukul.co.in) is officially live! Access industry masterclasses and AI skill diagnostics.');
      const location = encodeURIComponent('https://wellskillgurukul.co.in');
      const dates = `${formatGCalDate(startDate)}/${formatGCalDate(endDate)}`;

      const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;

      window.open(googleCalUrl, '_blank', 'noopener,noreferrer');
      showToast('Calendar Reminder', 'Opening Google Calendar to save the launch date.');
    });
  }

  /* ==========================================================================
     6. Web Audio API Synthesizer (Interactive Ambient Feedback)
     ========================================================================== */
  let audioCtx = null;
  let isMuted = true;
  const audioToggle = document.getElementById('audio-toggle');
  const audioIcon = document.getElementById('audio-icon');

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playAudioChime(isSuccess = true) {
    if (isMuted || !audioCtx) return;

    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (isSuccess) {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.15); // G5
        osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.35); // C6
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        osc.start(now);
        osc.stop(now + 0.6);
      } else {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.2);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      }
    } catch (e) {
      console.warn('Audio playback error', e);
    }
  }

  if (audioToggle && audioIcon) {
    audioToggle.addEventListener('click', () => {
      initAudioContext();
      isMuted = !isMuted;

      if (!isMuted) {
        audioIcon.className = 'fa-solid fa-volume-high';
        audioToggle.style.color = 'var(--accent-primary)';
        audioToggle.style.borderColor = 'var(--accent-primary)';
        playAudioChime(true);
        showToast('Sound Ambience Enabled', 'Interactive UI sound effects activated.');
      } else {
        audioIcon.className = 'fa-solid fa-volume-xmark';
        audioToggle.style.color = '';
        audioToggle.style.borderColor = '';
      }
    });
  }

})();
