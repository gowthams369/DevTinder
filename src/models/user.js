const mongoose = require('mongoose');

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
            if (validator.isEmail(value)) {
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
        default: ""
    },
    about: {
        type: String,
        default: "This is a default about the user"
    },
    skill: {
        type: [String],
    }
});

module.exports = mongoose.model("User", userSchema);



