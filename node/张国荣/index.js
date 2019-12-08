const fs = require('fs');
const path = require('path');

const config = {
  baseSrc: path.resolve('E:\\张国荣音乐合集1978-2007 140CD FLAC'),
  resultSrc: path.resolve('E:\\张国荣\\flac'),
};

const dirList = fs.readdirSync(config.baseSrc);
dirList.sort((a, b) => b.localeCompare(a));
console.log(dirList);

const isDir = (src) => {
  const stat = fs.lstatSync(src);
  return stat.isDirectory();
};

const retList = [];
for (let i = 0; i < dirList.length; i += 1) {
  const item = dirList[i];
  const dirSrc = path.resolve(config.baseSrc, item);
  if (!isDir(dirSrc)) {
    continue;
  }
  const fileList = fs.readdirSync(dirSrc);
  for (let j = 0; j < fileList.length; j += 1) {
    const name = fileList[j];
    if (/^.*\.flac$/i.test(name)) {
      const realName = name.replace(/\d+/, '张国荣');
      console.log('realName', realName);
      if (!retList.includes(realName)) {
        fs.copyFileSync(path.resolve(dirSrc, name), path.resolve(config.resultSrc, realName));
        retList.push(realName);
        console.log('copy realName', realName);
      }
    }
  }
}
