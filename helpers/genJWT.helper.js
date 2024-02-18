const jwt = require('jsonwebtoken');

const generateJWT = (userId) =>
  jwt.sign({ uuid: userId }, process.env.JWT_SECRET, {
    expiresIn: '12h',
  });

const verifyToken = (token) => {
  try {
    const { uuid } = jwt.verify(token, process.env.JWT_SECRET);
    return [true, uuid];
  } catch (error) {
    console.log('error al verificar token --->', error);

    return [false, null];
  }
};

module.exports = { generateJWT, verifyToken };
