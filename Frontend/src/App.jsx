import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'


import LandingPage from './Pages/user/LandingPage/LandingPage'
import SectionPage from './Pages/user/SectionPage/SectionPage'
import Home from './Pages/user/Home/Home'
import Login from './Pages/user/Login/Login'
import ProductDetails from './pages/user/Product/ProductDetails'
import Cart from './pages/user/Cart/Cart'
import Checkout from './pages/user/Checkout/Checkout'
import AddAddress from './pages/user/AddAddress/AddAddress'
import Payment from './pages/user/Payment/Payment'


import AddProduct from './Pages/admin/AddProduct/AddProduct'
import AddCategory from './Pages/admin/AddCategory/AddCategory'
import AdminHome from './Pages/admin/AdminHome/AdminHome'
import ManageProduct from './Pages/admin/ManageProduct/ManageProduct'
import EditProduct from './Pages/admin/EditProduct/EditProduct'
import CustomerOrders from './Pages/admin/CustomerOrders/CustomerOrders'
import ApplyDiscount from './Pages/admin/ApplyDiscount/ApplyDiscount'
import AdminDashboard from './Pages/admin/AdminDashboard/AdminDashboard'


import { ToastContainer } from 'react-toastify'

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

        
        <Route path='/login' element={<Login />} />

        <Route path='/' element={<Home />}>
          <Route path='/' element={<LandingPage />} />
          <Route path='/product-listing/:categoryName' element={<SectionPage />} />
          <Route path='/product/:category/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/add-address' element={<AddAddress />} />
          <Route path='/payment' element={<Payment />} />
        </Route>

      
        <Route path='/admin' element={<AdminHome />}>
          <Route index element={<AdminDashboard />} />
          <Route path='add-category' element={<AddCategory />} />
          <Route path='add-product' element={<AddProduct />} />
          <Route path='view-product' element={<ManageProduct />} />
          <Route path='edit-product/:id' element={<EditProduct />} />
          <Route path='apply-discount/:id' element={<ApplyDiscount />} />
          <Route path='view-orders' element={<CustomerOrders />} />
        </Route>

      </Routes>

    </div>
  )
}

export default App
