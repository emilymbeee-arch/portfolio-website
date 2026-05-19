/* ============================================================
   Emily Beeson Portfolio — script.js
   Handles: nav scroll, mobile menu, scroll reveal,
            portfolio tab nav, contact form
   No dependencies. Vanilla JS only.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Scroll reveal ─────────────────────────────────────────── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('[data-reveal]').forEach(el => {
    revealObserver.observe(el);
  });

  /* ── Nav scroll state ──────────────────────────────────────── */
  const nav = document.querySelector('.site-nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  }

  /* ── Active nav link (index.html only) ────────────────────── */
  const navLinks = document.querySelectorAll('.nav-a[data-section]');
  if (navLinks.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.section === id);
          });
        }
      });
    }, { threshold: 0.35 });

    navLinks.forEach(link => {
      const el = document.getElementById(link.dataset.section);
      if (el) sectionObserver.observe(el);
    });
  }

  /* ── Mobile menu ───────────────────────────────────────────── */
  const burger  = document.querySelector('.nav-burger');
  const overlay = document.querySelector('.mob-overlay');
  const mobClose = document.querySelector('.mob-close');

  if (burger && overlay) {
    burger.addEventListener('click', () => {
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }
  if (mobClose && overlay) {
    mobClose.addEventListener('click', () => {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
  // Close on any mob-link click
  document.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      overlay && overlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ── Smooth scroll for anchor links ───────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ── Portfolio tab navigation ──────────────────────────────── */
  const tabBtns = document.querySelectorAll('.tab-btn');
  if (tabBtns.length) {
    tabBtns.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        // Update active state
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        // Scroll to target
        const targetId = btn.dataset.target;
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // Update active tab on scroll
    const csBands = document.querySelectorAll('.cs-band');
    const tabScrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          tabBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.target === id);
          });
        }
      });
    }, { threshold: 0.3, rootMargin: '-140px 0px 0px 0px' });

    csBands.forEach(band => tabScrollObserver.observe(band));
  }

  /* ── Contact form ──────────────────────────────────────────── */
  const form       = document.getElementById('contact-form');
  const formWrap   = document.getElementById('form-fields');
  const formSuccess= document.getElementById('form-success');
  const formError  = document.getElementById('form-error');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      const name    = form.querySelector('#f-name').value.trim();
      const email   = form.querySelector('#f-email').value.trim();
      const message = form.querySelector('#f-message').value.trim();

      // Simple validation
      if (!name || !email || !message) {
        formError && formError.classList.add('show');
        return;
      }
      formError && formError.classList.remove('show');

      // Simulate submission (replace with real endpoint / Netlify Forms / Formspree)
      if (formWrap)   formWrap.style.display   = 'none';
      if (formSuccess) formSuccess.classList.add('show');
    });
  }

  const resetBtn = document.getElementById('form-reset');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (form)       form.reset();
      if (formWrap)   formWrap.style.display   = '';
      if (formSuccess) formSuccess.classList.remove('show');
      if (formError)  formError.classList.remove('show');
    });
  }

});
