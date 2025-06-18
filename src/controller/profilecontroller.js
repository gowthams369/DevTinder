const user = require('../models/user');
const { validateProfileData } = require('../utils/validation');
const { userAuth } = require('../middlewares/auth');

const getProfile = async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (error) {
        res.status(400).send(error.message)

    }
}

const editProfile = async (req, res) => {
    try {
        if (!validateProfileData(req)) {
            throw new Error("Invalid profile data")
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key) => {
            loggedInUser[key] = req.body[key]
        })
        res.status(200).json({ message: "profile edited sucessfully",data:loggedInUser })
        await loggedInUser.save()
        console.log(loggedInUser);
    } catch (error) {
        res.status(400).send(error.message)

    }
}

const forgetPassword = async(req,res)=>{
    const {password}=req.body;

}

module.exports = { getProfile, editProfile,forgetPassword }