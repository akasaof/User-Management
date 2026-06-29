import userModel from "../models/user.js";
import addAcc from "./createAccount.js";
import upload from "../middleware/upload.js";

const ops = async (req,res,next)=>{
    if (req.message.role === "admin") {
    
            if (req.params.operation === "get") {
                const users = await userModel.find()
                res.json({ users })
            }
            else if (req.params.operation === "delete") {
                console.log(req.body.email)
                const account = await userModel.findOneAndDelete({ email: req.body.email })
                res.json({ message: req.message, account })
            }
            else if (req.params.operation === "update") {
                if (req.body.changes.name && req.body.changes.role) {
                    console.log(req.body.email)
                    console.log(req.body.changes)
                    const {name,role} = req.body.changes 
                    const account = await userModel.findOneAndUpdate({email:req.body.email},{$set:{name,role}})
                    res.json({message:req.message,status:"Updated"})
                }
                else{
                    res.send("Except name and role other feilds cannot be changed")
                }
            }
            else if (req.params.operation === "create") {
                const {name,email,password,role} = req.body
                if(name===undefined || email===undefined || password===undefined || role===undefined){
                    res.send("Give all four feilds name,email,password,role")
                }
                const result = await addAcc({name,email,password,role})
                res.json({ result })
            }
            else{
                res.send("Give a valid operation")
            }

        }
        else {
            res.send("Acess not granted")
        }
}

export default ops