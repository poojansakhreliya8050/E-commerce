const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    refreshToken:String,
    isVerify:{type:Boolean,default:false},
    address:[{streetName:String,area:String,city:String,state:String,pincode:Number}],
    order:[],
    cart:[],
})

module.exports=mongoose.model("user",userSchema)