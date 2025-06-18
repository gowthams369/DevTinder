const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const { getProfile } = require('../controller/profilecontroller');


profileRouter.get("/user/profile", userAuth, getProfile);


module.exports = profileRouter;
