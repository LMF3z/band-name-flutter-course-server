const jwt = require('jsonwebtoken');

const generateJWT = (userId) =>
  jwt.sign({ uuid: userId }, process.env.JWT_SECRET, {
    expiresIn: '12h',
  });

const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

module.exports = { generateJWT, verifyToken };
