const Product=require('../models/product.model');

//fecth all products by userId
const fetchAllProductByUserId=async(req,res)=>{
    try{
        const userId=req.params.userId;
        const products=await Product.find({userId:userId});
        return res.status(200).json(products)
    }
    catch(err){
        console.log(err)
    }
}

module.exports={fetchAllProductByUserId}