const reg = new RegExp(/^(\d{1,4}).(\d{1,2}).(\d{1,2})(.\d{1,2})?(.\d{1,2})?(.\d{1,2})?/);

/**
 * 文本时间转成时间戳
 * @param {*} str 传入疑似时间的文本
 */
const getDateTime = (str) => {
  if (!reg.test(str)) {
    if (String(new Date(str)) === 'Invalid Date') return null;
    return str;
  }

  const msg = str.match(reg);
  const yy = msg[1];
  const MM = msg[2];
  const dd = msg[3];
  const HH = msg[4] ? msg[4].replace(/[^\d]/g, '') : 0;
  const mm = msg[5] ? msg[5].replace(/[^\d]/g, '') : 0;
  const SS = msg[6] ? msg[6].replace(/[^\d]/g, '') : 0;
  const time = new Date(`${yy}-${MM}-${dd}`).getTime();
  const ret =
    time + 1000 * ((Number(HH) || 0) * 60 * 60 + (Number(mm) || 0) * 60 + (Number(SS) || 0));
  return ret;
};

/**
 * 传入时间或文本，转成想要的格式
 * @param {*} str
 * @param {*} type default YYYY-MM-DD
 * @param {*} split 日期与时间中间的间隔用什么顶替，默认是一个空字符串 ' '
 */
const formatter = (str, type = 'YYYY-MM-DD', dSplit = '-', tSplit = ' ', mSplit = ':') => {
  if (!str) return null;
  const time = getDateTime(str);
  if (!time) return null;
  const date = new Date(time);

  const yy = String(date.getFullYear());
  let MM = String(date.getMonth() + 1);
  let dd = String(date.getDate());
  let HH = String(date.getHours());
  let mm = String(date.getMinutes());
  let SS = String(date.getSeconds());
  let MMM = String(date.getMilliseconds());
  if (MM.length < 2) MM = `0${MM}`;
  if (dd.length < 2) dd = `0${dd}`;
  if (HH.length < 2) HH = `0${HH}`;
  if (mm.length < 2) mm = `0${mm}`;
  if (SS.length < 2) SS = `0${SS}`;
  if (MMM.length < 2) {
    MMM = `00${MMM}`;
  } else if (MMM.length < 2) {
    MMM = `0${MMM}`;
  }

  let ret = '';
  switch (type.toUpperCase()) {
    case 'YYYY-MM-DD':
      ret = `${yy}${dSplit}${MM}${dSplit}${dd}`;
      break;
    case 'YYYY-MM-DD HH:MM:SS':
      ret = `${yy}${dSplit}${MM}${dSplit}${dd}${tSplit}${HH}${mSplit}${mm}${mSplit}${SS}`;
      break;
    case 'YYYY-MM-DD HH:MM:SS.MMM':
      ret = `${yy}${dSplit}${MM}${dSplit}${dd}${tSplit}${HH}${mSplit}${mm}${mSplit}${SS}.${MMM}`;
      break;
    default:
      break;
  }

  return ret;
};

module.exports = {
  getDateTime,
  formatter,
};
