import React from 'react'
import Navbar from '../../../components/user/Navbar/Navbar'
import { Outlet } from 'react-router-dom'

export default function Home() {
    return (
        <div>
            <Navbar/>

            <Outlet/>
            
        </div>
    )
}