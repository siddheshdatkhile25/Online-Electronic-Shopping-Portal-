import React from 'react'
import AdminNavbar from '../../../Components/user/Navbar/AdminNavbar'
import { Outlet } from 'react-router-dom'
import Navbar from '../../../Components/user/Navbar/Navbar'
const AdminHome = () => {
  return (
    <div>
        <AdminNavbar/>

        <Outlet/>
    </div>
  )
}

export default AdminHome