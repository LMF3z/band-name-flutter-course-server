const path = require('path');
require('dotenv').config();

const express = require('express');
const { dbConnection } = require('./databse/config_database');

// express server
const app = express();
app.use(express.json());

// socket.io server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

const serverPort = process.env.SERVER_PORT || 3000;

const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));

app.use('/api/v1', require('./routes'));

server.listen(serverPort, () => {
  console.log(`server running on port :${serverPort}`);
  dbConnection();
});
