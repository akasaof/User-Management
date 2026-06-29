import jwt from "jsonwebtoken"
import userModel from "../models/user.js"

const authorization = async (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")  
        const result = await jwt.verify(token[1],process.env.key)
        const {id} = result
        const account = await userModel.findOne({_id:id})
        if(account){
            req.message = {role:account.role,_id:account.id}
            next()
        }
        else{
            req.message = "Invalid Token"
        }
        
    }
    catch{
        res.send("No Token Found")
    }
}

export default authorization