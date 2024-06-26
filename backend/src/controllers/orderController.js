const Order = require("../models/order.model")
const Cart = require('../models/cart.model')
const Product = require('../models/product.model');
const User = require('../models/user.model');
const { getSocket } = require("../utils/socket");
const stripe = require('stripe')("sk_test_51PSiEmSDwUSUpxqT11f62LvpsICEu3X1d06NmkdovQw1YHM8wraqIV9CIQG8yTuwiE1THL3HfEY1nmq1OAjcMWS6002e05qlGT");



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


const addToOrder = async (req, res) => {
  try {
    const { userId, addressId } = req.body;
    const cart = await Cart.findOne({ userId }).populate('items.item');
    const sellerIds = cart.items.map((item) => item.item.userId.toString());
    const uniqueSellerIds = [...new Set(sellerIds)];
    console.log(uniqueSellerIds);
    uniqueSellerIds.forEach(async (sellerId) => {
      const items = cart.items.filter((item) => item.item.userId == sellerId);
      const totalAmount = items.reduce((acc, item) => acc + item.item.price * item.quantity, 0);
      // console.log(...items);
      let order = new Order({
        userId,
        sellerId,
        items,
        totalAmount,
        address: addressId
      })
      await order.save()
      order=await Order.findById(order._id).populate('userId').populate('items.item');
      const io=getSocket();
      io.to(sellerId).emit('newOrder',order);
    });

    await Cart.findOneAndDelete({ userId });
    const orders = await Order.find({ userId });
    res.status(201).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//get all orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('items.item').populate('sellerId').populate('address').sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//get all orders get by userId
const getOrdersByUserId = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).populate('items.item').populate('sellerId').populate('address').sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//get order by id
const getOrder = async (req, res) => {
  try {
    console.log(req.params.orderId);
    const order = await Order.findById(req.params.orderId).populate('items.item').populate('sellerId').populate('address').populate('review');
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//get order by seller id
const getOrderBySellerId = async (req, res) => {
  try {
    const orders = await Order.find({ sellerId: req.params.sellerId }).populate('items.item').populate('userId').populate('address').sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const cancelledOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    order.deliveryStatus = 'cancelled';
    await order.save();
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const dispatchedOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    order.deliveryStatus = 'dispatched';
    await order.save();
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

const onTheWayOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    order.deliveryStatus = 'ontheway';
    await order.save();
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

const deliveredOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    order.deliveryStatus = 'delivered';
    await order.save();
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const makePayment = async (req, res) => {
  try {
    const { userId, cart } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cart.items.map(item => ({
        price_data: {
          currency: 'inr',
          product_data: {
            name: item.item.productName,
          },
          unit_amount: item.item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `http://localhost:3000/success`,
      cancel_url: `http://localhost:3000/cancel`,
    });
    res.status(200).json({ session });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getPendingOrders = async (req, res) => {
  try {
    const orders = await Order.find({ deliveryStatus: 'pending' }).populate('items.item').populate('sellerId').populate('address').sort({ createdAt: -1 });
    res.status(200).json(orders);
  }
  catch (error) {
    res.status(404).json({ message: error.message });
  }
}

const getDispatchedOrders = async (req, res) => {
  try {
    const orders = await Order.find({ deliveryStatus: 'dispatched' }).populate('items.item').populate('sellerId').populate('address').sort({ createdAt: -1 });
    res.status(200).json(orders);
  }
  catch (error) {
    res.status(404).json({ message: error.message });
  }
}

const getOnTheWayOrders = async (req, res) => {
  try {
    const orders = await Order.find({ deliveryStatus: 'ontheway' }).populate('items.item').populate('sellerId').populate('address').sort({ createdAt: -1 });
    res.status(200).json(orders);
  }
  catch (error) {
    res.status(404).json({ message: error.message });
  }
}

const getDeliveredOrders = async (req, res) => {
  try {
    const orders = await Order.find({ deliveryStatus: 'delivered' }).populate('items.item').populate('sellerId').populate('address').sort({ createdAt: -1 });
    res.status(200).json(orders);
  }
  catch (error) {
    res.status(404).json({ message: error.message });
  }
}

const getCancelledOrders = async (req, res) => {
  try {
    const orders = await Order.find({ deliveryStatus: 'cancelled' }).populate('items.item').populate('sellerId').populate('address').sort({ createdAt: -1 });
    res.status(200).json(orders);
  }
  catch (error) {
    res.status(404).json({ message: error.message });
  }
}





module.exports = { addToOrder, getOrders, getOrdersByUserId, getOrder, getOrderBySellerId, cancelledOrder, dispatchedOrder, onTheWayOrder, deliveredOrder, makePayment, getPendingOrders, getDispatchedOrders, getOnTheWayOrders, getDeliveredOrders, getCancelledOrders}