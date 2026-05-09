# KI-Prompt: Content-JSON für Flamingo Rebuild (Provisioning)

Du recherchierst einen **konkreten Betrieb** und lieferst **eine einzige JSON-Datei**, die beim **Tenant-Provisionieren** (internes CRM → Dialog „Tenant anlegen“) mit dem **Demo-Seed** der gewählten Branche/Stil zusammengeführt wird.

## Vorlage

Nutze die Struktur aus **`docs/rebuild-content-template.json`** im gleichen Repository.

- **Empfohlen (sicher):** `tenantName`, `global.brand`, `global.contact`, optional `global.navigation`.
- **Optional:** `industryKey` / `styleKey` im JSON — im CRM-Dialog werden Branche/Stil ohnehin gesetzt; nutze die Felder nur, wenn sie mit dem Dialog übereinstimmen sollen.
- **`pages` / `collections`:** Nur ausfüllen, wenn du die **exakte** Struktur der `SiteSeed`-Seiten und Collection-Items für diese Branche einhältst (Section-Keys, IDs, Referenzen). Sonst **`null`** weglassen bzw. die Schlüssel ganz weglassen. Fehler führen zu Validierungsfehlern beim Speichern.

Alle Schlüssel, die mit **`_`** beginnen (z. B. `_readme`, `_workflow`), sind **Metadaten**. Sie können in der Arbeitshilfe bleiben — der Server **entfernt** sie beim Import automatisch. In der finalen Ausgabe darfst du sie auch weglassen.

## Recherche

Prüfe Website, Google Maps, Social, Branchenportale. **Keine erfundenen Fakten:** fehlende Öffnungszeiten, Awards, Teamgrößen, Zitate → Felder **leer lassen**.

## Sprache

- Deutsch (AT/DE je nach Betrieb).
- Texte aus **Sicht des Betriebs** („wir“, „unser“, „bei uns“), nicht Agentur-Sicht.
- Vermeide leere Marketing-Floskeln („maßgeschneiderte Lösungen“, „Ihr Partner für …“, „hochwertige Qualität“).

## Bilder

Demo-Seeds enthalten Platzhalterbilder. Wenn du **keine verifizierbare Bild-URL** hast: **keine** neuen Bild-URLs erfinden. Für einen **minimalen Patch** (nur `global`) bleiben die Demo-Bilder der Startseite erhalten, bis der Kunde im Admin eigene Medien setzt.

## Ausgabe

- **Nur gültiges JSON**, keine Markdown-Umschließung, keine Erklärung danach.
- Keine trailing Kommentare außerhalb von JSON.
