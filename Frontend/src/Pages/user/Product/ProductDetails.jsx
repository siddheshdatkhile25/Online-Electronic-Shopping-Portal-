import { useParams } from "react-router-dom";
import products from "../../../data/demoProducts.json";
import "./productDetails.css";
import { useState } from "react";

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <h2>Product not found</h2>;

  const [mainImg, setMainImg] = useState(product.images[0]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
  };

  return (
    <div className="pd-container">

      {/* LEFT SIDE START */}
      <div className="pd-left">

        {/* BIG IMAGE */}
        <div className="pd-main-img">
          <img src={mainImg} alt={product.name} />
        </div>

        {/* SMALL IMAGES IN ONE ROW */}
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
      {/* LEFT SIDE END */}


      {/* RIGHT SIDE START */}
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

        {/* Features Code */}
        {product.features && (
          <div className="pd-features">
            <p className="pd-section-title">Key Features:</p>

            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}


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
      {/* RIGHT SIDE END */}

    </div>
  );
}
