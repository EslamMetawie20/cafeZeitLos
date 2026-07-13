import fs from 'fs';
import path from 'path';
import https from 'https';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES = [
  { id: "chicken-egg-bowl", photoId: "1546069901-ba9599a7e63c" },
  { id: "fajita-chicken-bowl", photoId: "1512621776951-a57141f2eefd" },
  { id: "crispy-chicken-bowl", photoId: "1543339308-43e59d6b73a6" },
  { id: "asian-salmon-bowl", photoId: "1579871494447-9811cf80d66c" },
  { id: "veggie-omelett-bowl", photoId: "1490645935967-10de6ba17061" },
  { id: "egg-avocado-bowl", photoId: "1525351484163-7529414344d8" },
  { id: "falafel-bowl", photoId: "1599021456807-25db0f974333" },
  { id: "fit-tasty-bagel", photoId: "1511265972828-5ae0081d033e" },
  { id: "protein-royal-bagel", photoId: "1627308595229-7830f5c92f3f" },
  { id: "green-power-bagel", photoId: "1550507992-eb63ffee0224" },
  { id: "crunchy-deluxe-bagel", photoId: "1587314168485-3236d6710814" },
  { id: "smoky-supreme-bagel", photoId: "1509358271058-acd22cc93898" },
  { id: "orient-vegan-bagel", photoId: "1517686469429-8bdb88b9f907" },
  { id: "avocado-stulle", photoId: "1541519227354-08fa5d50c44d" },
  { id: "hot-creamy-champignon-stulle", photoId: "1601314120352-7e04fb91bd5c" },
  { id: "nordlicht-stulle", photoId: "1481070555726-e2fe8357725c" },
  { id: "beef-bacon-stulle", photoId: "1528735602780-2552fd46c7af" },
  { id: "mediterrane-stulle", photoId: "1475090169767-40ed8d18f67d" },
  { id: "gemuese-stulle", photoId: "1496116218417-1a781b1c416c" },
  { id: "french-toast", photoId: "1484723091791-009f52728cb1" },
  { id: "pistachio-vanilla-toast", photoId: "1565299585323-38d6b0865b47" },
  { id: "berry-french-toast", photoId: "1563805042-7684c8a9e9cf" },
  { id: "pancake-platte", photoId: "1554520735-0a6b8b6ce8b7" },
  { id: "pistachio-pancakes", photoId: "1565299585323-38d6b0865b47" },
  { id: "lotus-pancakes", photoId: "1528207776546-365bb710ee93" },
  { id: "hero-lotus-pancakes", photoId: "1528207776546-365bb710ee93" },
  { id: "nutella-pancakes", photoId: "1598373182133-52452f7691ef" },
  { id: "berry-pancakes", photoId: "1506084868230-bb9d95c24759" },
  { id: "caesar-salad", photoId: "1550304943-4f24f54ddde9" },
  { id: "zeitlos-salat", photoId: "1512621776951-a57141f2eefd" },
  { id: "pastrami-burger", photoId: "1568901346375-23c9450c58cd" },
  { id: "chicken-burger", photoId: "1553979459-d2229ba7433b" },
  { id: "falafel-burger", photoId: "1520072959219-c595dc870360" },
  { id: "halloumi-burger", photoId: "1594212691516-75f240bc753d" },
  { id: "falafel-hummus-brot", photoId: "1626082895617-2c6fd1881469" },
  { id: "zaatar-brot", photoId: "1579888944880-d9ab5c6d3330" },
  { id: "orientalisches-brot", photoId: "1589367920969-ab8e050bfc7c" },
  { id: "cheese-brot", photoId: "1627448834925-5e6080be86a0" },
  { id: "pastirma-brot", photoId: "1598514982205-f36b96d1e8d4" },
  { id: "sucuk-brot", photoId: "1601314120352-7e04fb91bd5c" },
  { id: "crispy-chicken-brot", photoId: "1550547660-d9450f859349" },
  { id: "croffle-classic", photoId: "1620921575239-2ce1b166016e" },
  { id: "chocolate-berry-croffle", photoId: "1506084868230-bb9d95c24759" },
  { id: "lotus-crunch-croffle", photoId: "1554520735-0a6b8b6ce8b7" },
  { id: "sweet-flame-croffle", photoId: "1484723091791-009f52728cb1" },
  { id: "pistachio-dream", photoId: "1565299585323-38d6b0865b47" },
  { id: "acai-bowl", photoId: "1590165482129-1b8b27698780" },
  { id: "joghurt-bowl", photoId: "1488477181946-6428a0291777" },
  { id: "tropical-bowl", photoId: "1511690656952-34342bb7c2f2" }
];

const GALLERY_IMAGES = [
  { id: 'gallery-interior', photoId: '1554118811-1e0d58224f24' },
  { id: 'gallery-exterior', photoId: '1559339352-11d035aa65de' },
  { id: 'gallery-food', photoId: '1504670073073-6123e39e0754' },
  { id: 'gallery-coffee', photoId: '1497935586351-b67a49e012bf' },
];

const outDir = path.join(__dirname, '../public/images/menu');
const galleryDir = path.join(__dirname, '../public/images/gallery');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}
if (!fs.existsSync(galleryDir)) {
  fs.mkdirSync(galleryDir, { recursive: true });
}

async function downloadImage(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function processImage(image, dir) {
  const url = `https://images.unsplash.com/photo-${image.photoId}?q=80&w=800&auto=format&fit=crop`;
  const destPath = path.join(dir, `${image.id}.webp`);
  
  try {
    console.log(`Downloading ${image.id}...`);
    const buffer = await downloadImage(url);
    await sharp(buffer)
      .resize(800, 600, { fit: 'cover' })
      .webp({ quality: 80 })
      .toFile(destPath);
    console.log(`Saved ${destPath}`);
  } catch (error) {
    console.error(`Error processing ${image.id}:`, error);
  }
}

async function run() {
  for (const img of IMAGES) {
    await processImage(img, outDir);
  }
  for (const img of GALLERY_IMAGES) {
    await processImage(img, galleryDir);
  }
  
  await processImage({ id: 'hero-main', photoId: '1528207776546-365bb710ee93' }, path.join(__dirname, '../public/images/'));
  
  console.log('All images downloaded successfully.');
}

run();
