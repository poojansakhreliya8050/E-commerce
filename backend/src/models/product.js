const mongoose=require("mongoose");

const productSchema=mongoose.Schema({
    name:String,
    price:Number,
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category'
    }
    
})

module.exports=mongoose.model('product',productSchema)