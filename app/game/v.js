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

  add(x,y){
    const that = new Vector(x,y);
    return new Vector(that.x + this.x, that.y + this.y);
  }

  scale(k){
    return new Vector(k * this.x, k * this.y);
  }

  angle(){
    return Math.atan2(this.y, this.x);
  }

  length(){
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  clone(){
    return new Vector(this);
  }

}

module.exports = (x,y) => new Vector(x,y);
