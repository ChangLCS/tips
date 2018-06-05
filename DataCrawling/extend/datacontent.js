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

  const topdiv = document.createElement('div');
  topdiv.id = 'chang-content';
  topdiv.innerHTML =
    '<div>' +
    '<span>所有文件目录：</span>' +
    '<select id="changcontent-select">' +
    '</select>' +
    '</div>' +
    '<div>' +
    '<span>当前文件：</span>' +
    '<span id="changcontent-file"></span>' +
    '</div>' +
    '<div>' +
    '<span>当前index：</span>' +
    '<span id="changcontent-index"></span>' +
    '</div>' +
    '<div>' +
    '<span>总：</span>' +
    '<span id="changcontent-all" style="color: blue;"></span>' +
    '<span style="margin-left: 30px;">已完成：</span>' +
    '<span id="changcontent-finish" style="color: green;"></span>' +
    '<span style="margin-left: 30px;">未完成：</span>' +
    '<span id="changcontent-unfinish" style="color: red;"></span>' +
    '</div>' +
    '<div>' +
    '<button id="changcontent-btn">立即开始</button>' +
    '<button id="changcontent-cancel" style="color: red;">停止</button>' +
    '</div>';

  document.body.insertBefore(topdiv, document.getElementsByTagName('div')[0]);

  //  运行状态，1 启动，0 停止
  const setRunStatus = (value) => localStorage.setItem('runStatus', value);

  const getRunStatus = (value) => localStorage.getItem('runStatus');

  const $changFileArr = document.getElementById('changcontent-select'); // 所有文件目录
  const $changFilename = document.getElementById('changcontent-file'); //  当前文件名称
  const $changIndex = document.getElementById('changcontent-index'); //  当前正在操作的index
  const $changBtn = document.getElementById('changcontent-btn'); //  自定义开始
  const $changCancel = document.getElementById('changcontent-cancel'); //  停止

  const $all = document.getElementById('changcontent-all'); //  总数据
  const $finish = document.getElementById('changcontent-finish'); //  已完成
  const $unfinish = document.getElementById('changcontent-unfinish'); //  未完成

  let statusData = {};

  const api = () => {};
  api.getInfo = (callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://192.168.4.111:9000/get/status?type=10', true);
    xhr.onreadystatechange = () => {
      //  成功
      if (xhr.readyState === 4) {
        callback(xhr);
      }
    };
    xhr.send();
  };

  api.setHtml = (data, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://192.168.4.111:9000/set/html', true);
    xhr.setRequestHeader('Content-Type', 'appivation/form-data');
    xhr.send(
      JSON.stringify(
        Object.assign({}, data, {
          type: 10,
        }),
      ),
    );

    xhr.onreadystatechange = () => {
      //响应信息返回后处理，在页面提示用户
      if (xhr.readyState === 4) {
        callback(xhr);
      }
    };
  };

  // 初始化
  const main = () => {
    api.getInfo((res) => {
      const ret = JSON.parse(res.response);
      const data = ret.result;
      let arrHtml = '';
      if (typeof data !== 'object' || !data.fileArr) {
        console.log('好像全部搞完了！！！！');
        setRunStatus(0);
        return;
      }
      for (let i = 0; i < data.fileArr.length; i += 1) {
        const item = data.fileArr[i];
        arrHtml += `<option value=${item}>${item}</option>`;
      }
      $changFileArr.innerHTML = arrHtml;
      $changFilename.innerText = data.data.name;
      $changIndex.innerText = data.index;
      $all.innerText = data.all;
      $finish.innerText = data.finish;
      $unfinish.innerText = data.all - data.finish;
      if (location.href === data.data.url) {
        //  他们相等
        const $html = document.querySelector('.listmain');
        if ($html) {
          const html = $html.innerHTML;
          api.setHtml({ html }, (htmlRes) => {
            const htmlBack = JSON.parse(htmlRes.response);
            try {
              console.log('ok。正在前往 ', htmlBack.result.data.name);
              setTimeout(() => {
                if (htmlBack.result.data.url && htmlBack.result.data.url !== 'undefined') {
                  location.href = htmlBack.result.data.url;
                } else {
                  console.log('全部搞完了！！！');
                  setRunStatus(0);
                }
              }, 2000);
            } catch (error) {
              console.log('全部搞完了！！！');
              setRunStatus(0);
            }
          });
        } else {
          console.error('页面报错啦！！！', new Date().toDateString());
          setTimeout(() => {
            location.reload();
          }, 2000);
        }
      } else {
        try {
          if (data.data.url && data.data.url !== 'undefined') {
            location.href = data.data.url;
          } else {
            console.log('全部搞完了！！！');
            setRunStatus(0);
          }
        } catch (error) {
          console.log('全部搞完了！！！');
          setRunStatus(0);
        }
      }
    });
  };

  const stop = () => {
    setRunStatus(0);
    $changBtn.style.display = 'block';
    $changCancel.style.display = 'none';
  };

  const start = () => {
    setRunStatus(1);
    $changBtn.style.display = 'none';
    $changCancel.style.display = 'block';
    main();
  };

  $changBtn.onclick = start;
  $changCancel.onclick = stop;

  console.log('getRunStatus()', getRunStatus());
  if (Number(getRunStatus())) {
    start();
  } else {
    stop();
  }
})();
