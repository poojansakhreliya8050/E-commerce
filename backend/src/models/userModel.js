const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    mobileNumber:Number,
    password: String,
    refreshToken: String,
    isVerify: { type: Boolean, default: false },
    address: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "address"
    }],
    role:{
        type:String,
        enum:["admin","customer","seller"]
    },
    isSeller:{
        type:Boolean,
        default:false
    },
    wishlist:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    }],
}, { timestamps: true})

module.exports = mongoose.model("user", userSchema)