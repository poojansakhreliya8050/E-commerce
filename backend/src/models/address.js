const mongoose = require("mongoose")

const addressSchema = mongoose.Schema({
    streetName: String,
    area: String,
    city: String,
    state: String,
    pincode: Number
},{ timestamps: true})

module.exports=mongoose.model("address",addressSchema);