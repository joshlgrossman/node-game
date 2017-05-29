const Entity = require('./Entity');

class Puppet extends Entity {

  constructor(id){
    super();
    this.id = id;
  }

  render(gfx){
    gfx.beginPath();
    gfx.arc(this.pos.x, this.pos.y, 20, 0, 6.2832);
    gfx.fill();

    const lx = Math.cos(this.rot) * 30;
    const ly = Math.sin(this.rot) * 30;

    gfx.lineWidth = 4;
    gfx.beginPath();
    gfx.moveTo(this.pos.x, this.pos.y);
    gfx.lineTo(this.pos.x + lx, this.pos.y + ly);
    gfx.stroke();
  }

}

module.exports = Puppet;
