const { io } = require('../main');
const Band = require('../models/band.model');
const Bands = require('../models/bands.model');

const bands = new Bands();
bands.addBand(new Band('Rammstein'));
bands.addBand(new Band('Queen'));
bands.addBand(new Band('Metallica'));
bands.addBand(new Band('Bon Jovi'));

io.on('connect', (client) => {
  console.log('client connected');

  client.emit('active-bands', bands.getBands()); // * send to client the bands list

  client.on('disconnect', () => {
    console.log('client disconnected');
  });

  client.on('listen-message', (payload) => {
    // io.emit('new-message', `mensaje recibido ${payload}`); // * all clients
    client.broadcast.emit('new-message', payload); // * all clients except the one that sent the message
  });

  client.on('vote-band', (payload) => {
    bands.voteBand(payload.id);
    io.emit('active-bands', bands.getBands()); // * all clients
  });

  client.on('add-band', (payload) => {
    bands.addBand(new Band(payload.name));
    io.emit('active-bands', bands.getBands()); // * all clients
  });

  client.on('remove-band', (payload) => {
    bands.deleteBand(payload.id);
    io.emit('active-bands', bands.getBands()); // * all clients
  });
});
