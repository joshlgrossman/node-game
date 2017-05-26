const io = require('socket.io-client');
const socket = io();

const Engine = require('../../game/Engine');
const Player = require('../../game/Player');

function initialize(){

  const canvas = document.querySelector('canvas');
  const engine = new Engine(canvas);
  const player = new Player();

  engine.add(player);
  engine.run();

}

window.addEventListener('load', initialize);
