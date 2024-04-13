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
    productDescription:String,
    img:String,
    price:Number,
    quantity:Number

})

module.exports=mongoose.model('product',productSchema)