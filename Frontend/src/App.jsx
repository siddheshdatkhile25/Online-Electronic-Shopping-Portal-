

import './App.css'
import { Route, Routes } from 'react-router-dom'

import LandingPage from './Pages/user/LandingPage/LandingPage'
import SectionPage from './Pages/user/SectionPage/SectionPage'
import Home from './Pages/user/Home/Home'
import Login from './Pages/user/Login/Login'
import Register from './Pages/user/Register/Register'
import ForgotPassword from './Pages/user/ForgotPassword/ForgotPassword'
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
 

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="colored"
      />

      <Routes>

        {/* User Authentication Routes - accessible outside the main Home layout */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forget-password' element={<ForgotPassword />} />


        {/* User Routes - nested within the Home layout (e.g., header/footer) */}
        <Route path='/' element={<Home />}>
          <Route index element={<LandingPage />} /> {/* Route for "/" */}
          <Route path='product-listing/:categoryName' element={<SectionPage />} />
          <Route path='product/:category/:id' element={<ProductDetails />} />
          <Route path='cart' element={<Cart />} />
          <Route path='checkout' element={<Checkout />} />
          <Route path='add-address' element={<AddAddress />} />
          <Route path='payment' element={<Payment />} />
        </Route>

        {/* Admin Routes - nested within the AdminHome layout */}
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
