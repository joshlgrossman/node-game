const Event = require('./Event');

class Engine {

  constructor(canvas){
    this.trace = (...data) => data.forEach(console.log);
    this.canvas = canvas;
    this.gfx = canvas && this.canvas.getContext('2d');
    this.objects = [];
    this.mouse = {};
    this.keys = [];
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
    this.gfx && this.render();
    requestAnimationFrame(this.run.bind(this));
  }

  add(obj){
    this.objects.push(obj);
  }

  on(evt, data){
    if(evt === Event.MOUSE) this.mouse = data;
    else if(evt === Event.KEY) this.keys[data.which] = data.down;
  }

}

module.exports = Engine;
