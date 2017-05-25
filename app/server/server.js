global.Promise = require('bluebird');
global._ = require('lodash');
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const config = require('./config');

const router = express();

router.use('/', express.static(path.join(__dirname, '../client/build')));

const server = http.createServer(router);
const io = socketio(server);

server.listen(config.port, config.on.start);
