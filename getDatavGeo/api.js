const axios = require('axios');

const instance = axios.create({
  baseURL: 'https://geo.datav.aliyun.com/areas_v3/bound/',
  withCredentials: true,
  params: {},
  timeout: 0,
});

instance.interceptors.request.use(
  (request) => {
    const axiosRequest = {
      ...request,
      params: {},
    };
    return axiosRequest;
  },
  (error) => {
    // console.error(error);
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    // console.log('response', response);
    return response;
  },
  (error) => {
    // console.error(error);
    return Promise.reject(error);
  },
);
module.exports = instance;
