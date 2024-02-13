const { Router, response } = require('express');
const authRouter = require('./auth.routes');

const router = Router();

router.use('/auth', authRouter);

module.exports = router;
