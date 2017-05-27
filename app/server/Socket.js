const IO = require('../game/IO');
const Event = require('../game/Event');

class Socket extends IO {

  initialize(io){

    io.on(Event.CONNECT, socket => {

      socket.on(Event.MOUSE, me => {
        this.emit(Event.MOUSE, me);
      });

      socket.on(Event.KEY, ke => {
        this.emit(Event.KEY, ke);
      });

    });

  }

}

module.exports = Socket;
