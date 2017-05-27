const Engine = require('../game/Engine');
const Player = require('../game/Player');
const Input = require('./Input');

module.exports = function(socket){

  const canvas = document.querySelector('canvas');
  canvas.width = 1024;
  canvas.height = canvas.width * window.innerHeight / window.innerWidth;

  const engine = new Engine(canvas);
  const player = new Player(engine);
  const input = new Input(window).route(engine);

  engine.add(player);
  engine.run();

};
