const axios = require('axios');
const fs = require('fs');
const path = require('path');
const addressJson = require('./libs/tms地址表.json');
const successData = require('./libs/success.json');
const noResultJson = require('./libs/noResult.json');

// const base = { key: '6OXBZ-46NKF-BX3JZ-JNM34-53A3V-IJFIR' }; //  TMS自身使用，尽量别用这个
const base = { key: 'XVGBZ-NIGED-HKD4Q-P5XT4-TVFU3-PPFJP' }; // HWYP-SERVER
// const base = { key: 'BGHBZ-GDCLK-WDCJE-AQWIE-MKIPE-ZEBVX' }; //  测试版-B2B
// const base = { key: 'NHLBZ-6AW3G-IHCQI-QWDUE-ZFCX7-BIFDJ' };
// const base = { key: 'GNGBZ-ZJNE4-EUSUD-X6IMZ-UOOM3-HCF5J' };
// const base = { key: 'EKQBZ-S77KI-S3XGC-5GAH7-DSJ3E-GZFBP' };

const api = axios.create({
  baseURL: 'https://apis.map.qq.com',
});

const apiPath = {
  qqAddressToPoint: '/ws/geocoder/v1',
};

const retList = []; //  有效结果
const errList = []; //  错误结果

let addressListAll = []; //  当前还有的地址列表
let addressHasList = []; //  有效的能拿来计算的地址列表

//  最终结果
const endFn = () => {
  const successSrc = path.resolve(__dirname, './libs/success.json');
  const errorSrc = path.resolve(__dirname, './libs/error.json');

  console.log('successSrc', successSrc);
  console.log('errorSrc', errorSrc);

  fs.writeFileSync(successSrc, JSON.stringify(retList));
  fs.writeFileSync(errorSrc, JSON.stringify(errList));

  console.log('本次计算', '现有地址总数：', addressListAll.length);
  console.log('本次计算', '有效的地址：', addressHasList.length);
  console.log('本次计算', '实际计算值：', 10000);
  console.log('本次计算', '成功地址：', retList.length);
  console.log('本次计算', '失败地址：', errList.length);
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
  if (!item) {
    endFn();
    return;
  }

  const text = [
    item.province_name || '',
    item.city_name || '',
    item.county_name || '',
    item.address_full || '',
  ].join('');

  getQqAddressToPoint(text)
    .then((res) => {
      const data = res.data.result;
      if (!data) {
        errList.push({
          ...item,
          $message: res.data.message,
        });
        console.log('失败', i, item.id, item.customer_name, text, res.data.message);
      } else {
        const x = {
          ...item,
          longitude: data.location.lng,
          latitude: data.location.lat,
        };

        console.log('成功', i, item.customer_name, text);
        retList.push(x);
      }

      //  250ms后再执行地址
      setTimeout(() => {
        goGetAddress(i + 1, allData);
      }, 250);
    })
    .catch((error) => {
      console.log('失败', i, item.customer_name, item.address_info);
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
  const filterData = data.filter((e) => e.address_full);

  const calcData = filterData.slice(0, 5000);
  console.log('calcData,', calcData);

  addressListAll = data;
  addressHasList = filterData;

  goGetAddress(0, calcData);
};

//  生成更新经纬度的sql
const goSqlText = () => {
  let all = '';
  for (let i = 0; i < successData.length; i += 1) {
    const item = successData[i];
    const str = `UPDATE dis_address SET longitude = '${item.longitude}',latitude = '${item.latitude}'  WHERE id = '${item.id}';\n`;
    all += str;
  }

  const updateSrc = path.resolve(__dirname, './libs/update.sql');
  fs.writeFileSync(updateSrc, all);

  console.log('文件保存成功');
};

// 调用腾讯位置服务获取坐标
// dataInit();
// return; 

//  生成更新坐标的sql
goSqlText();
