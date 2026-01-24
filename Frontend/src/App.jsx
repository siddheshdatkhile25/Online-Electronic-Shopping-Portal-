import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'

import LandingPage from './Pages/user/LandingPage/LandingPage'
import SectionPage from './Pages/user/SectionPage/SectionPage'
import Home from './Pages/user/Home/Home'
import Login from './Pages/user/Login/Login'
import Register from './Pages/user/Register/Register'
import ForgotPassword from './Pages/user/ForgotPassword/ForgotPassword'
import Otp from './Pages/user/Otp/Otp'
import ResetPassword from './Pages/user/ResetPassword/ResetPassword'

import ProductDetails from './pages/user/Product/ProductDetails'
import Cart from './pages/user/Cart/Cart'
import Checkout from './pages/user/Checkout/Checkout'
import AddAddress from './pages/user/AddAddress/AddAddress'
import Payment from './pages/user/Payment/Payment'
import ContactUs from './Pages/user/ContactUs/ContactUs'
import Profile from './Pages/user/Profile/Profile'
import OrderList from './Pages/user/Order/OrderList'

import AddProduct from './Pages/admin/AddProduct/AddProduct'
import AddCategory from './Pages/admin/AddCategory/AddCategory'
import AdminHome from './Pages/admin/AdminHome/AdminHome'
import ManageProduct from './Pages/admin/ManageProduct/ManageProduct'
import EditProduct from './Pages/admin/EditProduct/EditProduct'
import CustomerOrders from './Pages/admin/CustomerOrders/CustomerOrders'
import ApplyDiscount from './Pages/admin/ApplyDiscount/ApplyDiscount'
import AdminDashboard from './Pages/admin/AdminDashboard/AdminDashboard'

import { ToastContainer } from 'react-toastify'
import { Contact } from 'lucide-react'

function App() {

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="colored"
      />

      <Routes>
        {/* Auth Routes */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forget-password' element={<ForgotPassword />} />
        <Route path='/otp' element={<Otp />} />
        <Route path='/reset-password' element={<ResetPassword />} />

        {/* USER ROUTES */}
        <Route path='/' element={<Home />}>
          <Route index element={<LandingPage />} />
          <Route path='product-listing/:categoryName' element={<SectionPage />} />
          <Route path='product/:category/:id' element={<ProductDetails />} />
          <Route path='cart' element={<Cart />} />
          <Route path='checkout' element={<Checkout />} />
          <Route path='add-address' element={<AddAddress />} />
          <Route path='payment' element={<Payment />} />
          <Route path='contact-us' element={<ContactUs />} />
          <Route path='profile' element={<Profile />} />
          <Route path='orders' element={<OrderList/>} />
        </Route>

        {/* ADMIN ROUTES */}
        <Route path='/admin' element={<AdminHome />}>
          <Route index element={<AdminDashboard />} />
          <Route path='add-category' element={<AddCategory />} />
          <Route path='add-product' element={<AddProduct />} />
          <Route path='view-product' element={<ManageProduct />} />
          <Route path='edit-product/:id' element={<EditProduct />} />
          <Route path='apply-discount/:id' element={<ApplyDiscount />} />
          <Route path='view-orders' element={<CustomerOrders />} />
          {/* <Route path='manage-payment' element={<PaymentPage/>}/> */}
        </Route>
      </Routes>
    </div>
  )
}

export default App
