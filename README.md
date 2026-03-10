# CO2 Transparency

## Projektbeschreibung
CO2 Transparency ist ein Webprojekt mit HTML, CSS, JavaScript und Bootstrap.
Die Webseite zeigt eine Tabelle mit fiktiven CO2-Emissionsdaten pro Land und Unternehmen.
Die Anwendung ist responsiv, übersichtlich aufgebaut und für Lernzwecke gedacht.

## Funktionen
- **Globale Navigation im Header:** Links zu Daten (Start), Info, Rechtliches, Datenschutz, Impressum.
- **Lokales Menü mit Sprungmarken:** Je Seite gibt es lokale Links (z. B. Filter/Tabelle/Methode), die innerhalb der Seite zu Abschnitten springen.
- **Schriftkultur / Layout-Umschaltung:** Das lokale Menü kann über einen Button im Header **links oder rechts** angezeigt werden (nur Layout, keine Text-Richtungsänderung).
- **CO2-Tabelle (Startseite):**
  - Filtern nach **Land** und **Unternehmen**
  - Sortieren über Klick auf die Tabellenkopf-Buttons
  - **Einträge pro Seite** auswählbar (Pagination) + Weiter/Zurück
  - Insgesamt **40 fiktive Datensätze** (10 + 30 zusätzliche)

## Verwendete Technologien
- HTML5
- CSS3
- JavaScript (Vanilla)
- Bootstrap 5

## Projektstruktur
**Seiten**
- `index.html` – Startseite mit Filter, Tabelle, Pagination
- `info.html` – Erklärung zur Website (Funktionen, Daten, Speicherung, Sicherheit)
- `rechtliches.html` – Rechtliche Hinweise (Abschnitte mit Sprungmarken)
- `datenschutz.html` – Datenschutzerklärung (Demo, mit Abschnitten)
- `impressum.html` – Impressum (Demo)

**Assets**
- `assets/css/styles.css` – Styles (Sticky Footer, Sticky lokales Menü, Layout-Switch links/rechts)
- `assets/js/common.js` – Umschaltung & Speicherung der Menüposition (links/rechts)
- `assets/js/layout.js` – Lädt die Partials (Header, lokales Menü, Footer) und befüllt lokale Links je Seite
- `assets/js/table.js` – Filter/Sortierung/Pagination + sicheres Rendering der Tabelle (nur auf `index.html`)

**Partials**
- `partials/header.html` – Header mit Titel/Logo + globaler Navigation + Button (Menü links/rechts)
- `partials/menu.html` – Lokales Menü (wird per JS mit lokalen Links befüllt)
- `partials/footer.html` – Footer mit rechtlichen Links

## Sicherheit (XSS-Schutz)
- Tabellenzeilen werden sicher über DOM-Methoden erzeugt (`createElement`) und Inhalte per `textContent` gesetzt.
- Filtereingaben werden zusätzlich vereinfacht/bereinigt (Whitelist + Längenlimit).
- Dadurch wird verhindert, dass injizierter Code (z. B. `<script>...</script>`) ausgeführt wird.

## Projekt starten (lokal)
Da Header/Menu/Footer per `fetch()` als Partials geladen werden, sollte das Projekt über einen lokalen Webserver gestartet werden.

**Variante A: VS Code**
- Extension **Live Server**
- `index.html` öffnen → “Open with Live Server”

**Variante B: Python**
Im Projektordner:
```bash
python -m http.server 8000

## Lizenz
Dieses Projekt steht unter der **MIT License** – siehe Datei `LICENSE`.