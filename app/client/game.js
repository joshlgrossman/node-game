const Engine = require('../game/Engine');
const Player = require('../game/Player');
const Event = require('../game/Event');
const Input = require('./Input');

module.exports = function(socket){

  const canvas = document.querySelector('canvas');
  canvas.width = 1024;
  canvas.height = canvas.width * window.innerHeight / window.innerWidth;

  const scale = {
    x: canvas.width / window.innerWidth,
    y: canvas.height / window.innerHeight
  };

  const engine = new Engine(canvas);

  function connect(){
    const player = new Player(socket.id);
    const input = new Input(window,scale);
    player.listen(input).route(socket);
    engine.add(player)
  }

  function update(state){
    engine.merge(state);
  }

  function run(){
    engine.update();
    engine.render();
    requestAnimationFrame(run);
  }

  socket.on(Event.CONNECT, connect);
  socket.on(Event.UPDATE, update);

  requestAnimationFrame(run);

};
