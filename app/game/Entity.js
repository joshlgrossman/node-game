const v = require('./Vector').factory;

class Entity {

  constructor(type = 'entity'){
    this.engine = null;
    this.smoothing = 0.75;
    this.pos = v(100,100);
    this.vel = v(0,0);
    this.rot = 0;
    this.friction = 250;
    this.type = type;
    this.stale = true;
  }

  remove(){
    this.engine && this.engine.remove(this);
    return this;
  }

  merge(entity){
    this.pos = this.pos.avg(0.75, entity.pos);
    this.vel = this.vel.avg(0.75, entity.vel);
    this.rot = entity.rot;
    this.type = entity.type;
    this.stale = false;
  }

  serialize(){
    this.stale = false;
    return {
      pos: this.pos.serialize(),
      vel: this.vel.serialize(),
      rot: this.rot,
      type: this.type
    };
  }

  move(delta){
    this.pos = this.pos.add(this.vel.scale(delta));
    if(this.vel.lengthSq > 0){
      const vel = this.vel.length - this.friction * delta;
      this.vel.length = Math.max(vel, 0);
    }
  }

  update(delta){
    this.move(delta);
  }

  render(gfx){
    gfx.fillStyle = 'red';
    gfx.fillRect(this.pos.x - 5, this.pos.y - 5, 10, 10);
  }

}

module.exports = Entity;
