const Puppet = require('./Puppet');

class Engine {

  constructor(canvas){
    this.trace = (...data) => data.forEach(console.log);
    this.canvas = canvas;
    this.gfx = canvas && this.canvas.getContext('2d');
    this.objects = [];
    this.time = {
      current: new Date().getTime(),
      previous: 0,
      delta: 0
    }
  }

  update(){
    for(const id in this.objects) this.objects[id].update(this.time.delta);
  }

  render(){
    this.gfx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for(const id in this.objects) this.objects[id].render(this.gfx);
  }

  run(){
    this.time.previous = this.time.current;
    this.time.current = new Date().getTime();
    this.time.delta = (this.time.current - this.time.previous)/1000;
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
    objs.forEach(obj => {
      if(obj.id) this.objects[obj.id] = obj;
      else this.objects.push(obj);
      obj.engine = this;
    });
    return this;
  }

  remove(...objs){
    objs.forEach(obj => {
      if(obj.id) delete this.objects[obj.id];
      else this.objects.splice(this.objects.indexOf(obj), 1)
      obj.engine = null;
    });
    return this;
  }

  merge(state){
    for(const id in state) {
      if(id in this.objects){
        this.objects[id].merge(state[id]);
      } else {
        const puppet = new Puppet(id);
        this.add(puppet);
      }
    }
    return this;
  }

  serialize(){
    const state = {};
    let stale = false;
    for(const id in this.objects) {
      if(this.objects[id].stale){
        stale = true;
        state[id] = this.objects[id].serialize();
      }
    }
    return stale ? state : null;
  }

  refresh(){
    for(const id in this.objects) this.objects[id].stale = false;
    return this;
  }

}

module.exports = Engine;
