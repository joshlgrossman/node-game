const Engine = require('../engine/Engine');
const Player = require('../engine/Player');
const Event = require('../engine/Event');
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
    engine.add(player.listen(input.route(socket)));
  }

  function update(state){
    engine.merge(state);
  }

  function run(){
    engine.update();
    engine.collisions();
    engine.render();
    requestAnimationFrame(run);
  }

  socket.on(Event.CONNECT, connect);
  socket.on(Event.UPDATE, update);

  requestAnimationFrame(run);

};
