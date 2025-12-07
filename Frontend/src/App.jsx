import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Navbar from './Components/user/Navbar/Navbar'
import AddProduct from './Pages/admin/AddProduct/AddProduct'
import AddCategory from './Pages/admin/AddCategory/AddCategory'
import AdminHome from './Pages/admin/AdminDashboard/AdminHome'
import ManageProduct from './Pages/admin/ManageProduct/ManageProduct'
import EditProduct from './Pages/admin/EditProduct/EditProduct'
import CustomerOrders from './Pages/admin/CustomerOrders/CustomerOrders'
import { ToastContainer } from 'react-toastify'
import ApplyDiscount from './Pages/admin/ApplyDiscount/ApplyDiscount'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
     <Routes>
          <Route
              path='/admin'
              element={
                
                  < AdminHome/>
               }
            >
             <Route
            path='add-category'
            element={<AddCategory/>}/>
            <Route
            path='add-product'
            element={<AddProduct/>}
            />
            <Route 
            path='view-product'
            element={<ManageProduct/>}/>
            <Route 
            path='edit-product/:id'
            element={<EditProduct/>}/>
            <Route 
            path='apply-discount/:id'
            element={<ApplyDiscount/>}/>
            <Route path='view-orders'
            element={<CustomerOrders/>}/>
           </Route>
       </Routes>
     <ToastContainer/>
    </div>
  )
}

export default App
