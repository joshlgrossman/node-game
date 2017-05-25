let config;

try {
  config = require('../../server.config.js');
} catch (e) {
  config = {};
}

module.exports = _.extend({

  port: 3000,

  on: {
    start: function(){
      console.log('running');
    }
  }

}, config);
