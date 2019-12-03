const fs = require('fs');

const codeArr = []; //  已有的编码数组

console.log('Date start', new Date());

//  获取随机字符密钥
const getCode = (n) => {
  const all = 'azxcvbnmsdfghjklqwertyuiopZXCVBNMASDFGHJKLQWERTYUIOP0123456789!@#$*()_-+=><?';
  let code = '';
  for (let i = 0; i < n; i += 1) {
    const index = Math.floor(Math.random() * 77);
    code += all.charAt(index);
  }
  return code;
};

//  生成编码
const getIoCode = () => {
  const num = Math.floor(Math.random() * 11);

  const ret = getCode(20 + (num === 11 ? 10 : num));
  if (codeArr.indexOf(ret) > -1) {
    console.log('重复啦', ret);
    getIoCode();
  }
  return ret;
};

console.log(__dirname);

console.log('---------------------------------');

fs.readFile(__dirname + '\\data.json', 'utf-8', (error, data) => {
  let array = [];

  if (error) {
    for (let i = 1; i <= 10; i += 1) {
      array.push({
        name: i,
      });
    }
  } else {
    array = JSON.parse(data);
  }
  const ret = [];
  for (let i = 0; i < array.length; i += 1) {
    const item = array[i];
    if (item.name) {
      if (item.ioCode) {
        codeArr.push(item.ioCode);
        ret.push(item);
      } else {
        const ioCode = getIoCode();

        codeArr.push(ioCode);
        ret.push({
          name: item.name,
          ioCode,
        });
      }
    }
  }

  const newFile = fs.createWriteStream(__dirname + '\\data.json');

  newFile.write(JSON.stringify(ret), 'UTF8');
  newFile.end();

  newFile.on('finish', (res) => {
    console.log('finish \n', ret, ret.length);

    console.log('Date end', new Date());
  });
});
