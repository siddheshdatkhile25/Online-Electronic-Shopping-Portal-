import React, { useEffect, useState } from "react";
import "./SectionPage.css";
import api from "../../../api/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";

const SectionPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");

  // Fetch brands
  useEffect(() => {
    api
      .get(`/products/category/${categoryId}/brands`)
      .then((res) => setBrands(res.data.data || []))
      .catch((err) => console.error(err));
  }, [categoryId]);

  // Fetch products by category
  useEffect(() => {
    api
      .get(`/products/category/${categoryId}`)
      .then((res) => setProducts(res.data.data || []))
      .catch((err) => console.error(err));
  }, [categoryId]);

  // Filter products by brand
  const filteredProducts = selectedBrand
    ? products.filter((p) => p.brand === selectedBrand)
    : products;

  return (
    <div className="latest-container">
      <div className="latest-header">
        <h2>Products</h2>
      </div>

      {/* FILTER BAR */}
      <div className="filter-bar">
        <div className="filter-left">
          <h3>Top Brands</h3>
          <div className="brand-filters">
            <button
              className={!selectedBrand ? "active" : ""}
              onClick={() => setSelectedBrand("")}
            >
              All
            </button>
            {brands.map((brand) => (
              <button
                key={brand}
                className={selectedBrand === brand ? "active" : ""}
                onClick={() => setSelectedBrand(brand)}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-right">
          <p>Showing {filteredProducts.length} Products</p>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <div className="product-box" key={item.id}>
              <div className="img-wrapper">
                <img
                  src={item.imageUrls?.[0] || "/placeholder.png"}
                  alt={item.name}
                />
              </div>


              <h4>{item.name}</h4>

              <p className="price">
                {item.discountPercentage > 0 ? (
                  <>
                    <span className="old-price">
                      ₹{item.price.toLocaleString()}
                    </span>{" "}
                    <span className="new-price">
                      ₹{item.discountedPrice.toLocaleString()}
                    </span>
                  </>
                ) : (
                  <span>₹{item.price.toLocaleString()}</span>
                )}
              </p>

              <button
                className="view-btn"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default SectionPage;
