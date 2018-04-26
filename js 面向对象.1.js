function Person(name, age, sex) {
  this.name = name;
  this.age = age;
  this.sex = sex;
  this.who = function() {
    console.log(name, age, sex);
  };
}

Person.prototype.say = function() {
  console.log('this', this);
  console.log('说些什么', this.name, this.age, this.sex);
};

var boy = new Person('男孩', 18, '男');
var girl = new Person('女孩', 18, '女');

boy.who();
boy.say();

girl.who();
girl.say();

/**
 * boy 跟 girl 都是一个Person 对象
 * -----------------------------------------------------------
 * this.who 跟 Person.prototype.say 的区别
 * boy 跟 girl 都有独立的 who 事件，但他们共用一个 say 事件，所以，一般公共的function用prototype
 * -----------------------------------------------------------
 */
