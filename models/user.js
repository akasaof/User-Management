import mongoose from "mongoose";
import dotenv from "dotenv"
import bcrypt from "bcrypt"




const userList = new mongoose.Schema({
    name:{
        type:String,
        required : true,
    },
    email:{
        type:String,
        required: true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:"String",
        enum:{values:["user","admin"]},
        default:"user"
    },
    profile:String

},{timestamps:true})

const userModel = mongoose.model("UserList",userList)



export default userModel
