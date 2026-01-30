import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axiosInstance";
import "./ManageProduct.css";
import { toast } from "react-toastify";

const ManageProduct = () => {
  const navigate = useNavigate();

  // PRODUCTS
  const [products, setProducts] = useState([]);

  // SEARCH + FILTER
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  // CATEGORIES
  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  // FETCH PRODUCTS
  const fetchProducts = () => {
    api
      .get("/admin/products")
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch(() => {
        toast.error("Failed to fetch products");
      });
  };

  // FETCH CATEGORIES
  const fetchCategories = () => {
    api
      .get("/admin/categories")
      .then((res) => {
        setCategoriesList(res.data.data);
      })
      .catch(() => {
        toast.error("Failed to fetch categories");
      });
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // DELETE PRODUCT
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      api
        .delete(`/admin/products/${id}`)
        .then(() => {
          toast.success("Product deleted successfully");
          setProducts((prev) => prev.filter((p) => p.id !== id));
        })
        .catch(() => {
          toast.error("Failed to delete product");
        });
    }
  };

  // ✅ TOGGLE PRODUCT STATUS (ONLY FIX HERE)
  const handleToggleStatus = (id) => {
    api
      .put(`/admin/products/${id}/toggle-status`) // PUT instead of PATCH
      .then(() => {
        toast.success("Product status updated");
        fetchProducts();
      })
      .catch(() => {
        toast.error("Failed to update status");
      });
  };

  // EDIT PRODUCT
  const handleEdit = (id) => {
    navigate(`/admin/edit-product/${id}`);
  };

  // CATEGORY FILTER OPTIONS
  const categoriesForFilter = [
    "All",
    ...new Set(products.map((p) => p.categoryName)),
  ];

  // FILTER PRODUCTS
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      filterCategory === "All" ||
      product.categoryName === filterCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="product-page">
      <div className="container mt-4">
        <h2 className="page-title">Manage Products</h2>

        {/* FILTERS */}
        <div className="filter-section">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {categoriesForFilter.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          <span>Total Products: {filteredProducts.length}</span>
        </div>

        {/* PRODUCT TABLE */}
        <table className="table table-bordered text-center align-middle">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Category</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Final Price</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((p) => (
              <tr key={p.id}>
                <td>
                  <img
                    src={p.imageUrls?.[0]}
                    alt={p.name}
                    className="product-img"
                  />

                </td>

                <td>{p.name}</td>

                <td>
                  {p.stock}
                  {p.stockMessage && (
                    <div style={{ color: "red", fontSize: "12px" }}>
                      {p.stockMessage}
                    </div>
                  )}
                </td>

                <td>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={p.active}
                      onChange={() => handleToggleStatus(p.id)}
                    />
                    <span className="slider"></span>
                  </label>
                </td>

                <td>{p.categoryName}</td>

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

                <td>₹{(p.discountedPrice ?? p.price).toLocaleString()}</td>

                <td>
                  <button
                    onClick={() => handleEdit(p.id)}
                    className="btn btn-edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="btn btn-delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan="9">No products found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProduct;
