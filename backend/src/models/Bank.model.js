const mongoose=require("mongoose")

const bankSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    accountNumber:Number,
    ifscCode:String,
    accountType:String,
    passbookImg:String
   
},{timestamps:true})

module.exports=mongoose.model("bank",bankSchema)