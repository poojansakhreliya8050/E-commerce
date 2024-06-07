import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './page/Home'
import AddProduct from './page/AddProduct';
import Product from './page/Product';
import Login from './page/Login';
import Register from './page/Register';
import VerifyUser from './page/VerifyUser';
import Directory from './components/Directory';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { userData } from './redux/user/userSlice';

export const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      async function checkRefreshToken() {
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
      checkRefreshToken();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Home />}>
      <Route index element={<Directory />} />
      <Route path="/addProduct" element={<AddProduct />} />
      <Route path="/products" element={<Product />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verifyUser" element={<VerifyUser />} />
    </Route>

  ));

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}



