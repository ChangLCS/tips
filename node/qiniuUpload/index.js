const fs = require('fs');
const path = require('path');
const qiniu = require('qiniu');
const config = require('./config');

/**
 * 上传方法
 * key 服务器地址
 * localFile 文件本地地址
 */
const uploadFile = (key, localFile) =>
  new Promise((resolve, reject) => {
    const mac = new qiniu.auth.digest.Mac(config.accessKey, config.secretKey);
    const putPolicy = new qiniu.rs.PutPolicy({ scope: `${config.bucket}:${key}` }); //  覆盖上传必须填入key
    const uploadToken = putPolicy.uploadToken(mac);
    const qiniuConfig = new qiniu.conf.Config();
    qiniuConfig.zone = qiniu.zone.Zone_z2;

    const formUploader = new qiniu.form_up.FormUploader(qiniuConfig);
    const putExtra = new qiniu.form_up.PutExtra();

    console.log('uploadFile', uploadToken, key, localFile, putExtra);
    formUploader.putFile(uploadToken, key, localFile, putExtra, (respErr, respBody, respInfo) => {
      console.log('uploadFile OK ', key, localFile);
      if (respErr) {
        reject(respErr);
      }
      if (respInfo.statusCode == 200) {
        resolve(respBody);
      } else {
        reject(respBody);
      }
    });
  });

/**
 * 修改名称
 * srcKey 原位置
 * destKey 修改后的位置
 */
const renameFile = (srcKey, destKey) =>
  new Promise((resolve, reject) => {
    const mac = new qiniu.auth.digest.Mac(config.accessKey, config.secretKey);
    const qiniuConfig = new qiniu.conf.Config();
    qiniuConfig.zone = qiniu.zone.Zone_z2;
    const bucketManager = new qiniu.rs.BucketManager(mac, config);

    // 强制覆盖已有同名文件
    const options = {
      force: true,
    };

    console.log('srcKey', srcKey, 'destKey', destKey);
    bucketManager.move(
      config.bucket,
      srcKey,
      config.bucket,
      destKey,
      options,
      (respErr, respBody, respInfo) => {
        if (respErr) {
          reject(respErr);
        }
        if (respInfo.statusCode == 200) {
          resolve(respBody);
        } else {
          reject(respBody);
        }
      },
    );
  });

const basePath = path.resolve(__dirname, '../../geoJSON');
console.log('basePath', basePath);

const allFilePath = []; //  所有需要上传的文件

const baseKey = 'geo/base';
const baseList = fs.readdirSync(path.resolve(basePath, `.${baseKey}`));
baseList.map((item) => {
  const data = {
    key: `${baseKey}/${item}`,
    localFile: path.resolve(basePath, `.${baseKey}`, item),
  };
  allFilePath.push(data);
});

const fullKey = 'geo/full';
const fullList = fs.readdirSync(path.resolve(basePath, `.${fullKey}`));
fullList.map((item) => {
  const data = {
    key: `${fullKey}/${item}`,
    localFile: path.resolve(basePath, `.${fullKey}`, item),
  };
  allFilePath.push(data);
});

(async () => {
  const errorArr = [];
  for (let i = 0; i < allFilePath.length; i += 1) {
    const item = allFilePath[i];
    try {
      await uploadFile(item.key, item.localFile);
      // await renameFile(item.key, item.key);
      console.log('完成1 ', i);
    } catch (error) {
      errorArr.push({
        index: i,
        error,
      });
      console.error(error.message);
    }
  }

  console.log('errorArr', errorArr.length, errorArr);
})();
