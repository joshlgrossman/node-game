const v = require('./Vector').factory;
const Entity = require('./Entity');

class Bullet extends Entity {

  constructor(from){
    super('bullet');
    this.from = from.id;
    this.pos = v(from.pos);
    this.rot = from.rot;
    this.vel = v(Math.cos(this.rot), Math.sin(this.rot));
    this.aliveTime = 0;
  }

  update(delta){
    for(const id in this.engine.objects){
      const obj = this.engine.objects[id];
      if(id !== this.from && obj.type === 'player'){
        const rel = obj.pos.sub(this.pos);
        const proj = this.vel.scale(rel.multiply(this.vel));
        const diff = proj.sub(rel).lengthSq;

        if(diff < obj.radius**2){
        }
      }
    }

    if((this.aliveTime += delta) > 0.1) this.remove();
  }

  render(gfx){
    const lx = Math.cos(this.rot) * 2000;
    const ly = Math.sin(this.rot) * 2000;

    gfx.lineWidth = 1;
    gfx.strokeStyle = '#555';
    gfx.beginPath();
    gfx.moveTo(this.pos.x, this.pos.y);
    gfx.lineTo(this.pos.x + lx, this.pos.y + ly);
    gfx.stroke();
  }


}

module.exports = Bullet;
