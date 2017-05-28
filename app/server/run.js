const Engine = require('../game/Engine');
const Player = require('../game/Player');
const Event = require('../game/Event');
const Socket = require('./Socket');

module.exports = function(io){

  const engine = new Engine().run();

  function connect(sckt){
    const player = new Player(sckt.id);
    const socket = new Socket(sckt);
    player.listen(socket);
    engine.add(player);
  }

  function update(){
    io.emit(Event.UPDATE, engine.serialize());
    engine.refresh();
  }

  io.on(Event.CONNECT, connect);
  setInterval(update, 40);

};
