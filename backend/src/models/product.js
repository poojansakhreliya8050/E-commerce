const mongoose=require("mongoose");

const productSchema=mongoose.Schema({
    name:String,
    price:Number,
    subCategoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'subCategory'
    } 
})

module.exports=mongoose.model('product',productSchema)