const Feedback = require('../models/feedback.model');

const addFeedback = async (req, res) => {
    try {
        const { userName, email, feedback } = req.body;
        const newFeedback = new Feedback({
            userName,
            email,
            feedback
        })
        await newFeedback.save();
        return res.status(200).json({ message: "Feedback added successfully" })
    }
    catch (err) {
        console.log(err)
    }
}

const getFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.find();
        return res.status(200).json({ feedback })
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = { addFeedback, getFeedback }