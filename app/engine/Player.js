const v = require('./Vector').factory;
const Puppet = require('./Puppet');
const Listenable = require('./Listenable');
const Bullet = require('./Bullet');

class Player extends Listenable(Puppet) {

  constructor(id){
    super(id);
    this.speed = 200;
    this.speedSq = this.speed**2;
    this.previousMouse = {};
  }

  shoot(){
    const bullet = new Bullet(this);
    this.engine && this.engine.add(bullet);
  }

  render(gfx){
    if(this.active) return Puppet.prototype.render.call(this, gfx);

    gfx.fillStyle = 'rgba(255,255,255,0.5)';
    gfx.strokeStyle = '#D55';
    gfx.lineWidth = 3;
    gfx.beginPath();
    gfx.arc(this.pos.x, this.pos.y, this.radius*2, 0, 6.2832);
    gfx.stroke();
    gfx.fill();
  }

  update(delta){
    if(this.active) this.life(delta);
    
    else this.death(delta);
  }

  life(delta){
    if(this.keys[65])
      this.vel.x = -this.speed;
    else if(this.keys[68])
      this.vel.x = this.speed;

    if(this.keys[87])
      this.vel.y = -this.speed;
    else if(this.keys[83])
      this.vel.y = this.speed;

    if(this.vel.lengthSq > this.speedSq)
      this.vel.length = this.speed;

    if(this.mouse.down && !this.previousMouse.down)
      this.shoot();

    const prevRot = this.rot;
    this.rot = v(this.mouse.pos).sub(this.pos).angle;

    this.stale = this.stale || (prevRot - this.rot) || this.vel.lengthSq > 0;
    this.move(delta);
    this.previousMouse = this.mouse;
  }

  death(delta){
    this.pos = v(this.mouse.pos);
    if(this.mouse.down && !this.previousMouse.down) this.spawn();
    this.previousMouse = this.mouse;
  }

}

module.exports = Player;
