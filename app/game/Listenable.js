const Event = require('./Event');

const Listenable = Base => class extends Base {

  constructor(...args){
    super(...args);
    this.keys = [];
    this.mouse = {};
    this.stale = false;
  }

  listen(io){
    io.listeners.push(this);
    return io;
  }

  remove(){}

  on(evt, data){
    if(evt === Event.MOUSE) this.mouse = data;
    else if(evt === Event.KEY) this.keys[data.which] = data.down;
    else if(evt === Event.DISCONNECT) this.remove();
    this.stale = true;
    return this;
  }

};

module.exports = Listenable;
