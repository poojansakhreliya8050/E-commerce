const mongoose=require("mongoose");

const userOtpModel=mongoose.Schema({
    email:String,
    otp:String
})

module.exports=mongoose.model("userotp",userOtpModel)