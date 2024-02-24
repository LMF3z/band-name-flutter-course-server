const { getMessages } = require('../repositories/messages.repository');

const getAllMessagesController = async (req, res) => {
  const currentRequestUid = req.uuid;
  const fromUid = req.params.from;
  const currentSkip = req.query.skip;

  const messages = await getMessages(fromUid, currentRequestUid, currentSkip);
  res.json({ data: messages });
};

module.exports = { getAllMessagesController };
