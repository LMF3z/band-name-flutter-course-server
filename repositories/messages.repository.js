const MessageModel = require('../models/message.model');

const saveMessage = async (message) => {
  try {
    const newMessage = new MessageModel(message);
    await newMessage.save();
    return true;
  } catch (error) {
    console.log('Error to save message');
    return false;
  }
};

const getMessages = async (fromUid, currentRequestUid, skip = 0) => {
  const messages = await MessageModel.find({
    $or: [
      { from: currentRequestUid, to: fromUid },
      { from: fromUid, to: currentRequestUid },
    ],
  })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(20);
  return messages;
};

module.exports = { saveMessage, getMessages };
