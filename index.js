const express=require("express");
const {connections} =require("./db");
const {userRouter} = require("./routes/users.routes");
const cors = require('cors')
require("dotenv").config()
const app=express();
app.use(cors({origin:"*"}))
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Home Page")
})
app.use("/user",userRouter)
app.listen(process.env.port,async()=>{
    try{
        await connections;
        console.log("Connected");
    }catch(err){
        console.log({"Error":err});
    }
    console.log(`Running the port ${process.env.port}`)
})