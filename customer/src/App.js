import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router-dom'
import Login from './component/Login';
import Home from './page/Home'
import Directory from './component/Directory';
import Register from './component/Register';
import VerifyUser from './component/VerifyUser';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SubCategory from './page/SubCategory';
import Cart from './page/Cart';
import Profile from './page/Profile';
import OrderDetails from './page/OrderDetails';

import ForgetPassword from './page/ForgetPassword';

// import useRefreshToken from './hooks/useRefreshToken';

import { useRefreshTokenQuery } from './redux/user/authApiSlice';
import { setCredentials } from './redux/user/authSlice';

import { useGetCartQuery } from './redux/cart/cartApiSlice';



export const App = () => {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  // console.log(auth);


  const { data: refreshToken } = useRefreshTokenQuery();
  // console.log(refreshToken);
  useEffect(() => {
    if (refreshToken) {
      dispatch(setCredentials(refreshToken));
    }
  }, [refreshToken, dispatch]);

  console.log(auth.user);
  const { data: cart } = useGetCartQuery(auth.user?._id);
  console.log(cart);

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Home />}>
      <Route index element={<Directory />} />
      {
        auth?.user != null ?
          <>
            <Route path="/category/:categoryId" element={<SubCategory />} />
            <Route path="/products" element={<SubCategory />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orderDetails/:orderId" element={<OrderDetails />} />
          </> :
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verifyUser" element={<VerifyUser />} />
            <Route path="/forgetPassword" element={<ForgetPassword />} />
          </>
      }

      <Route path="*" element={<Navigate replace to="/" />} />

    </Route>

  ));


  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}



