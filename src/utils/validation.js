const validator = require('validator')


const validateSignupData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;
    if (!firstName || !lastName) {
        throw new Error('Name is not valid')
    } else if (!validator.isEmail(emailId)) {
        throw new Error('Email is not valid');
    } else if (!validator.isStrongPassword(password)) {
        throw new Error('Please enter a strong Password')
    }
}


const validateProfileData = (req) => {
    const allowedEditsFields = ["firstName", "lastName", "emailId", "photoUrl", "gender", "age", "about", "skill"]
    const isEditAllowed = Object.keys(req.body).every((field) =>
        allowedEditsFields.includes(field)
    );
    return isEditAllowed
};
module.exports = {
    validateSignupData,
    validateProfileData
}