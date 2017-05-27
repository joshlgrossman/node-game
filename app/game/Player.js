const v = require('./v');

const Entity = require('./Entity');

class Player extends Entity {

  constructor(engine){
    super(engine);
    this.pos = v(100,100);
    this.vel = v(0,0);
  }

  update(){
    if(this.engine.keys[65]){
      this.vel.x = -100;
    } else if(this.engine.keys[68]){
      this.vel.x = 100;
    }
    if(this.engine.keys[87]){
      this.vel.y = -100;
    } else if(this.engine.keys[83]){
      this.vel.y = 100;
    }

    this.pos = this.pos.add(this.vel.scale(this.engine.delta));
    this.vel = this.vel.scale(0.9);
  }

  render(gfx){
    gfx.fillStyle = 'red';
    gfx.fillRect(this.pos.x - 5, this.pos.y - 5, 10, 10);
  }

}

module.exports = Player;
