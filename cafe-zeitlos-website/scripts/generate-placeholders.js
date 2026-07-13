import fs from 'fs';
import path from 'path';

// Wir nutzen die gleichen IDs wie im menu.ts
const items = [
  { id: 'chicken-egg-bowl', name: 'Chicken & Egg Bowl' },
  { id: 'fajita-chicken-bowl', name: 'Fajita Chicken Bowl' },
  { id: 'crispy-chicken-bowl', name: 'Crispy Chicken Bowl' },
  { id: 'asian-salmon-bowl', name: 'Asian Salmon Bowl' },
  { id: 'veggie-omelett-bowl', name: 'Veggie Omelett Bowl' },
  { id: 'egg-avocado-bowl', name: 'Egg & Avocado Bowl' },
  { id: 'falafel-bowl', name: 'Falafel Bowl' },
  { id: 'fit-tasty-bagel', name: 'Fit & Tasty Bagel' },
  { id: 'protein-royal-bagel', name: 'Protein Royal Bagel' },
  { id: 'green-power-bagel', name: 'Green Power Bagel' },
  { id: 'crunchy-deluxe-bagel', name: 'Crunchy Deluxe Bagel' },
  { id: 'smoky-supreme-bagel', name: 'Smoky Supreme Bagel' },
  { id: 'orient-vegan-bagel', name: 'Orient Vegan Bagel' },
  { id: 'avocado-stulle', name: 'Avocado Stulle' },
  { id: 'hot-creamy-champignon-stulle', name: 'Hot & Creamy Champignon Stulle' },
  { id: 'nordlicht-stulle', name: 'Nordlicht Stulle' },
  { id: 'beef-bacon-stulle', name: 'Beef Bacon Stulle' },
  { id: 'mediterrane-stulle', name: 'Mediterrane Stulle' },
  { id: 'gemuese-stulle', name: 'Gemüse Stulle' },
  { id: 'french-toast', name: 'French Toast' },
  { id: 'pistachio-vanilla-toast', name: 'Pistachio Vanilla Toast' },
  { id: 'berry-french-toast', name: 'Berry French Toast' },
  { id: 'pancake-platte', name: 'Pancake Platte' },
  { id: 'pistachio-pancakes', name: 'Pistachio Pancakes' },
  { id: 'lotus-pancakes', name: 'Lotus Pancakes' },
  { id: 'nutella-pancakes', name: 'Nutella Pancakes' },
  { id: 'berry-pancakes', name: 'Berry Pancakes' },
  { id: 'caesar-salad', name: 'Caesar Salad' },
  { id: 'zeitlos-salat', name: 'Zeitlos Salat' },
  { id: 'pastrami-burger', name: 'Pastrami Burger' },
  { id: 'chicken-burger', name: 'Chicken Burger' },
  { id: 'falafel-burger', name: 'Falafel Burger' },
  { id: 'halloumi-burger', name: 'Halloumi Burger' },
  { id: 'falafel-hummus-brot', name: 'Falafel & Hummus Brot' },
  { id: 'zaatar-brot', name: 'Zaatar Brot' },
  { id: 'orientalisches-brot', name: 'Orientalisches Brot' },
  { id: 'cheese-brot', name: 'Cheese Brot' },
  { id: 'pastirma-brot', name: 'Pastirma Brot' },
  { id: 'sucuk-brot', name: 'Sucuk Brot' },
  { id: 'crispy-chicken-brot', name: 'Crispy Chicken Brot' },
  { id: 'croffle-classic', name: 'Croffle Classic' },
  { id: 'chocolate-berry-croffle', name: 'Chocolate Berry Croffle' },
  { id: 'lotus-crunch-croffle', name: 'Lotus Crunch Croffle' },
  { id: 'sweet-flame-croffle', name: 'Sweet Flame Croffle' },
  { id: 'pistachio-dream', name: 'Pistachio Dream' },
  { id: 'acai-bowl', name: 'Açaí Bowl' },
  { id: 'joghurt-bowl', name: 'Joghurt Bowl' },
  { id: 'tropical-bowl', name: 'Tropical Bowl' },
  // Additional placeholders for gallery, hero, etc.
  { id: 'hero-lotus-pancakes', name: 'Lotus Pancakes (Hero)' },
  { id: 'gallery-interior', name: 'Innenraum' },
  { id: 'gallery-exterior', name: 'Außenansicht' },
  { id: 'gallery-coffee', name: 'Kaffee' },
  { id: 'gallery-detail', name: 'Detail Einrichtung' }
];

const colors = ['#EDE2D2', '#F7F2EA', '#C3A36A', '#A86445', '#74745C'];

items.forEach((item, index) => {
  const color = colors[index % colors.length];
  const textColor = (color === '#A86445' || color === '#74745C') ? '#F7F2EA' : '#2A211B';
  
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
  <rect width="1200" height="900" fill="${color}" />
  <text x="600" y="420" font-family="'Cormorant Garamond', serif" font-size="64" font-weight="600" fill="${textColor}" text-anchor="middle">${item.name.replace(/&/g, '&amp;')}</text>
  <text x="600" y="500" font-family="'Manrope', sans-serif" font-size="28" font-weight="400" fill="${textColor}" text-anchor="middle" opacity="0.8">Originalfoto einsetzen</text>
</svg>`;

  let folder = 'placeholders';
  if (item.id.startsWith('gallery-')) folder = 'gallery';

  const outputPath = path.join(process.cwd(), 'public', 'images', folder, `${item.id}.svg`);
  fs.writeFileSync(outputPath, svg);
});

console.log('Placeholders generated successfully.');
