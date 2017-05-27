const Event = require('./Event');

class Engine {

  constructor(canvas){
    this.trace = (...data) => data.forEach(console.log);
    this.canvas = canvas;
    this.gfx = canvas && this.canvas.getContext('2d');
    this.objects = [];
    this.mouse = {};
    this.keys = [];
    this.io = null;
  }

  update(){
    this.objects.forEach(o => o.update());
  }

  render(){
    this.gfx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.objects.forEach(o => o.render(this.gfx));
  }

  run(){
    this.update();
    if(this.gfx){
      this.render();
      requestAnimationFrame(this.run.bind(this));
    }
    else setInterval(this.update.bind(this), 20);
  }

  add(obj){
    this.objects.push(obj);
  }

  listen(io){
    this.io = io;
    io.listeners.push(this);
    return io;
  }

  on(evt, data){
    if(evt === Event.MOUSE) this.mouse = data;
    else if(evt === Event.KEY) this.keys[data.which] = data.down;
  }

  resolve(engine){
    
  }

}

module.exports = Engine;
