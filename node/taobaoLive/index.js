const Axios = require('axios');
const fs = require('fs');
const path = require('path');

const config = require('./config');

const txtBase = fs.readFileSync(path.resolve(__dirname, './lib/base.txt'), 'utf-8');

const data = txtBase.split('\r\n');

const reg = new RegExp(/\/(\d*\.ts)/);
const list = [];
const txtList = [];
for (let i = 0; i < data.length; i += 1) {
  const item = data[i];
  if (reg.test(item)) {
    const url = `${config.baseUrl}${item}`;
    const arr = item.match(reg);
    list.push({
      url,
      name: arr[1],
    });
    const t = `file '${arr[1]}'`;
    txtList.push(t);
  }
}
fs.writeFileSync(path.resolve(__dirname, './download/filelist.txt'), txtList.join('\n'));

// const getFile = async (x) => {
//   const res = await Axios({
//     url: x.url,
//     method: 'GET',
//     responseType: 'stream',
//   });
//   const writer = fs.createWriteStream(path.resolve(__dirname, `./download/${x.name}`));
//   res.data.pipe(writer);
//   return new Promise((resolve, reject) => {
//     writer.on('finish', resolve);
//     writer.on('error', reject);
//   });
// };

// const goToUrl = (i) => {
//   if (i < list.length) {
//     getFile(list[i])
//       .then(() => {
//         goToUrl(i + 1);
//         console.log('then i', i + 1);
//       })
//       .catch(() => {
//         goToUrl(i);
//         console.error('error i', i);
//       });
//   } else {
//     console.log('全部完成!!!');
//   }
// };

// goToUrl(0);
