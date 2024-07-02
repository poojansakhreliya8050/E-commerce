const Review=require('../models/review.model');
const Product=require('../models/product.model');
const User=require('../models/user.model');
const Order=require('../models/order.model');

const createReview=async(req,res)=>{
    try{
        const {userId,productId,orderId,review,rating}=req.body;
        const user=await User.findById(userId).select('-password');
        if(!user) return res.status(400).json({msg:"User does not exist."});

        const product=await Product.findById(productId);
        if(!product) return res.status(400).json({msg:"Product does not exist."});

        const order=await Order.findById(orderId);
        if(!order) return res.status(400).json({msg:"You can only review products you have ordered."});

   
        const alreadyReviewed=await Review.findOne({userId,productId,orderId});
        console.log(alreadyReviewed);
        // const alreadyReviewed=await Review.findOne({userId,productId});
        if(alreadyReviewed) return res.status(400).json({msg:"You have already reviewed this product."});

        const newReview=new Review({
            userId,
            productId,
            orderId,
            review,
            rating
        });
        await newReview.save();

        await order.updateOne({$push:{review:newReview._id}});

        const reviews=await Review.find({productId:productId});

        let avgRating=0;
        for(let i=0;i<reviews.length;i++){
            avgRating+=reviews[i].rating;
        }
        avgRating=avgRating/reviews.length;

        await Product.findOneAndUpdate({_id:productId},{rating:avgRating});
        await Product.findOneAndUpdate({_id:productId},{$push:{reviews:newReview._id}});


        res.json({msg:"Review submitted."});
    }
    catch(err){
        return res.status(500).json({msg:err.message});
    }
}

const getReviews=async(req,res)=>{
    try{
        const reviews=await Review.find({productId:req.params.productId}).populate('userId').select('-password');
        res.json(reviews);
    }
    catch(err){
        return res.status(500).json({msg:err.message});
    }
}

const getReviewsByOrderId=async(req,res)=>{
    try{
        const reviews=await Review.find({orderId:req.params.orderId}).populate('productId').select('-password');
        res.json(reviews);
    }
    catch(err){
        return res.status(500).json({msg:err.message});
    }
}

module.exports={
    createReview,
    getReviews,
    getReviewsByOrderId
}