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
    this.time = {
      current: new Date().getTime(),
      previous: 0,
      delta: 0
    }
  }

  get delta(){
    return this.time.delta/1000;
  }

  update(){
    this.objects.forEach(o => o.update());
  }

  render(){
    this.gfx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.objects.forEach(o => o.render(this.gfx));
  }

  run(){
    this.time.previous = this.time.current;
    this.time.current = new Date().getTime();
    this.time.delta = this.time.current - this.time.previous;
    this.update();
    if(this.gfx){
      this.render();
      requestAnimationFrame(this.run.bind(this));
    } else {
      setTimeout(this.run.bind(this), 50);
    }
    return this;
  }

  add(...objs){
    objs.forEach(obj => this.objects.push(obj));
    return this;
  }

  listen(io){
    this.io = io;
    io.listeners.push(this);
    return io;
  }

  on(evt, data){
    if(evt === Event.MOUSE) this.mouse = data;
    else if(evt === Event.KEY) this.keys[data.which] = data.down;
    return this;
  }

  resolve(engine){
    return this;
  }

}

module.exports = Engine;
