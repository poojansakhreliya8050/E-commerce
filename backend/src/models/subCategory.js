const mongoose=require("mongoose")

const subCategorySchema=mongoose.Schema({
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category'
    },
    subCategory:String,
    description:String
})

module.exports=mongoose.model("subCategory",subCategorySchema)