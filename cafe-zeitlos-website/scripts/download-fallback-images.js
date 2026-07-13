import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const items = [
  { id: 'berry-french-toast', keywords: 'frenchtoast,berries,food' },
  { id: 'berry-pancakes', keywords: 'pancakes,berries,food' },
  { id: 'chocolate-berry-croffle', keywords: 'waffle,chocolate,berries' },
  { id: 'croffle-classic', keywords: 'waffle,pastry,food' },
  { id: 'french-toast', keywords: 'frenchtoast,maplesyrup,food' },
  { id: 'pistachio-dream', keywords: 'waffle,pistachio,food' },
  { id: 'pistachio-vanilla-toast', keywords: 'frenchtoast,pistachio,food' },
  { id: 'sweet-flame-croffle', keywords: 'waffle,marshmallow,food' },
  { id: 'lotus-crunch-croffle', keywords: 'waffle,caramel,food' },
  { id: 'avocado-stulle', keywords: 'avocadotoast,egg,food' },
  { id: 'beef-bacon-stulle', keywords: 'sandwich,bacon,food' },
  { id: 'gemuese-stulle', keywords: 'sandwich,vegetables,food' },
  { id: 'nordlicht-stulle', keywords: 'sandwich,salmon,food' },
  { id: 'mediterrane-stulle', keywords: 'sandwich,feta,food' }
];

const outDir = path.resolve('public/images/menu');

async function downloadImage(url) {
  const response = await fetch(url, { redirect: 'follow' });
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function run() {
  for (const item of items) {
    const destPath = path.join(outDir, `${item.id}.webp`);
    // Avoid caching by appending random param
    const url = `https://loremflickr.com/800/600/${item.keywords}?random=${Math.floor(Math.random() * 10000)}`;
    try {
      console.log(`Downloading ${item.id}...`);
      const buffer = await downloadImage(url);
      await sharp(buffer)
        .resize(800, 600, { fit: 'cover' })
        .webp({ quality: 80 })
        .toFile(destPath);
      console.log(`  Saved ${destPath}`);
    } catch (error) {
      console.error(`  Error processing ${item.id}:`, error);
    }
  }
}

run();
