const { response } = require('express');
const bcrypt = require('bcryptjs');

const UserModel = require('../models/user.model');
const { generateJWT } = require('../helpers/genJWT.helper');

const registerUserController = async (req, res = response) => {
  try {
    const body = req.body;

    const { email, password } = body;

    const existEmail = await UserModel.findOne({ email });

    if (existEmail) {
      res.status(400).json({
        error: 'User already exist',
      });
      return;
    }

    const newUser = new UserModel(body);

    const salt = bcrypt.genSaltSync(10);
    newUser.password = bcrypt.hashSync(password, salt);
    await newUser.save();

    res.json({ message: 'works', data: newUser });
  } catch (error) {
    console.log('error registerUserController', error);

    res.status(500).json({
      error: 'Talk to admin.',
    });
  }
};

const loginUserController = async (req, res = response) => {
  try {
    const body = req.body;
    const { email } = body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      res.status(400).json({
        error: 'User not exist',
      });
      return;
    }

    const token = generateJWT(user.toJSON().uuid);

    res.json({ message: 'works', data: { user: user.toJSON(), token } });
  } catch (error) {
    console.log('error loginUserController', error);

    res.status(500).json({
      error: 'Talk to admin.',
    });
  }
};

const renewTokenController = async (req, res = response) => {
  try {
    const uuid = req.uuid;

    const newToken = generateJWT(uuid);

    const user = await UserModel.findById(uuid);

    res.json({
      message: 'works',
      data: { user: user.toJSON(), token: newToken },
    });
  } catch (error) {
    console.log('error renewTokenController', error);

    res.status(500).json({
      error: 'Talk to admin.',
    });
  }
};

module.exports = {
  registerUserController,
  loginUserController,
  renewTokenController,
};
