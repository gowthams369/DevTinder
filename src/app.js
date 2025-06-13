const express = require('express')
const app = express();

// app.use("/", (req, res) => {
//     res.send("This is listening in server")
// })

app.post("/user",(req,res)=>{
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