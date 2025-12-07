import { useParams } from "react-router-dom";
import productsData from "../../../data/ProductData.json";
import "./productDetails.css";
import { useState } from "react";

export default function ProductDetails() {
  const { category, id } = useParams();

  // Normalize URL category just like JSON category keys
  const selectedCategory = category.toLowerCase().replace(/s$/, "");

  // Normalize productData category names
  const categoryMap = {};
  Object.keys(productsData).forEach((key) => {
    const normalized = key.toLowerCase().replace(/s$/, ""); 
    categoryMap[normalized] = productsData[key];
  });

  // Get products of the selected category
  const categoryProducts = categoryMap[selectedCategory];

  if (!categoryProducts) {
    return <h2>Category not found</h2>;
  }

  // Find product by ID
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
