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

// 加个空格测试全局git帐号

export default {
  reg,
};