const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const { getProfile, editProfile } = require('../controller/profilecontroller');


profileRouter.get("/user/profile/view", userAuth, getProfile);
profileRouter.patch("/user/profile/edit",userAuth,editProfile);


module.exports = profileRouter;
