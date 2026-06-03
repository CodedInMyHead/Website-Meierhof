(function () {
  async function loadContent(lang) {
    const elements = document.querySelectorAll('[data-content]');
    await Promise.all(Array.from(elements).map(async el => {
      const key = el.dataset.content;
      try {
        const res = await fetch('content/' + lang + '/' + key + '.md');
        if (!res.ok) throw new Error('content fetch failed: ' + res.status);
        const text = await res.text();
        el.innerHTML = marked.parse(text);
      } catch (err) {
        console.error('content.js: failed to load ' + key + ' for lang ' + lang, err);
      }
    }));
  }

  document.addEventListener('DOMContentLoaded', () => {
    loadContent(localStorage.getItem('lang') || 'de');
  });

  document.addEventListener('langchange', e => {
    loadContent(e.detail.lang);
  });
})();
