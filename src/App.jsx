
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Pastes from './components/Pastes'
import Viewpaste from './components/Viewpaste'
import Home from './components/Home'
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <Navbar />
        <Home />
      </div>
    ),
  },
  {
    path: '/paste',
    element: (
      <div>
        <Navbar />
        <Pastes />
      </div>
    ),
  },
  {
    path: '/paste/pasteid/:id',
    element: (
      <div>
        <Navbar />
        <Viewpaste />
      </div>
    ),
  },
]);

function App() {
 
  return (
    <RouterProvider router={router}>
  <div>
    hi :3
  </div>
  </RouterProvider>
  )
}

export default App
