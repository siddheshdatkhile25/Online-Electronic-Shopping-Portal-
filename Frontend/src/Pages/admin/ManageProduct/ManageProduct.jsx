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

  // CATEGORIES FOR DELETE
  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  // FETCH PRODUCTS
  const fetchProducts = () => {
    api
      .get("/admin/products")
      .then((res) => {
        console.log("Products fetched:", res.data.data);
        setProducts(res.data.data);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch products");
      });
  };

  // FETCH CATEGORIES
  const fetchCategories = () => {
    api
      .get("/admin/categories")
      .then((res) => {
        console.log("Categories fetched:", res.data.data);
        setCategoriesList(res.data.data);
      })
      .catch((err) => {
        console.error(err);
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
          setProducts(products.filter((p) => p.id !== id));
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to delete product");
        });
    }
  };

  // DELETE CATEGORY
  const handleDeleteCategory = () => {
    if (!selectedCategoryId) {
      toast.warning("Please select a category");
      return;
    }

    if (
      window.confirm(
        "Deleting this category may affect related products. Are you sure?"
      )
    ) {
      api
        .delete(`/admin/categories/${selectedCategoryId}`)
        .then(() => {
          toast.success("Category deleted successfully");
          setCategoriesList((prev) =>
            prev.filter((c) => c.id !== Number(selectedCategoryId))
          );
          setSelectedCategoryId("");
          fetchProducts();
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to delete category");
        });
    }
  };

  // EDIT PRODUCT
  const handleEdit = (id) => {
    navigate(`/admin/edit-product/${id}`);
  };

  // APPLY DISCOUNT
  const handleApplyDiscount = (id) => {
    navigate(`/admin/apply-discount/${id}`);
  };

 // RESTOCK PRODUCT
const handleRestock = (id) => {
  // Ask admin for quantity
  const quantity = parseInt(prompt("Enter quantity to restock"), 10);

  // Validate input
  if (!quantity || quantity <= 0) {
    toast.warning("Please enter a valid quantity greater than 0");
    return;
  }

  // Call backend PUT endpoint
  api
    .put(`/admin/products/${id}/add-stock?quantity=${quantity}`)
    .then((res) => {
      toast.success("Stock updated successfully");
      fetchProducts(); // Refresh product list
    })
    .catch((err) => {
      console.error("Restock error:", err);
      toast.error("Failed to update stock");
    });
};


  // CATEGORY FILTER OPTIONS
  const categoriesForFilter = ["All", ...new Set(products.map((p) => p.categoryName))];

  // FILTER PRODUCTS
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
        {/* HEADER */}
        <div className="page-header">
          <h2 className="page-title">Manage Products</h2>

          {/* DELETE CATEGORY */}
          <div className="delete-category-box">
            <select
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              className="category-dropdown"
            >
              <option value="">Select Category</option>
              {categoriesList.length > 0 ? (
                categoriesList.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))
              ) : (
                <option disabled>No categories available</option>
              )}
            </select>

            <button
              className="btn btn-delete-category"
              onClick={handleDeleteCategory}
            >
              Delete Category
            </button>
          </div>
        </div>

        {/* FILTERS */}
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
              {categoriesForFilter.map((cat) => (
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

        {/* PRODUCT TABLE */}
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
                      <div className="action-button">
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
                        <button
                          onClick={() => handleApplyDiscount(p.id)}
                          className="btn btn-discount"
                        >
                          Discount
                        </button>
                        {p.stock <= 0 && (
                          <button
                            onClick={() => handleRestock(p.id)}
                            className="btn btn-restock"
                          >
                            Restock
                          </button>
                        )}
                      </div>
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
