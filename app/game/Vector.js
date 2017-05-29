class Vector {

  constructor(x = 0, y = 0){
    if(typeof x === 'object'){
      this.x = x.x;
      this.y = x.y;
    } else {
      this.x = x;
      this.y = y;
    }
  }

  static factory(x,y){
    return new Vector(x,y);
  }

  get angle(){
    return Math.atan2(this.y, this.x);
  }

  set angle(a){
    const length = this.length;
    this.x = Math.cos(a) * length;
    this.y = Math.sin(a) * length;
  }

  get length(){
    return Math.sqrt(this.lengthSq);
  }

  set length(l){
    const ratio = l/this.length;
    this.x *= ratio;
    this.y *= ratio;
  }

  get lengthSq(){
    return this.x**2 + this.y**2;
  }

  add(x,y){
    const that = typeof x === 'object' ? x : new Vector(x,y);
    return new Vector(this.x + that.x, this.y + that.y);
  }

  sub(x,y){
    const that = typeof x === 'object' ? x : new Vector(x,y);
    return new Vector(this.x - that.x, this.y - that.y);
  }

  multiply(x,y){
    const that = typeof x === 'object' ? x : new Vector(x,y);
    return this.x * that.x + this.y * that.y;
  }

  scale(k){
    return new Vector(k * this.x, k * this.y);
  }

  avg(k,x,y){
    const that = typeof x === 'object' ? x : new Vector(x,y);
    const inv = 1 - k;
    return new Vector(this.x * inv + that.x * k, this.y * inv + that.y * k);
  }

  clone(){
    return new Vector(this);
  }

  serialize(){
    return {x: this.x, y: this.y};
  }

}

module.exports = Vector;
