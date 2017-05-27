const io = require('socket.io-client');
const socket = io();

const v = require('../game/util/v');

const Engine = require('../game/Engine');
const Player = require('../game/Player');

function initialize(){

  let lmx = 0;
  let lmy = 0;

  const canvas = document.querySelector('canvas');
  canvas.width = 1024;
  canvas.height = canvas.width * window.innerHeight / window.innerWidth;

  const engine = new Engine(canvas);
  const player = new Player();

  player.pos = v(canvas.width/2, canvas.height/2);

  engine.add(player);
  engine.run();

  window.addEventListener('mousemove', me => {
    const x = me.pageX - lmx;
    const y = me.pageY - lmy;
    lmx = me.pageX;
    lmy = me.pageY;
    socket.emit('update', {x, y});
  });

  socket.on('response', data => {
    player.vel = v(data);
  });

}

window.addEventListener('load', initialize);
