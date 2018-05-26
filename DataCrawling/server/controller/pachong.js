/**
 * 获取用户信息
 */
'use strict';

const fs = require('fs');
const path = require('path');

const _ = (params, form) => {
  return new Promise((resolve, reject) => {
    console.log('i in ', params, form);
    try {
      const newFile = fs.createWriteStream(
        path.resolve(__dirname, `../src/json/${form.index}.json`),
      );
      newFile.write(JSON.stringify(form.data), 'UTF8');
      newFile.end();
      resolve('ok', new Date());
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = _;
