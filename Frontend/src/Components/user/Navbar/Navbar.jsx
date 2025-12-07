import React from 'react'
import './Navbar.css'
import shoppingCartIcon from '../icons/shopping-cart.png'
import wishlistIcon from '../icons/wishlist.png'
import { useNavigate } from "react-router-dom"

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className='navbar' data-bs-theme='dark'>
  <div className='container-fluid'>

    {/* LEFT SECTION */}
    <div className="nav-left">
      <h2 className='navbar-brand'>ElectroKart</h2>

      <ul className='nav-menu'>
        <li>Shop</li>
        <li>About Us</li>
      </ul>
    </div>

    {/* CENTER SECTION */}
    <div className="nav-center">
      <div className="searchbar">
        <input type="text" placeholder="Search..." />
      </div>
    </div>

    <div className="nav-right">
      <ul className="nav-icons">
        <li><img src={shoppingCartIcon} alt="Cart" /></li>
        <li><img src={wishlistIcon} alt="Wishlist" /></li>
      </ul>

      <button className="login-btn"
        onClick={()=>navigate(`/login`)}
      >Login</button>
    </div>

  </div>
</nav>
  )
}

export default Navbar