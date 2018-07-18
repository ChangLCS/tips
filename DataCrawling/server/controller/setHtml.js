/**
 * 获取用户信息
 */
'use strict';

const fs = require('fs');
const path = require('path');

//  初始化进入判断status 文件是否存在
const _ = (params, form) => {
  return new Promise((resolve, reject) => {
    try {
      const htmlPath = path.resolve(__filename, `../../src/html/`, `${form.id}.html`);
      const file = fs.createWriteStream(htmlPath);
      file.write(form.html, () => {
        file.end();
        console.log('ok id: ', form.id);
        resolve();
      });
    } catch (error) {
      console.log('set html error', form.id);
    }
  });
};

module.exports = _;
