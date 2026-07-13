import { menuData } from '../src/data/menu.js';
const categories = new Set(menuData.map(item => item.category));
console.log("Categories:", [...categories]);
menuData.slice(0, 10).forEach(item => console.log(`${item.id} - ${item.name} - ${item.price}`));
