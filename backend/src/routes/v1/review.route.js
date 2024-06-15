const express=require('express');
const {addReview,fetchReviewByProductId}=require('../../controllers/reviewController');
const router=express.Router();

router.post('/addReview',addReview);
router.get('/fetchReviewByProductId/:productId',fetchReviewByProductId);

module.exports=router;