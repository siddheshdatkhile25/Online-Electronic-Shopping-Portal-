import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/user/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './Pages/user/LandingPage/LandingPage'
import SectionPage from './Pages/user/SectionPage/SectionPage'
import Home from './Pages/user/Home/Home'

import ProductDetails from './pages/user/Product/ProductDetails'
import Cart from './pages/user/Cart/Cart'
import Login from './Pages/user/Login/Login'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Routes>
        <Route
          path='/login'
          element={<Login/>}
        />
        <Route
          path='/'
          element={<Home/>}
        >
          <Route
            path='/'
            element = {<LandingPage/>}
          />

          <Route
            path='/product-listing/:categoryName'
            element = {<SectionPage/>}
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
