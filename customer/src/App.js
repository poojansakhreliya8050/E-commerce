import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route ,RouterProvider} from 'react-router-dom'
import Login from './component/Login';
import Home from './page/Home'
import Directory from './component/Directory';
import Register from './component/Register';
import VerifyUser from './component/VerifyUser';
import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Aavade } from './page/Aavade';
import SubCategory from './page/SubCategory';
import Cart from './page/Cart';

import { userData } from './redux/user/userSlice';
import { cartData } from './redux/cart/cartSlice';



export const App = () => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.userData.user);


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
      console.log(user);
      dispatch(userData(user))
    }
    checkRefreshToken();
  } catch (err) {
    console.log(err);
  }
}, []);


useEffect(() => {
  try {
    if(user!=null){
    async function cart() {
      const cart = await (await fetch(`${process.env.REACT_APP_URL}/api/v1/cart/getCart/${user.userdata._id}`)).json();
      console.log(cart);
      dispatch(cartData(cart))
    }
    cart();
  }
  } catch (err) {
    console.log(err);
  }
});



const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Home />}>
    <Route index element={<Directory />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/verifyUser" element={<VerifyUser />} />
    <Route path="/category/:categoryId" element={<SubCategory/>}/>
    <Route path="/products" element={<SubCategory/>}/>
    <Route path="/cart" element={<Cart/>}/>
    {/* <Route path="/slider" element={<Product/>}/> */}
  </Route>

));


  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}



