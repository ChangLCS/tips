/**
 * http.get 方法的使用
 * nodejs 自己调用接口，获取参数
 */

'use strict';

const http = require('http');

const url = 'http://api.qingyunke.com/api.php?key=free&appid=0&msg=a';

/**
 * 在接口地址正确的情况下，resData 就是最终结果
 * 请求地址直接拼接，如果有中文记得用 encodeURI 转一下  （此处可以封装一个方法，方便重复调用）
 * 如果接口协议是 https , 用 https 模块，用法一毛一样
 */
http.get(url, (res) => {
  let resData = '';
  res.on('data', (body) => {
    resData += body;
  });
  res.on('end', () => {
    console.log('resData', resData);
  });
});
