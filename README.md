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

---

## TODO — Auffindbarkeit (SEO)

Die folgenden Punkte können **nicht automatisch** erledigt werden und müssen manuell durchgeführt werden:

### Priorität 1 — Lokale Sichtbarkeit (höchste Wirkung)

- [ ] **Google Business Profile anlegen** — https://business.google.com
  Hof eintragen mit Adresse, Telefon, Öffnungszeiten, Fotos und Kategorie „Bauernhof" / „Hofladen".
  Das ist das Wichtigste überhaupt für lokale Suchanfragen wie „Spargel kaufen Stutensee".

- [ ] **Echte Fotos hochladen** — In Google Business Profile und auf der Website.
  Eigene Fotos vom Hof, den Produkten und dem Hofladen. Unsplash-Bilder sind nur Platzhalter.

- [ ] **Bing Places eintragen** — https://www.bingplaces.com (kleinere Reichweite, aber kostenlos)

### Priorität 2 — Regionale Verzeichnisse

- [ ] **Gelbe Seiten** eintragen — https://www.gelbeseiten.de
- [ ] **Das Örtliche** eintragen — https://www.dasoertliche.de
- [ ] **Regionalen Tourismusverband** kontaktieren (z. B. Karlsruhe Tourismus) für einen Eintrag
- [ ] **Slow Food / Bauernmarkt-Verzeichnisse** prüfen ob eine Listung möglich ist

### Priorität 3 — Inhalte & Backlinks

- [ ] **Facebook-URL** im Footer und im Code ersetzen (aktuell `href="#"`)
- [ ] **E-Mail-Adresse verifizieren** — `info@meierhof-staffort.de` muss erreichbar sein
- [ ] **Regelmäßige Inhalte** — saisonale Updates auf Google Business Profile posten (z. B. „Spargelsaison hat begonnen")
- [ ] **Lokale Presse** kontaktieren (BNN, Stutensee-Kurier) für einen Artikel — erzeugt wertvolle Backlinks
- [ ] **Instagram aktiv befüllen** — @meierhof_staffort verlinkt bereits, aber Inhalte sind entscheidend

### Priorität 4 — Google Search Console

- [ ] **Google Search Console** aufrufen — https://search.google.com/search-console
  Domain hinzufügen, Eigentümerschaft bestätigen (HTML-Tag oder DNS-Eintrag).
  Danach `sitemap.xml` einreichen (liegt bereits unter `/sitemap.xml`).
