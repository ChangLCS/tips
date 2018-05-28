/**
 * 获取用户信息
 */
'use strict';

const fs = require('fs');
const path = require('path');

const statusPath = path.resolve(__filename, '../status.json');

//  初始化进入判断status 文件是否存在
const _ = (params, form) => {
  return new Promise((resolve, reject) => {
    fs.exists(statusPath, (res) => {
      if (res) {
        const data = fs.writeFileSync(statusPath, 'UTF8');
        console.log('data');
      } else {
        const arr = fs.readdirSync(path.resolve(__filename, '../src/data'));
        // const nowFile = fs.readFileSync(path.resolve)
        const data = {
          fileArr: arr,
          fileNow: arr[0],
          index: 0,
          all: 413655,
          finish: 0,
          data: {},
        };
      }
    });
    // const text = fs.readFileSync(path.resolve(__dirname, '../src/data.json'));
    // const data = JSON.parse(text);
    // if (data && data[params.id]) {
    //   resolve(JSON.stringify(data[params.id]));
    // } else {
    //   reject(error);
    // }
  });
};

module.exports = _;
