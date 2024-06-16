const express=require('express');
const {createReview,getReviews}=require('../../controllers/review.controller');
const router=express.Router();

router.post('/createReview',createReview);
router.get('/getReviews/:productId',getReviews);

module.exports=router;