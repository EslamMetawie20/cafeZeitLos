import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const menuFilePath = path.join(__dirname, '../src/data/menu.ts');
const publicDir = path.join(__dirname, '../public');

async function validateImages() {
  console.log('Validating images...');
  
  if (!fs.existsSync(menuFilePath)) {
    console.error('❌ menu.ts not found');
    process.exit(1);
  }

  const menuContent = fs.readFileSync(menuFilePath, 'utf8');
  
  // Extract all image paths from menu.ts
  const imageRegex = /image:\s*['"]([^'"]+)['"]/g;
  let match;
  const imagePaths = [];
  
  while ((match = imageRegex.exec(menuContent)) !== null) {
    imagePaths.push(match[1]);
  }
  
  if (imagePaths.length === 0) {
    console.error('❌ No images found in menu.ts');
    process.exit(1);
  }

  let hasErrors = false;
  const uniqueImages = new Set();
  let placeholderCount = 0;

  for (const imgPath of imagePaths) {
    if (!imgPath) {
      console.error(`❌ Empty image path found for a menu item.`);
      hasErrors = true;
      continue;
    }
    
    uniqueImages.add(imgPath);
    
    if (imgPath.includes('placeholder')) {
      console.error(`❌ Placeholder image used: ${imgPath}`);
      placeholderCount++;
      hasErrors = true;
    }

    const fullPath = path.join(publicDir, imgPath);
    if (!fs.existsSync(fullPath)) {
      console.error(`❌ Image file missing: ${imgPath}`);
      hasErrors = true;
    } else {
      const stats = fs.statSync(fullPath);
      if (stats.size === 0) {
        console.error(`❌ Image file is empty: ${imgPath}`);
        hasErrors = true;
      }
    }
  }

  // Check unique images ratio (heuristics)
  if (uniqueImages.size < imagePaths.length * 0.5) {
    console.error(`❌ Too many duplicate images used. Found only ${uniqueImages.size} unique images for ${imagePaths.length} items.`);
    hasErrors = true;
  }

  // Check Hero Image
  const heroPath = path.join(publicDir, 'images/hero-main.webp');
  if (!fs.existsSync(heroPath)) {
    console.error(`❌ Hero image missing at ${heroPath}`);
    hasErrors = true;
  }

  // Check Gallery Images
  const galleryPaths = [
    '/images/gallery/gallery-interior.webp',
    '/images/gallery/gallery-exterior.webp',
    '/images/gallery/gallery-food.webp',
    '/images/gallery/gallery-coffee.webp'
  ];
  
  for (const gPath of galleryPaths) {
    const fullPath = path.join(publicDir, gPath);
    if (!fs.existsSync(fullPath)) {
      console.error(`❌ Gallery image missing: ${gPath}`);
      hasErrors = true;
    }
  }

  if (hasErrors) {
    console.error('❌ Image validation failed.');
    process.exit(1);
  }

  console.log('✅ Image validation passed! All required images are present, non-empty, and not placeholders.');
}

validateImages();
