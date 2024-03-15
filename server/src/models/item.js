const mongoose=require("mongoose");

const itemSchema=mongoose.Schema({
    name:String,
    price:Number,
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category'
    }
    
})

module.exports=mongoose.model('item',itemSchema)