import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES = [
  "chicken-egg-bowl", "fajita-chicken-bowl", "crispy-chicken-bowl", "asian-salmon-bowl",
  "veggie-omelett-bowl", "egg-avocado-bowl", "falafel-bowl", "fit-tasty-bagel", "protein-royal-bagel",
  "green-power-bagel", "crunchy-deluxe-bagel", "smoky-supreme-bagel", "orient-vegan-bagel",
  "avocado-stulle", "hot-creamy-champignon-stulle", "nordlicht-stulle", "beef-bacon-stulle",
  "mediterrane-stulle", "gemuese-stulle", "french-toast", "pistachio-vanilla-toast", "berry-french-toast",
  "pancake-platte", "pistachio-pancakes", "lotus-pancakes", "hero-lotus-pancakes", "nutella-pancakes",
  "berry-pancakes", "caesar-salad", "zeitlos-salat", "pastrami-burger", "chicken-burger", "falafel-burger",
  "halloumi-burger", "falafel-hummus-brot", "zaatar-brot", "orientalisches-brot", "cheese-brot",
  "pastirma-brot", "sucuk-brot", "crispy-chicken-brot", "croffle-classic", "chocolate-berry-croffle",
  "lotus-crunch-croffle", "sweet-flame-croffle", "pistachio-dream", "acai-bowl", "joghurt-bowl", "tropical-bowl"
];

const fallbackIds = {
  sweet: '1506084868230-bb9d95c24759', // berry pancakes
  savory: '1541519227354-08fa5d50c44d', // avocado stulle
  burger: '1568901346375-23c9450c58cd' // burger
};

async function downloadImage(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function fix() {
  const dir = path.join(__dirname, '../public/images/menu');
  for (const id of IMAGES) {
    const p = path.join(dir, `${id}.webp`);
    if (!fs.existsSync(p)) {
      let type = 'savory';
      if (id.includes('pancake') || id.includes('croffle') || id.includes('toast') || id.includes('dream')) type = 'sweet';
      if (id.includes('burger')) type = 'burger';
      
      const photoId = fallbackIds[type];
      const url = `https://images.unsplash.com/photo-${photoId}?q=80&w=800&auto=format&fit=crop`;
      
      console.log(`Fixing ${id} with fallback ${photoId}...`);
      try {
        const buffer = await downloadImage(url);
        await sharp(buffer).resize(800, 600, { fit: 'cover' }).webp({ quality: 80 }).toFile(p);
        console.log(`Saved ${p}`);
      } catch (e) {
        console.error(`Failed to fix ${id}:`, e.message);
      }
    }
  }
}

fix();
