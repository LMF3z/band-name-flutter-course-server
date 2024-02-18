const { Router } = require('express');
const {
  validateJTWMiddleware,
} = require('../middlewares/validate-jtw.middleware');
const { getAllUsersController } = require('../controllers/users.controller');

const router = Router();

router.get('/', validateJTWMiddleware, getAllUsersController);

module.exports = router;
