import "./checkout.css";
import { useEffect, useState } from "react";
import productsData from "../../../data/ProductData.json";
import addressData from "../../../data/AddressData.json";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const navigate = useNavigate();

  const addressList = addressData.addresses;

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const categoryMap = Object.fromEntries(
      Object.entries(productsData).map(([key, value]) => [
        key.toLowerCase().replace(/s$/, ""),
        value,
      ])
    );

    const fullProducts = storedCart
      .map((item) => {
        const cat = item.category.toLowerCase().replace(/s$/, "");
        return categoryMap[cat]?.find((p) => p.id === item.id) || null;
      })
      .filter(Boolean);

    setCartItems(fullProducts);
  }, []);

  const removeItem = (id, category) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const updated = cart.filter(
      (item) =>
        !(
          item.id === id &&
          item.category.toLowerCase().replace(/s$/, "") ===
            category.toLowerCase().replace(/s$/, "")
        )
    );

    localStorage.setItem("cart", JSON.stringify(updated));
    setCartItems((prev) => prev.filter((p) => p.id !== id));
  };

  const subtotal = cartItems.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="checkout-wrapper">
      <div className="checkout-container">

        {/* LEFT SIDE */}
        <div className="checkout-left">
          <h1 className="page-title">Checkout</h1>

          {/* Step Indicator */}
          <div className="steps">
            <span className="active-step">Address</span>
            <span className="divider">/</span>
            <span className="step">Payment</span>
          </div>

          <h3 className="small-heading">Select Address</h3>

          <div className="address-section">
            {addressList.map((addr) => (
              <div
                key={addr.id}
                className={`address-card ${
                  selectedAddress === addr.id ? "address-active" : ""
                }`}
                onClick={() => setSelectedAddress(addr.id)}
              >
                <p className="addr-name">{addr.name}</p>
                <p className="addr-text">{addr.address}</p>
              </div>
            ))}

            <button
              className="add-address-btn"
              onClick={() => navigate("/add-address")}
            >
              + Add New Address
            </button>
          </div>

          {/* Save Contact Info FIXED */}
          <div className="save-info-row">
            <label>
              <input type="checkbox" />
              Save contact information
            </label>
          </div>

          <button
            className="primary-btn"
            disabled={!selectedAddress}
            onClick={() => navigate("/payment")}
          >
            Continue to Payment
          </button>
        </div>

        {/* RIGHT SIDE - CART SUMMARY */}
        <div className="checkout-right">
          <h2>Your Cart</h2>

          {cartItems.map((item) => (
            <div key={item.id} className="cart-item-box">
              <img src={item.images[0]} alt={item.name} className="cart-img" />

              <div className="cart-info">
                <h3>{item.name}</h3>
                <p className="gray-small">Category: {item.category}</p>
                <p className="gray-small">Quantity: 1</p>
                <p className="price">₹{item.price.toLocaleString()}</p>
              </div>

              <button
                className="remove-btn"
                onClick={() => removeItem(item.id, item.category)}
              >
                Remove
              </button>
            </div>
          ))}

          <input
            className="coupon-input"
            placeholder="Enter coupon code"
          />

          <div className="summary-box">
            <div className="summary-line">
              <span>Subtotal</span>
              <strong>₹{subtotal.toLocaleString()}</strong>
            </div>

            <div className="summary-line total">
              <span>Total</span>
              <strong>₹{subtotal.toLocaleString()}</strong>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
