/**
 * ONALO INTELLIGENCE SYSTEMS - JAVASCRIPT CONTROLLER
 * Author: Ishaaq Onalo Brand & Intelligence Console
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 0. Dynamic Navbar Height Synchronization for Viewport-Bound Sections ---
  const navbar = document.getElementById('navbar');
  function syncNavbarHeight() {
    if (!navbar) return;
    const h = navbar.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--navbar-h', `${Math.round(h)}px`);
  }
  syncNavbarHeight();
  window.addEventListener('resize', syncNavbarHeight);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(syncNavbarHeight);
  }

  // --- 1. Sticky Navigation & Active Link Tracker ---
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // --- 2. Mobile Navigation Toggle ---
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navLinks');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('.material-symbols-outlined');
      if (navMenu.classList.contains('active')) {
        icon.textContent = 'close';
      } else {
        icon.textContent = 'terminal';
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('.material-symbols-outlined');
        if (icon) icon.textContent = 'terminal';
      });
    });
  }

  // --- 3. Telemetry Stream Live Update Simulation ---
  const telemetryTimestamp = document.getElementById('telemetryTimestamp');
  const telemetryHash = document.getElementById('telemetryHash');

  if (telemetryTimestamp) {
    setInterval(() => {
      const now = new Date();
      telemetryTimestamp.textContent = now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
    }, 1000);
  }

  if (telemetryHash) {
    const chars = '0123456789ABCDEF';
    setInterval(() => {
      let hash = '0x';
      for (let i = 0; i < 8; i++) {
        hash += chars[Math.floor(Math.random() * chars.length)];
      }
      telemetryHash.textContent = hash;
    }, 4000);
  }

  // --- 4. Interactive Security Briefing Form & Modal ---
  const briefingForm = document.getElementById('securityBriefingForm');
  const successModal = document.getElementById('successModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  if (briefingForm) {
    briefingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('inquirerName').value.trim();
      const email = document.getElementById('inquirerEmail').value.trim();
      const serviceType = document.getElementById('serviceType').value;

      if (!name || !email || !serviceType) {
        alert('Please provide your name, corporate email address, and service area.');
        return;
      }

      const submitBtn = briefingForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = '<span class="material-symbols-outlined" style="animation: spin 1s linear infinite;">sync</span> Encrypting & Dispatching...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        briefingForm.reset();

        const clientSpan = document.getElementById('modalInquirerName');
        if (clientSpan) clientSpan.textContent = name;

        if (successModal) {
          successModal.classList.add('active');
        }
      }, 850);
    });
  }

  if (closeModalBtn && successModal) {
    closeModalBtn.addEventListener('click', () => {
      successModal.classList.remove('active');
    });

    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        successModal.classList.remove('active');
      }
    });
  }
});
