const Puppet = require('./Puppet');
const Listenable = require('./Listenable');

class Player extends Listenable(Puppet) {

  constructor(id){
    super(id);
    this.speed = 100;
    this.speedSq = this.speed**2;
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

    if(this.vel.lengthSq > this.speedSq)
      this.vel.length = this.speed;

    this.stale = this.vel.lengthSq > 0;
    this.move(delta);
  }

}

module.exports = Player;
