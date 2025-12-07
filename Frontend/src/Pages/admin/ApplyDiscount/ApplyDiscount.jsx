import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ApplyDiscount.css";

const ApplyDiscount = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    originalPrice: "",
    discount: "",
    discountPrice: ""
  });

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = () => {
   
    const dummyProduct = {
      id: id,
      title: "Apple MacBook Pro 2023",
      originalPrice: 145000,
      discount: 5,
    };

    
    const discountPrice = dummyProduct.originalPrice - (dummyProduct.originalPrice * dummyProduct.discount / 100);

    setFormData({
      title: dummyProduct.title,
      originalPrice: dummyProduct.originalPrice,
      discount: dummyProduct.discount,
      discountPrice: discountPrice
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "discount") {
      
      const discountPrice = formData.originalPrice - (formData.originalPrice * value / 100);
      setFormData({
        ...formData,
        discount: value,
        discountPrice: discountPrice
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("Applied Discount:", formData);
    alert(`Discount of ${formData.discount}% applied successfully!`);
    navigate("/admin/view-product");
  };

  const handleCancel = () => {
    navigate("/admin/view-product");
  };

  return (
    <div className="edit-product-page">
      <div className="container mt-4">
        <h2 className="page-title">Apply Discount</h2>

        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  className="form-input"
                  disabled
                />
              </div>

              <div className="form-group">
                <label>Original Price (₹)</label>
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice}
                  className="form-input"
                  disabled
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
                  placeholder="Enter discount percentage"
                />
              </div>

              <div className="form-group">
                <label>Discount Price (₹)</label>
                <input
                  type="number"
                  name="discountPrice"
                  value={formData.discountPrice}
                  className="form-input calculated-price"
                  disabled
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-save">
                Apply Discount
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

export default ApplyDiscount;