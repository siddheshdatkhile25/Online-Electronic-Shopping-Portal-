import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ManageProduct.css";

const ProductListing = () => {
 const navigate=useNavigate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  useEffect(() => {
   
    const dummyProducts = [
      {
        id: 1,
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200&h=200&fit=crop",
        title: "Samsung 32 inch Smart TV",
        stock: 15,
        category: "Electronics",
        originalPrice: 35000,
        discount: 10,
        discountPrice: 31500,
      },
      {
        id: 2,
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200&h=200&fit=crop",
        title: "LG 21 inch TV",
        stock: 0,
        category: "Electronics",
        originalPrice: 41045,
        discount: 2,
        discountPrice: 40224,
      },
      {
        id: 3,
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200&h=200&fit=crop",
        title: "Asus Monitor 24 inch",
        stock: 20,
        category: "Electronics",
        originalPrice: 18000,
        discount: 0,
        discountPrice: 18000,
      },
      {
        id: 4,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&h=200&fit=crop",
        title: "Apple MacBook Pro 2023",
        stock: 10,
        category: "Electronics",
        originalPrice: 145000,
        discount: 5,
        discountPrice: 137750,
      },
      {
        id: 5,
        image: "https://images.unsplash.com/photo-1592286927505-b0c2fc1d36c0?w=200&h=200&fit=crop",
        title: "iPhone 15 Pro Max",
        stock: 5,
        category: "Mobile Phone",
        originalPrice: 159900,
        discount: 0,
        discountPrice: 159900,
      },
      {
        id: 6,
        image: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=200&h=200&fit=crop",
        title: "Samsung Galaxy S24 Ultra",
        stock: 12,
        category: "Mobile Phone",
        originalPrice: 124999,
        discount: 8,
        discountPrice: 114999,
      },
      {
        id: 7,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
        title: "Sony WH-1000XM5 Headphones",
        stock: 25,
        category: "Accessories",
        originalPrice: 29990,
        discount: 15,
        discountPrice: 25491,
      },
      {
        id: 8,
        image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=200&h=200&fit=crop",
        title: "Dell XPS 15 Laptop",
        stock: 8,
        category: "Electronics",
        originalPrice: 125000,
        discount: 12,
        discountPrice: 110000,
      },
    ];
    setProducts(dummyProducts);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  const handleEdit = (id) => {
   
    navigate(`/admin/edit-product/${id}`);
  };

  const handleApplyDiscount = (id) => {
   
    navigate(`/admin/apply-discount/${id}`);
  };

  
  const categories = ["All", ...new Set(products.map((p) => p.category))];

 
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "All" || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="product-page">
      <div className="container mt-4">
        <h2 className="page-title">Manage Products</h2>

       
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
            <label className="filter-label">Category: </label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="stats-box">
            <span className="stats-text">
              Total Products: <strong>{filteredProducts.length}</strong>
            </span>
          </div>
        </div>

        
        <div className="table-container table-responsive">
          <table className="table custom-table table-bordered table-striped text-center align-middle">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Stock</th>
                <th>Category</th>
                <th>Original Price</th>
                <th>Discount</th>
                <th>Final Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <img
                        src={product.image}
                        alt={product.title}
                        className="product-img"
                      />
                    </td>
                    <td>{product.title}</td>
                    <td>{product.stock}</td>
                    <td>{product.category}</td>
                    <td>₹{product.originalPrice.toLocaleString()}</td>
                    <td>{product.discount}%</td>
                    <td className="price-green">₹{product.discountPrice.toLocaleString()}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          onClick={() => handleEdit(product.id)}
                          className="btn btn-edit"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="btn btn-delete"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => handleApplyDiscount(product.id)}
                          className="btn btn-discount"
                        >
                          Discount
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="no-data">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;