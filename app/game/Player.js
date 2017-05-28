const Entity = require('./Entity');
const Listenable = require('./Listenable');

class Player extends Listenable(Entity) {

  constructor(id){
    super();
    this.id = id;
  }

  update(delta){
    if(this.keys[65]){
      this.vel.x = -100;
    } else if(this.keys[68]){
      this.vel.x = 100;
    }
    if(this.keys[87]){
      this.vel.y = -100;
    } else if(this.keys[83]){
      this.vel.y = 100;
    }

    this.pos = this.pos.add(this.vel.scale(delta));
    this.vel = this.vel.scale(0.9);
  }

  render(gfx){
    gfx.fillStyle = 'red';
    gfx.fillRect(this.pos.x - 5, this.pos.y - 5, 10, 10);
  }

}

module.exports = Player;
