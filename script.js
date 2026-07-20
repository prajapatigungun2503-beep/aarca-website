// ── Mobile menu toggle ────────────────────────
const menuBtn  = document.querySelector('[data-menu-button]');
const navLinks = document.querySelector('[data-nav-links]');

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    menuBtn.setAttribute('aria-expanded', isOpen);
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

// ── Ripple click effect on cards ──────────────
function addRipple(e) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();

  const dot = document.createElement('span');
  dot.classList.add('ripple-dot');

  const size   = Math.max(card.offsetWidth, card.offsetHeight);
  const x      = e.clientX - rect.left - size / 2;
  const y      = e.clientY - rect.top  - size / 2;

  dot.style.width  = size + 'px';
  dot.style.height = size + 'px';
  dot.style.left   = x + 'px';
  dot.style.top    = y + 'px';

  card.style.position = 'relative';
  card.style.overflow = 'hidden';

  card.appendChild(dot);
  dot.addEventListener('animationend', () => dot.remove());
}

document.querySelectorAll('.card, .product-grid article, .highlights article').forEach(card => {
  card.addEventListener('click', addRipple);
  // Also support keyboard enter/space
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      addRipple({ currentTarget: card, clientX: card.getBoundingClientRect().left + card.offsetWidth / 2,
                  clientY: card.getBoundingClientRect().top + card.offsetHeight / 2 });
    }
  });
});

// ── Scroll reveal animation ───────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

// Apply fade-up to cards and sections on scroll
document.querySelectorAll('.card, .product-grid article, .highlights article, .value-list article').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = `opacity 0.55s ease ${i * 0.08}s, transform 0.55s ease ${i * 0.08}s`;
  revealObserver.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
  // Trigger initial check for elements already visible
  setTimeout(() => {
    document.querySelectorAll('.card, .product-grid article, .highlights article, .value-list article').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  }, 100);
});

// Handle revealed class
document.addEventListener('scroll', () => {
  document.querySelectorAll('.card, .product-grid article, .highlights article, .value-list article').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }
  });
}, { passive: true });
