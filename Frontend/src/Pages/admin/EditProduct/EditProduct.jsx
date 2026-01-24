import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../api/axiosInstance"; 
import "./EditProduct.css";

const EditProduct = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    stock: "",
    price: "",
    discount: "",
    image: null,      // for new file
    preview: ""      
  });

  const [categories, setCategories] = useState([]);

  // Fetch product & categories
  useEffect(() => {
    //  Fetch product by id
    api.get(`/admin/products/${id}`)
      .then(res => {
        const product = res.data.data;
        setFormData({
          name: product.name,
          categoryId: product.categoryId,
          stock: product.stock,
          price: product.price,
          discount: product.discount || 0,
          image: null,
          preview: product.imgUrl
        });
      })
      .catch(err => console.error(err));

    // Fetch all categories
    api.get("/admin/categories")
      .then(res => {
        setCategories(res.data.data);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file) 
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("categoryId", formData.categoryId);
    data.append("stock", formData.stock);
    data.append("price", formData.price);
    data.append("discount", formData.discount);

    if (formData.image) {
      data.append("image", formData.image); 
    }

    api.put(`/admin/products/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(() => {
        alert("Product updated successfully!");
        navigate("/admin/view-product");
      })
      .catch(err => console.error(err));
  };

  const handleCancel = () => navigate("/admin/view-product");

  return (
    <div className="edit-product-page">
      <div className="container mt-4">
        <h2 className="page-title">Edit Product</h2>

        <div className="form-container">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-group">
              <label>Product Title *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label>Category *</label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

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
              <label>Price (₹) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="form-input"
                min="0"
                required
              />
            </div>

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
              <label>Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="form-input"
              />
            </div>

            {formData.preview && (
              <div className="image-preview">
                <label>Preview:</label>
                <img src={formData.preview} alt="Preview" />
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
