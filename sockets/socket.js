const { io } = require('../main');
const {
  userConnected,
  userDisconnected,
} = require('../repositories/users.repository');
const { verifyToken } = require('../helpers/genJWT.helper');

io.on('connect', (client) => {
  console.log('client connected');

  const token = client.handshake.headers['x-token'];
  const [isValid, uuid] = verifyToken(token);

  if (!isValid) {
    return client.disconnect();
  }

  userConnected(uuid);

  client.on('disconnect', () => {
    userDisconnected(uuid);
    console.log('client disconnected');
  });
});
