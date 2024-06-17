const express=require('express');
const {createReview,getReviews,getReviewsByOrderId}=require('../../controllers/review.controller');
const router=express.Router();

router.post('/createReview',createReview);
router.get('/getReviews/:productId',getReviews);
router.get('/getReviewsByOrderId/:orderId',getReviewsByOrderId);

module.exports=router;