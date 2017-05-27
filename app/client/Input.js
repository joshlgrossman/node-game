const IO = require('../game/IO');
const Event = require('../game/Event');

class Input extends IO {

  initialize(wndw){
    let mouseDown = false;
    const center = {
      x: wndw.innerWidth/2,
      y: wndw.innerHeight/2
    }

    const mouseEvent = (type,me) => {
      if(type === Event.MOUSE_DOWN && !me.button) mouseDown = true;
      else if(type === Event.MOUSE_UP && !me.button) mouseDown = false;
      return {
        pos: {x: me.clientX - center.x, y: me.clientY - center.y},
        vel: {x: me.movementX, y: me.movementY},
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
