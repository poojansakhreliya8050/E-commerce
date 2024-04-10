const mongoose=require("mongoose");

const productSchema=mongoose.Schema({
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category'
    },
    subCategoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'subCategory'
    } ,
    productName:String,
    price:Number,
    productDescription:String,
    img:String
})

module.exports=mongoose.model('product',productSchema)