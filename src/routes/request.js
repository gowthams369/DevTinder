const { sendConnection } = require('../controller/requestController');
const { userAuth } = require('../middlewares/auth');
const express = require('express');
const requestRouter = express.Router();


requestRouter.post('/user/sendConnection', userAuth, sendConnection);


module.exports = requestRouter;