const mongoose =require("mongoose");


const sellerSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    bankInfo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'bank'
    },
    panInfo:{
        panNumber:String,
        holderName:String,
        panImg:String
    },
    address:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'address'
    },
    brandName:String,
    brandOwnerName:String,
    brandImg:String,
    status:{
        type:String,
        enum:["active","deactive"],
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
    statusOfVerify:{
        type:String,
        enum:["pending","approved","rejected"],
        default:"pending"
    }
},{timestamps:true})

module.exports=mongoose.model("seller",sellerSchema)
