import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axiosInstance"; 
import "./ManageProduct.css";
import { toast } from "react-toastify";

const ManageProduct = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  // Fetch all active products
  useEffect(() => {
    api
      .get("/admin/products")
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch products");
      });
  }, []);

  // Delete product
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      api
        .delete(`/admin/products/${id}`)
        .then(() => {
          setProducts(products.filter((p) => p.id !== id));
          toast.success("Product deleted successfully");
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to delete product");
        });
    }
  };

  // Edit product
  const handleEdit = (id) => {
    navigate(`/admin/edit-product/${id}`);
  };

  // Apply discount
  const handleApplyDiscount = (id) => {
    navigate(`/admin/apply-discount/${id}`);
  };

  // Categories for filter
  const categories = ["All", ...new Set(products.map((p) => p.categoryName))];

  // Filtered products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "All" || product.categoryName === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="product-page">
      <div className="container mt-4">
        <h2 className="page-title">Manage Products</h2>

        {/* Filters */}
        <div className="filter-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-box">
            <label>Category: </label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="stats-box">
            <span>Total Products: {filteredProducts.length}</span>
          </div>
        </div>

        {/* Product Table */}
        <div className="table-container table-responsive">
          <table className="table table-bordered table-striped text-center align-middle">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Stock</th>
                <th>Category</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Final Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <img src={p.imgUrl} alt={p.name} className="product-img" />
                    </td>
                    <td>{p.name}</td>
                    <td>{p.stock || 0}</td>
                    <td>{p.categoryName}</td>

                    {/* Original price */}
                    <td>
                      {p.discountPercentage > 0 ? (
                        <span style={{ textDecoration: "line-through", color: "gray" }}>
                          ₹{p.price.toLocaleString()}
                        </span>
                      ) : (
                        `₹${p.price.toLocaleString()}`
                      )}
                    </td>

                    
                    <td>{p.discountPercentage ?? 0}%</td>

                    
                    <td>
                      ₹{(p.discountedPrice ?? p.price).toLocaleString()}
                    </td>

                    <td>
                      <button onClick={() => handleEdit(p.id)} className="btn btn-edit">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="btn btn-delete">
                        Delete
                      </button>
                      <button
                        onClick={() => handleApplyDiscount(p.id)}
                        className="btn btn-discount"
                      >
                        Discount
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8}>No products found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageProduct;
