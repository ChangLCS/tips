// ==UserScript==
// @name        爬虫测试（已有链接，查看详情）
// @namespace   datasearch
// @description 爬虫测试（已有链接，查看详情）
// @version     1.0
// @grant       Chang
// ==/UserScript==
(function() {
  const baseHost = 'app1.sfda.gov.cn';
  const baseName = 'datasearch';
  const sonName = 'content';
  console.log(
    location.host.indexOf(baseHost) === -1 &&
      location.pathname.indexOf(baseName) === -1 &&
      location.pathname.indexOf(sonName) === -1,
    'true or false',
  );
  if (
    location.host.indexOf(baseHost) === -1 &&
    location.pathname.indexOf(baseName) === -1 &&
    location.pathname.indexOf(sonName) === -1
  ) {
    return;
  }

  console.log('当前网址：', location.href);

  const topdiv = document.createElement('div');
  topdiv.id = 'chang-content';
  topdiv.innerHTML =
    '<div>' +
    '<span>所有文件目录</span>' +
    '<select id="changcontent-select">' +
    '</select>' +
    '</div>' +
    '<div>' +
    '<span>当前文件</span>' +
    '<span id="changcontent-file"></span>' +
    '</div>' +
    '<div>' +
    '<span>当前index</span>' +
    '<span id="changcontent-index"></span>' +
    '</div>' +
    '<div>' +
    '<span>总：</span>' +
    '<span id="changcontent-all" style="color: yellow;"></span>' +
    '<span style="margin-left: 30px;">已完成</span>' +
    '<span id="changcontent-finish" style="color: green;"></span>' +
    '<span style="margin-left: 30px;">未完成</span>' +
    '<span id="changcontent-unfinish" style="color: red;"></span>' +
    '</div>' +
    '<div>' +
    '<button id="changcontent-btn">立即开始</button>' +
    '</div>';

  document.body.insertBefore(topdiv, document.getElementsByTagName('div')[0]);

  const $changFileArr = document.getElementById('changcontent-select'); // 所有文件目录
  const $changFilename = document.getElementById('changcontent-file'); //  当前文件名称
  const $changIndex = document.getElementById('changcontent-index'); //  当前正在操作的index
  const $changBtn = document.getElementById('changcontent-btn'); //  自定义开始

  const $all = document.getElementById('changcontent-all'); //  总数据
  const $finish = document.getElementById('changcontent-finish'); //  已完成
  const $unfinish = document.getElementById('changcontent-unfinish'); //  未完成

  let statusData = {};

  const api = () => {};
  api.getInfo = (callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:9000/get/status', true);
    xhr.onreadystatechange = () => {
      //  成功
      if (xhr.readyState === 4) {
        callback(xhr);
      }
    };
    xhr.send();
  };

  const start = () => {
    console.log('start');
    api.getInfo((res) => {
      const ret = JSON.parse(res.response);
      const data = ret.result;

      const arrHtml = '';
      for (let i = 0; i < data.fileArr.length; i += 1) {
        const item = data.fileArr[i];
        arrHtml += `<option value=${item}>${item}</option>`;
      }
      $changFileArr = arrHtml;

      $changFilename.innerText = data.data.name;
      $changIndex.innerText = data.index;
      $all.innerText = data.all;
      $finish.innerText = data.finish;
      $unfinish.innerText = data.all - data.finish;
    });
  };

  $changBtn.onclick = start;

  // const $content = document.getElementById('content'); // 主要操作区域

  // const $drugDom = document.querySelectorAll('#ta3 tr');
  // const $drugData = {};
  // for (let i = 0; i < $drugDom.length; i += 1) {
  //   const $item = $drugDom[i];
  //   if ($item.id) {
  //     $drugData[$item.innerText ? $item.innerText.replace(/\s/g, '') : i] = $item;
  //   }
  // }

  // console.log('$drugData', $drugData);
  // const selectOption = Object.keys($drugData);
  // let selectHtml = '';
  // for (let i = 0; i < selectOption.length; i += 1) {
  //   const item = selectOption[i];
  //   selectHtml += `<option value=${item}>${item}</option>`;
  // }
  // $changSelect.innerHTML = $changSelect.innerHTML + selectHtml;

  // //  设置基础信息
  // const setBaseTotal = () => {
  //   const $footer = $content.querySelectorAll('table')[4];
  //   const $footerTd = $footer.querySelectorAll('td');
  //   $changTotal.innerText = $footerTd[0].innerText;
  // };

  // //  真正开始爬取数据
  // const GotoDo = (value) => {
  //   const getPage = (pageIndex) => {
  //     $changInput.value = pageIndex;
  //     if (pageIndex <= total && isGo) {
  //       const $list = $content.querySelectorAll('a');
  //       if ($list && $list.length) {
  //         const retList = [];
  //         for (let i = 0; i < $list.length; i += 1) {
  //           const item = $list[i];
  //           retList.push({
  //             name: item.innerText,
  //             url: item.href,
  //           });
  //         }
  //         const data = {
  //           index: pageIndex,
  //           data: retList,
  //         };
  //         const xhr = new XMLHttpRequest();
  //         xhr.open('POST', 'http://localhost:9000/pachong', true);
  //         xhr.setRequestHeader('Content-Type', 'appivation/form-data');
  //         xhr.send(JSON.stringify(data));

  //         xhr.onreadystatechange = () => {
  //           //响应信息返回后处理，在页面提示用户
  //           if (xhr.readyState === 4) {
  //             console.log(pageIndex, '！操作成功啦！现在前往下一页');
  //             $imgList = $content.querySelectorAll('img');
  //             if ($imgList && $imgList.length) {
  //               $imgList[2].click();
  //               setTimeout(() => {
  //                 setBaseTotal();
  //                 getPage(pageIndex + 1);
  //               }, 2000);
  //             } else {
  //               console.error('出错了，页码：', pageIndex, new Date().toString());
  //               GotoStop();

  //               //  5s 之后重新启动
  //               setTimeout(() => {
  //                 $changBtn.click();
  //               }, 5000);
  //             }
  //           }
  //         };
  //       } else {
  //         console.error('页码报错，当前页码', pageIndex, new Date().toString());
  //         GotoStop();

  //         //  5s 之后重新启动
  //         setTimeout(() => {
  //           $changBtn.click();
  //         }, 5000);
  //       }
  //     }
  //   };

  //   if (Number(value)) {
  //     getPage(Number(value));
  //   } else {
  //     console.error('请输入正确的数字');
  //   }
  // };

  // //  停止爬取
  // const GotoStop = () => {
  //   isGo = false;
  //   $changBtn.innerText = '立即开始';
  //   $changBtn.style.color = '#000';
  //   $changBtn.onclick = Readload;
  // };

  // //  第一次进入点击立即开始触发事件
  // const Readload = () => {
  //   if (!$changSelect.selectedIndex) {
  //     return alert('请选择目录');
  //   } else if (!$changInput.value) {
  //     return alert('请输入页码');
  //   }

  //   isGo = true;
  //   const text = $changSelect.selectedOptions[0].value;
  //   const $active = $drugData[text];
  //   $active.querySelectorAll('td')[3].click();
  //   setTimeout(() => {
  //     document.getElementById('goInt').value = $changInput.value;

  //     setBaseTotal();

  //     const $footer = $content.querySelectorAll('table')[4];
  //     const $footerTd = $footer.querySelectorAll('td');

  //     const reg = new RegExp(/共(.*)页/);
  //     const strArr = $footerTd[0].innerText.match(reg);
  //     if (strArr && strArr.length) {
  //       total = Number(strArr[1]);
  //     }
  //     $footerTd[$footerTd.length - 1].querySelector('input').click();

  //     $changBtn.innerText = '立即停止';
  //     $changBtn.style.color = '#f00';
  //     $changBtn.onclick = GotoStop;

  //     //  立即开始之后
  //     setTimeout(() => {
  //       GotoDo($changInput.value);
  //     }, 1000);
  //   }, 1000);
  // };
})();
