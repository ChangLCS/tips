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
    '<span>当前文件名称：</span>' +
    '<span id="changcontent-filename"></span>' +
    '</div>' +
    '<div>' +
    '<span>当前index：</span>' +
    '<span id="changcontent-index"></span>' +
    '</div>' +
    '<div>' +
    '<button id="changcontent-btn">立即开始</button>' +
    '</div>';
  document.body.insertBefore(topdiv, document.getElementsByTagName('div')[0]);

  const $changFilename = document.getElementById('changcontent-filename'); //  当前文件名称
  const $changIndex = document.getElementById('changcontent-index'); //  当前正在操作的index
  const $changBtn = document.getElementById('changcontent-btn'); //  自定义开始

  let statusData = {};

  const api = () => {};
  api.getInfo = (callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:9000/get/status', true);
    xhr.onreadystatechange = () => {
      //  成功
      if (xhr.readyState === 4) {
        // callback(JSO);
      }
    };
    xhr.send();

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
  };

  const start = () => {
    location.href =
      'http://app1.sfda.gov.cn/datasearch/face3/content.jsp?tableId=41&tableName=TABLE41&tableView=%E8%8D%AF%E5%93%81%E7%BB%8F%E8%90%A5%E4%BC%81%E4%B8%9A&Id=699';
    setTimeout(() => {
      const html = document.querySelector('html').innerHTML;
      console.log(html);
    }, 2000);
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
