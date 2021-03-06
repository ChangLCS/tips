// ==UserScript==
// @name        爬虫测试（获取链接列表）
// @namespace   datasearch
// @description 爬虫测试（获取链接列表）
// @version     1.0
// @grant       Chang
// ==/UserScript==

/* eslint-disable */

(function() {
  const baseHost = 'app1.sfda.gov.cn';
  const baseName = 'datasearch';
  const sonName = 'content';
  if (
    (location.host.indexOf(baseHost) === -1 && location.pathname.indexOf(baseName) === -1) ||
    (location.pathname.indexOf(baseName) > -1 && location.pathname.indexOf(sonName) > -1)
  ) {
    return;
  }

  var isFirst = false;

  console.log('当前网址：', location.href);

  const topdiv = document.createElement('div');
  topdiv.id = 'changdatacrawling';
  topdiv.innerHTML =
    '<div>' +
    '<select id="changdata-select">' +
    '<option value="请选择">请选择</option>' +
    '</select>' +
    '</div>' +
    '<div>' +
    '<span>基本信息：</span>' +
    '<span id="changdata-total" style="color:#ff0;"></span>' +
    '</div>' +
    '<div>' +
    '<span>前往页数：</span>' +
    '<input id="changdata-input" type="text" />' +
    '</div>' +
    '<div>' +
    '<button id="changdata-btn">立即开始</button>' +
    '</div>';
  document.body.insertBefore(topdiv, document.getElementsByTagName('table')[0]);

  const $changSelect = document.getElementById('changdata-select'); //  自定义下拉模块
  const $changTotal = document.getElementById('changdata-total'); //  自定义总页数
  const $changInput = document.getElementById('changdata-input'); //  自定义输入前往页码的地方
  const $changBtn = document.getElementById('changdata-btn'); //  自定义开始
  let total = 0;
  let isGo = true;

  const $content = document.getElementById('content'); // 主要操作区域

  const $drugDom = document.querySelectorAll('#ta1 tr');
  const $drugData = {};
  for (let i = 0; i < $drugDom.length; i += 1) {
    const $item = $drugDom[i];
    if ($item.id) {
      $drugData[$item.innerText ? $item.innerText.replace(/\s/g, '') : i] = $item;
    }
  }

  console.log('$drugData', $drugData);
  const selectOption = Object.keys($drugData);
  let selectHtml = '';
  for (let i = 0; i < selectOption.length; i += 1) {
    const item = selectOption[i];
    selectHtml += `<option value=${item}>${item}</option>`;
  }
  $changSelect.innerHTML = $changSelect.innerHTML + selectHtml;

  //  设置基础信息
  const setBaseTotal = () => {
    const $footer = $content.querySelectorAll('table')[4];
    const $footerTd = $footer.querySelectorAll('td');
    $changTotal.innerText = $footerTd[0].innerText;
  };

  //  真正开始爬取数据
  const GotoDo = (value) => {
    const getPage = (pageIndex) => {
      try {
        $changInput.value = pageIndex;
        if (pageIndex <= total && isGo) {
          const $list = $content.querySelectorAll('a');
          if ($list && $list.length) {
            const retList = [];
            for (let i = 0; i < $list.length; i += 1) {
              const item = $list[i];
              retList.push({
                name: item.innerText,
                url: item.href,
              });
            }
            const data = {
              index: pageIndex,
              data: retList,
            };
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://localhost:9000/pachong', true);
            xhr.setRequestHeader('Content-Type', 'appivation/form-data');
            xhr.send(JSON.stringify(data));

            xhr.onreadystatechange = (e) => {
              //响应信息返回后处理，在页面提示用户
              if (xhr.readyState === 4) {
                console.log(pageIndex, '！操作成功啦！现在前往下一页');
                $imgList = $content.querySelectorAll('img');
                if ($imgList && $imgList.length) {
                  $imgList[2].click();
                  setTimeout(() => {
                    setBaseTotal();
                    getPage(pageIndex + 1);
                  }, 2000);
                } else {
                  console.error('出错了，页码：', pageIndex, new Date().toString());
                  GotoStop();

                  //  5s 之后重新启动
                  setTimeout(() => {
                    $changBtn.click();
                  }, 5000);
                }
              }
            };
          } else {
            console.error('页码报错，当前页码', pageIndex, new Date().toString());
            GotoStop();

            //  5s 之后重新启动
            setTimeout(() => {
              $changBtn.click();
            }, 5000);
          }
        }
      } catch (error) {
        console.log('error 不知道哪里错了', pageIndex);
        setTimeout(() => {
          getPage(pageIndex);
        }, 2000);
      }
    };

    if (Number(value)) {
      getPage(Number(value));
    } else {
      console.error('请输入正确的数字');
    }
  };

  //  停止爬取
  const GotoStop = () => {
    isGo = false;
    $changBtn.innerText = '立即开始';
    $changBtn.style.color = '#000';
    $changBtn.onclick = Readload;
  };

  //  第一次进入点击立即开始触发事件
  const Readload = () => {
    console.log('$changSelect.selectedIndex', $changSelect.selectedIndex);

    if (!$changSelect.selectedIndex) {
      return alert('请选择目录');
    } else if (!$changInput.value) {
      return alert('请输入页码');
    }

    isGo = true;
    const text = $changSelect.selectedOptions[0].value;
    const $active = $drugData[text];
    $active.querySelectorAll('td')[3].click();

    isFirst = true;
    console.log('$changSelect', $changSelect);

    //  如果是经营企业，默认一下批发的搜索条件，之后如果不用就把它给干掉
    if (isFirst && $changSelect.selectedIndex === 12) {
      setTimeout(() => {
        document.querySelector('input[name=COLUMN444]').value = '批发';
        document.querySelectorAll('input[type=submit]')[26].value = '看一下批发';
        document.querySelectorAll('input[type=submit]')[26].click();
      }, 1000);

      isFirst = false;
    }

    setTimeout(() => {
      document.getElementById('goInt').value = $changInput.value;

      setBaseTotal();

      const $footer = $content.querySelectorAll('table')[4];
      const $footerTd = $footer.querySelectorAll('td');

      const reg = new RegExp(/共(.*)页/);
      const strArr = $footerTd[0].innerText.match(reg);
      if (strArr && strArr.length) {
        total = Number(strArr[1]);
      }
      $footerTd[$footerTd.length - 1].querySelector('input').click();

      $changBtn.innerText = '立即停止';
      $changBtn.style.color = '#f00';
      $changBtn.onclick = GotoStop;

      //  立即开始之后
      setTimeout(() => {
        GotoDo($changInput.value);
      }, 1000);
    }, 2000);
  };

  $changBtn.onclick = Readload;
})();
