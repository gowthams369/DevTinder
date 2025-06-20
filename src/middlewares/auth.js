const jwt = require('jsonwebtoken')
const User = require("../models/user");
const dotenv = require('dotenv')

const userAuth = async (req, res, next) => {

    try {
        const { token } = req.cookies;
        if (!token) {
            throw new Error("Token is not valid")
        }
        const decodedMessage = await jwt.verify(token, process.env.JWT_SECRET);
        const { _id } = decodedMessage;
        const user = await User.findById(_id)
        if (!user) {
            throw new Error("user not found")
        }
        req.user = user
        next();
    } catch (error) {
        res.send("Error:" + error.message)
    }

}

module.exports = { userAuth }