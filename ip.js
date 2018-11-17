const axios = require('axios');

axios
  .get('https://pv.sohu.com/cityjson?ie=utf-8')
  .then((result) => {
    console.log('then', result);
  })
  .catch((err) => {
    console.log('catch', err);
  });
