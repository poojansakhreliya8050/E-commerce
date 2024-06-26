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
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useRefreshTokenQuery } from './redux/user/authApiSlice';
import { setCredentials } from './redux/user/authSlice';
import socket from './config/socket';
import { recivedOrder } from './redux/notification/notificationSlice';


export const App = () => {
  const [notificationPermission, setNotificationPermission] = useState(null);
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

  useEffect(() => {
    console.log("Notification permission: ", Notification.permission);
    if (Notification.permission != 'granted') {
      Notification.requestPermission();
    }

    if (auth != null) {
      console.log("Joining seller room: ", auth._id);
      // Join seller's room
      socket.emit('joinSeller', auth._id);

      // Listen for new orders
      socket.on('newOrder', (order) => {
        dispatch(recivedOrder());
        console.log(order);

        // Show browser notification
        if (Notification.permission == 'granted') {
          console.log("notification received");
          new Notification('New Order Received', {
            body: `Order Details: ${order.items.map(item => item.item.productName).join(', ')}`,
            icon: order.items[0].item.img // Optional: URL to an icon
          });
        }
      });

      return () => {
        socket.off('newOrder');
        socket.emit('leaveSeller', auth._id);
      };
    }
  });


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



