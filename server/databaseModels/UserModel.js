const mongoose = require("mongoose");

//user Schema creation

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    semester:{
        type: Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        lower:true
    },
    mobile:{
        type:Number
    },
    interest: String,
    passwordHashed:{
        type :String,
        required:true
    }
})

//user model

const User = new mongoose.model("User",userSchema)
module.exports= User