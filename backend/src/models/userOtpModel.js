const mongoose=require("mongoose");

const userOtpModel=mongoose.Schema({
    email:String,
    otp:String
},{ timestamps: true})

module.exports=mongoose.model("userotp",userOtpModel)