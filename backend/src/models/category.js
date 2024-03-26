const mongoose=require("mongoose")

const categorySchema=mongoose.Schema({
    category:String,
    description:String,
    img:String
})

module.exports=mongoose.model("category",categorySchema)