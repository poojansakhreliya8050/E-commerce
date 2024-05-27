const Order = require("../models/order")
const cart=require('../models/cart')

const addToOrder=async(req,res)=>{
    try{
        const {userId,addressId,paymentId}=req.body
        const cartExist=await cart.findOne({userId:userId}).populate("items.item")
        if(!cartExist){
            return res.status(404).json({message:"cart not found"})
        }
        const items=cartExist.items.map(item=>({item:item.item,quantity:item.quantity}))
        const amount=cartExist.items.reduce((acc,item)=>acc+item.item.price*item.quantity,0)
        console.log(items,amount);
        // const order=await Order.create({items:items,userId:userId,amount:amount,address:addressId,paymentId:paymentId})
        let orderData=await Order.create({items:items,userId:userId,amount:amount})
        orderData=await Order.findOne({userId}).populate("items.item")
        return res.status(200).json(orderData)
    }
    catch(err){
        console.log(err)
    }
}

const getOrders=async(req,res)=>{
    try{
        const userId=req.params.userId
        const orders=await Order.find({userId:userId}).populate("items.item")
        return res.status(200).json(orders)
    }
    catch(err){
        console.log(err)
    }
}

const getOrder=async(req,res)=>{
    try{
        const orderId=req.params.orderId
        const order=await Order.findById(orderId).populate("items.item")
        return res.status(200).json(order)
    }
    catch(err){
        console.log(err)
    }
}

module.exports={addToOrder,getOrders,getOrder}