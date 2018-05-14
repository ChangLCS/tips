/**
 * mysql 模块的简单使用方法，mysql初始化写在config里面了。。。
 */

'use strict';

const mysql = require('./config');

//  创建连接
mysql.connect();

/*
 * 执行所有操作都用 query 方法，自定义sql语句
 * sql 语句中用 ? 来定义参数，之后的数组根据位置传进去  （此处可以封装一个方法，方便重复调用）
 * mysql 其它的函数，都还没用过，这个是最简单的使用方法，其它的需要再看看，多看文档 --!
 */
mysql.query(
  'SELECT * FROM wx_users WHERE id = ? OR openId = ? ',
  [1, ''],
  (error, results, fields) => {
    console.error('错误信息', error);
    console.error('成功之后的返回结果', results);
    console.error('不清楚是什么，暂时没用到', fields);
  },
);

//  关闭连接
mysql.end();
