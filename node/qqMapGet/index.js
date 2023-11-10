const axios = require('axios');
const fs = require('fs');
const path = require('path');
const addressJson = require('./libs/tms地址表.json');
const successData = require('./libs/success.json');

const base = { key: '6OXBZ-46NKF-BX3JZ-JNM34-53A3V-IJFIR' };

const api = axios.create({
  baseURL: 'https://apis.map.qq.com',
});

const apiPath = {
  qqAddressToPoint: '/ws/geocoder/v1',
};

const retList = []; //  有效结果
const errList = []; //  错误结果

//  最终结果
const endFn = () => {
  const successSrc = path.resolve(__dirname, './libs/success.json');
  const errorSrc = path.resolve(__dirname, './libs/error.json');

  console.log('successSrc', successSrc);
  console.log('errorSrc', errorSrc);

  fs.writeFileSync(successSrc, JSON.stringify(retList));
  fs.writeFileSync(errorSrc, JSON.stringify(errList));
};

//  传地址，获取ip
const getQqAddressToPoint = (address) =>
  api.get(apiPath.qqAddressToPoint, { params: { key: base.key, address } });

const goGetAddress = (i, allData) => {
  // if (i >= 1) {
  if (i >= allData.length) {
    endFn();
    return;
  }

  const item = allData[i];

  getQqAddressToPoint(item.address_info)
    .then((res) => {
      const data = res.data.result;
      if (!data) {
        errList.push({
          ...item,
          $message: res.data.message,
        });
        console.log('失败', item.customer_name, item.address_info, res.data.message);
      } else {
        const x = {
          ...item,
          lon: data.location.lng,
          lat: data.location.lat,
        };

        console.log('成功', item.customer_name);
        retList.push(x);
      }

      //  1s后再执行地址
      setTimeout(() => {
        goGetAddress(i + 1, allData);
      }, 1000);
    })
    .catch((error) => {
      console.log('失败', item.customer_name, item.address_info);
      errList.push({
        ...item,
        $message: error.message,
      });

      //  1s后再执行地址
      goGetAddress(i + 1, allData);
    });
};

//  数据处理
const dataInit = () => {
  const data = addressJson.RECORDS;
  const filterData = data.filter((e) => e.address_info && !/~|\//.test(e.address_info));

  const calcData = filterData.slice(0, 10000);
  console.log('calcData,', calcData);

  goGetAddress(0, calcData);
};

// dataInit();

//  生成更新经纬度的sql
const goSqlText = () => {
  let all = '';
  for (let i = 0; i < successData.length; i += 1) {
    const item = successData[i];
    const str = `UPDATE tms_address SET lon = '${item.lon}',lat = '${item.lat}'  WHERE id = '${item.id}';\n`;
    all += str;
  }

  const updateSrc = path.resolve(__dirname, './libs/update.sql');
  fs.writeFileSync(updateSrc, all);
};

goSqlText();
