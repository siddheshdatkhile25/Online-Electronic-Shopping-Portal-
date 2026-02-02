import React, { useEffect, useState } from "react";
import "./LandingPage.css";
import api from "../../../api/axiosInstance";
import Carousal from "../../../Components/user/Carousal/Carousal";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  // Fetch categories
  useEffect(() => {
    api.get("/admin/categories")
      .then((res) => setCategories(res.data.data || []))
      .catch(() => setCategories([]));
  }, []);

  // ✅ Fetch products added by admin
  useEffect(() => {
    api.get("/products")
      .then((res) => setProducts(res.data.data || []))
      .catch(() => setProducts([]));
  }, []);

  // ✅ Group products by category name
  const groupedProducts = products.reduce((acc, product) => {
    const category = product.categoryName || "Other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});

  return (
    <div className="container">
      <div className="main-body">

        {/* HERO */}
        <div className="heroSection">
          <h2>Discover the Latest in Electronics — Shop Smart, Shop Fast!</h2>
          <p>
            Discover the latest in smart technology. Top brands at unbeatable
            prices, delivered to your doorstep.
          </p>
          <button
            className="shopNowbtn"
            onClick={() => {
              const section = document.querySelector(".category-carousel");
              section?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Shop Now
          </button>
        </div>

        {/* CATEGORY SECTION */}
        <section className="category-section">
          <h2 className="category-title">Shop by Category</h2>

          <div className="category-wrapper">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="category"
                onClick={() => navigate(`/product-listing/${cat.id}`)}
              >
                <div className="category-circle">
                  <img src={cat.imageUrl} alt={cat.name} />
                </div>
                <div className="category-title-sm">{cat.name}</div>
              </div>
            ))}
          </div>
        </section>



        {/* ✅ PRODUCTS FROM BACKEND */}
        {Object.entries(groupedProducts).map(([category, list]) => (
          <Carousal
            key={category}
            title={`Best Deals on ${category}`}
            products={list}
          />
        ))}

      </div>
    </div>
  );
}

export default LandingPage;
