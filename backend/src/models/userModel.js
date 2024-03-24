const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    refreshToken: String,
    isVerify: { type: Boolean, default: false },
    address: [{ streetName: String, area: String, city: String, state: String, pincode: Number }],
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "order"
    }],
    cart: [
        {
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "item"
            }
        }
    ],
})

module.exports = mongoose.model("user", userSchema)