import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route ,RouterProvider} from 'react-router-dom'
import Home from './page/Home'


export const App = () => {

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Home />}>
  </Route>

));

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}



