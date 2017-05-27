global.Promise = require('bluebird');
global._ = require('lodash');

const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const config = require('../../server.config');
const socket = require('./socket');

const router = express();
router.use('/', express.static(path.join(__dirname, '../client/build')));

const server = http.createServer(router);
const io = socketio(server);

socket.listen(io);
server.listen(config.port, config.on.start);
