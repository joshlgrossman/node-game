class IO {

  constructor(src){
    this.routes = [];
    this.initialize(src);
  }

  route(dest){
    this.routes.push(dest);
    return this;
  }

  emit(evt, data){
    this.routes.forEach(route => route.on && route.on(evt, data));
    return this;
  }

  initialize(src){}

}

module.exports = IO;
