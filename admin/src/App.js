import './App.css';
import Sidebar from './components/Sidebar';
import { createBrowserRouter, createRoutesFromElements, Route,RouterProvider} from 'react-router-dom'
import Home from './pages/Home';
import Category from './pages/Category';

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Home/>}>
      <Route path="/category" element={<Category/>}/>
    </Route>

  ));

  return (
    <RouterProvider router={router} />
  );
}

export default App;
