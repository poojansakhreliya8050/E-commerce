import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route ,RouterProvider} from 'react-router-dom'
import Home from './page/Home'
import AddProduct from './page/AddProduct';
import Product from './page/Product';


export const App = () => {

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Home />}>
    <Route path="/addProduct" element={<AddProduct/>}/>
    <Route path="/products" element={<Product/>}/>
  </Route>

));

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}



