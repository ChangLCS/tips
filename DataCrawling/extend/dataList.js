// ==UserScript==
// @name        爬虫测试（详情）
// @namespace   dataList
// @description 爬虫测试（详情）
// @version     1.0
// @grant       Chang
// ==/UserScript==
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

  const $drugDom = document.querySelectorAll('#ta3 tr');
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

  let listLength = 0;

  const getPage = (pageIndex) => {
    try {
      console.log('重新进来了', pageIndex);

      $changInput.value = pageIndex;
      setTimeout(() => {
        console.log('pageIndex <= total && isGo', pageIndex <= total && isGo);
        if (pageIndex <= total && isGo) {
          const $list = $content.querySelectorAll('a');
          console.log(';$list', $list);

          const contenthtml = document.getElementById('content').innerHTML;
          if (contenthtml.indexOf('服务器') > -1) {
            GotoStop();

            //  5s 之后重新启动
            setTimeout(() => {
              $changBtn.click();
            }, 5000);
            return;
          }

          if ($list && $list.length) {
            listLength = $list.length;
            setHtml(0, pageIndex);
          } else {
            console.error('页码报错，当前页码', pageIndex, new Date().toString());
            GotoStop();

            //  5s 之后重新启动
            setTimeout(() => {
              $changBtn.click();
            }, 5000);
          }
        }
      }, 2000);
    } catch (error) {
      console.log('error 不知道哪里错了', pageIndex);
      setTimeout(() => {
        getPage(pageIndex);
      }, 2000);
    }
  };

  const setHtml = (index, pageIndex) => {
    if (index < listLength) {
      const $list = $content.querySelectorAll('a');
      try {
        const href = $list[index].href;
        const id = href.match(/.*Id=(.*)'.*/)[1];
        $list[index].click();
        setTimeout(() => {
          const contenthtml = document.getElementById('content').innerHTML;
          if (contenthtml.indexOf('服务器') > -1) {
            GotoStop();

            //  5s 之后重新启动
            setTimeout(() => {
              $changBtn.click();
            }, 5000);
            return;
          }
          const html = document.querySelector('.listmain').innerHTML;
          const data = {
            id,
            html,
          };

          const xhr = new XMLHttpRequest();
          xhr.open('POST', 'http://localhost:9000/set/html', true);
          xhr.setRequestHeader('Content-Type', 'appivation/form-data');
          xhr.send(JSON.stringify(data));
          xhr.onerror = (e) => {
            console.error('出错了，页码：', pageIndex, new Date().toString());
            GotoStop();
            //  5s 之后重新启动
            setTimeout(() => {
              $changBtn.click();
            }, 5000);
          };

          xhr.onreadystatechange = (e) => {
            //响应信息返回后处理，在页面提示用户
            if (xhr.readyState === 4) {
              console.log('！操作成功啦！-----', index, '-----id：', id);
              document.querySelector('.listmain img').click();

              setTimeout(() => {
                if (index + 1 >= listLength) {
                  $imgList = $content.querySelectorAll('img');
                  if ($imgList && $imgList.length) {
                    $imgList[2].click();
                    setTimeout(() => {
                      console.log('后退了');

                      setBaseTotal();
                      console.log('充值头部');

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
                } else {
                  setHtml(index + 1, pageIndex);
                }
              }, 1000);
            }
          };
        }, 2000);
      } catch (error) {
        console.error('setHtml error', id);
      }
    }
  };

  //  真正开始爬取数据
  const GotoDo = (value) => {
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
    if (!$changSelect.selectedIndex) {
      return alert('请选择目录');
    } else if (!$changInput.value) {
      return alert('请输入页码');
    }

    isGo = true;
    const text = $changSelect.selectedOptions[0].value;
    const $active = $drugData[text];
    $active.querySelectorAll('td')[3].click();
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
    }, 1000);
  };

  $changBtn.onclick = Readload;
})();
