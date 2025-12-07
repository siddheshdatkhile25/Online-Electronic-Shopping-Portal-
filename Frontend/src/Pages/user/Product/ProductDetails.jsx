import { useParams } from "react-router-dom";
import products from "../../../data/demoProducts.json";
import "./productDetails.css";
import { useState } from "react";

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <h2>Product not found</h2>;

  // clickable main image
  const [mainImg, setMainImg] = useState(product.images[0]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
  };

  return (
    <div className="pd-container">
      <div className="pd-left">
        <div className="pd-image-grid">

          {/* MAIN IMAGE (CHANGES WHEN CLICKING THUMBNAIL) */}
          <div className="pd-main-img">
            <img src={mainImg} alt={product.name} />
          </div>

          {/* THUMBNAILS */}
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

      <div className="pd-right">
        <h2 className="pd-title">{product.name}</h2>

        <p className="pd-price">
          MRP <strong>₹{product.price.toLocaleString()}</strong>
        </p>

        <p className="pd-desc">{product.description}</p>

        <div className="pd-section-title">Color</div>
        <div className="pd-color-options">
          <div className="pd-color pd-col-1"></div>
          <div className="pd-color pd-col-2"></div>
        </div>

        <a className="pd-size-guide" href="#">
          Size & Fit Guide
        </a>

        <div className="pd-quantity-box">
          <span>Quantity</span>
          <div className="pd-qty-buttons">
            <button>-</button>
            <span>1</span>
            <button>+</button>
          </div>
        </div>

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
