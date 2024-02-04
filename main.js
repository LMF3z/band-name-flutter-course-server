const path = require('path');
require('dotenv').config();

const express = require('express');

// express server
const app = express();

// socket.io server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

const serverPort = process.env.SERVER_PORT || 3000;

const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));

server.listen(serverPort, () => {
  console.log(`server running on port :${serverPort}`);
});
