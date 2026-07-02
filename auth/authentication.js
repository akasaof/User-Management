import jwt from "jsonwebtoken"
import userModel from "../models/user.js"
import bcrypt from "bcrypt"

const authentication = async (req,res,next)=>{
    const credentials = req.body
    if(credentials.password && credentials.email){
        const account = await userModel.findOne({email:credentials.email})
        if(account){
            console.log(account)
            const {password} = account
            const verified = await bcrypt.compare(credentials.password,password)
            if(!verified){
                req.message = "Incorrect Password"
            }
            else{
                const token = jwt.sign({
                    id:account._id},
                    process.env.key,
                    {expiresIn:"1d"}
                )   
                req.message = `Welcome ${account.name} ${account.role} you are logged in and your jwt token is ${token}`
            }
        }
        else{
            req.message = "Incorrect Email"
        }
    }
    else{
        req.message = "Email or Password needed"
    }
    next()
}

export default authentication