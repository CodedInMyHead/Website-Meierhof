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

  function buildCard(recipe, meta, lang, t) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML =
      '<img class="card__img" src="' + recipe.image + '" alt="' + meta.title + '">' +
      '<div class="card__body">' +
        '<h3 class="card__title">' + meta.title + '</h3>' +
        '<a href="rezept#' + recipe.id + '" class="card__btn">' + (t['recipe.btn'] || 'Zum Rezept') + '</a>' +
      '</div>';
    return card;
  }

  async function loadRecipes(lang) {
    const grid = document.getElementById('recipe-grid');
    if (!grid) return;

    const [indexRes, i18nRes] = await Promise.all([
      fetch('content/recipes/index.json'),
      fetch('i18n/' + lang + '.json')
    ]);
    if (!indexRes.ok || !i18nRes.ok) return;

    const [recipes, t] = await Promise.all([indexRes.json(), i18nRes.json()]);

    const cards = await Promise.all(recipes.map(async recipe => {
      const res = await fetch('content/' + lang + '/recipes/' + recipe.id + '.md');
      if (!res.ok) return null;
      const { meta } = parseFrontmatter(await res.text());
      return buildCard(recipe, meta, lang, t);
    }));

    grid.innerHTML = '';
    cards.filter(Boolean).forEach(card => grid.appendChild(card));
  }

  document.addEventListener('DOMContentLoaded', () => {
    loadRecipes(localStorage.getItem('lang') || 'de');
  });

  document.addEventListener('langchange', e => {
    loadRecipes(e.detail.lang);
  });
})();
