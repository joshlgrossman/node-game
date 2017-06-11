const v = require('./Vector').factory;
const Entity = require('./Entity');

class Bullet extends Entity {

  static get MAX_ALIVE(){ return 0.1; }
  static get MAX_LENGTH(){ return 2000; }
  static get TYPE(){ return 'bullet'; }

  constructor(from){
    super(Bullet.TYPE);
    this.from = from.id;
    this.pos = v(from.pos);
    this.rot = from.rot;
    this.vel = v(Math.cos(this.rot), Math.sin(this.rot));
    this.len = this.vel.scale(Bullet.MAX_LENGTH);
    this.aliveTime = 0;
    this.active = true;
  }

  update(delta){
    if((this.aliveTime += delta) >= Bullet.MAX_ALIVE)
      this.remove();
  }

  collisions(objects){
    if(!this.active) return;
    for(const id in objects){
      const obj = objects[id];
      if(id !== this.from && obj.type === 'player'){
        const rel = obj.pos.sub(this.pos);
        const dotprod = rel.multiply(this.vel);
        const proj = this.vel.scale(dotprod);
        const diff = proj.sub(rel).lengthSq;

        if(diff < obj.radius**2){
          const angle = Math.acos(dotprod / rel.length);
          if(angle < 1.57){ // pi/2
            obj.hit(10);
            this.len = proj;
            this.active = false;
            break;
          }
        }
      }
    }
  }

  render(gfx){
    gfx.lineWidth = 1;
    gfx.strokeStyle = '#555';
    gfx.beginPath();
    gfx.moveTo(this.pos.x, this.pos.y);
    gfx.lineTo(this.pos.x + this.len.x, this.pos.y + this.len.y);
    gfx.stroke();
  }

  serialize(){
    const result = Entity.prototype.serialize.call(this);
    result.from = this.from;
    return result;
  }

}

module.exports = Bullet;
