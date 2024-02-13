const { io } = require('../main');

io.on('connect', (client) => {
  console.log('client connected');

  client.on('disconnect', () => {
    console.log('client disconnected');
  });
});
