import "./cart.css";
import productsData from "../../../data/ProductData.json";
import { useEffect, useState } from "react";

export default function Cart() {
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    // Get stored items (category + id)
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Normalize categories from JSON
    const categoryMap = {};
    Object.keys(productsData).forEach((key) => {
      const normalized = key.toLowerCase().replace(/s$/, "");
      categoryMap[normalized] = productsData[key];
    });

    // Convert stored cart IDs → full product objects
    const fullProducts = storedCart
      .map((item) => {
        const normalizedCat = item.category.toLowerCase().replace(/s$/, "");
        const productList = categoryMap[normalizedCat];

        if (!productList) return null;

        return productList.find((p) => p.id === item.id) || null;
      })
      .filter(Boolean); // remove null values

    setCartProducts(fullProducts);
  }, []);

  // Subtotal
  const subtotal = cartProducts.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-wrapper">
      
      {/* LEFT SIDE */}
      <div className="cart-left">
        <h1>Your cart</h1>
        <p className="small-gray">Not ready to checkout? Continue Shopping</p>

        <div className="cart-items-box">
          {cartProducts.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cartProducts.map((item) => (
              <div className="cart-item" key={item.id}>
                <img
                  src={item.images[0]}
                  alt={item.name}
                />

                <div className="item-info">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-size">Category: {item.category}</p>
                  <p className="item-price">₹{item.price.toLocaleString()}</p>
                </div>

                <button className="remove-item">
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* INFO */}
        <div className="info-section">
          <h2>Order Information</h2>

          <div className="info-row">
            <span>Return Policy</span>
            <span>−</span>
          </div>
          <p className="info-desc">
            This is our example return policy which is everything you need to know about our returns.
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

        <div className="summary-line">
          <span>Subtotal</span>
          <strong>₹{subtotal.toLocaleString()}</strong>
        </div>

        <div className="summary-line">
          <span>Shipping</span>
          <p className="small-gray">Calculated at next step</p>
        </div>

        <div className="summary-line total-line">
          <span>Total</span>
          <strong>₹{subtotal.toLocaleString()}</strong>
        </div>

        <button className="checkout-btn">
          Continue to checkout
        </button>
      </div>
    </div>
  );
}
