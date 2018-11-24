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

const inArr = []; //  进入主页
const showArr = []; //  显示推广
const shenheArr = []; //  审核

const baiduMobileArr = []; //  百度手机app

const countJSON = {};

for (let i = 0; i < dirArr.length; i += 1) {
  const item = dirArr[i];
  const date = new Date(Number(item.replace('.json', '')));
  if ([15].indexOf(date.getHours()) > -1 && date.getDate() === new Date().getDate()) {
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

        if (text.indexOf('主页') > -1) {
          inArr.push(json);

          if (
            text.indexOf('baidu') > -1 &&
            (text.indexOf('Android') > -1 ||
              text.indexOf('iPhone') > -1 ||
              text.indexOf('iPad') > -1)
          ) {
            baiduMobileArr.push(json);
          }
        }

        if (text.indexOf('推广') > -1) {
          showArr.push(json);
        }

        if (text.indexOf('审核') > -1) {
          shenheArr.push(json);

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
        }

        // if (text.indexOf('"href":"http://qzb.dzkxqd.com/"') > -1) {
        //   zhuye.push(json);
        //   // console.log('dateFormatter', dateFormatter.formatter(date, 'YYYY-MM-DD HH:MM:SS'));

        //   if (text.indexOf('CN|') > -1) {
        //     cn.push(json);
        //   }
        // }
        // if (
        //   text.indexOf('http://qzb.dzkxqd.com/shenhe/index.html') > -1 ||
        //   text.indexOf('http://qzb.dzkxqd.com/shenhe/') > -1
        // ) {
        //   tuiguang.push(json);
        // }
      } catch (error) {
        console.error(error.message);
      }
    }
  }
}

console.log('主页', inArr.length);
console.log('用百度app进入的有效主页', baiduMobileArr.length);

console.log('推广', showArr.length);
console.log('审核', shenheArr.length);
console.log('北京', bj.length);
console.log('上海', sh.length);
console.log('广州', gz.length);
console.log('深圳', sz.length);
console.log('arr', arr.length);

// console.log('www', JSON.stringify(www));
console.log('www', JSON.stringify(www.length));

console.log('countJSON', countJSON);

// const keyValues = Object.entries(countJSON);
// for (let i = 0; i < keyValues.length; i += 1) {
//   const item = keyValues[i];
//   console.log(item[0]);
//   console.log(item[1]);
// }

fs.writeFileSync(path.resolve(__filename, '../arr.json'), JSON.stringify(arr));
