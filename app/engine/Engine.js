const Puppet = require('./Puppet');
const Bullet = require('./Bullet');

class Engine {

  constructor(canvas){
    this.canvas = canvas;
    this.gfx = canvas && canvas.getContext('2d');
    this.objects = [];
    this.removed = [];
    this.time = new Date().getTime();
  }

  update(){
    const time = new Date().getTime();
    const delta = (time - this.time)/1000;
    this.time = time;
    for(const id in this.objects) this.objects[id].update(delta);
  }

  collisions(){
    for(const id in this.objects) this.objects[id].collisions(this.objects);
  }

  render(){
    this.gfx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for(const id in this.objects) this.objects[id].render(this.gfx);
  }

  add(obj){
    if(obj.id) this.objects[obj.id] = obj;
    else this.objects.push(obj);
    return obj.engine = this;
  }

  remove(obj){
    if(obj.id){
      delete this.objects[obj.id];
      this.removed[obj.id] = obj;
    } else {
      this.objects.splice(this.objects.indexOf(obj), 1);
      this.removed.push(obj);
    }
    return this;
  }

  merge(state){
    for(const id in state) {
      const stateObj = state[id];
      if(id in this.objects){
        this.objects[id].merge(stateObj);
      } else {
        let obj;
        switch(stateObj.type){
          case Puppet.TYPE:
            obj = new Puppet(id);
            break;
          case Bullet.TYPE:
            obj = new Bullet(this.objects[stateObj.from]);
            break;
        }
        obj.merge(stateObj);
        this.add(obj);
      }
    }
    return this;
  }

  serialize(){
    let state = null;
    for(const id in this.objects){
      if(this.objects[id].stale){
        if(!state) state = {};
        state[id] = this.objects[id].serialize();
      }
    }
    for(const id in this.removed){
      if(!state) state = {};
      state[id] = false;
    }
    this.removed = [];
    return state;
  }

}

module.exports = Engine;
