import React from "react";
import "./AdminNavbar.css";
import { Link, useNavigate } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <nav className="navbar admin-navbar" data-bs-theme="dark">
      <div className="container-fluid">

        <div className="nav-left">
          <h2 className="navbar-brand">ElectroKart</h2>
        </div>

        <div className="nav-center">
          <div className="searchbar">
            <input type="text" placeholder="Search..." />
          </div>
        </div>

        <div className="nav-right">
          <ul className="nav-menu">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/admin">
                Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/admin/add-category">
                Add Category
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/admin/add-product">
                Add Product
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/admin/view-product">
                Stock
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/admin/view-orders">
                Orders
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/admin/users">
                Users
              </Link>
            </li>
          </ul>
        </div>

        <div className="nav-right">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

      </div>
    </nav>
  );
}

export default AdminNavbar;
