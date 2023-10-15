/**
 * 根据百度api与xlsx文档检索对应的坐标
 */

const path = require('path');
const fs = require('fs');
const xlsx = require('node-xlsx');

const xlsxPath = path.resolve(__dirname, './lib/苏鲁海王-批准文号文件.xlsx');
const retPath = path.resolve(__dirname, './lib/苏鲁海王-批准文号文件ret.xlsx');

const allData = xlsx.parse(xlsxPath);

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
  fs.writeFile(retPath, buffer, { flag: 'w' }, (err) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log(retPath);
    }
  });
};

debugger;

const appData = allData[1].data;

const retList = [];
retList[0] = appData[0];

for (let i = 1; i < appData.length; i += 1) {
  const item = appData[i];
  const approvalStr = String(item[2]);
  const arr = approvalStr.split(/\/|\\\\|、|，|,/);

  console.log('arr', i, arr);

  for (let j = 0; j < arr.length; j += 1) {
    const aStr = arr[j];
    const aStrFlag = String(arr[j]).replace(/\s/gi, '');
    if (aStrFlag) {
      const x = [...item];
      x[2] = aStr;
      retList.push(x);
    }
  }

  // debugger;
}

const writeData = [
  {
    name: '转换后',
    data: retList,
  },
];
console.log('retList', writeData);
debugger;

writeFile(writeData);

console.log('end');
