var obj = {};

Object.defineProperty(obj, 'hello', {
  get: function() {
    //  我们在这里拦截到数据
    console.log('get方法被调用');
  },
  set: function(value) {
    //  改变数据的值
    document.getElementById('test').value = value;
    document.getElementById('test-div').innerHTML = value;
  },
});

document.getElementById('test').addEventListener('input', function(e) {
  obj.hello = e.target.value;
});
