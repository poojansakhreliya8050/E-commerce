import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route ,RouterProvider} from 'react-router-dom'
import Home from './page/Home'
import AddProduct from './page/AddProduct';


export const App = () => {

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Home />}>
    <Route path="/addProduct" element={<AddProduct/>}/>
  </Route>

));

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}



