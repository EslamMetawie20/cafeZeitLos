import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const brainDir = '/Users/mac/.gemini/antigravity/brain/8153bc53-1344-4b23-a7ff-bb25cd690bc8/';
const outDir = path.resolve('public/images/menu');

const files = fs.readdirSync(brainDir).filter(f => f.endsWith('.jpg'));

for (const file of files) {
  const baseName = file.replace(/_[0-9]+\.jpg$/, '').replace(/_/g, '-');
  const src = path.join(brainDir, file);
  const dest = path.join(outDir, `${baseName}.webp`);
  
  console.log(`Processing ${baseName}...`);
  sharp(src)
    .resize(800, 600, { fit: 'cover' })
    .webp({ quality: 80 })
    .toFile(dest)
    .then(() => console.log(`  Saved ${dest}`))
    .catch(err => console.error(`  Error processing ${file}:`, err));
}
