import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/user/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './Pages/user/LandingPage/LandingPage'
import Home from './Pages/user/Home/Home'
import ProductDetails from './pages/user/Product/ProductDetails'
import Cart from './pages/user/Cart/Cart'
import { ToastContainer } from "react-toastify";


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <ToastContainer 
        position="top-right"
        autoClose={2000}
        theme="colored"
      />
      
      <Routes>
        <Route
          path='/'
          element={<Home/>}
        >
          <Route
            path='/'
            element = {<LandingPage/>}
          />

          <Route
            path='/product/:category/:id'
            element = {<ProductDetails/>}
          />
          
          <Route
            path = '/cart'
            element = {<Cart/>}
          />

        </Route>
      </Routes>
    </div>
  )
}

export default App