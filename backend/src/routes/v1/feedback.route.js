const express=require("express");
const {addFeedback, getFeedback} =require("../../controllers/feedback.controller");

const router=express.Router()

router.post("/addFeedback",addFeedback);
router.get("/getFeedback",getFeedback);

module.exports = router
