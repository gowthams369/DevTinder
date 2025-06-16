const express = require('express');
const app = express();
const connectDB = require('./config/database');
const User = require("./models/user");
const { validateSignupData } = require('./utils/validation');
const bcrypt = require('bcryptjs')


app.use(express.json())

app.post("/signup", async (req, res) => {
    try {
        //validate signup 
        validateSignupData(req);

        const { firstName, lastName, emailId, password } = req.body;
        //hashing password
        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash);

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash

        });
        await user.save()
        res.send("User added sucessfully..")
        console.log(req.body)
    } catch (err) {
        res.status(400).send("Error in adding data")

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
