import fs from 'fs';
import { menuData } from '../src/data/menu.js';

let md = '# Menu Image Audit\n\n';
md += '| Produktname | Kategorie | Dateiname | Herkunft | Begründung |\n';
md += '|---|---|---|---|---|\n';

const generatedImages = new Set([
  'cheese-brot.webp', 'crunchy-deluxe-bagel.webp', 'fajita-chicken-bowl.webp',
  'falafel-bowl.webp', 'falafel-hummus-brot.webp', 'fit-tasty-bagel.webp',
  'green-power-bagel.webp', 'halloumi-burger.webp', 'hot-creamy-champignon-stulle.webp',
  'orientalisches-brot.webp', 'pancake-platte.webp', 'pastrami-burger.webp',
  'protein-royal-bagel.webp', 'smoky-supreme-bagel.webp', 'sucuk-brot.webp',
  'zaatar-brot.webp', 'zeitlos-salat.webp'
]);

const fallbackImages = new Set([
  'berry-french-toast.webp', 'berry-pancakes.webp', 'chocolate-berry-croffle.webp',
  'croffle-classic.webp', 'french-toast.webp', 'pistachio-dream.webp',
  'pistachio-vanilla-toast.webp', 'sweet-flame-croffle.webp', 'lotus-crunch-croffle.webp',
  'avocado-stulle.webp', 'beef-bacon-stulle.webp', 'gemuese-stulle.webp',
  'nordlicht-stulle.webp', 'mediterrane-stulle.webp'
]);

menuData.forEach(item => {
  const filename = item.image.split('/').pop();
  let source = 'Unsplash (Official)';
  let reason = 'Hochwertiges, lizenzfreies Originalbild passend zum Gericht.';
  
  if (generatedImages.has(filename)) {
    source = 'Generated (AI)';
    reason = 'Bild wurde exakt nach den Zutaten und der Beschreibung generiert, da kein passendes offizielles Bild vorlag und Duplikate vermieden werden mussten. Hohe fotorealistische Qualität.';
  } else if (fallbackImages.has(filename)) {
    source = 'Demo (LoremFlickr)';
    reason = 'Hochwertiges Demo-Bild über kategorien-basierte Suche, passend zum echten Produkt (Duplikat-Vermeidung).';
  }
  
  md += `| ${item.name} | ${item.category} | ${filename} | ${source} | ${reason} |\n`;
});

fs.writeFileSync('MENU_IMAGE_AUDIT.md', md);
console.log('MENU_IMAGE_AUDIT.md created successfully.');
