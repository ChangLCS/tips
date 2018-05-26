/**
 * @description 随便写的，没用express，顺便当成学习
 * @version 1.0.0
 * @since 真正搭项目还是得用框架啊，不然一手一手来太麻烦了，当几个简单的接口进行访问就得做很多个判断条件来让接口调成功，还有参数的接收
 */

'use strict';

const http = require('http'); //  创建http服务
const url = require('url'); //  分析请求url
const path = require('path');
const fs = require('fs');

const text = fs.readFileSync(path.resolve(__dirname, 'src/data.json'), 'UTF8');
const data = JSON.parse(text);

const baseUrl = 'http://app1.sfda.gov.cn/datasearch/face3/';

const getItemUrl = (str) => {
  const reg = new RegExp(/([^]*)'(.*)'([^]*)/);
  const ret = str.match(reg);
  return ret[2];
};

const getHtml = (index) => {
  if (index < data.length) {
    const item = data[index];
    const url = getItemUrl(item.url);
    http.get(`${baseUrl}${url}`, (res) => {
      let resData = '';
      res.on('data', (body) => {
        resData += body;
      });
      res.on('end', () => {
        console.log(resData);
      });
    });
  } else {
  }
};

getHtml(0);

// const doJson = (arr) => {
//   const saveJson = (i) => {
//     console.log('i', i);
//     if (i < arr.length) {
//       const text = fs.readFileSync(path.resolve(__dirname, 'src/json/', arr[i]), 'UTF8');
//       const data = JSON.parse(text);
//       retList = retList.concat(data);
//       saveJson(i + 1);
//     } else {
//       const newFile = fs.createWriteStream(path.resolve(__dirname, `src/data.json`));
//       newFile.write(JSON.stringify(retList), 'UTF8');
//       newFile.end();
//       console.log('ok');
//     }
//   };
//   saveJson(0);
// };

// fs.readdir(path.resolve(__dirname, 'src/json'), (error, res) => {
//   if (error) {
//     console.error('error', error);
//   } else {
//     doJson(res);
//   }
// });

// const server = http.createServer((req, res) => {
//   const urlInfo = url.parse(req.url, true);

//   let body = '';
//   req.on('data', (chunk) => {
//     body += chunk;
//   });

//   req.on('end', () => {
//     const form = JSON.parse(body ? body : '{}');

//     const reg = new RegExp(/(\/?)(\/.*)/);
//     const path = `./controller/${apiPath[urlInfo.pathname.replace(reg, '$2')]}`;

//     const apiFun = require(path);

//     res.writeHead(
//       200,
//       Object.assign({}, config.responseHeader, {
//         'Access-Control-Allow-Origin': req.headers.host,
//       }),
//     );

//     apiFun(urlInfo.query, form)
//       .then((result) => {
//         res.end(
//           JSON.stringify(
//             Object.assign({}, config.responseSuccess, {
//               result,
//             }),
//           ),
//         );
//       })
//       .catch((result) => {
//         res.end(
//           JSON.stringify(
//             Object.assign({}, config.responseError, {
//               result,
//             }),
//           ),
//         );
//       });
//   });
// });

// server.listen(9000);

// console.log('-----------------------------');
// console.log('9000 --------------  server running');
