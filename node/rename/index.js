/**
 * @description 给扒下来的音乐改成自己要的名字(QQ音乐)
 */

'use strict';

const path = require('path');
const fs = require('fs');

const src = path.resolve(__filename, '../lib/');

const arr = fs.readdirSync(src);
const reg = new RegExp(/(.*)-(.*).mp3/);

console.log('arr', arr);
for (let i = 0; i < arr.length; i += 1) {
  const item = arr[i];
  // if (!reg.test(item)) {
  const str = item.replace(/…|在播放|正在播放|…正在播|放\s|…正/g, '');
  const res = str.replace(reg, '$2 -$1.mp3');
  fs.renameSync(path.resolve(src, item), path.resolve(src, res));
  // }
}
const list = fs.readdirSync(src);
console.log('list', JSON.stringify(list));
