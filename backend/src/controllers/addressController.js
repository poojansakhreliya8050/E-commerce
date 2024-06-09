const Address=require('../models/address.model')


const addAddress=async(req,res)=>{
    try {
        const {streetName,area,city,state,pincode,userId}=req.body;
        // const userId=req.user._id;
        let address=new Address({
            userId,streetName,area,city,state,pincode
        })
        await address.save();
        address=await Address.find({userId});
        console.log(address);
        res.status(200).json({address})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const getAddress=async(req,res)=>{
    try {
        const userId=req.params.userId;
        const address=await Address.find({userId});
        res.status(200).json({address})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const getAddressByAddressId=async(req,res)=>{
    try {
        const addressId=req.params.addressId;
        const address=await Address.findOne({_id:addressId});
        res.status(200).json({address})
    }
    catch (error) {
        res.status(500).json({message:error.message})
    }
}

const updateAddress=async(req,res)=>{
    try {
        const {streetName,area,city,state,pincode,userId,addressId}=req.body;
        console.log(req.body);
        // const userId=req.user._id;
        let address=await Address.findOneAndUpdate ({_id:addressId},{$set:{streetName,area,city,state,pincode}},{new:true})
         address=await Address.find({userId});
         console.log(address);
         res.status(200).json({address})
    }
    catch (error) {
        res.status(500).json({message:error.message})
    }
}

const deleteAddress=async(req,res)=>{
    try {
        // const userId=req.user._id;
        const {userId,addressId}=req.body;
        console.log(userId,addressId);
        await Address.findOneAndDelete({_id:addressId})      
        const address=await Address.find({userId});
        console.log(address);
        res.status(200).json({address})
    }
    catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports={addAddress,getAddress,updateAddress,deleteAddress,getAddressByAddressId}

