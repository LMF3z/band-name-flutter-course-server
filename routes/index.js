const { Router } = require('express');
const authRouter = require('./auth.routes');
const usersRouter = require('./users.routes');
const messagesRouter = require('./messages.routes');

const router = Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/messages', messagesRouter);

module.exports = router;
