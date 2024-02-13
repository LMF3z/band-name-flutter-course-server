const { Router } = require('express');
const { check } = require('express-validator');

const {
  registerUserController,
  loginUserController,
  renewTokenController,
} = require('../controllers/auth.controller');
const {
  validateReqDataMiddleware,
} = require('../middlewares/validate-req-data.middleware');
const {
  validateJTWMiddleware,
} = require('../middlewares/validate-jtw.middleware');

const router = Router();

router.post(
  '/new',
  [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'email is required').isEmail().not().isEmpty(),
    check('password', 'password is required').not().isEmpty(),
  ],
  validateReqDataMiddleware,
  registerUserController
);

router.post(
  '/login',
  [
    check('email', 'email is required').isEmail().not().isEmpty(),
    check('password', 'password is required').not().isEmpty(),
  ],
  validateReqDataMiddleware,
  loginUserController
);

router.post('/renew', validateJTWMiddleware, renewTokenController);

module.exports = router;
