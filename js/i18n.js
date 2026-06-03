(function () {
  const SUPPORTED = ['de', 'en'];

  function detectLang() {
    const stored = localStorage.getItem('lang');
    if (stored && SUPPORTED.includes(stored)) return stored;
    return 'de';
  }

  async function loadLanguage(lang) {
    try {
      const res = await fetch('i18n/' + lang + '.json');
      if (!res.ok) throw new Error('i18n fetch failed: ' + res.status);
      const t = await res.json();

      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (t[key] !== undefined) el.textContent = t[key];
      });

      document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        if (t[key] !== undefined) el.placeholder = t[key];
      });

      window.__i18nLang = lang;
      localStorage.setItem('lang', lang);
      document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
    } catch (err) {
      console.error('i18n error:', err);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    loadLanguage(detectLang());
    document.querySelectorAll('[data-lang-btn]').forEach(btn => {
      btn.addEventListener('click', () => loadLanguage(btn.dataset.langBtn));
    });
  });
})();
