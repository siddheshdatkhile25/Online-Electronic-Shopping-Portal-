import React from "react";
import "./AdminNavbar.css";
import { Link } from "react-router-dom";
function AdminNavbar() {
  return (
    <nav className="navbar admin-navbar" data-bs-theme="dark">
      <div className="container-fluid">

        
        <div className="nav-left">
          <h2 className="navbar-brand">ElectroKart </h2>
        </div>
        <div className="nav-center">
         <div className="searchbar">
        <input type="text" placeholder="Search..." />
        </div>
         </div>
        <div className="nav-right">
          <ul className="nav-menu">
            <li className="nav-item">
             <Link className="nav-link active" aria-current="page" to='/admin/add-category'>Add Category</Link>
            </li>
            <li className="nav-item">
             <Link className="nav-link active" aria-current="page" to='/admin/add-product'>Add Product</Link>
            </li>
             <li className="nav-item">
             <Link className="nav-link active" aria-current="page" to='/admin/view-product'>Stock</Link>
            </li>
            <li>Orders</li>
          </ul>
        </div>

       
        <div className="nav-right">
          <button className="logout-btn">Logout</button>
        </div>

      </div>
    </nav>
  );
}

export default AdminNavbar;
