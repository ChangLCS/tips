const xlsx = require('node-xlsx');
const path = require('path');
const fs = require('fs');

const xlsxPath = path.resolve(__dirname, 'lib/海王云wms-权限列表.xlsx');
const allData = xlsx.parse(xlsxPath);

debugger;

console.log('allData', allData);

//  截取code获取key
const getAuthKey = (str = '') => {
  const arr = str.split(':');
  const e = arr[arr.length - 1] || '';
  return e;
};

const allArr = allData[0].data;

const json = {};
const mainIndex = 9;
const subIndex = 10;
const codeIndex = 11;

for (let i = 1; i < allArr.length; i += 1) {
  const item = allArr[i];
  const mainKey = item[mainIndex];
  const subKey = item[subIndex];
  const code = item[codeIndex];
  const authKey = getAuthKey(code);

  if (!json[mainKey]) {
    json[mainKey] = {};
  }

  if (!json[mainKey][subKey]) {
    json[mainKey][subKey] = {};
  }

  json[mainKey][subKey][authKey] = code;
}

console.log('json', json);

fs.writeFileSync(path.resolve(__dirname, 'authJson.json'), JSON.stringify(json));
