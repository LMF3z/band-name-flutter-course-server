const { response } = require('express');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../helpers/genJWT.helper');

const validateJTWMiddleware = (req, res = response, next) => {
  try {
    const token = req.header('x-token');

    if (!token) {
      return res.status(401).json({
        error: 'No hay token en la petición',
      });
    }

    const { uuid } = verifyToken(token);

    if (!uuid) {
      return res.status(401).json({
        error: 'No hay token en la petición',
      });
    }

    req.uuid = uuid;

    next();
  } catch (error) {
    console.log('error validateJTWMiddleware', error);

    res.status(500).json({
      error: 'Talk to admin.',
    });
  }
};

module.exports = { validateJTWMiddleware };
