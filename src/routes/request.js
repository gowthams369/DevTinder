const { sendConnection, reviewRequest } = require('../controller/requestController');
const { userAuth } = require('../middlewares/auth');
const express = require('express');
const requestRouter = express.Router();


requestRouter.post('/user/send/:status/:toUserId', userAuth, sendConnection);
requestRouter.post('/user/review/:status/:requestId',userAuth,reviewRequest);


module.exports = requestRouter;