import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Login from './component/Login';
import Home from './page/Home'
import Directory from './component/Directory';
import Register from './component/Register';
import VerifyUser from './component/VerifyUser';
import { RouterProvider } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userData } from './redux/user/userSlice';
import { Aavade } from './page/Aavade';
// import Product from './temp/Product';



export const App = () => {

  const dispatch = useDispatch();

useEffect(() => {
  try {
    async function checkRefreshToken() {
      const user = await (await fetch(`${process.env.REACT_APP_URL}/user/refresh_token`, {
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


const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Home />}>
    <Route index element={<Directory />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/verifyUser" element={<VerifyUser />} />
    <Route path="/aavade" element={<Aavade/>}/>
    {/* <Route path="/slider" element={<Product/>}/> */}
  </Route>

));


  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}



