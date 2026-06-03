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

  function emojis(value, max) {
    const n = parseInt(value, 10);
    return '★'.repeat(n) + '☆'.repeat(max - n);
  }

  function parseSection(body, headings) {
    const lines = body.split('\n');
    const sections = {};
    let current = null;
    lines.forEach(line => {
      const h = line.match(/^## (.+)/);
      if (h) {
        current = h[1].trim();
        sections[current] = [];
      } else if (current) {
        sections[current].push(line);
      }
    });
    const result = {};
    headings.forEach(h => {
      const key = Object.keys(sections).find(k => k.toLowerCase() === h.toLowerCase());
      result[h] = key ? sections[key].join('\n').trim() : '';
    });
    return result;
  }

  function renderList(md) {
    return '<ul>' + md.split('\n')
      .filter(l => l.trim().startsWith('-'))
      .map(l => '<li>' + l.replace(/^-\s*/, '') + '</li>')
      .join('') + '</ul>';
  }

  function renderOrderedList(md) {
    return '<ol>' + md.split('\n')
      .filter(l => l.trim().match(/^\d+\./))
      .map(l => '<li>' + l.replace(/^\d+\.\s*/, '') + '</li>')
      .join('') + '</ol>';
  }

  function renderParagraphs(md) {
    return marked.parse(md);
  }

  function buildLayout(meta, body, image, t) {
    const isDE = (localStorage.getItem('lang') || 'de') === 'de';
    const sectionNames = isDE
      ? { ingredients: 'Zutaten', directions: 'Zubereitung', notes: 'Hinweise' }
      : { ingredients: 'Ingredients', directions: 'Directions', notes: 'Notes' };

    const sections = parseSection(body, Object.values(sectionNames));

    const ingredientsHtml = renderList(sections[sectionNames.ingredients] || '');
    const directionsHtml = renderOrderedList(sections[sectionNames.directions] || '');
    const notesHtml = sections[sectionNames.notes]
      ? '<div class="rp-notes"><h3>' + (isDE ? 'HINWEISE' : 'NOTES') + '</h3>' + renderParagraphs(sections[sectionNames.notes]) + '</div>'
      : '';

    const difficultyLabel = isDE ? 'Schwierigkeit' : 'Difficulty';
    const tasteLabel = isDE ? 'Geschmack' : 'Taste';
    const effortLabel = isDE ? 'Aufwand' : 'Effort';
    const servingsLabel = isDE ? 'Portionen' : 'Servings';
    const timeLabel = isDE ? 'Zeit' : 'Time';

    return `
      <div class="rp-layout">
        <div class="rp-left">
          <div class="rp-ratings">
            <div class="rp-rating"><span class="rp-rating__label">${difficultyLabel}</span><span class="rp-rating__emojis">${emojis(meta.difficulty, 5)}</span></div>
            <div class="rp-rating"><span class="rp-rating__label">${tasteLabel}</span><span class="rp-rating__emojis">${emojis(meta.taste, 5)}</span></div>
            <div class="rp-rating"><span class="rp-rating__label">${effortLabel}</span><span class="rp-rating__emojis">${emojis(meta.effort, 5)}</span></div>
          </div>
          <div class="rp-ingredients">
            <h3>${isDE ? 'ZUTATEN' : 'INGREDIENTS'}</h3>
            ${ingredientsHtml}
          </div>
          <div class="rp-image">
            <img src="${image}" alt="${meta.title}">
          </div>
        </div>
        <div class="rp-right">
          <div class="rp-stats">
            <span class="rp-stat">🍽️ ${meta.servings} ${servingsLabel}</span>
            <span class="rp-stat">🕐 ${meta.time}</span>
          </div>
          <div class="rp-directions">
            <h3>${isDE ? 'ZUBEREITUNG' : 'DIRECTIONS'}</h3>
            ${directionsHtml}
          </div>
          ${notesHtml}
        </div>
      </div>`;
  }

  async function loadRecipe(lang) {
    const id = window.location.hash.slice(1);
    const content = document.getElementById('recipe-content');
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
    const image = recipe ? recipe.image : '';

    document.title = meta.title + ' — Meierhof Staffort';
    document.querySelectorAll('.recipe-title').forEach(el => { el.textContent = meta.title; });

    const hero = document.getElementById('recipe-hero');
    if (hero && image) { hero.src = image; hero.alt = meta.title; }

    content.innerHTML = buildLayout(meta, body, image, {});
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
