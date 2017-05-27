class IO {

  constructor(src){
    this.routes = [];
    this.listeners = [];
    this.initialize(src);
  }

  route(dest){
    this.routes.push(dest);
    return this;
  }

  addListener(listener){
    this.listeners.push(listener);
  }

  emit(evt, data){
    this.listeners.forEach(listener => listener.on(evt, data));
    this.routes.forEach(route => route.emit(evt,data));
    return this;
  }

  initialize(src){}

}

module.exports = IO;
