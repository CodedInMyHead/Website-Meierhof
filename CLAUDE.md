# Meierhof Staffort — Website Project

## What this project is

A modern static website for Meierhof Staffort, a 4-generation family farm in Stutensee/Staffort, Germany. Purely informational — no backend, no cart, no build step required.

**Live URL:** `https://codedinmyhead.github.io/Website-Meierhof`
**Repo:** `https://github.com/CodedInMyHead/Website-Meierhof`

---

## Tech Stack

- **HTML + Pico CSS (CDN) + vanilla JS** — no npm, no bundler, no build step
- **Pico CSS CDN:** `https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css`
- **marked.js CDN:** `https://cdn.jsdelivr.net/npm/marked/marked.min.js` (used on index, ueber-uns, rezepte, rezept)
- **Deployment:** GitHub Pages, via `actions/deploy-pages` (push to `main` → auto-deploy)
- **CI:** `.github/workflows/lint.yml` — html-validate + stylelint; `deploy.yml` — deploys on merge to `main`. Node 24.
- **Dev server:** `npx serve` on port 3000. Note: strips query strings and `.html` extensions.

---

## Farm Details

- **Farm name:** Meierhof Staffort
- **Address:** Im Gewann Herrenäcker, 76297 Stutensee, Stadtteil Staffort
- **Phone:** 07249 / 951793
- **WhatsApp:** `https://wa.me/497249951793`
- **Email:** info@meierhof-staffort.de _(verify before going live)_
- **Opening hours:** Mo–Fr 9–18 Uhr, Sa/So/Feiertage 9–15 Uhr (April–Juni)
- **Legal owner (Impressum):** placeholder — fill in before going live
- **Logo:** `images/logo.jpg` — real logo, used as favicon too
- **Instagram:** `https://www.instagram.com/meierhof_staffort`
- **Facebook:** `href="#"` placeholder — real URL not yet known

---

## Pages

| File | Title | Notes |
|---|---|---|
| `index.html` | Startseite | Slideshow (4 slides, 6s interval, Ken Burns) + hero text + shop content + 3 cards |
| `ueber-uns.html` | Über uns | Markdown content from `content/*/about.md` |
| `anfahrt.html` | Anfahrt | Two-column grid (Öffnungszeiten + Adresse) + Google Maps embed + LocalBusiness JSON-LD |
| `galerie.html` | Galerie | 3×3 photo grid with lightbox (click to enlarge, prev/next/close, keyboard support) |
| `saisonkalender.html` | Saisonkalender | Season availability table |
| `rezepte.html` | Rezepte | Dynamic card grid loaded from `content/recipes/index.json` + markdown files |
| `rezept.html` | Rezept | Single recipe template — two-column layout, loaded via `#recipe-id` hash |
| `impressum.html` | Impressum | Legal notice — placeholders, `noindex` |
| `datenschutz.html` | Datenschutzerklärung | Privacy policy — `noindex` |
| `404.html` | 404 | Custom not-found page, served automatically by GitHub Pages |

**Nav order:** Startseite → Über uns → Anfahrt → Galerie → Saisonkalender → Rezepte

---

## File Structure

```
Website-Meierhof/
├── index.html, ueber-uns.html, anfahrt.html, galerie.html
├── saisonkalender.html, rezepte.html, rezept.html
├── impressum.html, datenschutz.html, 404.html
├── sitemap.xml, robots.txt, LICENSE
├── css/
│   ├── styles.css       # tokens, Pico overrides, nav (priority+), footer, banner
│   └── components.css   # hero, slideshow, cards, gallery, lightbox, season grid,
│                        # hours table, anfahrt grid, map embed, recipe layout, print
├── js/
│   ├── nav.js           # priority+ nav, overflow panel, banner close, active state
│   ├── i18n.js          # language loading (default: de), data-i18n, localStorage
│   ├── content.js       # fetches content/*.md, renders via marked.js
│   ├── recipes.js       # builds recipe card grid from index.json + markdown
│   ├── recipe.js        # renders single recipe page from URL hash
│   └── gallery.js       # lightbox for galerie.html
├── i18n/
│   ├── de.json
│   └── en.json
├── content/
│   ├── de/              # hero.md, about.md, shop.md, season.md
│   │   └── recipes/     # spargel-hollandaise.md, erdbeer-tiramisu.md, kuerbissuppe.md,
│   │                    # tomaten-bruschetta.md, apfelkuchen.md, zucchini-fritters.md
│   ├── en/              # (same structure)
│   └── recipes/
│       └── index.json   # [{id, image}, ...] — master recipe list
├── images/
│   └── logo.jpg
└── .github/workflows/
    ├── lint.yml
    └── deploy.yml
```

---

## Design System

```css
:root {
  --color-primary:  #51a026;   /* grass green */
  --color-accent:   #c84b1e;   /* terracotta */
  --color-bg:       #edf5e9;   /* light green background */
  --color-surface:  #fff;
  --color-text:     #111111;
  --color-muted:    #777777;
  --font-heading:   'Playfair Display', Georgia, serif;
  --font-body:      'Inter', system-ui, sans-serif;
  --max-width:      1160px;
  --radius:         8px;
}
```

- All pages have `data-theme="light"` on `<html>` — forces Pico light mode regardless of OS dark mode
- Headings: `color: var(--color-text)` — NOT green
- Footer/dark backgrounds: `color: #fff !important`
- Pico button padding overrides require `!important` (e.g. `.card__btn`, `.nav__lang button`, `.nav__overflow-btn`)

---

## Shared HTML Shell

All pages use this structure. Internal links use **no `.html` extension** (GitHub Pages serves both):

```html
<!DOCTYPE html>
<html lang="de" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Title] — Meierhof Staffort</title>
  <meta name="description" content="...">
  <!-- OG tags -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="...">
  <meta property="og:description" content="...">
  <meta property="og:url" content="https://www.meierhof-staffort.de/...">
  <meta property="og:image" content="https://www.meierhof-staffort.de/images/logo.jpg">
  <meta property="og:locale" content="de_DE">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">
  <link rel="stylesheet" href="css/styles.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="icon" href="images/logo.jpg" type="image/jpeg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;600&display=swap" rel="stylesheet">
  <script src="js/i18n.js" defer></script>
  <script src="js/nav.js" defer></script>
</head>
<body>
  <div class="season-banner">
    <span data-i18n="season.banner">...</span>
    <button type="button" class="season-banner__close" aria-label="Schließen">&times;</button>
  </div>
  <nav class="site-nav">
    <a href="." class="nav__logo"><img src="images/logo.jpg" ...></a>
    <button type="button" class="nav__toggle" ...>&#9776;</button>
    <ul class="nav__links">
      <li><a href="." data-i18n="nav.home">Startseite</a></li>
      <li><a href="ueber-uns" data-i18n="nav.ueber-uns">Über uns</a></li>
      <li><a href="anfahrt" data-i18n="nav.anfahrt">Anfahrt</a></li>
      <li><a href="galerie" data-i18n="nav.galerie">Galerie</a></li>
      <li><a href="saisonkalender" data-i18n="nav.saisonkalender">Saisonkalender</a></li>
      <li><a href="rezepte" data-i18n="nav.rezepte">Rezepte</a></li>
    </ul>
    <div class="nav__lang">
      <button type="button" data-lang-btn="de" data-i18n="nav.lang-de">DE</button>
      <button type="button" data-lang-btn="en" data-i18n="nav.lang-en">EN</button>
    </div>
  </nav>
  <main>...</main>
  <footer class="site-footer">...</footer>
</body>
</html>
```

---

## Key Behaviours & Gotchas

**Nav (priority+ pattern):**
- No hamburger. JS inserts `<button class="nav__overflow-btn">•••</button>` and `<ul class="nav__overflow-panel">` at runtime.
- `ResizeObserver` on `.site-nav` measures available space and hides links that don't fit into the overflow panel.
- Logo hidden below 480px via CSS.
- Nav `top` is set dynamically in JS to `banner.offsetHeight` so it always sticks below the season banner. A `ResizeObserver` on the banner updates this in real time as the banner collapses.
- Active page: `nav.js` reads `window.location.pathname`, strips `.html`, matches against `href` attributes. Home page uses `href="."`.

**Season banner:**
- `position: sticky; top: 0; z-index: 100`. Nav is `sticky; top: [bannerHeight]px; z-index: 90`.
- Close button adds `.is-hidden` → CSS max-height+opacity transition. `ResizeObserver` on banner updates nav top in real time.
- i18n text on inner `<span data-i18n="season.banner">`, not on `.season-banner` div (close button would be overwritten).

**Slideshow (index.html only):**
- `.hero-banner > .slideshow` with 4 slides. Inline `<script>` at bottom of `index.html`.
- Interval: 6000ms. Cross-fade transition: 2.8s. Ken Burns zoom: 4s.

**Recipe system:**
- `content/recipes/index.json` — master list `[{id, image}]`
- `content/de/recipes/<id>.md` / `content/en/recipes/<id>.md` — frontmatter: `title`, `servings`, `time`, `difficulty`, `taste`, `effort` (1–5). Sections: `## Zutaten` / `## Zubereitung` / `## Hinweise`
- `recipes.js` — builds collection page cards dynamically
- `recipe.js` — renders detail page from `window.location.hash` (`rezept#<id>`)
- Two-column card layout: left = ratings (★☆), ingredients, photo; right = stats, directions, notes
- Print: `@page { size: A4 portrait; margin: 10mm }`, photo hidden, tighter layout fits one page
- Adding a recipe: add entry to `index.json` + drop `.md` files in both `de/` and `en/`

**Gallery lightbox:**
- `gallery.js` — click any `.gallery img` to open. Prev/next/close buttons + keyboard (←/→/Esc) + backdrop click.

**i18n:**
- Default: German. `detectLang()` checks localStorage only, falls back to `'de'`.
- `data-i18n="key"` on elements. `langchange` CustomEvent dispatched on switch.
- Both `de.json` and `en.json` must stay in sync.

**Pico CSS overrides needed:**
- `padding !important` on `.card__btn`, `.nav__lang button`, `.nav__overflow-btn` — Pico overrides padding on `<a>` and `<button>` elements
- `data-theme="light"` on `<html>` — prevents dark mode background

**Internal links:** always use relative paths without `.html` extension (e.g. `href="galerie"`). Home uses `href="."`. GitHub Pages serves both `/galerie` and `/galerie.html`.

---

## i18n Keys (summary)

Key namespaces in `de.json` / `en.json`:
- `nav.*` — navigation links
- `season.*` — banner text, available/limited labels
- `footer.*` — contact, address, phone, email, links, social, copyright
- `hero.*` — subtitle
- `angebot.*` — offer section title
- `anfahrt.*` — hours/address headings
- `hours.*` — table rows including values (mofr-value, weekend-value, season-value)
- `month.*` — month names
- `produce.*` — product names
- `card.*` — card descriptions
- `recipe.*` — btn, back, print, notfound keys
- `notfound.*` — 404 page text

---

## SEO

- `sitemap.xml` at root — submit to Google Search Console
- `robots.txt` at root
- Every page has `<meta name="description">` and Open Graph tags
- `index.html` and `anfahrt.html` have LocalBusiness JSON-LD schema (address, coords, phone, hours)
- Impressum and Datenschutz have `<meta name="robots" content="noindex">`
- See `README.md` TODO section for manual SEO tasks (Google Business Profile, directories, etc.)

---

## Still To Do Before Going Live

See `README.md` for the full prioritised TODO list. Key items:
- Fill in Impressum placeholders
- Verify email address
- Add real Facebook URL (currently `href="#"` everywhere)
- Replace all Unsplash placeholder images with real farm photos
- Submit sitemap to Google Search Console after custom domain is set
- Update `sitemap.xml` and all `og:url` tags with final domain
