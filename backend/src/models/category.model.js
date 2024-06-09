const mongoose=require("mongoose")

const categorySchema=mongoose.Schema({
    categoryTitle:String,
    description:String,
    image:String
},{ timestamps: true})

module.exports=mongoose.model("category",categorySchema)