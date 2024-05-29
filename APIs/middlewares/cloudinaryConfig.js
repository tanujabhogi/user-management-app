const cloudinary=require('cloudinary').v2
const multer=require('multer')
const {CloudinaryStorage}=require('multer-storage-cloudinary')

require('dotenv').config()  //eg. process.env.PORT

//configure cloudinay
cloudinary.config({
    cloud_name:process.env.PORT,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

//configure CloudinaryStorage
let clStorage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"UserManagementApplication",
        public_id:(request,file)=>file.fieldname+"-"+Date.now()
    }
})

//configure multer
let multerObj=multer({
    storage:clStorage
})

//export multerObj
module.exports=multerObj