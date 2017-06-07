const IO = require('../engine/IO');
const Event = require('../engine/Event');

class Input extends IO {

  constructor(src, {x=1, y=1}){
    super(src);
    this.scl = {x,y};
  }

  initialize(wndw){
    let mouseDown = false;

    const mouseEvent = (type, me) => {
      if(type === Event.MOUSE_DOWN && !me.button) mouseDown = true;
      else if(type === Event.MOUSE_UP && !me.button) mouseDown = false;
      return {
        pos: {x: me.clientX * this.scl.x, y: me.clientY * this.scl.y},
        vel: {x: me.movementX * this.scl.x, y: me.movementY * this.scl.y},
        down: mouseDown,
        which: me.button
      }
    }

    const keyEvent = (type,ke) => {
      return {
        down: type === Event.KEY_DOWN,
        which: ke.which
      }
    }

    wndw.addEventListener(Event.MOUSE_MOVE, me => {
      this.emit(Event.MOUSE, mouseEvent(Event.MOUSE_MOVE, me))
    });

    wndw.addEventListener(Event.MOUSE_DOWN, me => {
      this.emit(Event.MOUSE, mouseEvent(Event.MOUSE_DOWN, me))
    });

    wndw.addEventListener(Event.MOUSE_UP, me => {
      this.emit(Event.MOUSE, mouseEvent(Event.MOUSE_UP, me));
    });

    wndw.addEventListener(Event.KEY_DOWN, ke => {
      this.emit(Event.KEY, keyEvent(Event.KEY_DOWN, ke));
    });

    wndw.addEventListener(Event.KEY_UP, ke => {
      this.emit(Event.KEY, keyEvent(Event.KEY_UP, ke));
    });
  }

}

module.exports = Input;
