const { io } = require('../main');

io.on('connect', (client) => {
  console.log('client connected');

  client.on('message', (message) => {
    console.log('my message --->', message);

    io.emit('message', { message: 'message received' });
  });

  client.on('disconnect', () => {
    console.log('client disconnected');
  });
});
