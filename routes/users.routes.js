const express=require("express");
const {userModel}=require("../models/users.model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const userRouter=express.Router();

userRouter.post("/signup",async(req,res)=>{
    const{email,password}=req.body;
    try{
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                console.log(err);
            }else{
                const user=new userModel({email:email,password:password})
                await user.save();
                console.log(user);
                res.send({"msg":"Successfully Signedup"})
            }
        })
    }catch(err){
        res.send({"msg":err.message});
        console.log(err);
    }
})

userRouter.post("/login",async(req,res)=>{
    const{email,password}=req.body;
    try{
        const user=await userModel.find({email});
        if(user.length>0){
            const hash=user[0].password;
            bcrypt.compare(password,hash,(err,result)=>{
                if(result){
                    const token=jwt.sign({userID:user[0]._id},"kanban");
                    res.send({"msg":"Login Successful","token":token});
                }else{
                    res.send({"msg":"error"})
                }
            })
        }else{
            res.send({"msg":"Wrong Cred"})
        }
    }catch(err){
        res.send({"msg":err});
        console.log("error")
    }
})

module.exports={
    userRouter
}