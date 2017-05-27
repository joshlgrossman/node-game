function socket(io){

  this.on('update', ({x,y}) => {
    const d = Math.sqrt(x*x+y*y);
    if(d > 20){
      x*=20/d;
      y*=20/d;
    }
    this.emit('response', {x,y});
  });

}

module.exports.listen = io => {
  io.on('connect', s => socket.bind(s, io)());
}
