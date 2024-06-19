import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router-dom'
import axios from 'axios'
import Login from './component/Login';
import Home from './page/Home'
import Directory from './component/Directory';
import Register from './component/Register';
import VerifyUser from './component/VerifyUser';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Aavade } from './page/Aavade';
import SubCategory from './page/SubCategory';
import Cart from './page/Cart';

import { userData } from './redux/user/userSlice';
import { cartData } from './redux/cart/cartSlice';
import Profile from './page/Profile';
import OrderDetails from './page/OrderDetails';

import { useGetCartQuery } from './redux/cart/cartApi';
import ForgetPassword from './page/ForgetPassword';



export const App = () => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.userData.user);

  const { data, error, isLoading } = useGetCartQuery(user?.userdata?._id, {
    skip: !user?.userdata?._id, // Skip query execution until an ID is provided
  });
  // console.log(data);


  useEffect(() => {

    async function checkRefreshToken() {
      try {
        const user = await (await fetch(`${process.env.REACT_APP_URL}/api/v1/user/refresh_token`, {
          method: 'POST',
          credentials: 'include', // Needed to include the cookie | also needed in login and register page
          headers: {
            'Content-Type': 'application/json',
          }
        })).json();
        // console.log(user);
        dispatch(userData(user))
      }
      catch (err) {
        console.log(err);
      }
    }
    checkRefreshToken();

    // const checkRefreshToken = async () => {
    //   try {
    //     const user = await axios.post(`${process.env.REACT_APP_URL}/api/v1/user/refresh_token`, {
    //       credentials: 'include', // Needed to include the cookie | also needed in login and register page
    //       headers: {
    //         'Content-Type': 'application/json',
    //       }
    //     });
    //     console.log(user);
    //     dispatch(userData(user.data))
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
    // checkRefreshToken();



  }, []);

  //give me above function in axios base





  // useEffect(() => {
  //   try {
  //     if (user != null && user?.accessToken != "" && user.accessToken != null) {
  //       async function cart() {
  //         const cart = await (await fetch(`${process.env.REACT_APP_URL}/api/v1/cart/getCart/${user.userdata._id}`)).json();
  //         console.log(cart);
  //         dispatch(cartData(cart))
  //       }
  //       cart();
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // });



  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Home />}>
      <Route index element={<Directory />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verifyUser" element={<VerifyUser />} />
      <Route path="/forgetPassword" element={<ForgetPassword />} />
      <Route path="/category/:categoryId" element={<SubCategory />} />
      <Route path="/products" element={<SubCategory />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/orderDetails/:orderId" element={<OrderDetails />} />
      <Route path="*" element={<Navigate replace to="/" />} />

    </Route>

  ));


  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}



