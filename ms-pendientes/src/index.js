require('dotenv').config();
const server = require('./infrastructure/http/server');
const config = require('./config');

server.start(config.port);
