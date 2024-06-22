import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useGetCartQuery } from '../redux/cart/cartApiSlice';


const CartIcon = () => {
    const user = useSelector((state) => state.auth.user);
    // console.log(user);
    const cart=useSelector(state=>state.cartData.cart);
    // console.log(cart);
    let number = 0;
    if (cart != null && cart?.items?.length > 0) {
        number = cart.items.reduce((acc, item) => acc + item.quantity, 0);
    }
    return (
        <Link to="/cart" className="relative">
            {cart != null && cart?.items?.length > 0 ?
                <div className="t-0 absolute left-3">
                    <p className="flex h-0.5 w-0.5 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">{number}</p>
                </div> : <></>
            }
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="file: mt-4 h-5 w-5 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
        </Link>
    )
}

export default CartIcon