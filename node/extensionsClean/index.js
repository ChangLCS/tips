const fs = require('fs');
const path = require('path');
const json = require('./extensions.json');

const arr = json.map((e) => e.relativeLocation);

const base = 'D:/.vscode/extensions/';

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

arr.forEach(async (e) => {
  const url = path.resolve(base, e);
  console.log('url', url);
  // await deleteFolder(url);
});
