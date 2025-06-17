const express = require('express');
const app = express();
const connectDB = require('./config/database');
const User = require("./models/user");
const { validateSignupData } = require('./utils/validation');
const bcrypt = require('bcryptjs');
const user = require('./models/user');


app.use(express.json())

app.post("/signup", async (req, res) => {
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
})

app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId });
        if (!user) {
            throw new Error("Invalid Credentials");
        }
        const isPasswordvalid = await bcrypt.compare(password, user.password);
        if (isPasswordvalid) {
            res.send("Login sucessfull")
        } else {
            throw new Error("Invalid credential")
        }

    } catch (error) {
        res.status(400).send(error.message)

    }
})

app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    try {
        const user = await User.find({ emailId: userEmail });
        if (user.length === 0) {
            res.status(404).send("user not found")
        } else {
            res.send(user);
        }
    } catch (error) {
        res.status(400).send("Someting went wrong")

    }
})

app.delete("/delete", async (req, res) => {
    const userId = req.body.userId
    try {
        const user = await User.findByIdAndDelete({ _id: userId })
        res.send("user deleted sucessfully")

    } catch (error) {
        res.status(400).send("User unable to delete")

    }

})

connectDB()
    .then(() => {
        console.log("Databse connection established...");
        app.listen(7777, () => {
            console.log('Sever is running on port')

        })
    })
    .catch((err) => {
        console.error("Databse cannot be connected...")

    })
