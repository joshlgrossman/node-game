const v = require('./Vector').factory;
const Entity = require('./Entity');

class Puppet extends Entity {

  static get MAX_HP(){ return 100; }
  static get TYPE(){ return 'player'; }

  static randomColor(){
    const angle1 = Math.random() * 6.2832;  // 2pi
    const angle2 = angle1 + 1.0472; // pi/3
    const sin1 = Math.sin(angle1);
    const r = ((Math.cos(angle1) * 100)|0) + 155;
    const g = ((sin1 * Math.cos(angle2) * 100)|0) + 155;
    const b = ((sin1 * Math.sin(angle2) * 100)|0) + 155;
    return {
      light: `rgb(${r},${g},${b})`,
      dark: `rgb(${r>>1},${g>>1},${b>>1})`
    };
  }

  constructor(id){
    super(Puppet.TYPE);
    this.id = id;
    this.color = Puppet.randomColor();
    this.radius = 15;
    this.hp = Puppet.MAX_HP;
  }

  render(gfx){
    const lx = Math.cos(this.rot) * (this.radius + 10);
    const ly = Math.sin(this.rot) * (this.radius + 10);

    gfx.lineWidth = 4;
    gfx.strokeStyle = '#555';
    gfx.beginPath();
    gfx.moveTo(this.pos.x, this.pos.y);
    gfx.lineTo(this.pos.x + lx, this.pos.y + ly);
    gfx.stroke();

    gfx.fillStyle = this.color.light;
    gfx.strokeStyle = this.color.dark;
    gfx.beginPath();
    gfx.arc(this.pos.x, this.pos.y, this.radius, 0, 6.2832);
    gfx.stroke();
    gfx.fill();
  }

  collisions(objects){
    for(const id in objects){
      const obj = objects[id];
      if(id !== this.id && obj.type === Puppet.TYPE){
        let delta = this.pos.sub(obj.pos);
        const dist = delta.length;
        const radius = this.radius + obj.radius;
        if(dist < radius){
          if(dist === 0) delta = v(radius/2, 0);
          else delta.length = (radius - dist)/2;
          this.pos = this.pos.add(delta);
          obj.pos = obj.pos.sub(delta);
        }
      }
    }
  }

  hit(dmg){
    if((this.hp -= dmg) <= 0) this.die();
  }

  die(){}

}

module.exports = Puppet;
