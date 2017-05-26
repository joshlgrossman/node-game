const v = require('./util/v');

class Player {

  constructor(){
    this.pos = v(100,100);
    this.vel = v(0,0.5);
  }

  update(){
    this.pos = this.pos.add(this.vel);
  }

  render(gfx){
    gfx.fillStyle = 'red';
    gfx.fillRect(this.pos.x - 5, this.pos.y - 5, 10, 10);
  }

}

module.exports = Player;
