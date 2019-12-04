/**
 * @name nodejs 执行命令
 * @example http://nodejs.cn/api/child_process.html#child_process_child_process_execsync_command_options
 */

const process = require('child_process');
const fs = require('fs');
const path = require('path');

const base = fs.readdirSync(__dirname);

const notIn = ['index.js', 'tradeheb', 'tradejl', 'tradexj', 'tradegx'];

const arr = [];
for (let i = 0; i < base.length; i += 1) {
  const item = base[i];
  if (notIn.indexOf(item) === -1) {
    arr.push(item);
  }
}

console.log('arr', arr);

const doing = (i) => {
  if (i >= arr.length) {
    return;
  }
  try {
    const name = arr[i];
    const o = { cwd: path.resolve(__dirname, name) };
    process.execSync('git add .', o);
    process.execSync('git commit -m 主页新增首页-采购数据确认（链接）按钮', o);
    process.execSync('git push --set-upstream origin indexadd', o);
    console.log('命令执行成功，', name);
  } catch (error) {
    console.error('命令执行失败，', error.message);
  }
  doing(i + 1);
};

doing(0);
