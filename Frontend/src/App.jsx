import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/user/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './Pages/user/LandingPage/LandingPage'
import SectionPage from './Pages/user/SectionPage/SectionPage'
import Home from './Pages/user/Home/Home'
import Login from './Pages/user/Login/Login'
import Register from './Pages/user/Register/Register'
import ForgotPassword from './Pages/user/ForgotPassword/ForgotPassword'

import ProductDetails from './pages/user/Product/ProductDetails'
import Cart from './pages/user/Cart/Cart'


import { ToastContainer } from "react-toastify";
import Checkout from './pages/user/Checkout/Checkout'
import AddAddress from './pages/user/AddAddress/AddAddress'
import Payment from './pages/user/Payment/Payment'




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
          path='/login'
          element={<Login />}
        />
        <Route
          path='/register'
          element={<Register />}
        />




        <Route
          path='/'
          element={<Home />}
        >
          <Route
            path='/forget-password'
            element={<ForgotPassword />}
          />
          <Route
            path='/'
            element={<LandingPage />}
          />

          <Route
            path='/product-listing/:categoryName'
            element={<SectionPage />}
          />

          <Route
            path='/product/:category/:id'
            element={<ProductDetails />}
          />

          <Route
            path='/cart'
            element={<Cart />}
          />

          <Route
            path='/checkout'
            element={<Checkout />}
          />

          <Route
            path="/add-address"
            element={<AddAddress />}
          />

          <Route
            path="/Payment"
            element={<Payment />}
          />

        </Route>
      </Routes>
    </div>

  )
}

export default App