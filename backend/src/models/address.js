const mongoose = require("mongoose")

const addressSchema = mongoose.Schema({
    streetName: String,
    area: String,
    city: String,
    state: String,
    pincode: Number
})

module.exports=mongoose.model("address",addressSchema);