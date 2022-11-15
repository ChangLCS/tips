const xlsx = require('node-xlsx');
const path = require('path');

const xlsxPath = path.resolve(__dirname, 'lib/海王云wms-权限列表.xlsx');
const allData = xlsx.parse(xlsxPath);

debugger;

console.log('allData', allData);

const allArr = allData[0].data;
