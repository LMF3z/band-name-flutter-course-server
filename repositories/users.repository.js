const UserModel = require('../models/user.model');

const userConnected = async (uuid = '') => {
  const updated = await UserModel.findByIdAndUpdate(uuid, { online: true });
  return updated;
};

const userDisconnected = async (uuid = '') => {
  const updated = await UserModel.findByIdAndUpdate(uuid, { online: false });
  return updated;
};

const getAllUser = async (current_uuid, skip) => {
  const users = await UserModel.find({ _id: { $ne: current_uuid } })
    .sort('-online')
    .skip(skip ?? 0)
    .limit(20);
  return users;
};

module.exports = { userConnected, userDisconnected, getAllUser };
