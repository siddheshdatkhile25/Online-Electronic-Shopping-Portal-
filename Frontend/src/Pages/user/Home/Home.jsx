import React from 'react'
import Navbar from '../../../Components/user/Navbar/Navbar'
import outlet from 'react-router-dom'

export default function Home() {
    return (
        <div>
            <Navbar/>

            <outlet/>
            
        </div>
    )
}