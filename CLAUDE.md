# Meierhof Staffort — Website Project

## What this project is

A modern static website for Meierhof Staffort, a 4-generation family farm in Stutensee/Staffort, Germany. Purely informational — no backend, no cart, no build step required.

**Live URL:** GitHub Pages — `https://codedinmyhead.github.io/Website-Meierhof` (once deployed)
**Repo:** `https://github.com/CodedInMyHead/Website-Meierhof`

---

## Tech Stack

- **HTML + Pico CSS (CDN) + vanilla JS** — no npm, no bundler, no build step
- **Pico CSS CDN:** `https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css`
- **Deployment:** GitHub Pages only, via `actions/deploy-pages` (pushes to `main` auto-deploy)
- **CI:** `lint.yml` runs html-validate + stylelint on every push/PR; `deploy.yml` deploys on merge to `main`
- **Dev server:** `npx serve` (opens http://localhost:3000)

---

## Farm Details (real content)

- **Farm name:** Meierhof Staffort
- **Address:** Im Gewann Herrenäcker, 76297 Stutensee, Stadtteil Staffort
- **Phone:** 07249 / 951793
- **WhatsApp:** `https://wa.me/497249951793`
- **Email:** info@meierhof-staffort.de _(verify before going live)_
- **Opening hours:** Mo–Fr 9–18 Uhr, Sa/So/Feiertage 9–15 Uhr (April–Juni)
- **Legal owner (Impressum):** Hans-Peter Poehnitzsch, Büchenauerstrasse 11, 76297 Stutensee
- **Logo:** `images/logo.jpg` (180×105px) — real logo, replaced 2026-06-02
- **Instagram:** `https://www.instagram.com/meierhof_staffort`
- **Facebook:** `href="#"` placeholder — real URL not yet known

---

## Pages

| File | Title | Notes |
|---|---|---|
| `index.html` | Startseite | Slideshow + hero text + shop content + 3 cards |
| `ueber-uns.html` | Über uns | Markdown content from `content/*/about.md` |
| `anfahrt.html` | Anfahrt | Two-column grid (Öffnungszeiten + Adresse) + OSM map |
| `galerie.html` | Galerie | 3×3 photo grid |
| `saisonkalender.html` | Saisonkalender | Season table |
| `rezepte.html` | Rezepte | 3 recipe cards |
| `impressum.html` | Impressum | Legal notice |
| `datenschutz.html` | Datenschutzerklärung | Privacy policy |

**Nav order (all pages):** Startseite → Über uns → Anfahrt → Galerie → Saisonkalender → Rezepte

---

## File Structure

```
Website-Meierhof/
├── index.html, ueber-uns.html, anfahrt.html, galerie.html
├── saisonkalender.html, rezepte.html, impressum.html, datenschutz.html
├── css/
│   ├── styles.css       # design tokens, Pico overrides, nav, footer, banner
│   └── components.css   # hero, slideshow, cards, gallery, season grid, hours table, anfahrt grid
├── js/
│   ├── nav.js           # hamburger toggle, sticky nav, season banner close, active state
│   ├── i18n.js          # language loading (default: de), data-i18n replacement, localStorage
│   └── content.js       # fetches content/*.md, converts via marked.js CDN
├── i18n/
│   ├── de.json          # German translations
│   └── en.json          # English translations
├── content/
│   ├── de/              # hero.md, about.md, shop.md, season.md
│   └── en/              # hero.md, about.md, shop.md, season.md
├── images/
│   └── logo.jpg         # real logo, 180×105px
└── .github/workflows/
    ├── lint.yml
    └── deploy.yml
```

---

## Design System

```css
:root {
  --color-primary:  #51a026;   /* grass green (Dannwisch-inspired) */
  --color-accent:   #c84b1e;   /* terracotta orange-red */
  --color-bg:       #edf5e9;   /* light green-tinted background */
  --color-surface:  #ffffff;
  --color-text:     #111111;
  --color-muted:    #777777;
  --font-heading:   'Playfair Display', Georgia, serif;
  --font-body:      'Inter', system-ui, sans-serif;
  --max-width:      1160px;
  --radius:         8px;
}
```

- Headings use `color: var(--color-text)` — NOT green
- Dark backgrounds (footer, CTA) get `color: #fff !important` on text
- Pico's `td` border color is overridden globally to `#e0e8e0 !important`
- No `span` in global color rule (would override season-banner which uses `<span>`)
- `.season-banner` uses `<span data-i18n="...">` inside so i18n doesn't overwrite the close button

---

## Shared HTML Shell

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Seitentitel] — Meierhof Staffort</title>
  <meta name="description" content="...">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">
  <link rel="stylesheet" href="css/styles.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="icon" href="favicon.ico">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;600&display=swap" rel="stylesheet">
  <script src="js/i18n.js" defer></script>
  <script src="js/nav.js" defer></script>
</head>
<body>
  <div class="season-banner"><span data-i18n="season.banner">Spargelsaison läuft! ...</span><button class="season-banner__close" aria-label="Schließen">&times;</button></div>
  <nav class="site-nav">
    <a href="index.html" class="nav__logo"><img src="images/logo.jpg" alt="Meierhof Staffort Logo" width="180" height="105"></a>
    <button class="nav__toggle" aria-label="Menü öffnen" aria-expanded="false">&#9776;</button>
    <ul class="nav__links">
      <li><a href="index.html" data-i18n="nav.home">Startseite</a></li>
      <li><a href="ueber-uns.html" data-i18n="nav.ueber-uns">Über uns</a></li>
      <li><a href="anfahrt.html" data-i18n="nav.anfahrt">Anfahrt</a></li>
      <li><a href="galerie.html" data-i18n="nav.galerie">Galerie</a></li>
      <li><a href="saisonkalender.html" data-i18n="nav.saisonkalender">Saisonkalender</a></li>
      <li><a href="rezepte.html" data-i18n="nav.rezepte">Rezepte</a></li>
    </ul>
    <div class="nav__lang">
      <button data-lang-btn="de" data-i18n="nav.lang-de">DE</button>
      <button data-lang-btn="en" data-i18n="nav.lang-en">EN</button>
    </div>
  </nav>
  <main>...</main>
  <footer class="site-footer">
    <div class="footer__grid">
      <div class="footer__col">
        <strong data-i18n="footer.contact">Kontakt</strong>
        <address data-i18n="footer.address">...</address>
        <a href="tel:+497249951793" data-i18n="footer.phone">...</a>
        <a href="mailto:info@meierhof-staffort.de" data-i18n="footer.email">...</a>
      </div>
      <div class="footer__col">
        <strong data-i18n="footer.links">Links</strong>
        <ul>
          <li><a href="impressum.html" data-i18n="nav.impressum">Impressum</a></li>
          <li><a href="datenschutz.html" data-i18n="nav.datenschutz">Datenschutz</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <strong data-i18n="footer.social">Social Media</strong>
        <div class="footer__social">
          <a href="https://www.instagram.com/meierhof_staffort" aria-label="Instagram" target="_blank" rel="noopener">Instagram</a>
          <a href="#" aria-label="Facebook">Facebook</a>
          <a href="https://wa.me/497249951793" aria-label="WhatsApp">WhatsApp</a>
        </div>
      </div>
    </div>
    <p class="footer__copy" data-i18n="footer.copyright">© 2025 Meierhof Staffort. Alle Rechte vorbehalten.</p>
  </footer>
</body>
</html>
```

---

## Key Behaviours & Gotchas

- **Season banner:** `position: sticky; top: 0` — scrolls with page initially, then sticks. Nav also `sticky; top: 0` — stacks below banner automatically.
- **Season banner close:** adds class `is-hidden` → CSS transition fades it out (max-height + opacity). JS is in `nav.js`.
- **i18n default:** always German. Browser language detection removed. localStorage preference persists.
- **Nav hamburger on mobile:** logo hidden (`display: none`), toggle visible. Dropdown uses `max-height`/`opacity` transition (not `display: none`) for fade in/out.
- **Hero (index only):** Slideshow (`div.hero-banner > div.slideshow`) with 4 slides, Ken Burns zoom, 3s interval. JS inline at bottom of `index.html`.
- **Anfahrt layout:** `.anfahrt-grid` — 2 columns desktop, 1 column mobile (≤640px). Map iframe always full-width below.
- **Footer headings:** use `color: #fff !important` — overrides global `h1,h2,h3 { color: var(--color-text) }`.
- **`main { padding-top: 0 }`** — overrides Pico's 16px default so hero-banner sits flush under nav.
- **No `span` in global text color rule** — would break season-banner text.
- **Pico border override:** `td, th { border-color: #e0e8e0 !important }` kills black table borders.

---

## i18n System

- Default language: German (no browser detection — `detectLang()` only checks localStorage, falls back to `'de'`)
- All visible text: `data-i18n="key"` on the element
- Season banner text: `data-i18n` on inner `<span>`, not on the `.season-banner` div itself
- Keys in both `i18n/de.json` and `i18n/en.json` must stay in sync

---

## Content Editing (non-technical)

Edit Markdown files directly on GitHub (pencil icon → commit):

| File | Controls |
|---|---|
| `content/de/hero.md` | Homepage heading + intro |
| `content/de/about.md` | Über uns text (no family name — removed) |
| `content/de/shop.md` | Hofladen text on Startseite |

---

## Still To Do Before Going Live

- [ ] Add `favicon.ico` (16×16 or 32×32, farm green `#51a026`)
- [ ] Verify `info@meierhof-staffort.de` is a working address
- [ ] Fill in real Facebook URL in every page's footer (currently `href="#"`)
