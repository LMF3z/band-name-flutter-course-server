const { Router, response } = require('express');
const authRouter = require('./auth.routes');
const usersRouter = require('./users.routes');

const router = Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);

module.exports = router;
