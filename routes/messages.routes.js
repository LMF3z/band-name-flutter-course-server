const { Router } = require('express');
const {
  validateJTWMiddleware,
} = require('../middlewares/validate-jtw.middleware');
const {
  getAllMessagesController,
} = require('../controllers/messages.controller');

const router = Router();

router.get('/:from', validateJTWMiddleware, getAllMessagesController);

module.exports = router;
