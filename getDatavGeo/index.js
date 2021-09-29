const path = require('path');
const fs = require('fs');

const api = require('./api');
const codeJSON = require('./hunanCode');

const data = Object.entries(codeJSON);
let index = 0;
const timeoutTime = 100;

const success = (base, ret, isFull, callback) => {
  const filePath = path.resolve(__dirname, '../lib/geo20210930', `${base[0]}-${base[1]}.json`);
  const filePathFull = path.resolve(
    __dirname,
    '../lib/geo20210930',
    `${base[0]}_full-${base[1]}.json`,
  );

  const fileUrl = isFull ? filePathFull : filePath;
  const newFile = fs.createWriteStream(fileUrl);

  newFile.write(JSON.stringify(ret), 'UTF8');
  newFile.end();

  newFile.on('finish', () => {
    setTimeout(() => {
      console.log('success', index, fileUrl);
      callback();
    }, timeoutTime);
  });
};

const apiGet = () => {
  const end = () => {
    if (index < data.length) {
      index += 1;
      apiGet();
    }
  };

  const base = data[index];
  if (!base) {
    console.log('结束了', index);
    return;
  }
  const url = `${base[0]}.json`;
  const urlFull = `${base[0]}_full.json`;

  const isFull = true;
  const apiUrl = isFull ? urlFull : url;

  api
    .get(apiUrl)
    .then((res) => {
      console.log('res', res.data);
      const ret = res.data;
      success(base, ret, isFull, () => {
        end();
      });
    })
    .catch((res) => {
      // console.error('error', res);
      console.error('error', index, apiUrl, res.message);
      setTimeout(() => {
        end();
      }, timeoutTime);
    });
};

apiGet();
