const fs = require('fs');
const path = require('path');
const base = 'D:/.vscode/extensions/';

const json = require(path.resolve(base, 'extensions.json'));

const arr = json.map((e) => e.relativeLocation);

async function deleteFolder(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(async (file) => {
      const curPath = path + '/' + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        await deleteFolder(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}

const baseUrl = path.resolve(base);
const list = fs.readdirSync(baseUrl);

console.log('start', new Date());
let num = 0;
list.forEach(async (e) => {
  if (!arr.includes(e)) {
    const url = path.resolve(baseUrl, e);
    if (fs.lstatSync(url).isDirectory()) {
      console.log('url', url, num, new Date());
      num += 1;

      await deleteFolder(url);
      console.log('url', url, num, new Date());
    }
  }
});

console.log('end', new Date());
