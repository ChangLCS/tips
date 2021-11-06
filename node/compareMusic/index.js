const fs = require('fs');
const path = require('path');

const config = {
  pc: path.resolve('F:\\Music'),
  mobile: path.resolve('F:\\手机音乐\\Music'),
};

debugger;

const pcList = fs.readdirSync(config.pc);
const mobileList = fs.readdirSync(config.mobile);

const notInMobile = [];
for (let i = 0; i < pcList.length; i += 1) {
  const item = pcList[i];
  if (mobileList.indexOf(item) === -1 && !/\.cfg$/.test(item)) {
    notInMobile.push(item);
  }
}

const notInPc = [];
for (let i = 0; i < mobileList.length; i += 1) {
  const item = mobileList[i];
  if (pcList.indexOf(item) === -1) {
    notInPc.push(item);
  }
}

console.log('notInMobile', notInMobile);
console.log('notInPc', notInPc);

debugger;
