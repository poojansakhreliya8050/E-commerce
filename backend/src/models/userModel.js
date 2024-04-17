const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: String,
    email: String,
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
    }
})

module.exports = mongoose.model("user", userSchema)