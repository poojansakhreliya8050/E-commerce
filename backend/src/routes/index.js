const express = require("express");
const v1=require("./v1/index");
const upload = require("../middleware/multer.middleware");
const uploadOnCloudinary = require("../utils/cloudinaryUpload");
const router=express.Router()

router.use("/v1",v1);
// router.post("/aavade",upload.single("image"),(req,res)=>{
//     console.log("heyy",req.file);
//     const data=uploadOnCloudinary(req.file.path);
//     console.log(data);
//     res.status(200).json("okkkkk!!!!!!")
// })

module.exports=router