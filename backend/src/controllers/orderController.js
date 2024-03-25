const Order = require("../models/order")

const createOrder=async(req,res)=>{
    try{
        console.log(req.body);
           const order=await Order.create({itemId:req.body.itemId,userId:req.body.userId,count:req.body.count,deliveryStatus:req.body.deliveryStatus,payment:req.body.payment})
            console.log(order);

           return res.status(200).json({
            message:"successfully create order"
           })
    }
    catch(e)
    {
        console.log(e);
    }
}
const fetchAllOrder=async(req,res)=>{
    try {
        const allOrder = await Order.find();
        res.status(200).json(allOrder)
    } catch (err) {
        console.log(err);
    }
}

const fetchOrderByUserId = async (req, res) => {
    try {
        const orders = await Order.findOne({ userId: req.params.userId });
        res.status(200).json(orders)
    } catch (err) {
        console.log(err);
    }
}

const deleteOrderByOrderId = async (req, res) => {
    try {
        await Order.deleteOne({ id: req.params.id })
        res.status(200).json({message:`delete order : ${req.params.id}`})
    } catch (err) {
        console.log(err);
    }
}

module.exports={createOrder,fetchAllOrder,fetchOrderByUserId,deleteOrderByOrderId}