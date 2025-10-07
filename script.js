"use strict";

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu (basic toggle if needed in future)
  const mobileBtn = document.getElementById('mobileMenuBtn');
  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      // Simple toggle - reveals a quick full-page menu could be added here
      alert('Mobile menu would open here in a full implementation.');
    });
  }

  // Lightbox for gallery
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const thumbs = document.querySelectorAll('.galleryThumb');
  thumbs.forEach(btn => {
    btn.addEventListener('click', () => {
      const img = btn.querySelector('img');
      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    });
  });
  const closeLightbox = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
    document.body.style.overflow = '';
  };
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
  });

  // Menu filtering
  const grid = document.getElementById('menuGrid');
  const items = grid ? grid.querySelectorAll('[data-category]') : [];
  document.querySelectorAll('[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      items.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
      // Analytics event
      trackEvent('filter', filter, window.location.pathname);
    });
  });

  // Smooth internal navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }));

  // Contact form validation (shared on multiple pages if needed)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');
      let valid = true;
      // Name
      if (!name.value.trim() || name.value.trim().length < 2) {
        showError('nameError');
        valid = false;
      } else { hideError('nameError'); }
      // Email
      if (!email.value.includes('@')) {
        showError('emailError');
        valid = false;
      } else { hideError('emailError'); }
      // Message
      if (!message.value.trim() || message.value.trim().length < 10) {
        showError('messageError');
        valid = false;
      } else { hideError('messageError'); }
      if (valid) {
        // Simulate submission
        const status = document.getElementById('formStatus');
        status.textContent = 'Thank you! Your message has been sent.';
        status.className = 'text-sm text-green-600';
        contactForm.reset();
        trackEvent('form_submission', 'contact', window.location.pathname);
      }
    });
  }

  function showError(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('hidden');
  }
  function hideError(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  }

  // Simple analytics integration (mock)
  function trackEvent(action, label, value) {
    if (window.dataLayer && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: 'interaction', action, label, value });
    } else {
      // Fallback console log
      console.log('Analytics:', { event: 'interaction', action, label, value });
    }
  }
  // Log page view
  trackEvent('page_view', document.title, window.location.pathname);
});
