const Entity = require('./Entity');
const Listenable = require('./Listenable');

class Player extends Listenable(Entity) {

  constructor(id){
    super();
    this.id = id;
    this.speed = 100;
    this.speedSq = this.speed**2;
    this.friction = 0.85;
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
    let friction = 1 - delta;
    if(friction < 0) friction = 0;
    this.vel = this.vel.scale(this.friction * friction);
  }

  render(gfx){
    gfx.fillStyle = 'red';
    gfx.fillRect(this.pos.x - 5, this.pos.y - 5, 10, 10);
  }

}

module.exports = Player;
