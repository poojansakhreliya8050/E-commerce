import React, { useEffect, useState } from 'react'
import BuyBazaar from '../images/icons/BuyBazaar.svg'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import CartIcon from './CartIcon';
import Search from './Search';

const Navbar = () => {
  const isUser = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  return (
    <header >
      <nav class="h-20 fixed inset-x-0 top-0 z-10 w-full px-4 py-1 bg-white shadow-md border-slate-500 dark:bg-[#0c1015] transition duration-700 ease-out">
        <div className="h-full max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">

          <Link to="/" className="h-full flex items-center">
            <img src={BuyBazaar} className="h-full mr-3 scale-150" alt="Logo" />
          </Link>
          <Search/>


          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            
            
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link to="/products" className="mt-2 block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Products</Link>
              </li>
              <li>
                <Link to="/contactUs" className="mt-2 block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">ContactUs</Link>
              </li>
             
             
              {isUser == null ?
                <>
                  <li>
                    <Link to="/login" className="mt-2 block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login</Link> 
                  </li>
                </> :
                <>
                  <li>
                    <CartIcon />
                  </li>
                  <li>
                    <Link to="/profile" className="mt-2 block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Profile</Link>
                  </li>
                </>

              }

            </ul>
          </div>
        </div>
      </nav>
    </header>

  );
};


export default Navbar