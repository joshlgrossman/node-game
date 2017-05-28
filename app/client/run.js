const Engine = require('../game/Engine');
const Player = require('../game/Player');
const Event = require('../game/Event');
const Input = require('./Input');

module.exports = function(socket){

  const canvas = document.querySelector('canvas');
  canvas.width = 1024;
  canvas.height = canvas.width * window.innerHeight / window.innerWidth;

  const engine = new Engine(canvas).run();

  function connect(){
    const player = new Player(socket.id);
    const input = new Input(window);
    player.listen(input).route(socket);
    engine.add(player)
  }

  function update(state){
    engine.merge(state);
    engine.refresh();
  }

  socket.on(Event.CONNECT, connect);
  socket.on(Event.UPDATE, update);

};
