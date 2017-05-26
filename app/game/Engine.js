class Engine {

  constructor(canvas){
    this.canvas = canvas;
    this.gfx = canvas && this.canvas.getContext('2d');
    this.objects = [];
  }

  update(){
    this.objects.forEach(o => o.update());
  }

  render(){
    this.gfx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.objects.forEach(o => o.render(this.gfx));
  }

  run(){
    this.update();
    this.gfx && this.render();
    requestAnimationFrame(this.run.bind(this));
  }

  add(obj){
    this.objects.push(obj);
  }

}

module.exports = Engine;
