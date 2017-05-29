const Entity = require('./Entity');

class Puppet extends Entity {

  static randomColor(){
    const angle1 = Math.random() * 6.2832;
    const angle2 = angle1 + 1.0472;
    const sin1 = Math.sin(angle1);
    const r = (Math.cos(angle1) * 100)|0 + 155;
    const g = (sin1 * Math.cos(angle2) * 100)|0 + 155;
    const b = (sin1 * Math.sin(angle2) * 100)|0 + 155;
    return {
      light: `rgb(${r},${g},${b})`,
      dark: `rgb(${r>>1},${g>>1},${b>>1})`
    };
  }

  constructor(id){
    super();
    this.id = id;
    this.color = Puppet.randomColor();
  }

  render(gfx){
    const lx = Math.cos(this.rot) * 30;
    const ly = Math.sin(this.rot) * 30;

    gfx.lineWidth = 4;
    gfx.strokeStyle = '#555';
    gfx.beginPath();
    gfx.moveTo(this.pos.x, this.pos.y);
    gfx.lineTo(this.pos.x + lx, this.pos.y + ly);
    gfx.stroke();

    gfx.fillStyle = this.color.light;
    gfx.strokeStyle = this.color.dark;
    gfx.beginPath();
    gfx.arc(this.pos.x, this.pos.y, 20, 0, 6.2832);
    gfx.stroke();
    gfx.fill();
  }

}

module.exports = Puppet;
