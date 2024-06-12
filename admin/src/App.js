import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route,RouterProvider} from 'react-router-dom'
import Home from './pages/Home';
import Category from './pages/Category';
import SubCategory from './pages/SubCategory';
import VerifySeller from './pages/VerifySeller';

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Home/>}>
      <Route path="/category" element={<Category/>}/>
      <Route path="/subCategory" element={<SubCategory/>}/>
      <Route path="/verifySeller/:status" element={<VerifySeller/>}/>
    </Route>

  ));

  return (
    <RouterProvider router={router} />
  );
}

export default App;
