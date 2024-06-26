const mongoose=require("mongoose")

const reviewSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product'
    },
    orderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'order'
    },
    review:String,
    rating:Number
},{timestamps:true})

module.exports=mongoose.model('review',reviewSchema)