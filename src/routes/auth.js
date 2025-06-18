const express = require('express')
const authRouter = express.Router();
const { signUp, login, logout } = require('../controller/authController');


authRouter.post("/user/signup", signUp);
authRouter.post("/user/login", login);
authRouter.post("/user/logout",logout)

module.exports = authRouter;