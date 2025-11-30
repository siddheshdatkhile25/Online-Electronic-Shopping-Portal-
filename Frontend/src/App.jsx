import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Navbar from './Components/user/Navbar/Navbar'
import AddProduct from './Pages/admin/AddProduct/AddProduct'
import AddCategory from './Pages/admin/AddCategory/AddCategory'
import AdminHome from './Pages/admin/AdminDashboard/AdminHome'


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
           </Route>
       </Routes>
     
    </div>
  )
}

export default App
