import fs from 'fs';
import { menuData } from '../src/data/menu.js';

const dishes = {};
menuData.forEach(item => {
  dishes[item.image] = dishes[item.image] || [];
  dishes[item.image].push(item);
});

Object.keys(dishes).forEach(img => {
  console.log(`Image: ${img}`);
  dishes[img].forEach(item => {
    console.log(`  - [${item.category}] ${item.name} (${item.description})`);
  });
  console.log('');
});
