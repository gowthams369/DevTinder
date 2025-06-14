const express = require('express');
const { adminAuth, userAuth } = require('./middlewares/auth.js');
const app = express();


// app.use("/", (req, res) => {
//     res.send("This is listening in server")
// })

app.use("/admin",adminAuth);

app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("Something went wrong")
    }
})

app.get("/admin/getAllData",(req,res)=>{
    res.send("All data send")
})

app.post("/user",userAuth,(req,res)=>{
    res.send("This is post method")
})
app.delete("/user",(req,res)=>{
    res.send("This is the delete method")
})

app.patch("/user",(req,res)=>{
    res.send("This is a patch method")
})

app.get("/user", (req, res) => {
    res.send({name:"gowtham",lastname:"s"})
})

app.listen(7777, () => {
    console.log('Sever is running on port')

})