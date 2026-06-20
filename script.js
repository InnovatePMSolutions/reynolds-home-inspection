/**
 * ============================================================
 * REYNOLDS HOME INSPECTION — script.js
 * ============================================================
 * Features:
 *  1. Dark / Light Mode Toggle (with localStorage persistence)
 *  2. Mobile Navigation Menu
 *  3. Smooth Scroll for anchor links (with offset for sticky header)
 *  4. Sticky Header: shadow on scroll
 *  5. Contact Form: validation & submission handling
 *  6. Footer: current year injection
 *  7. Active nav link on scroll (IntersectionObserver)
 * ============================================================
 */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     UTILITY: Get element(s)
  ---------------------------------------------------------- */
  function qs(selector, parent) { return (parent || document).querySelector(selector); }

  /* ==========================================================
     1. DARK / LIGHT MODE TOGGLE
     - Reads system preference on first load
     - Persists user choice in localStorage
     - Applies [data-theme="dark"] to <html>
  ========================================================== */

  var THEME_KEY = 'rhi-theme'; // localStorage key
  var themeToggle = qs('#themeToggle');
  var html = document.documentElement;

  /**
   * Apply theme. theme = 'dark' | 'light'
   */
  function applyTheme(theme) {
    if (theme === 'dark') {
      html.setAttribute('data-theme', 'dark');
      if (themeToggle) {
        themeToggle.setAttribute('aria-label', 'Switch to light mode');
        themeToggle.setAttribute('aria-pressed', 'true');
      }
    } else {
      html.removeAttribute('data-theme');
      if (themeToggle) {
        themeToggle.setAttribute('aria-label', 'Switch to dark mode');
        themeToggle.setAttribute('aria-pressed', 'false');
      }
    }
  }

  /**
   * Initialize theme on page load:
   *  Priority: 1) User's saved preference, 2) System preference
   */
  function initTheme() {
    var saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') {
      applyTheme(saved);
    } else {
      // Match system preference
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(prefersDark ? 'dark' : 'light');
    }
  }

  // Toggle on button click
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var isDark = html.getAttribute('data-theme') === 'dark';
      var next = isDark ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* localStorage unavailable */ }
    });
  }

  // Listen for system preference changes (if no user preference saved)
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      if (!localStorage.getItem(THEME_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  initTheme();


  /* ==========================================================
     2. MOBILE NAVIGATION MENU
     - Toggles .is-open class on nav
     - Updates aria-expanded on hamburger button
     - Closes when a nav link is clicked
     - Closes when focus leaves the menu
  ========================================================== */

  var hamburger = qs('#hamburgerBtn');
  var mobileMenu = qs('#mobileMenu');
  var mobileNavLinks = mobileMenu ? mobileMenu.querySelectorAll('.mobile-nav-link') : [];

  function openMobileMenu() {
    if (!mobileMenu || !hamburger) return;
    mobileMenu.classList.add('is-open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close navigation menu');
  }

  function closeMobileMenu() {
    if (!mobileMenu || !hamburger) return;
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open navigation menu');
  }

  function toggleMobileMenu() {
    var isOpen = mobileMenu && mobileMenu.classList.contains('is-open');
    if (isOpen) { closeMobileMenu(); } else { openMobileMenu(); }
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
    hamburger.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMobileMenu();
      }
    });
  }

  // Close when mobile nav link clicked
  mobileNavLinks.forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close when clicking outside
  document.addEventListener('click', function (e) {
    if (!mobileMenu || !hamburger) return;
    if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
      closeMobileMenu();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeMobileMenu(); }
  });


  /* ==========================================================
     3. STICKY HEADER — Shadow on Scroll
     Adds a subtle class to enhance shadow when page is scrolled.
  ========================================================== */

  var siteHeader = qs('.site-header');

  function handleHeaderScroll() {
    if (!siteHeader) return;
    if (window.scrollY > 10) {
      siteHeader.style.boxShadow = '0 2px 20px rgba(26, 46, 74, 0.14)';
    } else {
      siteHeader.style.boxShadow = '';
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();


  /* ==========================================================
     4. ACTIVE NAV LINK ON SCROLL (IntersectionObserver)
     Highlights the nav link corresponding to the visible section.
  ========================================================== */

  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-desktop a[href^="#"]');

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    var observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    };

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            link.removeAttribute('aria-current');
            link.style.color = '';
            link.style.borderBottomColor = '';
          });
          var active = document.querySelector('.nav-desktop a[href="#' + id + '"]');
          if (active) {
            active.setAttribute('aria-current', 'section');
            active.style.borderBottomColor = 'var(--color-gold)';
            active.style.color = 'var(--color-navy)';
          }
        }
      });
    }, observerOptions);

    sections.forEach(function (section) { observer.observe(section); });
  }


  /* ==========================================================
     5. CONTACT FORM VALIDATION & SUBMISSION
     - Required field validation
     - Email format validation
     - Inline error messages with ARIA
     - Submits contact form to Formspree
  ========================================================== */

  var form = qs('#contactForm');

  if (form) {

    // --- Validation Helpers ---

    function getField(id) { return qs('#' + id, form); }
    function getError(id) { return qs('#' + id + '-error', form); }

    function showError(fieldId, message) {
      var field = getField(fieldId);
      var error = getError(fieldId);
      if (field) { field.classList.add('is-error'); }
      if (error) {
        error.textContent = message;
        error.classList.add('is-visible');
      }
    }

    function clearError(fieldId) {
      var field = getField(fieldId);
      var error = getError(fieldId);
      if (field) { field.classList.remove('is-error'); }
      if (error) {
        error.textContent = '';
        error.classList.remove('is-visible');
      }
    }

    function isValidEmail(email) {
      // RFC 5322-ish email regex
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
    }

    function validateForm() {
      var isValid = true;
      var nameVal = (getField('name') || {}).value || '';
      var emailVal = (getField('email') || {}).value || '';
      var messageVal = (getField('message') || {}).value || '';

      // Name
      if (!nameVal.trim()) {
        showError('name', 'Please enter your full name.');
        isValid = false;
      } else {
        clearError('name');
      }

      // Email
      if (!emailVal.trim()) {
        showError('email', 'Please enter your email address.');
        isValid = false;
      } else if (!isValidEmail(emailVal)) {
        showError('email', 'Please enter a valid email address.');
        isValid = false;
      } else {
        clearError('email');
      }

      // Message
      if (!messageVal.trim()) {
        showError('message', 'Please enter a message.');
        isValid = false;
      } else {
        clearError('message');
      }

      return isValid;
    }

    // --- Inline validation on blur ---
    ['name', 'email', 'message'].forEach(function (fieldId) {
      var field = getField(fieldId);
      if (!field) return;

      field.addEventListener('blur', function () {
        var val = field.value;
        if (fieldId === 'name' && !val.trim()) {
          showError('name', 'Please enter your full name.');
        } else if (fieldId === 'email') {
          if (!val.trim()) {
            showError('email', 'Please enter your email address.');
          } else if (!isValidEmail(val)) {
            showError('email', 'Please enter a valid email address.');
          } else {
            clearError('email');
          }
        } else if (fieldId === 'message' && !val.trim()) {
          showError('message', 'Please enter a message.');
        } else {
          clearError(fieldId);
        }
      });

      // Clear error on input once user starts correcting
      field.addEventListener('input', function () {
        if (field.classList.contains('is-error')) {
          clearError(fieldId);
        }
      });
    });

    // --- Form Submission ---
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var formStatus = qs('#formStatus', form);
      formStatus.className = 'form-status'; // Reset
      formStatus.style.display = 'none';

      if (!validateForm()) {
        // Focus first error field
        var firstError = form.querySelector('.is-error');
        if (firstError) { firstError.focus(); }
        return;
      }

      // Disable submit button during processing
      var submitBtn = form.querySelector('[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';
      }

      // Submit to Formspree
      var formAction = form.getAttribute('action') || 'https://formspree.io/f/mwvjggye';

      fetch(formAction, {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: new FormData(form)
      })
        .then(function (response) {
          if (!response.ok) {
            throw new Error('Form submission failed.');
          }

          if (formStatus) {
            formStatus.className = 'form-status is-success';
            formStatus.style.display = 'block';
            formStatus.textContent = 'Thank you! We\'ll contact you within 24 hours.';
            formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }

          form.reset();
        })
        .catch(function () {
          if (formStatus) {
            formStatus.className = 'form-status is-error-msg';
            formStatus.style.display = 'block';
            formStatus.textContent = 'Something went wrong. Please call or text us directly at (773) 547-0434.';
            formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
          }
        });
    });
  }


  /* ==========================================================
     6. FOOTER: Current Year
  ========================================================== */

  var yearEl = qs('#currentYear');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }


  /* ==========================================================
     7. PROGRESSIVE ENHANCEMENT: Smooth Anchor Scroll
     Polyfill for browsers that don't support scroll-behavior: smooth
  ========================================================== */

  // Only needed for older browsers — modern browsers handle this via CSS.
  // We add keyboard support and offset calculation here as a fallback.
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = qs(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();

      var headerHeight = siteHeader ? siteHeader.offsetHeight : 0;
      var targetY = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({ top: targetY, behavior: 'smooth' });

      // Move focus to target for accessibility
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });

})();
