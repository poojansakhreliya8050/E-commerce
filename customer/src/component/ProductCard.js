import React from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { cartData } from '../redux/cart/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useGetCartQuery } from '../redux/cart/cartApiSlice';
import { useAddToCartMutation, useRemoveItemFromCartMutation } from '../redux/cart/cartApiSlice'
import RatingStar from './RatingStar';

const Productcard = ({ product }) => {
  // console.log(product);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const cart = useSelector(state => state.cartData.cart);

  const [addToCartMutation] = useAddToCartMutation()
  const [removeItemFromCartMutation] = useRemoveItemFromCartMutation()

  const navigate = useNavigate()

  let isAvailable = false;
  if (cart != null) {
    isAvailable = cart.items.find(item => item.item._id == product._id)
  }


  const removeItemFromCart = async () => {
    console.log("removeItemFromCart");
    try {
      if (user != null) {
        await removeItemFromCartMutation({ userId: user._id, productId: product._id }).unwrap()
      }
    } catch (err) {
      console.log(err);
    }
  }

  const addToCart = async () => {

    if (user == null)
      return navigate("/login")

    try {
      if (user != null) {
        await addToCartMutation({ userId: user._id, productId: product._id }).unwrap()
      }
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div class="group w-[340px] overflow-hidden  flex flex-col group m-4   rounded-lg shadow-lg duration-300 hover:scale-105">
      <Link to={`/productDetails/${product._id}`} class="h-48 md:h-56 lg:h-[16rem]  border-2 border-white flex items-center justify-center text-white text-base mb-3 md:mb-5 overflow-hidden relative">
        <img
          src={product.img}
          class=" object-cover w-full h-full scale-100 group-hover:scale-110 transition-all duration-400"
          alt="product"
        />

        <div class="absolute z-10 border-4 border-primary w-[95%] h-[95%] invisible group-hover:visible opacity-0 group-hover:opacity-100 group-hover:scale-90 transition-all duration-500"></div>
      </Link>

      <p class=" block text-black text-center hover:text-primary transition-colors duration-150 text-lg md:text-xl mb-1">
        {product.productName}
      </p>

      <p class="mb-1 font-light  text-sm md:text-sm text-center text-gray-950">
        {product.productDescription.length > 30 ? product.productDescription.substring(0, 30) + " ..." : product.productDescription}
      </p>

      <div className="mb-1 text-sm md:text-sm text-center text-gray-950 font-light">
        &#8377; {product.price}
      </div>
      <div className="mb-4 flex justify-center items-center">
        <div>
        <RatingStar rating={product.rating} />
        </div>
      </div>
      <div class="flex justify-center gap-x-3">
        {
          isAvailable == false || isAvailable == undefined ?
            <button onClick={() => addToCart()} class="group-hover:bottom-2 relative -bottom-12 rounded-md px-5 py-2 border border-primary text-primary hover:bg-primary  transition-all outline-none bg-black border-black text-white hover:text-black hover:bg-white font-bold">
              Add To Cart
            </button> :
            <button onClick={() => removeItemFromCart()} class="group-hover:bottom-2 relative -bottom-12 rounded-md px-5 py-2 border border-primary text-primary hover:bg-primary  transition-all outline-none bg-black border-black text-white hover:text-black hover:bg-white font-bold">
              Remove From Cart
            </button>
        }


      </div>
    </div>
  )
}

export default Productcard