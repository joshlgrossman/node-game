const v = require('./Vector').factory;

class Entity {

  constructor(){
    this.engine = null;
    this.smoothing = 0.75;
    this.pos = v(100,100);
    this.vel = v(0,0);
    this.rot = 0;
  }

  remove(){
    this.engine && this.engine.remove(this);
    return this;
  }

  merge(entity){
    this.pos = this.pos.avg(0.75, entity.pos);
    this.vel = this.vel.avg(0.75, entity.vel);
    this.rot = this.rot * 0.25 + entity.rot * 0.75;
  }

  serialize(){
    return {
      pos: this.pos.serialize(),
      vel: this.vel.serialize(),
      rot: this.rot
    }
  }

}

module.exports = Entity;
