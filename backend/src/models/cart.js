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
                ref: "item"
            },
            quantity:Number
        }]
})

module.exports=mongoose.model("cart",cartSchema);
