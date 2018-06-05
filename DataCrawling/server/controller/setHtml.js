/**
 * 获取用户信息
 */
'use strict';

const fs = require('fs');
const path = require('path');

//  初始化进入判断status 文件是否存在
const _ = (params, form) => {
  const statusPath = path.resolve(__filename, `../status/${form.type}.json`);
  let statusData = JSON.parse(fs.readFileSync(statusPath, 'UTF8'));

  return new Promise((resolve, reject) => {
    const htmlPath = path.resolve(
      __filename,
      `../../src/html/${form.type}/`,
      `${statusData.data.name.split('.')[0]}.html`,
    );
    const file = fs.createWriteStream(htmlPath);
    file.write(form.html, () => {
      file.end();

      try {
        let fileNow = statusData.fileNow; // 现在的文件地址
        let index = statusData.index + 1;
        if (statusData.index + 1 >= 1500) {
          fileNow = statusData.fileArr[statusData.fileArr.indexOf(fileNow) + 1];
          index = 0;
        }

        const fileNowData = JSON.parse(
          fs.readFileSync(path.resolve(__filename, `../../src/data/${form.type}/`, fileNow)),
        );

        const newItem = fileNowData[index];
        const ret = Object.assign({}, statusData, {
          fileNow: fileNow,
          index: index,
          finish: statusData.finish + 1,
          data: newItem,
        });

        fs.writeFile(statusPath, JSON.stringify(ret), () => {
          statusData = JSON.parse(fs.readFileSync(statusPath, 'UTF8'));
          console.log('resolve', statusData);
          resolve(statusData);
        });
      } catch (error) {
        console.log('reject', error);
        return reject(error);
      }
    });
  });
};

module.exports = _;
