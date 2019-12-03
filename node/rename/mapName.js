/**
 * @description 修改地图json名称
 */

const path = require('path');
const fs = require('fs');

const src = path.resolve(__dirname, '../../lib/geo/fullcode');

const arr = fs.readdirSync(src);
const reg = new RegExp(/(\d+)_.*\.([^.]*)/);

console.log('arr', arr);
for (let i = 0; i < arr.length; i += 1) {
  const item = arr[i];
  const res = item.replace(reg, '$1.$2');
  console.log('res', res);
  fs.renameSync(path.resolve(src, item), path.resolve(src, res));
}

const list = fs.readdirSync(src);
console.log('list', JSON.stringify(list));
