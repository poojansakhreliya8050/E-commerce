const mongoose = require("mongoose")

const cartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    items: [
        {
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product"
            },
            quantity:{
                type: Number,
                default: 1
            }
        }]
},{ timestamps: true})

module.exports=mongoose.model("cart",cartSchema);
