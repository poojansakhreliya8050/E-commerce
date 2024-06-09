const mongoose = require("mongoose")

const addressSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    streetName: String,
    area: String,
    city: String,
    state: String,
    pincode: Number
},{ timestamps: true})

module.exports=mongoose.model("address",addressSchema);