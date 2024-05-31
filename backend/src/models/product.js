const mongoose=require("mongoose");

const productSchema=mongoose.Schema({
    userId:{ 
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
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
    quantity:{
        type:Number,
        default:1
    },
    status:{
        type:String,
        enum:["active","inactive"],
        default:"active"
    },
    rating:{
        type:Number,
        default:0
    },
    noOfRating:{
        type:Number,
        default:0
    },
    reviews:[{
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        },
        review:String,
        rating:Number
    }],
    



},{ timestamps: true})

module.exports=mongoose.model('product',productSchema)