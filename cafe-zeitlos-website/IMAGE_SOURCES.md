# Bildquellen / Image Sources

Alle Bilder in der Demo stammen von **Unsplash** (freie Lizenz). Sie wurden automatisch heruntergeladen und auf WebP optimiert.

## Menü-Kategorien & verwendete Autoren

- **Bowls**: Diverse Food-Fotografen (u.a. Anh Nguyen, Anna Pelzer, Eaters Collective, Chad Montano)
- **Bagels**: u.a. Monika Grabkowska, Tomasz Olszewski
- **Stullen (Brote)**: u.a. Wesual Click, Food Photographer
- **French Toast**: u.a. Joseph Gonzalez, Toa Heftiba
- **Pancakes**: u.a. Calum Lewis, Chad Montano
- **Salate**: u.a. Jonathan Borba
- **Burger**: u.a. Amirali Mirhashemian, Eaters Collective
- **Croffles**: u.a. Food Photographer
- **Hero Image**: Chad Montano (Lotus Pancakes)
- **Galerie-Bilder**: Diverse Architektur/Café-Fotografen

## Skripte
- `scripts/download-demo-images.mjs`: Script zum Herunterladen der Bilder via Unsplash-IDs und WebP-Konvertierung (mit Sharp).
- `scripts/validate-images.mjs`: CI/CD Check, der sicherstellt, dass alle Menü-Einträge auf ein valides `.webp`-Bild referenzieren und keine Platzhalter verwendet werden.
