document.addEventListener('DOMContentLoaded', () => {
  const nav      = document.querySelector('.site-nav');
  const toggle   = document.querySelector('.nav__toggle');
  const linksList= document.querySelector('.nav__links');
  const langDiv  = document.querySelector('.nav__lang');
  const logoEl   = document.querySelector('.nav__logo');

  // --- Insert overflow button and panel ---
  const overflowBtn = document.createElement('button');
  overflowBtn.type = 'button';
  overflowBtn.className = 'nav__overflow-btn';
  overflowBtn.setAttribute('aria-label', 'Mehr Navigation');
  overflowBtn.setAttribute('aria-expanded', 'false');
  overflowBtn.setAttribute('aria-haspopup', 'true');
  overflowBtn.textContent = '•••';
  nav.insertBefore(overflowBtn, langDiv);

  const overflowPanel = document.createElement('ul');
  overflowPanel.className = 'nav__overflow-panel';
  nav.appendChild(overflowPanel);

  // --- Mark active page ---
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.setAttribute('aria-current', 'page');
    }
  });

  // --- Priority+ overflow sync ---
  function isTablet() {
    return true;
  }

  function syncOverflow() {
    const items = Array.from(linksList.querySelectorAll('li'));

    if (!isTablet()) {
      items.forEach(li => { li.style.display = ''; });
      overflowPanel.innerHTML = '';
      overflowBtn.classList.remove('has-overflow', 'has-active-overflow');
      overflowBtn.setAttribute('aria-expanded', 'false');
      nav.classList.remove('overflow--open');
      return;
    }

    // Reset all to visible so offsetWidth is measurable
    items.forEach(li => { li.style.display = ''; });

    const navW    = nav.offsetWidth;
    const logoW   = logoEl ? logoEl.offsetWidth : 0;
    const langW   = langDiv ? langDiv.offsetWidth : 0;
    const btnW    = overflowBtn.offsetWidth || 44;
    const padding = 48;
    const safety  = 16;
    const GAP     = 24;
    let budget = navW - logoW - langW - btnW - padding - safety;

    let used = 0;
    let firstOverflow = items.length;

    for (let i = 0; i < items.length; i++) {
      const w = items[i].offsetWidth + (i === 0 ? 0 : GAP);
      if (used + w > budget) { firstOverflow = i; break; }
      used += w;
    }

    // Hide overflowing items
    items.forEach((li, i) => { li.style.display = i >= firstOverflow ? 'none' : ''; });

    // Rebuild overflow panel
    overflowPanel.innerHTML = '';
    const overflowItems = items.slice(firstOverflow);
    const hasOverflow = overflowItems.length > 0;
    let hasActive = false;

    overflowItems.forEach(li => {
      const src = li.querySelector('a');
      const newLi = document.createElement('li');
      const newA  = document.createElement('a');
      newA.href = src.getAttribute('href');
      if (src.dataset.i18n) newA.dataset.i18n = src.dataset.i18n;
      newA.textContent = src.textContent;
      if (src.getAttribute('aria-current') === 'page') {
        newA.setAttribute('aria-current', 'page');
        hasActive = true;
      }
      newA.addEventListener('click', () => {
        nav.classList.remove('overflow--open');
        overflowBtn.setAttribute('aria-expanded', 'false');
      });
      newLi.appendChild(newA);
      overflowPanel.appendChild(newLi);
    });

    overflowBtn.classList.toggle('has-overflow', hasOverflow);
    overflowBtn.classList.toggle('has-active-overflow', hasActive);
    if (!hasOverflow) {
      nav.classList.remove('overflow--open');
      overflowBtn.setAttribute('aria-expanded', 'false');
    }
  }

  // Run on resize
  const ro = new ResizeObserver(() => syncOverflow());
  ro.observe(nav);
  requestAnimationFrame(syncOverflow);

  // --- Overflow button toggle ---
  overflowBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('overflow--open');
    overflowBtn.setAttribute('aria-expanded', String(open));
  });

  // --- Close overflow on outside click ---
  document.addEventListener('click', e => {
    if (!nav.contains(e.target)) {
      nav.classList.remove('overflow--open');
      overflowBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // --- Escape key closes overflow ---
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('overflow--open')) {
      nav.classList.remove('overflow--open');
      overflowBtn.setAttribute('aria-expanded', 'false');
      overflowBtn.focus();
    }
  });

  document.querySelectorAll('.nav__links a').forEach(link => {
    link.addEventListener('click', () => nav && nav.classList.remove('nav--open'));
  });

  // --- Re-sync after language change (overflow panel text needs updating) ---
  document.addEventListener('langchange', () => syncOverflow());

  // --- Season banner close + nav top offset ---
  const closeBtn = document.querySelector('.season-banner__close');
  const banner   = document.querySelector('.season-banner');

  function updateNavTop() {
    nav.style.top = banner ? banner.offsetHeight + 'px' : '0';
  }

  updateNavTop();

  if (banner) {
    const bannerRO = new ResizeObserver(updateNavTop);
    bannerRO.observe(banner);
  }

  if (closeBtn && banner) {
    closeBtn.addEventListener('click', () => banner.classList.add('is-hidden'));
  }
});
