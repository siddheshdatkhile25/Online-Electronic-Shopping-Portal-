import React, { useState } from 'react';
import './Navbar.css';
import shoppingCartIcon from '../icons/shopping-cart.png';
import wishlistIcon from '../icons/wishlist.png';
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem("user") !== null;

  // Dropdown toggle state
  const [openMenu, setOpenMenu] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setOpenMenu(false);
    navigate("/login");
  };

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

        {/* RIGHT SECTION */}
        <div className="nav-right">
          <ul className="nav-icons">
            <li>
              <img
                src={shoppingCartIcon}
                alt="Cart"
                // onClick={() => {
                //   isLoggedIn ? navigate("/cart") : navigate("/login");
                // }}
                onClick={() => navigate("/cart")}
              />
            </li>
            <li>
              <img
                src={wishlistIcon}
                alt="Wishlist"
                // onClick={() => {
                //   isLoggedIn ? navigate("/wishlist") : navigate("/login");
                // }}
                onClick={() => navigate("/wishlist")}
                style={{ cursor: "pointer" }}
              />
            </li>
          </ul>

          {/* CONDITIONAL RENDERING */}
          {isLoggedIn ? (
            <div 
              className="profile-wrapper"
              onClick={() => setOpenMenu(!openMenu)}
            >
              <div className="profile-circle">
                {/* Optional: Add user initial */}
                {JSON.parse(sessionStorage.getItem("user")).email.charAt(0).toUpperCase()}
              </div>

              {openMenu && (
                <div className="profile-dropdown">
                  <p onClick={() => navigate("/profile")}>My Profile</p>
                  <p onClick={() => navigate("/orders")}>My Orders</p>
                  <p onClick={handleLogout}>Logout</p>
                </div>
              )}
            </div>
          ) : (
            <button className="login-btn" onClick={() => navigate("/login")}>
              Login
            </button>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
