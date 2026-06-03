(function () {
  const images = Array.from(document.querySelectorAll('.gallery img'));
  if (!images.length) return;

  let current = 0;

  // Build lightbox DOM
  const overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');

  const img = document.createElement('img');
  img.className = 'lightbox__img';

  const controls = document.createElement('div');
  controls.className = 'lightbox__controls';

  const prevBtn = document.createElement('button');
  prevBtn.type = 'button';
  prevBtn.className = 'lightbox__btn';
  prevBtn.textContent = '← Zurück';
  prevBtn.setAttribute('aria-label', 'Vorheriges Bild');

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'lightbox__btn lightbox__btn--close';
  closeBtn.textContent = '✕ Schließen';
  closeBtn.setAttribute('aria-label', 'Schließen');

  const nextBtn = document.createElement('button');
  nextBtn.type = 'button';
  nextBtn.className = 'lightbox__btn';
  nextBtn.textContent = 'Weiter →';
  nextBtn.setAttribute('aria-label', 'Nächstes Bild');

  controls.appendChild(prevBtn);
  controls.appendChild(closeBtn);
  controls.appendChild(nextBtn);
  overlay.appendChild(img);
  overlay.appendChild(controls);
  document.body.appendChild(overlay);

  function show(index) {
    current = (index + images.length) % images.length;
    img.src = images[current].src.replace(/w=\d+/, 'w=1200');
    img.alt = images[current].alt;
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  // Open on image click
  images.forEach((image, i) => {
    image.style.cursor = 'pointer';
    image.addEventListener('click', () => show(i));
  });

  prevBtn.addEventListener('click', () => show(current - 1));
  nextBtn.addEventListener('click', () => show(current + 1));
  closeBtn.addEventListener('click', close);

  // Close on backdrop click
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (!overlay.classList.contains('is-open')) return;
    if (e.key === 'ArrowLeft')  show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
    if (e.key === 'Escape')     close();
  });
})();
