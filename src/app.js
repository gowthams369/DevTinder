const express = require('express');
const app = express();
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');
const cors = require('cors')

require('dotenv').config();


app.use(express.json())
app.use(cookieParser())
app.use(cors())

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const userRouter = require('./routes/userRoute');

app.use('/api', authRouter);
app.use('/api', profileRouter);
app.use('/api', requestRouter);
app.use('/api', userRouter);


connectDB()
    .then(() => {
        console.log("Databse connection established...");
        app.listen(process.env.PORT, () => {
            console.log('Sever is running on port')

        })
    })
    .catch((err) => {
        console.error("Databse cannot be connected...")

    })
