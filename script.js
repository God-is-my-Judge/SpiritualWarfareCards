'use strict';

const THEME_KEY = 'swcg_theme';

function applyTheme(theme) {
  const selected = theme === 'night' ? 'night' : 'day';
  document.documentElement.dataset.theme = selected;
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;
  const icon = toggle.querySelector('.theme-icon');
  const label = toggle.querySelector('.theme-label');
  if (icon) icon.textContent = selected === 'night' ? '☾' : '☀';
  if (label) label.textContent = selected === 'night' ? 'Night' : 'Day';
  toggle.setAttribute('aria-label', `Switch to ${selected === 'night' ? 'day' : 'night'} appearance`);
}

function initNavigation() {
  const menuButton = document.getElementById('nav-menu-btn');
  const links = document.querySelector('.nav-links');
  if (menuButton && links) {
    menuButton.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      document.body.classList.toggle('nav-open', open);
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.textContent = open ? '×' : '☰';
    });
    links.addEventListener('click', event => {
      if (!event.target.closest('a')) return;
      links.classList.remove('open');
      document.body.classList.remove('nav-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.textContent = '☰';
    });
  }

  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === page) link.classList.add('active');
  });
}

function initHeroMotion() {
  const hero = document.querySelector('.hero');
  if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let ticking = false;
  const update = () => {
    const progress = Math.min(1, Math.max(0, window.scrollY / Math.max(hero.offsetHeight, 1)));
    hero.style.setProperty('--hero-progress', progress.toFixed(3));
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
  update();
}

function initPageHeroMotion() {
  const hero = document.querySelector('.page-hero');
  if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let ticking = false;
  const update = () => {
    const progress = Math.min(1, Math.max(0, -hero.getBoundingClientRect().top / Math.max(hero.offsetHeight, 1)));
    hero.style.setProperty('--page-hero-progress', progress.toFixed(3));
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
  update();
}

function initFontVariantSelects() {
  document.querySelectorAll('[data-font-variant-select]').forEach(select => {
    const card = select.closest('.edition-card');
    if (!card) return;
    const links = card.querySelectorAll('[data-easy-href]');
    select.addEventListener('change', () => {
      const useModern = select.value === 'modern';
      links.forEach(link => {
        link.href = useModern ? link.dataset.modernHref : link.dataset.easyHref;
      });
    });
  });
}

function initChecksumNotes() {
  const nodes = document.querySelectorAll('[data-checksum-for]');
  if (!nodes.length) return;
  fetch('Digital/Translations/checksums.json', { cache: 'no-cache' })
    .then(response => response.ok ? response.json() : Promise.reject())
    .then(data => {
      nodes.forEach(node => {
        const entry = data[node.dataset.checksumFor];
        if (!entry) return;
        node.textContent = `SHA-256 ${entry.sha256} · Updated ${entry.updated}`;
        node.title = `Verify the downloaded ZIP: sha256sum "${entry.zip}" should print ${entry.sha256}`;
      });
    })
    .catch(() => {});
}

function openDetailsFromHash() {
  const id = window.location.hash.slice(1);
  if (!id) return;
  const el = document.getElementById(id);
  if (el && el.tagName === 'DETAILS' && !el.open) {
    el.open = true;
    el.scrollIntoView({ block: 'start' });
  }
}

function initCommentForms() {
  document.querySelectorAll('.comment-form').forEach(form => {
    const action = form.getAttribute('action') || '';
    const configured = action && !action.includes('YOUR_FORM_ID');
    const note = form.querySelector('.form-note');
    const showNote = text => { if (note) { note.hidden = false; note.textContent = text; } };

    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (form.querySelector('.hp-field')?.value) return;
      if (!configured) {
        showNote('Comments aren’t turned on yet — check back soon.');
        return;
      }
      const button = form.querySelector('button[type="submit"]');
      button.disabled = true;
      try {
        const response = await fetch(action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });
        if (!response.ok) throw new Error('Submission failed');
        form.hidden = true;
        showNote('Thanks — your comment is awaiting review.');
      } catch (_) {
        // fetch can be blocked by ad/privacy-blocking extensions even when a plain
        // form POST would go through fine — fall back to a normal (non-AJAX) submit.
        // HTMLFormElement.submit() bypasses the 'submit' event entirely, so this can't loop.
        form.submit();
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  let saved = 'day';
  try { saved = localStorage.getItem(THEME_KEY) || 'day'; } catch (_) {}
  applyTheme(saved);

  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'night' ? 'day' : 'night';
    applyTheme(next);
    try { localStorage.setItem(THEME_KEY, next); } catch (_) {}
  });

  initNavigation();
  initHeroMotion();
  initPageHeroMotion();
  initFontVariantSelects();
  initChecksumNotes();
  openDetailsFromHash();
  initCommentForms();
});

window.addEventListener('hashchange', openDetailsFromHash);
