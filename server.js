import express from "express"
import userModel from "./models/user.js"
import db from "./config/db.js"
import cors from "cors"
import dotenv from "dotenv"
import addAcc from "./controllers/createAccount.js"
import authentication from "./auth/authentication.js"
import auth from "./auth/auth.js"
import ops from "./controllers/operations.js"
import upload from "./middleware/upload.js"





dotenv.config({ path: ".env" })

console.log(process.env.dburl)

const server = express()
server.use(cors())
server.use(express.json())

// server.get("/getUser", (req, res) => {
//     userModel.find()
//         .then((result) => {
//             res.json({ result })
//         })
// })

server.post("/createAcc", async (req, res) => {
    const result = await addAcc(req.body)
    res.json({ result })
})

server.post("/login", authentication, (req, res) => {
    res.json({ message: req.message })
})


server.post("/crud/:operation", auth,ops, async (req, res) => {
})




server.use("/uploads", express.static("uploads"));

// server.post("/createProfile",upload.single("profilePhoto"),async (req,res)=>{
        
//         const imageUrl =`${req.protocol}://${req.get("host")}/${req.file.path.replace(/\\/g,"/")}`;
//         console.log(req.body.name)

//         let details = {
//             name:req.body.name,
//             email:req.body.email,
//             password:req.body.password,
//             profile:imageUrl
//         }
//         console.log(details)
//         let result = await addAcc(details)
//         res.json({message:result})
//     }
// );


server.post("/addProfile",auth,upload.single("profilePhoto"),async (req,res)=>{
        const imageUrl =`${req.protocol}://${req.get("host")}/${req.file.path.replace(/\\/g,"/")}`;
        const {_id} = req.message 
        await userModel.findOneAndUpdate({_id},{$set:{"profile":imageUrl}})
        res.json({"message":req.message,"status":"updated"})
})

db()
server.listen(5000, () => {
    console.log("Server is running")
})