const express = require('express');
const app = express();
const connectDB = require('./config/database')


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
