const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const config = require('../../server.config');
const run = require('./run');

const router = express();
router.use('/', express.static(path.join(__dirname, '../build')));

const server = http.createServer(router);
const io = socketio(server);

server.listen(config.port, () => {
  console.log(`Server started on port ${config.port}`);
  run(io);
});
