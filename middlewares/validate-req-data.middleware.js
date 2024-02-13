const { response } = require('express');
const { validationResult } = require('express-validator');

const validateReqDataMiddleware = (req, res = response, next) => {
  const errs = validationResult(req);

  if (errs.errors.length > 0) {
    res.status(400).json({
      ok: false,
      errs: errs.mapped(),
    });
    return;
  }

  next();
};

module.exports = { validateReqDataMiddleware };
