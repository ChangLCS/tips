/**
 * 根据百度api与xlsx文档检索对应的坐标
 */

const axios = require('axios');

const api = axios.create({
  baseURL: 'http://api.map.baidu.com/geocoder/v2/',
  params: {
    output: 'json',
    ak: '50195cabfc2327d58430d7b385a79e65',
  },
});

const getPoint = (address, city) =>
  api.get('/', {
    params: {
      address,
      city,
    },
  });

module.exports = { getPoint };
