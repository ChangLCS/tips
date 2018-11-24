/**
 * @description 百度统计显示推广页的有效参数
 */

const path = require('path');
const fs = require('fs');

const dateFormatter = require('../../js/dateFormatter');

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

const www = [];

const countJSON = {};

for (let i = 0; i < dirArr.length; i += 1) {
  const item = dirArr[i];
  const date = new Date(Number(item.replace('.json', '')));
  if (
    [6, 7, 8, 9, 10, 11, 12].indexOf(date.getHours()) > -1 &&
    date.getDate() === new Date().getDate()
  ) {
    const text = fs.readFileSync(path.resolve(src, item), 'utf-8');
    if (text.indexOf('baidu') > -1) {
      try {
        const json = JSON.parse(text);
        arr.push(json);

        if (countJSON[json.href]) {
          countJSON[json.href] = Number(countJSON[json.href]) + 1;
        } else {
          countJSON[json.href] = 1;
        }

        if (www.indexOf(json.href) === -1) {
          www.push(json.href);
        }

        if (text.indexOf('"href":"http://qzb.dzkxqd.com/"') > -1) {
          zhuye.push(json);
          // console.log('dateFormatter', dateFormatter.formatter(date, 'YYYY-MM-DD HH:MM:SS'));

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
      } catch (error) {
        console.error(error.message);
      }
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

// console.log('www', JSON.stringify(www));
console.log('www', JSON.stringify(www.length));

console.log('countJSON', countJSON);

const keyValues = Object.entries(countJSON);
for (let i = 0; i < keyValues.length; i += 1) {
  const item = keyValues[i];
  console.log(item[0]);
  console.log(item[1]);
}

console.log('end');

// fs.writeFileSync(path.resolve(__filename, '../arr.json'), JSON.stringify(arr));
