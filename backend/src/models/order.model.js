const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    items: [{
        item: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
        quantity: { type: Number, required: true },
    }],
    deliveryStatus: { type: String, default: 'pending', enum: ["pending", "dispatched", "ontheway", "delivered", "cancelled"] },
    totalAmount: { type: Number, required: true },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "address"
    },
    paymentId: {
        type: String
    },
    review: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'review'
    }

}, { timestamps: true });


module.exports = mongoose.model('order', orderSchema)