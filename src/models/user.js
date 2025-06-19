const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email id is valid")
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("Invalid email address:" + value);
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg"
    },
    about: {
        type: String,
        default: "This is a default about the user"
    },
    skill: {
        type: [String],
    }
});

userSchema.index({firstName:1,lastName:1});

userSchema.methods.getJWT = async function () {
    const user = this
    const token = await jwt.sign({ _id: user._id }, "Dev@Tinder$790", {
        expiresIn: "7d"
    });
    return token;
}

userSchema.methods.validatePassword = async function (passwordInputbyUser) {
    const user = this;
    const passwordHash = user.password;
    const isPasswordvalid = await bcrypt.compare(
        passwordInputbyUser,
        passwordHash
    );
    return isPasswordvalid;

}

module.exports = mongoose.model("User", userSchema);



