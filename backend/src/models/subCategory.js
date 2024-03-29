const mongoose=require("mongoose")

const subCategorySchema=mongoose.Schema({
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category'
    },
    subCategoryTitle:String,
    description:String,
    image:String
})

module.exports=mongoose.model("subCategory",subCategorySchema)