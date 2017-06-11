const Engine = require('../engine/Engine');
const Player = require('../engine/Player');
const Event = require('../engine/Event');
const Socket = require('./Socket');

module.exports = function(io){

  const engine = new Engine();

  function connect(sckt){
    const player = new Player(sckt.id);
    const socket = new Socket(sckt);
    engine.add(player.listen(socket));
  }

  function update(){
    const state = engine.serialize();
    if(state) io.emit(Event.UPDATE, state);
  }

  function run(){
    engine.update();
    engine.collisions();
    update();
  }

  io.on(Event.CONNECT, connect);
  setInterval(run, 40);

};
