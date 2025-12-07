import { useParams } from "react-router-dom";
import productsData from "../../../data/ProductData.json";
import "./productDetails.css";
import { useState } from "react";

export default function ProductDetails() {
  const { category, id } = useParams();

  // URL category (example: smartphone, tablet)
  const selectedCategory = category.toLowerCase();

  // Build categoryMap after normalizing Keys
  // "phones" → "phone"
  // "tablets" → "tablet"
  const categoryMap = {};

  Object.keys(productsData).forEach((key) => {
    const normalized = key.toLowerCase().replace(/s$/, ""); // remove trailing 's'
    categoryMap[normalized] = productsData[key];
  });

  // Now categoryMap keys = phone, tablet
  // URL categories MUST be these names too

  const categoryProducts = categoryMap[selectedCategory];

  if (!categoryProducts) {
    return <h2>Category not found</h2>;
  }

  // Find product only inside selected category
  const product = categoryProducts.find((p) => p.id === Number(id));

  if (!product) {
    return <h2>Product not found</h2>;
  }

  const [mainImg, setMainImg] = useState(product.images[0]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
  };

  return (
    <div className="pd-container">
      {/* LEFT SIDE */}
      <div className="pd-left">
        <div className="pd-main-img">
          <img src={mainImg} alt={product.name} />
        </div>

        <div className="pd-small-container">
          {product.images.map((img, index) => (
            <div
              key={index}
              className={`pd-small-img ${mainImg === img ? "active-thumb" : ""}`}
              onClick={() => setMainImg(img)}
            >
              <img src={img} alt="thumbnail" />
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="pd-right">
        <h2 className="pd-title">{product.name}</h2>

        <p className="pd-price">
          MRP <strong>₹{product.price.toLocaleString()}</strong>
        </p>

        <p className="pd-desc">{product.description}</p>

        {product.features && (
          <div className="pd-features">
            <p className="pd-section-title">Key Features:</p>
            <ul>
              {product.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        )}

        <button className="pd-cart-btn" onClick={addToCart}>
          Add to Cart
        </button>

        <p className="pd-footer-text">
          Free standard shipping • <a href="#">Free Returns</a>
        </p>
      </div>
    </div>
  );
}
