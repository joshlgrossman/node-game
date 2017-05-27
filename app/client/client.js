const io = require('socket.io-client');
const run = require('./run');

window.addEventListener('load', () => {
  run(io());
});
