let reg = new RegExp();

//  匹配数字（包括-+号，整数，小数）
reg = new RegExp(/^[-+]?\d*\.?\d+$/);

/**
 * 正则中
 * *  匹配0-n个
 * +  匹配1-n个
 * {n}  一定要n个
 * {n, m} n到m个
 */

//  匹配console.log (前半段包括了 回车、空格、/)
reg = new RegExp(/([\n\s/]*)console\.log\(.*?\);/);

// 必须含有数字且字母
reg = new RegExp(/([0-9].*[A-Za-z]|[A-Za-z].*[0-9])/);

//  给数字加千分号
const toPerThousandSign = (value) => value.replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');

export default {
  reg,
  toPerThousandSign,
};
