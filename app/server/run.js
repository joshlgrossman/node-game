const Engine = require('../game/Engine');
const Player = require('../game/Player');
const Event = require('../game/Event');
const Socket = require('./Socket');

module.exports = function(io){

  const engine = new Engine().run();

  io.on(Event.CONNECT, sckt => {
    const player = new Player(sckt.id);
    const socket = new Socket(sckt);
    player.listen(socket);
    engine.add(player);
  });

  setInterval(() => {
    io.emit(Event.UPDATE, engine.serialize());
  }, 40);

};
