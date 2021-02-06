const path = require('path');
const fs = require('fs');
const ffmetadata = require('ffmetadata');
const ffmpeg = require('ffmpeg');

const config = {
  baseUrl: 'E:/BaiduNetdiskDownload/邓丽君诞生六十周年特藏《君之千言万语》 40CD',
  wavUrl: 'E:/wav',
  mp3Url: 'E:/mp3',
};

const list = fs.readdirSync(path.resolve(config.baseUrl));

//  转格式为MP3
const toMP3 = (oldPath = '', mp3Name = '') =>
  new Promise((resolve, reject) => {
    const process = new ffmpeg(oldPath);
    process.then(
      (video) => {
        console.log(video);
        // video.setAudioBitRate(320).fnExtractSoundToMP3(mp3Name, (error, file) => {
        //   if (!error) {
        //     reject(error);
        //   }
        //   resolve();
        // });
        if (fs.existsSync(mp3Name)) {
          fs.unlinkSync(mp3Name);
        }
        video.setAudioBitRate(320).save(mp3Name, (error, file) => {
          if (error) {
            reject(error);
          }
          resolve(file);
        });
        // video.fnExtractSoundToMP3(mp3Name, (error, file) => {
        //   if (!error) {
        //     reject(error);
        //   }
        //   resolve();
        // });
      },
      (error) => {
        reject(error);
      },
    );
  });

//  配置歌曲信息
const setInfo = (filePath, option) =>
  new Promise((resolve, reject) => {
    ffmetadata.write(filePath, option, (error) => {
      if (error) {
        reject(error);
      }
      resolve();
    });
  });

(async () => {
  //  定义新生成的文件真实名称，然后转换
  const retList = [];

  //  生成mp3代码，先注释，已经全部生成完成了
  // for (let i = 0; i < list.length; i += 1) {
  //   const item = list[i];
  //   const sonUrl = path.resolve(config.baseUrl, item);
  //   const stats = fs.lstatSync(sonUrl);
  //   if (stats.isDirectory()) {
  //     const sonList = fs.readdirSync(sonUrl);
  //     console.log('sonList', sonList);
  //     for (let j = 0; j < sonList.length; j += 1) {
  //       const son = sonList[j];
  //       console.log('son son son', son);
  //       if (/\.wav/.test(son)) {
  //         const wavPath = path.resolve(sonUrl, son);
  //         const nameReg = new RegExp(/([^\s]*)\s\-\s([^.]*)\.wav/);
  //         const match = son.match(nameReg);
  //         const option = {
  //           artist: match[1] || null,
  //           title: match[2] || null,
  //           disc: item,
  //         };
  //         const wavName = path.resolve(config.wavUrl, `${[i, j].join('-')}.wav`);
  //         const mp3Name = path.resolve(config.mp3Url, `${[i, j].join('-')}.mp3`);
  //         const relMp3Name = wavPath.replace(/\.wav/, '.mp3');
  //         const x = {
  //           mp3Name,
  //           relMp3Name,
  //         };

  //         try {
  //           if (!fs.existsSync(x.relMp3Name)) {
  //             // await setInfo(wavPath, option);
  //             //  转MP3
  //             fs.copyFileSync(wavPath, wavName);
  //             const file = await toMP3(wavName, mp3Name);
  //             console.log('file', file);
  //             retList.push(x);
  //             fs.renameSync(x.mp3Name, x.relMp3Name);
  //           }
  //         } catch (error) {
  //           console.error(error.message);
  //         }
  //       }
  //     }
  //   }
  // }

  //  将所有文件夹的结果汇总到MP3
  // const nameJSON = {};
  // const nameList = [];
  // for (let i = 0; i < list.length; i += 1) {
  //   const item = list[i];
  //   const sonUrl = path.resolve(config.baseUrl, item);
  //   const stats = fs.lstatSync(sonUrl);
  //   if (stats.isDirectory()) {
  //     const sonList = fs.readdirSync(sonUrl);
  //     console.log('sonList', sonList);
  //     for (let j = 0; j < sonList.length; j += 1) {
  //       const son = sonList[j];
  //       if (/\.mp3/.test(son)) {
  //         if (!nameJSON[son]) {
  //           nameJSON[son] = 0;
  //         }
  //         console.log('son son son', son);
  //         const sonPath = path.resolve(sonUrl, son);
  //         const nameReg = new RegExp(/(.*)\.mp3/);
  //         const match = son.match(nameReg);
  //         const name = match[1];
  //         nameList.push(name);
  //         let retSon = son;

  //         if (nameList.includes(name)) {
  //           nameJSON[son] += 1;
  //           retSon = `${name}${nameJSON[son]}.mp3`;
  //         }
  //         const retPath = path.resolve(config.mp3Url, son);

  //         try {
  //           fs.copyFileSync(sonPath, retPath);
  //           nameList.push(name);
  //         } catch (error) {
  //           console.error(retSon, error.message);
  //         }
  //       }
  //     }
  //   }
  // }

  //  修改文件基础信息
  const mp3List = fs.readdirSync(path.resolve(config.mp3Url));
  const nameReg = new RegExp(/([^\s]*)\s\-\s([^.]*)\.mp3/);
  for (let i = 0; i < mp3List.length; i += 1) {
    const item = mp3List[i];
    try {
      const match = item.match(nameReg);
      const option = {
        artist: match[1] || null,
        title: match[2] || null,
      };
      const oldPath = path.resolve(config.mp3Url, item);
      await setInfo(oldPath, option);
      console.log('ok', item);
    } catch (error) {
      console.error('error', item, error.message);
    }
  }
})();
