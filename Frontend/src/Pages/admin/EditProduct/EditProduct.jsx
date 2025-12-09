import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditProduct.css";

const EditProduct = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    stock: "",
    originalPrice: "",
    discount: "",
    image: ""
  });

  useEffect(() => {
   
    const fetchProduct = () => {
      // Replace with fetch product by id
      const dummyProduct = {
        id: id,
        title: "Apple MacBook Pro 2023",
        category: "Electronics",
        stock: 10,
        originalPrice: 145000,
        discount: 5,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
      };
      
      setFormData(dummyProduct);
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
   
    
    console.log("Updated Product:", formData);
    alert("Product updated successfully!");
    navigate("/admin/view-product"); 
  };

  const handleCancel = () => {
    navigate("/admin/view-product");
  };

  return (
    <div className="edit-product-page">
      <div className="container mt-4">
        <h2 className="page-title">Edit Product</h2>

        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Product Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="form-input"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Mobile Phone">Mobile Phone</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Computers">Computers</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Stock Quantity *</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="form-input"
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label>Original Price (₹) *</label>
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleChange}
                  className="form-input"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Discount (%)</label>
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  className="form-input"
                  min="0"
                  max="100"
                />
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            {formData.image && (
              <div className="image-preview">
                <label>Image Preview:</label>
                <img src={formData.image} alt="Product Preview" />
              </div>
            )}

            <div className="form-actions">
              <button type="submit" className="btn btn-save">
                Update Product
              </button>
              <button type="button" onClick={handleCancel} className="btn btn-cancel">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;