const fs = require('fs');
const content = fs.readFileSync('src/data/menu.ts', 'utf8');
const items = [];
const regex = /id:\s*'([^']+)'[\s\S]*?name:\s*'([^']+)'[\s\S]*?category:\s*'([^']+)'[\s\S]*?image:\s*'([^']+)'/g;
let match;
while ((match = regex.exec(content)) !== null) {
  items.push({ id: match[1], name: match[2], category: match[3], image: match[4] });
}
const byImage = {};
items.forEach(item => {
  if (!byImage[item.image]) byImage[item.image] = [];
  byImage[item.image].push(item.name);
});
Object.keys(byImage).forEach(img => {
  if (byImage[img].length > 1) {
    console.log(`Duplicate image: ${img}`);
    console.log(`  Used by: ${byImage[img].join(', ')}`);
  }
});
