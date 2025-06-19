const express = require('express')
const { validateSignupData } = require('../utils/validation');
const bcrypt = require('bcryptjs');
const User = require("../models/user");
const jwt = require('jsonwebtoken');


const signUp = async (req, res) => {
    try {
        //validate signup 
        validateSignupData(req);

        const { firstName, lastName, emailId, age, password } = req.body;
        //hashing password
        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash);

        const user = new User({
            firstName,
            lastName,
            age,
            emailId,
            password: passwordHash

        });
        await user.save()
        res.status(200).send("User added sucessfully..")
        console.log(req.body)
    } catch (err) {
        console.error(err.message)
        res.status(400).send("Error in adding data")

    }
}


const login = async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId:emailId });
        if (!user) {
            throw new Error("Invalid Credentials");
        }
        const isPasswordvalid = await user.validatePassword(password);
        if (isPasswordvalid) {
            const token = await user.getJWT();

            res.cookie("token", token, {
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            });
            res.send("Login sucessfull")
        } else {
            throw new Error("Invalid credential")
        }

    } catch (error) {
        res.status(400).send(error.message)

    }
}

const logout = async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    });
    res.send("User logout sucessfully")
}

module.exports = { signUp, login, logout }