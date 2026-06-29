import mongoose from "mongoose";
import dotenv from "dotenv"

const db = async()=>{
    try{
        const dbConnection = await mongoose.connect(process.env.dburl)
        console.log("Connection Isuued")
    }
    catch{
        console.log("Not working")
    }
}



export default db 