import "./checkout.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axiosInstance";

export default function Checkout() {
  const [cart, setCart] = useState({ items: [], cartTotal: 0 });
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // ================= LOAD CART + ADDRESSES =================
  useEffect(() => {
    loadCheckoutData();
  }, []);

  const loadCheckoutData = async () => {
    try {
      setLoading(true);

      const [cartRes, addressRes] = await Promise.all([
        api.get("/api/users/cart"),
        api.get("/api/users/addresses"),
      ]);

      setCart(cartRes.data);
      setAddresses(addressRes.data);
    } catch {
      setCart({ items: [], cartTotal: 0 });
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  };

  // ================= REMOVE CART ITEM =================
  const removeItem = async (cartItemId) => {
    try {
      await api.delete(`/api/users/cart/remove/${cartItemId}`);
      loadCheckoutData();
    } catch {
      alert("Failed to remove item");
    }
  };

  // ================= REMOVE ADDRESS =================
  const removeAddress = async (addressId) => {
    try {
      await api.delete(`/api/users/addresses/${addressId}`);
      if (selectedAddressId === addressId) {
        setSelectedAddressId(null);
      }
      loadCheckoutData();
    } catch {
      alert("Failed to remove address");
    }
  };

  if (loading) {
    return (
      <div className="checkout-wrapper">
        <h2 style={{ padding: "40px" }}>Loading checkout...</h2>
      </div>
    );
  }

  return (
    <div className="checkout-wrapper">
      <div className="checkout-container">

        {/* ================= LEFT SIDE ================= */}
        <div className="checkout-left">
          <h1 className="page-title">Checkout</h1>

          <div className="steps">
            <span className="active-step">Address</span>
            <span className="divider">/</span>
            <span className="step">Payment</span>
          </div>

          <h3 className="small-heading">Select Address</h3>

          <div className="address-section">
            {addresses.length === 0 && (
              <p className="gray-small">No address found. Please add one.</p>
            )}

            {addresses.map((addr) => (
              <div
                key={addr.id}
                className={`address-card ${
                  selectedAddressId === addr.id ? "address-active" : ""
                }`}
              >
                <div onClick={() => setSelectedAddressId(addr.id)}>
                  <p className="addr-name">Delivery Address</p>
                  <p className="addr-text">
                    {addr.addressLine1}, {addr.addressLine2}, {addr.city},{" "}
                    {addr.state} - {addr.pincode}
                  </p>
                </div>

                <button
                  className="remove-address-btn"
                  onClick={() => removeAddress(addr.id)}
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              className="add-address-btn"
              onClick={() => navigate("/add-address")}
            >
              + Add New Address
            </button>
          </div>

          <div className="save-info-row">
            <label>
              <input type="checkbox" /> Save contact information
            </label>
          </div>

          <button
            className="primary-btn"
            disabled={!selectedAddressId}
            onClick={() => navigate("/payment")}
          >
            Continue to Payment
          </button>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="checkout-right">
          <h2>Your Cart</h2>

          {cart.items.length === 0 && (
            <p className="gray-small">Your cart is empty</p>
          )}

          {cart.items.map((item) => (
            <div key={item.cartItemId} className="cart-item-box">
              <img
                src={item.imageUrl || "https://via.placeholder.com/80"}
                alt={item.productName}
                className="cart-img"
              />

              <div className="cart-info">
                <h3>{item.productName}</h3>

                <div className="cart-meta">
                  <p className="gray-small">Quantity: {item.quantity}</p>

                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.cartItemId)}
                  >
                    Remove
                  </button>
                </div>

                <p className="price">
                  ₹{item.totalPrice.toLocaleString()}
                </p>
              </div>
            </div>
          ))}

          <div className="summary-box">
            <div className="summary-line">
              <span>Subtotal</span>
              <strong>₹{cart.cartTotal.toLocaleString()}</strong>
            </div>

            <div className="summary-line total">
              <span>Total</span>
              <strong>₹{cart.cartTotal.toLocaleString()}</strong>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
