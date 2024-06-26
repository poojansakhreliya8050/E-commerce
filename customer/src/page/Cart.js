import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CartItem from '../component/CartItem'
import { useSelector, useDispatch } from 'react-redux';
import { setCart } from '../redux/cart/cartSlice';
import { useNavigate } from "react-router-dom";
import emptyCart from "../images/emptyCart.png"
import { loadStripe } from '@stripe/stripe-js';
import { useGetCartQuery } from '../redux/cart/cartApiSlice';



const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  console.log(user);
  const cart=useSelector(state=>state.cartData.cart);
  console.log(cart);


  let subTotal = 0;

  if (cart != null) {
    cart.items.map(item => subTotal += item.item.price * item.quantity)
  }

  const addToOrder = async () => {
    try {
      if (user != null) {
        const order = await axios.post(`${process.env.REACT_APP_URL}/api/v1/order/addToOrder`, { userId: user._id })
        dispatch(setCart(null))
        console.log(order);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const makePayment = async () => {
    try {
      if (user != null) {
        // const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
        const stripe = await loadStripe("pk_test_51PSiEmSDwUSUpxqTap4MMgiIBmFgiqVL6AtehRUe4snhcA9LZ5DF2IzTaTeGRZv8119CZzDjlHvnyTjtsJuf3Eq600tj1JvcTo");
        const response = await axios.post(`${process.env.REACT_APP_URL}/api/v1/order/makePayment`, { userId: user._id, cart: cart })
        const session = response.data.session;
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });
        console.log(result);
      }
    } catch (err) {
      console.log(err);
    }
  }


  return (

    cart == null || (cart != null && cart.items.length == 0) ?
      <div className='h-screen w-screen flex items-center flex-col'>
        <img src={emptyCart} className='w-1/2' />
        <button className='w-1/2 h-10 rounded-md bg-green-600 mt-4 hover:bg-green-400' onClick={() => { navigate("/products"); }}>Go Shopping</button>
      </div>
      :
      <div className=" bg-gray-100 pt-20">
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">

          <div className="rounded-lg md:w-2/3 overflow-y-scroll h-screen">
            {
              cart != null && cart?.items?.map((item, index) => <CartItem key={index} item={item} />)
            }

          </div>

          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">&#8377; {subTotal}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">&#8377; 50</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">&#8377; {subTotal + 50}</p>
                <p className="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600" onClick={() => addToOrder()}>Check out</button>

          </div>

        </div>
      </div>

  )
}

export default Cart