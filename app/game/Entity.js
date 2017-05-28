const v = require('./v');

class Entity {

  constructor(){
    this.engine = null;
    this.pos = v(100,100);
    this.vel = v(0,0);
    this.rot = 0;
  }

  remove(){
    this.engine && this.engine.remove(this);
    return this;
  }

  merge(entity){
    this.pos = v(entity.pos);
    this.vel = v(entity.vel);
    this.rot = entity.rot;
  }

}

module.exports = Entity;
