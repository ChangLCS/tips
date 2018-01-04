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

export default {
  reg,
};