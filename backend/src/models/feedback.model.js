const mongoose = require("mongoose")

const feedbackSchema = mongoose.Schema({
    userName: String,
    email: String,
    feedback: String,
}, { timestamps: true })

module.exports = mongoose.model("feedback", feedbackSchema)