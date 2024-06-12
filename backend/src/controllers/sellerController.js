const Product=require('../models/product.model');
const Address=require('../models/address.model');
const Bank=require('../models/bank.model');
const Seller=require('../models/seller.model');
const User=require('../models/user.model');
const uploadOnCloudinary = require("../utils/cloudinaryUpload");

//fecth all products by userId
const fetchAllProductByUserId=async(req,res)=>{
    try{
        const userId=req.params.userId;
        const products=await Product.find({userId:userId});
        return res.status(200).json(products)
    }
    catch(err){
        console.log(err)
        res.status(404).json({ message: err.message });
    }
}

const addSellerDetails=async(req,res)=>{
    try{
        const {userId,accountNumber,ifscCode,accountType,panNumber,holderName,streetName,area,city,state,pincode,brandName,brandOwnerName}=req.body;

        if (!userId || !accountNumber || !ifscCode || !accountType || !panNumber || !holderName || !streetName || !area || !city || !state || !pincode || !brandName || !brandOwnerName || !req.files) {
            return res.status(404).json({ message: "please enter valid data.." })
        }

        console.log(req.files);
        console.log(req.body);
        const fileUrls = {};
        for (const field in req.files) {
          fileUrls[field] = req.files[field].map(file => file.path);
        }
        console.log(fileUrls);
        //this urls upload on cloudinary

        const brandImage = await uploadOnCloudinary(fileUrls.brandImage[0]);
        const bankImage = await uploadOnCloudinary(fileUrls.bankImage[0]);
        const panImage = await uploadOnCloudinary(fileUrls.panImage[0]);
        console.log(brandImage);
        console.log(bankImage);
        console.log(panImage);       
        const address=new Address({
            userId:userId,
            streetName:streetName,
            area:area,
            city:city,
            state:state,
            pincode:pincode
        })
        const addressData=await address.save();

        const bank=new Bank({
            userId:userId,
            accountNumber:accountNumber,
            ifscCode:ifscCode,
            accountType:accountType,
            passbookImg:bankImage.url
        })
        const bankData=await bank.save();

        const seller=new Seller({
            userId:userId,
            bankInfo:bankData._id,
            panInfo:{
                panNumber:panNumber,
                holderName:holderName,
                panImg:panImage.url
            },
            address:addressData._id,
            brandName:brandName,
            brandOwnerName:brandOwnerName,
            brandImg:brandImage.url
        })
        const sellerData=await seller.save();
        return res.status(200).json(sellerData);

        // return res.status(200).json({message:"Seller details added successfully"});

    }catch(err)
    {
        console.log(err);
        res.status(404).json({ message: err.message });
    }
}


//fetchSellerByUserId
const fetchSellerByUserId=async(req,res)=>{
    try{
        const userId=req.params.userId;
        const seller=await Seller.findOne({userId:userId}).populate('userId').populate('bankInfo').populate('address')
        return res.status(200).json(seller)
    }
    catch(err){
        console.log(err);
        res.status(404).json({ message: err.message });
    }

}

//change status to approve of seller
const approveSeller=async(req,res)=>{
    try{
        const userId=req.params.userId;
        const seller=await Seller.findOneAndUpdate({userId:userId},{statusOfVerify:"approved"}, {new: true})
        const user=await User.findOneAndUpdate({_id:userId},{isSeller:true}, {new: true})
        return res.status(200).json(seller)
    }
    catch(err){
        console.log(err);
        res.status(404).json({ message: err.message });
    }
}

//change status to reject of seller
const rejectSeller=async(req,res)=>{
    try{
        const userId=req.params.userId;
        const seller=await Seller.findOneAndUpdate({userId:userId},{statusOfVerify:"rejected"}, {new: true})
        const user=await User.findOneAndUpdate({_id:userId},{isSeller:false}, {new: true})
        return res.status(200).json(seller)
    }
    catch(err){
        console.log(err);
        res.status(404).json({ message: err.message });
    }
}

//fetch all seller by statusOfVerify in pending
const fetchAllPendingSeller=async(req,res)=>{
    try{
        const sellers=await Seller.find({statusOfVerify:"pending"}).populate('userId').populate('bankInfo').populate('address')
        return res.status(200).json(sellers)
    }
    catch(err){
        console.log(err);
        res.status(404).json({ message: err.message });
    }
}

//fetch all seller by statusOfVerify in approved
const fetchAllApprovedSeller=async(req,res)=>{
    try{
        const sellers=await Seller.find({statusOfVerify:"approved"}).populate('userId').populate('bankInfo').populate('address')
        return res.status(200).json(sellers)
    }
    catch(err){
        console.log(err);
        res.status(404).json({ message: err.message });
    }
}

//fetch all seller by statusOfVerify in rejected
const fetchAllRejectedSeller=async(req,res)=>{
    try{
        const sellers=await Seller.find({statusOfVerify:"rejected"}).populate('userId').populate('bankInfo').populate('address')
        return res.status(200).json(sellers)
    }
    catch(err){
        console.log(err);
        res.status(404).json({ message: err.message });
    }
}



module.exports={fetchAllProductByUserId,addSellerDetails,fetchSellerByUserId,approveSeller,rejectSeller,fetchAllPendingSeller,fetchAllApprovedSeller,fetchAllRejectedSeller}