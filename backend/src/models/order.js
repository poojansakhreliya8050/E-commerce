const mongoose=require("mongoose")

const orderSchema=mongoose.Schema({
    itemId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"item"
    }],
    userId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }],
    count:Number,
    deliveryStatus:{
        type:String,
        enum:["pending","dispatched","delivered"],
        default:"pending"
    },
    payment:{
        type:String,
        enum:["cod","online"],
        default:"cod"
    },
})

module.exports=mongoose.model('order',orderSchema)