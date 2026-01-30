import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

import shoppingCartIcon from "../icons/shopping-cart.png";
import wishlistIcon from "../icons/wishlist.png";

function Navbar() {
  const navigate = useNavigate();

  const isLoggedIn = Boolean(localStorage.getItem("token"));
  const userEmail = localStorage.getItem("email");

  const [openMenu, setOpenMenu] = useState(false);

  /* -------------------- Handlers -------------------- */
  const handleNavigate = (path) => {
    setOpenMenu(false);
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setOpenMenu(false);
    navigate("/login");
  };

  /* -------------------- JSX -------------------- */
  return (
    <nav className="navbar" data-bs-theme="dark">
      <div className="container-fluid">

        {/* LEFT */}
        <div className="nav-left">
          <div
            className="navbar-brand"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            <div className="navbar-brand">
              <img
                src="/favicon.png"
                alt="ElectroKart Logo"
                className="navbar-logo"
              />
              <span className="brand-name">ElectroKart</span>
            </div>

          </div>

          <ul className="nav-menu">
            <li onClick={() => navigate("/shop")}>Shop</li>
            <li onClick={() => navigate("/about")}>About Us</li>
          </ul>
        </div>

        {/* CENTER */}
        <div className="nav-center">
          <div className="searchbar">
            <input
              type="text"
              placeholder="Search products..."
              aria-label="Search"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="nav-right">
          <ul className="nav-icons">
            <li onClick={() => navigate("/cart")}>
              <img src={shoppingCartIcon} alt="Cart" />
            </li>

            <li onClick={() => navigate("/wishlist")}>
              <img src={wishlistIcon} alt="Wishlist" />
            </li>
          </ul>

          {/* AUTH SECTION */}
          {isLoggedIn ? (
            <div
              className="profile-wrapper"
              onClick={() => setOpenMenu((prev) => !prev)}
            >
              <div className="profile-circle">
                {userEmail?.charAt(0).toUpperCase() || "U"}
              </div>

              {openMenu && (
                <div className="profile-dropdown">
                  <p onClick={() => handleNavigate("/profile")}>
                    My Profile
                  </p>
                  <p onClick={() => handleNavigate("/orders")}>
                    My Orders
                  </p>
                  <p onClick={handleLogout}>
                    Logout
                  </p>
                </div>
              )}
            </div>
          ) : (
            <button
              className="login-btn"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
