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
    img:[String],
    price:Number,
    attributes: mongoose.Schema.Types.Mixed,
    quantity:{
        type:Number,
        default:1
    },
    status:{
        type:String,
        enum:["active","deactive"],
        default:"active"
    },
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'review'
    }],
    rating:{
        type:Number,
        default:0
    }

},{ timestamps: true})

module.exports=mongoose.model('product',productSchema)