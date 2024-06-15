import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route,RouterProvider,Navigate} from 'react-router-dom'
import Home from './pages/Home';
import Category from './pages/Category';
import SubCategory from './pages/SubCategory';
import VerifySeller from './pages/VerifySeller';
import SellerDetails from './pages/SellerDetails';
import Products from './pages/Products';
import Orders from './pages/Orders';

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Home/>}>
      <Route path="/category" element={<Category/>}/>
      <Route path="/subCategory" element={<SubCategory/>}/>
      <Route path="/verifySeller/:status" element={<VerifySeller/>}/>
      <Route path="/sellerDetails/:userId" element={<SellerDetails/>}/>
      <Route path="/products" element={<Products/>}/>
      <Route path="/orders" element={<Orders/>}/>
      <Route path="*"  element={<Navigate replace to="/" />}/>
    </Route>

  ));

  return (
    <RouterProvider router={router} />
  );
}

export default App;
