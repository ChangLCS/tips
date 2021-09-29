/**
 * csv解密
 */

const path = require('path');
const fs = require('fs');
const csv = require('node-csv').createParser();
const xlsx = require('node-xlsx');

const utils = require('./utils');

const xlsxPath = path.resolve(__dirname, './libs/企业.xlsx');
const xlsxRetPath = path.resolve(__dirname, './libs/企业解密后.xlsx');
const allData = xlsx.parse(xlsxPath);

const data = allData[0].data;

const list = [];
for (let i = 0; i < data.length; i += 1) {
  const itemData = data[i];
  if (i === 0) {
    itemData[111] = '联系人电话';
    itemData[112] = '法人电话';
    itemData[113] = '公司电话';
    itemData[114] = '公司邮箱';
    itemData[115] = '发货联系人电话';
  } else {
    itemData[111] = utils.decryptDES(itemData[4]) || itemData[4];
    itemData[112] = utils.decryptDES(itemData[13]) || itemData[13];
    itemData[113] = utils.decryptDES(itemData[14]) || itemData[14];
    itemData[114] = utils.decryptDES(itemData[15]) || itemData[15];
    itemData[115] = utils.decryptDES(itemData[70]) || itemData[70];
  }
  list.push(itemData);
  console.log('i', data.length, i);
}

allData[0].data = list;

const buffer = xlsx.build(allData);
console.log('生成');
fs.writeFile(xlsxRetPath, buffer, { flag: 'w' }, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(xlsxRetPath);
  }
});
