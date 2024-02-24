const { io } = require('../main');
const { verifyToken } = require('../helpers/genJWT.helper');
const {
  userConnected,
  userDisconnected,
} = require('../repositories/users.repository');
const { saveMessage } = require('../repositories/messages.repository');

io.on('connect', (client) => {
  console.log('client connected');

  const token = client.handshake.headers['x-token'];
  const [isValid, uuid] = verifyToken(token);

  if (!isValid) {
    return client.disconnect();
  }

  userConnected(uuid);

  // ingresar usuario a la sala

  // global, client.id (automatico con el id de socket)

  // sala individual, client.id, id del usuario conectado
  client.join(uuid);

  client.on('personal-message', async (payload) => {
    await saveMessage(payload);
    io.to(payload.to).emit('personal-message', payload);
  });

  client.on('disconnect', () => {
    userDisconnected(uuid);
    console.log('client disconnected');
  });
});
