import React, { useEffect, useState } from "react";
import "./LandingPage.css";
import api from "../../../api/axiosInstance";
import Carousal from "../../../Components/user/Carousal/Carousal";
import products from "../../../data/ProductData.json";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
  api
    .get("/admin/categories")
    .then((res) => {
      console.log("Categories API Response:", res.data);
      setCategories(res.data.data); 
    })
    .catch((err) => {
      console.error("Error fetching categories", err);
      setCategories([]);
    });
}, []);


  return (
    <div className="container">
      <div className="main-body">
      
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

        {/* LATEST ARRIVALS */}
        <div className="latest-arrivals">
          <h2>Our Latest Arrivals</h2>
          <p className="latest-subtitle">
            Explore the newest launches and trending electronics.
          </p>
          <button className="shopNowbtn">Shop All</button>

          <div className="latest-grid">
            <div className="latest-card"></div>
            <div className="latest-card featured"></div>
            <div className="latest-card"></div>
          </div>
        </div>

        {/* CATEGORY SECTION */}
        <div className="category-carousel">
          <h2 className="section-title">Shop by Category</h2>

          <div className="category-bar">
            {Array.isArray(categories) && categories.length > 0 ? (
              categories.map((cat) => (
                <div
                  key={cat.id}
                  className="category"
                  onClick={() =>
                    navigate(`/product-listing/${cat.id}`)
                  }
                >
                  <div className="category-circle">
                    <img src={cat.imageUrl} alt={cat.name} />
                  </div>
                  <div className="category-title">{cat.name}</div>
                </div>
              ))
            ) : (
              <p>No categories available</p>
            )}
          </div>
        </div>

     
        {Object.entries(products).map(([categoryName, productList]) => (
          <Carousal
            key={categoryName}
            title={`Best Deals on ${categoryName}`}
            products={productList}
          />
        ))}
      </div>

      <hr />

      {/* FOOTER */}
      <div className="footer-section">
        <div className="footer-newsletter">
          <h2>Sign up for our newsletter</h2>
          <p>
            Be the first to know about offers, launches, and exclusive deals.
          </p>

          <div className="newsletter-input">
            <input type="email" placeholder="Email Address" />
            <button>Sign Up</button>
          </div>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <h4>Shop</h4>
            <ul>
              <li>Mobiles</li>
              <li>Laptops</li>
              <li>Accessories</li>
              <li>Offers</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Help</h4>
            <ul>
              <li>Help Center</li>
              <li>Order Status</li>
              <li>Returns</li>
              <li>Contact Us</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>About</h4>
            <ul>
              <li>About Us</li>
              <li>Technology</li>
              <li>Careers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
