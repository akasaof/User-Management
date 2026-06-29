import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import userModel from "../models/user.js"

const addAcc = async (details)=>{
    if(!(Object.keys(details).includes("name")&&Object.keys(details).includes("email")&&Object.keys(details).includes("password"))){
        return "missing certain feilds"
    }
    const result = await userModel.findOne({email:details.email})
    if(result){
        return "Email already in use"
    }
    const {name,email,password,role} = details
    const hashedpassword = await bcrypt.hash(password,10)
    userModel.insertOne({name,email,password:hashedpassword,role})
    return "Account Created Sucessfully"
}

export default addAcc