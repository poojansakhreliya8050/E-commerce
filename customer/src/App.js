import './App.css';
import { useEffect, lazy, Suspense } from 'react';

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useRefreshTokenQuery } from './redux/user/authApiSlice';
import { useGetCartQuery } from './redux/cart/cartApiSlice';
import { setCredentials } from './redux/user/authSlice';
import useOnline from './hooks/useOnline';

import Home from './page/Home'
import Directory from './component/Directory';
import OfflinePage from './page/OfflinePage';
import Loading from './component/Loading';

// import Login from './component/Login';
// import Register from './component/Register';
// import VerifyUser from './component/VerifyUser';
// import ForgetPassword from './page/ForgetPassword';
// import SubCategory from './page/SubCategory';
// import Cart from './page/Cart';
// import Profile from './page/Profile';
// import OrderDetails from './page/OrderDetails';

const Login = lazy(() => import('./component/Login'));
const Register = lazy(() => import('./component/Register'));
const VerifyUser = lazy(() => import('./component/VerifyUser'));
const ForgetPassword = lazy(() => import('./page/ForgetPassword'));
const SubCategory = lazy(() => import('./page/SubCategory'));
const Cart = lazy(() => import('./page/Cart'));
const Profile = lazy(() => import('./page/Profile'));
const OrderDetails = lazy(() => import('./page/OrderDetails'));



export const App = () => {

  const isOnline = useOnline();
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

  const { data: cart } = useGetCartQuery(auth.user?._id, {
    skip: !auth.user?._id, // Skip the query if userId is not defined
  });
  // console.log(cart);

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

  if (!isOnline) {
    return <OfflinePage />
  }

  return (
    <div>
      <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
      </Suspense>
    </div>
  )
}



