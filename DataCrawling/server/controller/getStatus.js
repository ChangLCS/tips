/**
 * 获取用户信息
 */
'use strict';

const fs = require('fs');
const path = require('path');

//  读取文件
const readFile = (form, type) => {
  const filePath = path.resolve(__filename, `../../src/data/${type}/`, form.fileNow);
  const data = JSON.parse(fs.readFileSync(filePath, 'UTF8'));
  const item = data[form.index] || {};
  return Object.assign({}, form, {
    data: {
      name: item.name,
      url: item.url,
    },
  });
};

//  初始化进入判断status 文件是否存在
const _ = (params, form) => {
  const statusPath = path.resolve(__filename, `../status/${params.type}.json`);

  return new Promise((resolve, reject) => {
    fs.exists(statusPath, (res) => {
      let ret = {};
      let data = {};
      if (res) {
        data = JSON.parse(fs.readFileSync(statusPath, 'UTF8'));
      } else {
        const arr = fs.readdirSync(path.resolve(__filename, `../../src/data/${params.type}`));
        data = {
          fileArr: arr,
          fileNow: arr[0],
          index: 0,
          all: 413655,
          finish: 0,
          data: {},
        };
      }
      ret = readFile(data, params.type);
      fs.writeFile(statusPath, JSON.stringify(ret), (res) => {
        resolve(ret);
      });
    });
  });
};

module.exports = _;
