import React from 'react'
import { Link } from 'react-router-dom'
import BuyBazaar from '../images/icons/BuyBazaar.svg'
import { useSelector } from 'react-redux';


const Navbar = () => {
  const isUser = useSelector(state => state.auth.user);
  const notification=useSelector(state=>state.notification.order);
  return (
    <header>
      <nav class="h-20 fixed inset-x-0 top-0 z-10 w-full px-4 py-1 bg-white shadow-md border-slate-500 dark:bg-[#0c1015] transition duration-700 ease-out">
        <div className="h-full max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">

          <Link to="/" className="h-full flex items-center">
            <img src={BuyBazaar} className="h-full mr-3 scale-150" alt="Logo" />
          </Link>

          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {
                isUser != null ?
                  <>
                    <li>
                      <Link to="/addProduct" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">AddProduct</Link>
                    </li>
                    <li>
                      <Link to="/products" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Products</Link>
                    </li>
                    <div class="relative">
                      {
                        notification>0 &&
                      <div class="absolute -top-2 -right-5">
                        <p class="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">{notification}</p>
                      </div>
                      }
                      <li>
                        <Link to="/orders" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Orders</Link>
                      </li>
                    </div>
                  </> :
                  <>
                    <li>
                      <Link to="/login" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login</Link>
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