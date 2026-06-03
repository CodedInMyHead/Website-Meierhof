# Meierhof Staffort — Website

Statische Website für den Meierhof in Stutensee/Staffort, Deutschland.

## Live URL

https://codedinmyhead.github.io/Website-Meierhof

## Lokale Entwicklung

Kein Build-Schritt nötig. Direkt starten:

```bash
npx serve
# Öffnet http://localhost:3000
```

Oder mit Python:

```bash
python3 -m http.server 8080
# Öffnet http://localhost:8080
```

## Inhalte bearbeiten

Längere Texte liegen als Markdown-Dateien in `content/de/` (Deutsch) und `content/en/` (Englisch). Das sind die einzigen Dateien, die ein Redakteur anfassen muss.

So geht's:
1. Datei auf GitHub öffnen (z. B. `content/de/hero.md`)
2. Bleistift-Symbol klicken
3. Text ändern
4. **Commit changes** klicken — die Seite aktualisiert sich automatisch

| Datei | Inhalt |
|---|---|
| `content/de/hero.md` | Startseiten-Hero, Einleitungstext |
| `content/de/about.md` | Hofgeschichte |
| `content/de/shop.md` | Hofladen, Öffnungszeiten, Sortiment |
| `content/de/season.md` | Aktuelle Saisonprodukte |

## Tech Stack

- HTML + [Pico CSS](https://picocss.com/) (CDN) + Vanilla JavaScript
- Kein npm, kein Bundler, kein Build-Schritt
- Deployment via GitHub Actions auf GitHub Pages
