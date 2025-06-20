const express = require('express')
const userRouter = express.Router()
const { userAuth } = require('../middlewares/auth');
const { getConnectionPending, getAllConnection, getFeed } = require('../controller/userController');


userRouter.get("/user/requests/recived", userAuth, getConnectionPending);
userRouter.get("/user/connections", userAuth, getAllConnection);
userRouter.get("/user/feed",userAuth,getFeed);

module.exports = userRouter;