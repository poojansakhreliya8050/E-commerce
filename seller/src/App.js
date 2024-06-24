import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router-dom'
import Home from './page/Home'
import AddProduct from './page/AddProduct';
import Product from './page/Product';
import Login from './page/Login';
import Register from './page/Register';
import VerifyUser from './page/VerifyUser';
import Directory from './components/Directory';
import VerifySeller from './page/VerifySeller';
import Orders from './page/Orders';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useRefreshTokenQuery } from './redux/user/authApiSlice';
import { setCredentials } from './redux/user/authSlice';


export const App = () => {

  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth.user);
  // console.log(auth);

  const { data: refreshToken } = useRefreshTokenQuery();
  // console.log(refreshToken);
  useEffect(() => {
    if (refreshToken) {
      dispatch(setCredentials(refreshToken));
    }
  }, [refreshToken, dispatch]);


  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Home />}>
      <Route index element={<Directory />} />
      {
        auth != null ?
          <>
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/products" element={<Product />} />
            <Route path="/orders" element={<Orders />} />
          </> :
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verifyUser" element={<VerifyUser />} />
            <Route path="/VerifySeller" element={<VerifySeller />} />
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



