const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    items: [{
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product"
        },
        quantity: Number
    }
    ],
    userId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    deliveryStatus: {
        type: String,
        enum: ["pending", "dispatched", "delivered"],
        default: "pending"
    },
    payment: {
        type: String,
        enum: ["cod", "online"],
        default: "cod"
    },
    amount: Number,
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "address"
    },
    paymentId: {
        type: String
    }

}, { timestamps: true })

module.exports = mongoose.model('order', orderSchema)