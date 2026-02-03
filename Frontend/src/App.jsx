
import './App.css'
import { Route, Routes } from 'react-router-dom'

import LandingPage from './pages/user/LandingPage/LandingPage'
import SectionPage from './pages/user/SectionPage/SectionPage'
import Home from './pages/user/Home/Home'
import Login from './pages/user/Login/Login'
import Register from './pages/user/Register/Register'
import ForgotPassword from './pages/user/ForgotPassword/ForgotPassword'
import Otp from './pages/user/Otp/Otp'
import ResetPassword from './pages/user/ResetPassword/ResetPassword'

import ProductDetails from './pages/user/Product/ProductDetails'
import Cart from './pages/user/Cart/Cart'
import Checkout from './pages/user/Checkout/Checkout'
import AddAddress from './pages/user/AddAddress/AddAddress'
import Payment from './pages/user/Payment/Payment'
import ContactUs from './pages/user/ContactUs/ContactUs'
import AboutUs from './pages/user/AboutUs/AboutUs'
import Profile from './pages/user/Profile/Profile'
import OrderList from './pages/user/Order/OrderList'
import Wishlist from './pages/user/Wishlist/Wishlist';

import AddProduct from './pages/admin/AddProduct/AddProduct'
import AddCategory from './pages/admin/AddCategory/AddCategory'
import AdminHome from './pages/admin/AdminHome/AdminHome'
import ManageProduct from './pages/admin/ManageProduct/ManageProduct'
import EditProduct from './pages/admin/EditProduct/EditProduct'
import CustomerOrders from './pages/admin/CustomerOrders/CustomerOrders'
import ApplyDiscount from './pages/admin/ApplyDiscount/ApplyDiscount'
import AdminDashboard from './pages/admin/AdminDashboard/AdminDashboard'


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
          <Route path='product-listing/:categoryId' element={<SectionPage />} />
          <Route path='product/:id' element={<ProductDetails />} />
          <Route path='cart' element={<Cart />} />
          <Route path='wishlist' element={<Wishlist />} />
          <Route path='checkout' element={<Checkout />} />
          <Route path='add-address' element={<AddAddress />} />
          <Route path='payment' element={<Payment />} />
          <Route path='contact-us' element={<ContactUs />} />
          <Route path='profile' element={<Profile />} />
          <Route path='orders' element={<OrderList/>} />
          <Route path='about' element={<AboutUs/>} />
          
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
