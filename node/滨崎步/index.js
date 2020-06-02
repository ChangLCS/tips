const fs = require('fs');
const path = require('path');

const config = {
  baseSrc: path.resolve('E:\\浜崎あゆみ（滨崎步）'),
  resultSrc: path.resolve('E:\\aaa'),
};

const fileList = fs.readdirSync(config.baseSrc);

const isDir = (src) => {
  const stat = fs.lstatSync(src);
  return stat.isDirectory();
};

const retList = [];
console.log('fileList', fileList);
for (let j = 0; j < fileList.length; j += 1) {
  const name = fileList[j];
  if (/^.*\.(flac|mp3|m4a)$/i.test(name)) {
    const realName = name.replace(/^\d+\.?\s?/, '浜崎あゆみ - ');
    console.log('realName', j, realName);
    if (!retList.includes(realName)) {
      fs.copyFileSync(path.resolve(config.baseSrc, name), path.resolve(config.resultSrc, realName));
      retList.push(realName);
      console.log('copy realName', realName);
    }
  }
}
