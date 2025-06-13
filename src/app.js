const express = require('express')
const app = express();

app.use("/",(req, res) => {
    res.send("This is listening in server")
})

app.listen(7777, () => {
    console.log('Sever is running on port')

})