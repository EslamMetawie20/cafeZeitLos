import { menuData } from '../src/data/menu.js';
const byImage: Record<string, string[]> = {};
menuData.forEach(item => {
  if (!byImage[item.image]) byImage[item.image] = [];
  byImage[item.image].push(item.name);
});
Object.keys(byImage).forEach(img => {
  if (byImage[img].length > 1) {
    console.log(`Duplicate image: ${img}`);
    console.log(`  Used by: ${byImage[img].join(', ')}`);
  }
});
