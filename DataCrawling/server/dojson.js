/**
 * @description 随便写的，没用express，顺便当成学习
 * @version 1.0.0
 * @since 真正搭项目还是得用框架啊，不然一手一手来太麻烦了，当几个简单的接口进行访问就得做很多个判断条件来让接口调成功，还有参数的接收
 */

'use strict';

const path = require('path');
const fs = require('fs');

let retList = [];

const doJson = (arr) => {
  const saveJson = (i) => {
    if (i < arr.length) {
      const text = fs.readFileSync(path.resolve(__dirname, 'src/json/', arr[i]), 'UTF8');
      const data = JSON.parse(text);
      retList = retList.concat(data);
      const index = (i + 1) % 100;
      if (index === 0) {
        const pathName = `src/data/${Math.floor((i + 1) / 100)}.json`;
        const newFile = fs.createWriteStream(path.resolve(__dirname, pathName));
        newFile.write(JSON.stringify(retList), 'UTF8');
        newFile.end();
        retList = [];
        console.log(pathName);
      }
      saveJson(i + 1);
    } else {
      const pathName = `src/data/${Math.floor((i + 1) / 100) + 1}.json`;
      const newFile = fs.createWriteStream(path.resolve(__dirname, pathName));
      newFile.write(JSON.stringify(retList), 'UTF8');
      newFile.end();
      console.log('ok');
      console.log(pathName);
    }
  };
  saveJson(0);
};

fs.readdir(path.resolve(__dirname, 'src/json'), (error, res) => {
  if (error) {
    console.error('error', error);
  } else {
    doJson(res);
  }
});
