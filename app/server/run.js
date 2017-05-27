const Engine = require('../game/Engine');
const Player = require('../game/Player');
const Socket = require('./Socket');

module.exports = function(io){

  const engine = new Engine();
  const player = new Player(engine);
  const socket = new Socket(io).route(engine);

  engine.add(player);
  engine.run();

};
