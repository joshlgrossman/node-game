const Engine = require('../game/Engine');
const Player = require('../game/Player');
const Event = require('../game/Event');
const Socket = require('./Socket');

module.exports = function(io){

  const engine = new Engine();

  function connect(sckt){
    const player = new Player(sckt.id);
    const socket = new Socket(sckt);
    player.listen(socket);
    engine.add(player);
  }

  function update(){
    const state = engine.serialize();
    if(state) io.emit(Event.UPDATE, state);
  }

  function run(){
    engine.update();
    update();
  }

  io.on(Event.CONNECT, connect);
  setInterval(run, 40);

};
