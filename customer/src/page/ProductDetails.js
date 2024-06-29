import React, { useEffect, useState } from 'react'
import ProductImageCarousel from '../component/ProductImageCarousel'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import RatingStar from '../component/RatingStar'
import { useSelector } from 'react-redux'
import { useAddToCartMutation, useRemoveFromCartMutation } from '../redux/cart/cartApiSlice'




const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  const user = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.cartData.cart);
 
  let isAvailable = false;
  if (cart != null) {
    isAvailable = cart.items.find(item => item.item._id == productId)
  }

  const [addToCartMutation] = useAddToCartMutation()
  const [removeFromCartMutation] = useRemoveFromCartMutation()




  useEffect(() => {
    console.log(productId);
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/api/v1/product/fetchProductById/${productId}`);
        console.log(response.data);
        setProduct(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchProduct();
  }
    , [productId]);

  const removeFromcart = async () => {
    console.log("remove");
    try {
      if (user != null) {
        await removeFromCartMutation({ userId: user._id, productId: productId }).unwrap()
      }
    } catch (err) {
      console.log(err);
    }
  }

  const addToCart = async () => {
    try {
      if (user != null) {
        await addToCartMutation({ userId: user._id, productId: productId }).unwrap()
      }
    } catch (err) {
      console.log(err);
    }
  }

  const imageArray = [
    "http://res.cloudinary.com/dkffxyhkn/image/upload/v1713028136/hdowereud82ohhvbjfv4.jpg",
    "http://res.cloudinary.com/dkffxyhkn/image/upload/v1716647329/wfqmskwasyfeyszfxgbl.jpg",
    "http://res.cloudinary.com/dkffxyhkn/image/upload/v1719152370/t6doecrs0mpf5kdszwwi.jpg",
    "http://res.cloudinary.com/dkffxyhkn/image/upload/v1719418732/wxisge63ra7m3psjeavs.jpg",
    "http://res.cloudinary.com/dkffxyhkn/image/upload/v1713028136/hdowereud82ohhvbjfv4.jpg",

  ]

  return (
    <div className='w-screen h-screen'>
      {
        product != null ?
        <div>
          <div className='flex'>
            <div className='w-full lg:w-1/3 mt-24 mx-5'>
              <ProductImageCarousel images={imageArray} />
            </div>
            <div className='w-full lg:w-2/3 mt-24 '>
              <h1 className='text-2xl font-bold uppercase'>{product.productName}</h1>
              <p className='text-lg text-gray-500'>{product.productDescription}</p>
              <h1 className='text-xl '>${product.price}</h1>
              <div className='flex'>
                <p className='text-lg'>
                  {product.rating}
                </p>
                &nbsp; <RatingStar rating={product.rating} />
              </div>
              <div class="flex mt-3 ml-3">
                {
                  isAvailable == false || isAvailable == undefined ?
                    <button onClick={() => addToCart()} class="relative rounded-md px-5 py-2 border border-primary text-primary hover:bg-primary  transition-all outline-none bg-black border-black text-white hover:text-black hover:bg-white font-bold">
                      Add To Cart
                    </button> :

                    <div className="flex">
                      <div className="flex items-center border-gray-100">
                        <span onClick={()=>removeFromcart()} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50" > - </span>
                        <div className="h-8 w-8 border bg-white text-center text-xs outline-none flex justify-center items-center" >{isAvailable.quantity}</div>
                        <span onClick={() => addToCart()} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50" > + </span>
                      </div>
                    </div>
                }
              </div>
            </div>
          </div>

        </div>

          : <>Loading...</>
      }
    </div>
  )
}

export default ProductDetails