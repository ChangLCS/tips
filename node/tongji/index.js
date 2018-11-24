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
  if ([6, 7, 8, 9].indexOf(date.getHours()) > -1 && date.getDate() === new Date().getDate()) {
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

const arrivalRate = (100 * showArr.length) / baiduMobileArr.length;
const bsgsRate = (100 * (bj.length + sh.length + gz.length + sz.length)) / baiduMobileArr.length;

const nowDate = dateFormatter.formatter(new Date(), 'yyyy-mm-dd hh:mm:ss.mmm', '-', 'T', '.');

const ret = {
  到达推广页的概率: `${arrivalRate}%`,
  北上广深的占比: `${bsgsRate}%`,
  审核页的占比: `${(100 * shenheArr.length) / baiduMobileArr.length}%`,
  网络原因或者用户自己关闭没法到达: `${100 - arrivalRate - bsgsRate}%`,
  time: nowDate,
  主页: inArr.length,
  用百度app进入的有效主页: baiduMobileArr.length,
  推广: showArr.length,
  审核: shenheArr.length,
  北京: bj.length,
  上海: sh.length,
  广州: gz.length,
  深圳: sz.length,
  arr: arr.length,
  www: www,
  countJSON: countJSON,
};

/**
 * 文件夹在命名的时候不能包含下列字符：
 * 【\ 】【 / 】 ：这两个符号代表路径，如果文件夹（目录）中也包含这些的话，地址会混淆不清，无法区分
 * 【: 】：英文的冒号是访问协议和传输的符号，会跟网址等混淆。
 * 【*】【？】：这是通配符，在搜索文件的时候使用，所以不能使用。
 * 【<】【> 】【| 】【"】 ：这些符号在编程的时候经常用到函数中作为运算符等，避免程序出错，故而这些符号也不能作为文件或文件夹的名称。
 */
fs.writeFileSync(path.resolve(__filename, `../result_${nowDate}.json`), JSON.stringify(ret));

// fs.writeFileSync(path.resolve(__filename, `../arr_${nowDate}.json`), JSON.stringify(arr));
