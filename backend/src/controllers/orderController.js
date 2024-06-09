const Order = require("../models/order.model")
const Cart = require('../models/cart.model')
const Product = require('../models/product.model'); 



//add to order according to cart
// const addToOrder = async (req, res) => {
//     try {
//         userId = req.body.userId
//         addressId = req.body.addressId
//         const cart = await Cart.findOne({ userId: userId }).populate("items.item")
//         // console.log("cart"+cart);
//         for (let i = 0; i < cart?.items?.length; i++) {
            
//                 const order = new Order({
//                     items: { item: cart.items[i].item, quantity: cart.items[i].quantity},
//                     userId: userId,
//                     sellerId: cart.items[i].item.userId,
//                     amount: cart.items[i].item.price * cart.items[i].quantity,
//                     // address:addressId
//                 })
//                 await order.save()
//         }
//         return res.status(200).json({ message: "Order placed successfully" })
//     }
//     catch (err) {
//         console.log(err)
//     }
// }

// controllers/orderController.js


const addToOrder = async (req, res) => {
  try {
    const { userId, addressId } = req.body;

    // Find the cart for the given user
    const cart = await Cart.findOne({ userId }).populate('items.item');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Group items by sellerId
    const sellerItemsMap = {};
    cart.items.forEach(item => {
        console.log(item.item);
      const sellerId = item.item.userId.toString();
      if (!sellerItemsMap[sellerId]) {
        sellerItemsMap[sellerId] = [];
      }
      sellerItemsMap[sellerId].push({
        productId: item.item._id,
        quantity: item.quantity,
        price: item.item.price * item.quantity,
      });
    });

    // Create sub-orders
    const subOrders = [];
    for (const sellerId in sellerItemsMap) {
      const items = sellerItemsMap[sellerId];
      const totalAmount = items.reduce((acc, item) => acc + item.price, 0);
      subOrders.push({
        sellerId,
        items,
        totalAmount
      });
    }

    // Create new order
    const order = new Order({
      userId,
      subOrders,
      addressId,
    });

    // Save the order
    await order.save();

    // Clear the cart
    await Cart.findOneAndDelete({ userId });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// const getOrders = async (req, res) => {
//     try {
//         // const userId = req.params.userId
//         // const orders = await Order.find({ userId: userId }).populate("items.productId")
//         return res.status(200).json({message:"orders"})
//     }
//     catch (err) {
//         console.log(err)
//     }
// }

const getOrders= async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ userId }).populate('subOrders.items.productId');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// const getOrder = async (req, res) => {
//     try {
//         // const orderId = req.params.orderId
//         // const order = await Order.findById(orderId).populate("items.item")
//         // return res.status(200).json(order)
//     }
//     catch (err) {
//         console.log(err)
//     }
// }



const getOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId).populate('subOrders.sellerId').populate('subOrders.items.productId');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getOrderBySellerId = async (req, res) => {
  try {
    const sellerId = req.params.sellerId;
    const orders = await Order.find({ 'subOrders.sellerId': sellerId }).populate('subOrders.items.productId');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




module.exports = { addToOrder, getOrders, getOrder,getOrderBySellerId}