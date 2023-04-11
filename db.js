const mongoose=require("mongoose");
require("dotenv").config();

const connections=mongoose.connect(process.env.mongoDBAtlas);

module.exports={
    connections
}