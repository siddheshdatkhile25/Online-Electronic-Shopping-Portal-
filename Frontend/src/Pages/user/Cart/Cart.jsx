import "./cart.css";
import productsData from "../../../data/ProductData.json";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cartProducts, setCartProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const categoryMap = {};
    Object.keys(productsData).forEach((key) => {
      const normalized = key.toLowerCase().replace(/s$/, "");
      categoryMap[normalized] = productsData[key];
    });

    const fullProducts = storedCart
      .map((item) => {
        const cat = item.category.toLowerCase().replace(/s$/, "");
        const productList = categoryMap[cat];
        return productList ? productList.find((p) => p.id === item.id) : null;
      })
      .filter(Boolean);

    setCartProducts(fullProducts);
  }, []);

  const removeItem = (id, category) => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const updated = storedCart.filter(
      (item) =>
        !(
          item.id === id &&
          item.category.toLowerCase().replace(/s$/, "") ===
            category.toLowerCase().replace(/s$/, "")
        )
    );

    localStorage.setItem("cart", JSON.stringify(updated));

    setCartProducts((prev) =>
      prev.filter(
        (item) =>
          !(
            item.id === id &&
            item.category.toLowerCase().replace(/s$/, "") ===
              category.toLowerCase().replace(/s$/, "")
          )
      )
    );
  };

  const subtotal = cartProducts.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-container">

      {/* LEFT SIDE */}
      <div className="cart-left">
        <h1 className="cart-title">Your Cart</h1>
        <p className="gray">Not ready to checkout? Continue shopping</p>

        <div className="cart-list">
          {cartProducts.length === 0 ? (
            <div className="empty-box">
              <p>Your cart is empty</p>
              <button className="shop-btn">Start Shopping</button>
            </div>
          ) : (
            cartProducts.map((item) => (
              <div key={item.id} className="cart-card">

                <img src={item.images[0]} alt={item.name} className="cart-img" />

                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <p className="gray-small">Category: {item.category}</p>
                  <p className="price">₹{item.price.toLocaleString()}</p>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.id, item.category)}
                >
                  Remove
                </button>

              </div>
            ))
          )}
        </div>

        {/* ORDER INFO */}
        <div className="info-section">
          <h2>Order Information</h2>

          <div className="info-row">
            <span>Return Policy</span>
            <span>−</span>
          </div>
          <p className="info-desc">
            Learn everything about our simple, customer-friendly returns.
          </p>

          <div className="info-row">
            <span>Shipping Options</span>
            <span>+</span>
          </div>

          <div className="info-row">
            <span>Payment Options</span>
            <span>+</span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="cart-right">
        <h2>Order Summary</h2>

        <div className="summary-box">

          <div className="summary-line">
            <span>Subtotal</span>
            <strong>₹{subtotal.toLocaleString()}</strong>
          </div>

          <div className="summary-line">
            <span>Shipping</span>
            <span className="gray-small">Calculated at next step</span>
          </div>

          <div className="summary-line total">
            <span>Total</span>
            <strong>₹{subtotal.toLocaleString()}</strong>
          </div>
        </div>

        <button
          className="checkout-btn"
          onClick={() => navigate("/checkout")}
        >
          Continue to Checkout
        </button>
      </div>
    </div>
  );
}
