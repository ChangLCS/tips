const fs = require('fs');
const path = require('path');

const baseUrl = path.resolve('/我的电视电影');
const arr = fs.readdirSync(baseUrl);
console.log('baseUrl', baseUrl);
console.log('arr', arr);

for (let i = 0; i < arr.length; i += 1) {
  const item = arr[i];
  const name = item.replace(/([^.]*).*/, '$1');
  console.log('name', name);
  const dir = path.resolve(baseUrl, name);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    fs.renameSync(path.resolve(baseUrl, item), path.resolve(dir, item));
  }
}
