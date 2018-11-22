/**
 * @description 给扒下来的音乐改成自己要的名字
 */

'use strict';

const path = require('path');
const fs = require('fs');

const src = path.resolve(__filename, '../json/');

const dirArr = fs.readdirSync(src);
const arr = [];

const zhuye = [];
const tuiguang = [];
const bj = [];
const sh = [];
const gz = [];
const sz = [];
const cn = [];

for (let i = 0; i < dirArr.length; i += 1) {
  const item = dirArr[i];
  const date = new Date(Number(item.replace('.json', '')));
  if (date.getHours() === 16) {
    const text = fs.readFileSync(path.resolve(src, item), 'utf-8');
    if (text.indexOf('baidu') > -1) {
      try {
        const json = JSON.parse(text);
        arr.push(json);
        if (text.indexOf('"href":"http://qzb.dzkxqd.com/"') > -1) {
          zhuye.push(json);
          if (text.indexOf('CN|') > -1) {
            cn.push(json);
          }
        }
        if (
          text.indexOf('http://qzb.dzkxqd.com/shenhe/index.html') > -1 ||
          text.indexOf('http://qzb.dzkxqd.com/shenhe/') > -1
        ) {
          tuiguang.push(json);
        }
        if (text.indexOf('北京') > -1) {
          bj.push(json);
        }
        if (text.indexOf('上海') > -1) {
          sh.push(json);
        }
        if (text.indexOf('广州') > -1) {
          gz.push(json);
        }
        if (text.indexOf('深圳') > -1) {
          sz.push(json);
        }
      } catch (error) {}
    }
  }
}

console.log('主页', zhuye.length);
console.log('有效国内', cn.length);
console.log('tuiguang', tuiguang.length);
console.log('北京', bj.length);
console.log('上海', sh.length);
console.log('广州', gz.length);
console.log('深圳', sz.length);
console.log('arr', arr.length);

fs.writeFileSync(path.resolve(__filename, '../arr.json'), JSON.stringify(arr));
