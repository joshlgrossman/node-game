const io = require('socket.io-client');
const game = require('./game');

window.addEventListener('load', () => {
  game(io());
});
