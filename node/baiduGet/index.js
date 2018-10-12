/**
 * 根据百度api与xlsx文档检索对应的坐标
 */

const path = require('path');
const fs = require('fs');
const xlsx = require('node-xlsx');
const api = require('./api.js');

const xlsxPath = path.resolve(__dirname, 'lib/医院.xlsx');

const allData = xlsx.parse(xlsxPath);

const retList = [];

let configIndex = 0;

//  写入文件
const writeFile = (data) => {
  //  上面有效
  // const range = { s: { c: 0, r: 0 }, e: { c: 0, r: 3 } }; // A1:A4
  // const option = { '!merges': [range] };
  //  这个无效
  // const rowinfo = { hidden: true, hpt: 1000, level: 5 };
  // const option = { '!rows': [rowinfo, rowinfo] };
  // const buffer = xlsx.build(data, option);
  const buffer = xlsx.build(data);
  fs.writeFile(xlsxPath, buffer, { flag: 'w' }, (err) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log(xlsxPath);
    }
  });
};

const getPoint = (index, list, city, $baseIndex) => {
  if (index < list.length) {
    const item = list[index];
    if (index === 0) {
      retList[$baseIndex].data[index] = item;
      getPoint(index + 1, list, city, $baseIndex);
      return;
    }
    api
      .getPoint(item[1], city)
      .then((result) => {
        const data = result.data.result;

        console.log(index, JSON.stringify(data));

        if (data) {
          if (data.level === '医疗') {
            retList[$baseIndex].data[index] = [
              item[0],
              item[1],
              `${data.location.lng},${data.location.lat}`,
              data.level,
            ];
          } else {
            retList[$baseIndex].data[index] = [
              item[0],
              item[1],
              '',
              '',
              '',
              `${data.location.lng},${data.location.lat}`,
              data.level,
            ];
          }
        } else {
          retList[$baseIndex].data[index] = item;
        }
        //  有并发问题，不过，不用考虑啦
        // setTimeout(() => {
        getPoint(index + 1, list, city, $baseIndex);
        // }, 1000);
      })
      .catch((err) => {
        retList[$baseIndex].data[index] = item;
        getPoint(index + 1, list, city, $baseIndex);
      });
  } else {
    configIndex += 1;
    if (configIndex === allData.length) {
      console.log('retList', JSON.stringify(retList));
      writeFile(retList);
    }
  }
};

for (let i = 0; i < allData.length; i += 1) {
  const all = allData[i];

  const $city = all.name;
  const $list = all.data;

  retList[i] = {
    name: $city,
    data: [],
  };

  getPoint(0, $list, $city, i);
}

console.log('end');
