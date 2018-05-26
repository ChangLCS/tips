/**
 * 获取用户信息
 */
'use strict';

const fs = require('fs');
const path = require('path');

const _ = (params, form) => {
  return new Promise((resolve, reject) => {
    const text = fs.readFileSync(path.resolve(__dirname, '../src/data.json'));
    const data = JSON.parse(text);
    if (data && data[params.id]) {
      resolve(JSON.stringify(data[params.id]));
    } else {
      reject(error);
    }
  });
};

module.exports = _;
