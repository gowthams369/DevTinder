const express = require('express');
const app = express();
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');


app.use(express.json())
app.use(cookieParser())

const authRouter = require('./routes/auth');
const profileRouter =require('./routes/profile');
const requestRouter =require('./routes/request');

app.use('/api',authRouter);
app.use('/api',profileRouter);
app.use('/api',requestRouter);


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
