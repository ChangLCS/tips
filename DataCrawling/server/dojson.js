/**
 * @description 随便写的，没用express，顺便当成学习
 * @version 1.0.0
 * @since 真正搭项目还是得用框架啊，不然一手一手来太麻烦了，当几个简单的接口进行访问就得做很多个判断条件来让接口调成功，还有参数的接收
 */

'use strict';

const path = require('path');
const fs = require('fs');

let retList = [];
const baseUrl = 'http://app1.sfda.gov.cn/datasearch/face3/';
const regUrl = new RegExp(/([^']*)'(.*)'([^']*)/);

const getUrl = (str) => {
  const arr = str.match(regUrl);
  if (arr && arr.length) return `${baseUrl}${arr[2]}`;
  return str;
};

const regId = new RegExp(/(.*)Id=(.*)/);
const getId = (str) => {
  const arr = str.match(regId);
  console.log('arr[2]', arr[2]);
  if (arr && arr.length) return arr[2];
};

const doJson = (arr) => {
  const saveJson = (index) => {
    if (index < arr.length) {
      const filePath = path.resolve(__dirname, 'upload/json/', arr[index]);
      const text = fs.readFileSync(filePath, 'UTF8');
      const data = JSON.parse(text);
      console.log(arr[index], '-----length-----', data.length);

      for (let i = 0; i < data.length; i += 1) {
        const item = data[i];
        // retList = retList.concat(Object.assign({}, item, { url: getUrl(item.url) })); //  取全部
        retList = retList.concat({ id: getId(item.url) }); //  取id
      }

      // console.log(`文件    ${filePath}    OK！`);
      if ((index + 1) % 100 === 0) {
        const fileName = path.resolve(__dirname, 'src/data/', `${new Date().getTime()}.json`);
        const newFile = fs.createWriteStream(fileName);
        newFile.write(JSON.stringify(retList), 'UTF8', (error, data) => {
          newFile.end();
          retList = [];
          saveJson(index + 1);
        });
        console.log('----------------');
        console.log(`创建文件    ${fileName}    OK！`);
      } else {
        saveJson(index + 1);
      }
    } else {
      const fileName = path.resolve(__dirname, 'src/data/', `${new Date().getTime()}.json`);
      const newFile = fs.createWriteStream(fileName);
      newFile.write(JSON.stringify(retList), 'UTF8');
      newFile.end();
      retList = [];
      console.log('----------------');
      console.log(`创建文件    ${fileName}    OK！`);
      console.log(`全部OK！`);
    }
  };
  saveJson(0);
};

fs.readdir(path.resolve(__dirname, 'upload/json'), (error, res) => {
  if (error) {
    console.error('error', error);
  } else {
    doJson(res);
  }
});
