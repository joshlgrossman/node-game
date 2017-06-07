const IO = require('../engine/IO');
const Event = require('../engine/Event');

class Socket extends IO {

  initialize(socket){

    socket.on(Event.MOUSE, me => {
      this.emit(Event.MOUSE, me);
    });

    socket.on(Event.KEY, ke => {
      this.emit(Event.KEY, ke);
    });

    socket.on(Event.DISCONNECT, () => {
      this.emit(Event.DISCONNECT, {});
    });

  }

}

module.exports = Socket;
