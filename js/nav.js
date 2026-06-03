document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.site-nav');
  const toggle = document.querySelector('.nav__toggle');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('nav--open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  document.querySelectorAll('.nav__links a').forEach(link => {
    link.addEventListener('click', () => nav && nav.classList.remove('nav--open'));
  });

  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.setAttribute('aria-current', 'page');
    }
  });

  const closeBtn = document.querySelector('.season-banner__close');
  const banner = document.querySelector('.season-banner');
  if (closeBtn && banner) {
    closeBtn.addEventListener('click', () => {
      banner.classList.add('is-hidden');
    });
  }
});
