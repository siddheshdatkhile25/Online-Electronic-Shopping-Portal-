import React from 'react'
import AdminNavbar from '../../../components/user/Navbar/AdminNavbar'
import { Outlet } from 'react-router-dom'
import Navbar from '../../../components/user/Navbar/Navbar'
const AdminHome = () => {
  return (
    <div>
        <AdminNavbar/>

        <Outlet/>
    </div>
  )
}

export default AdminHome