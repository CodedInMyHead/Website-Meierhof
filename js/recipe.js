(function () {
  function parseFrontmatter(text) {
    const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!match) return { meta: {}, body: text };
    const meta = {};
    match[1].split('\n').forEach(line => {
      const [key, ...rest] = line.split(':');
      if (key && rest.length) meta[key.trim()] = rest.join(':').trim();
    });
    return { meta, body: match[2].trim() };
  }

  async function loadRecipe(lang) {
    const id = window.location.hash.slice(1);
    const content = document.getElementById('recipe-content');
    const hero = document.getElementById('recipe-hero');
    if (!id || !content) return;

    const [mdRes, indexRes] = await Promise.all([
      fetch('content/' + lang + '/recipes/' + id + '.md'),
      fetch('content/recipes/index.json')
    ]);

    if (!mdRes.ok) {
      content.innerHTML = '<p>Rezept nicht gefunden.</p>';
      return;
    }

    const [{ meta, body }, recipes] = await Promise.all([
      mdRes.text().then(parseFrontmatter),
      indexRes.ok ? indexRes.json() : Promise.resolve([])
    ]);

    const recipe = recipes.find(r => r.id === id);

    document.title = meta.title + ' — Meierhof Staffort';

    if (hero && recipe) {
      hero.src = recipe.image;
      hero.alt = meta.title;
    }

    document.querySelectorAll('.recipe-title').forEach(el => { el.textContent = meta.title; });
    content.innerHTML = marked.parse(body);
  }

  document.addEventListener('DOMContentLoaded', () => {
    loadRecipe(localStorage.getItem('lang') || 'de');
  });

  window.addEventListener('hashchange', () => {
    loadRecipe(localStorage.getItem('lang') || 'de');
  });

  document.addEventListener('langchange', e => {
    loadRecipe(e.detail.lang);
  });
})();
