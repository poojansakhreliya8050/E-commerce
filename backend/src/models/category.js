const mongoose=require("mongoose")

const categorySchema=mongoose.Schema({
    categoryTitle:String,
    description:String,
    image:String
})

module.exports=mongoose.model("category",categorySchema)