// import CryptoJS from 'crypto-js';
// import moment from 'moment';
const CryptoJS = require('crypto-js');

const config = {
  passwordKey: 'login.qywgpo.com',
};
//  将参数加密传输给后台
const encryptDES = (str) => {
  if (!str && str !== 0 && str !== '') return str;
  return CryptoJS.DES.encrypt(str, CryptoJS.enc.Utf8.parse(config.passwordKey), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();
};

//  是否base64
const isBase64 = (str) => {
  try {
    if (str === '' || str.trim() === '') {
      return false;
    }
    return Boolean(btoa(atob(str)) === str);
  } catch (error) {
    return false;
  }
};

//  解密
const decryptDES = (str, isAll = true) => {
  try {
    if (str === encryptDES('')) {
      return '';
    }
    const result = CryptoJS.DES.decrypt(str, CryptoJS.enc.Utf8.parse(config.passwordKey), {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }).toString(CryptoJS.enc.Utf8);

    // if (isAll && result && isBase64(result)) {
    //   return decryptDES(result);
    // }
    return result || str;
  } catch (error) {
    return str;
  }
};

module.exports = {
  encryptDES,
  decryptDES,
  isBase64,
};
