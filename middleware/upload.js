import multer from "multer";
import path from "path"


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads/profile")
    },
    filename:(req,file,cb)=>{
        let filename = Date.now()+"-"+(Math.ceil(Math.random())*1e9);
        cb(null,filename+path.extname(file.originalname))
    }
})

const upload = multer({
    storage
});



export default upload