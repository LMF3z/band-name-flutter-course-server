const { response } = require('express');
const { getAllUser } = require('../repositories/users.repository');

const getAllUsersController = async (req, res = response) => {
  try {
    const uuid = req.uuid;
    const skip = req.query.skip;

    const users = await getAllUser(uuid, skip);

    res.json({ message: 'works', data: users });
  } catch (error) {
    console.log('error getAllUsersController', error);

    res.status(500).json({
      error: 'Talk to admin.',
    });
  }
};

module.exports = { getAllUsersController };
