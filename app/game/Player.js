const Entity = require('./Entity');
const Listenable = require('./Listenable');

class Player extends Listenable(Entity) {

  constructor(id){
    super();
    this.id = id;
    this.speed = 100;
    this.speedSq = this.speed**2;
    this.friction = this.speed*2.5;
  }

  update(delta){
    if(this.keys[65]){
      this.vel.x = -this.speed;
    } else if(this.keys[68]){
      this.vel.x = this.speed;
    }
    if(this.keys[87]){
      this.vel.y = -this.speed;
    } else if(this.keys[83]){
      this.vel.y = this.speed;
    }

    if(this.vel.lengthSq > this.speedSq){
      this.vel.length = this.speed;
    }

    this.pos = this.pos.add(this.vel.scale(delta));
    if(this.vel.lengthSq > 0){
      const vel = this.vel.length - this.friction * delta;
      this.vel.length = vel < 0 ? 0 : vel;
    }
  }

  render(gfx){
    gfx.fillStyle = 'red';
    gfx.fillRect(this.pos.x - 5, this.pos.y - 5, 10, 10);
  }

}

module.exports = Player;
