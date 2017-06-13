const v = require('./Vector').factory;

class Entity {

  constructor(type = 'entity'){
    this.engine = null;
    this.smoothing = 0.75;
    this.pos = v();
    this.vel = v();
    this.rot = 0;
    this.friction = 250;
    this.type = type;
    this.stale = true;
    this.active = true;
  }

  remove(){
    this.engine && this.engine.remove(this);
    return this;
  }

  merge(entity){
    if(!entity) return this.remove();
    this.pos = this.pos.avg(0.75, entity.pos);
    this.vel = this.vel.avg(0.75, entity.vel);
    this.rot = entity.rot;
    this.type = entity.type;
    this.active = entity.active;
    this.stale = false;
    return this;
  }

  serialize(){
    this.stale = false;
    return {
      pos: this.pos.serialize(),
      vel: this.vel.serialize(),
      rot: this.rot,
      type: this.type,
      active: this.active
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

  collisions(objects){}

}

module.exports = Entity;
