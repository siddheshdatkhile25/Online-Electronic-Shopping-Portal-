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
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (id) => {
    await api.delete(`/api/users/cart/remove/${id}`);
    loadCheckoutData();
  };

  const removeAddress = async (id) => {
    await api.delete(`/api/users/addresses/${id}`);
    if (selectedAddressId === id) setSelectedAddressId(null);
    loadCheckoutData();
  };

  if (loading) {
    return <h2 style={{ padding: "40px" }}>Loading checkout...</h2>;
  }

  return (
    <div className="checkout-wrapper">
      <div className="checkout-container">

        {/* LEFT */}
        <div className="checkout-left">
          <h1 className="page-title">Checkout</h1>

          <div className="steps">
            <span className="active-step">Address</span>
            <span className="divider">›</span>
            <span className="step">Payment</span>
          </div>

          <h3 className="small-heading">Delivery Address</h3>

          <div className="address-section">
            {addresses.map(addr => (
              <div
                key={addr.id}
                className={`address-card ${
                  selectedAddressId === addr.id ? "address-active" : ""
                }`}
                onClick={() => setSelectedAddressId(addr.id)}
              >
                <div className="address-radio" />
                <div className="address-content">
                  <p className="addr-name">Home</p>
                  <p className="addr-text">
                    {addr.addressLine1}, {addr.addressLine2}, {addr.city},{" "}
                    {addr.state} - {addr.pincode}
                  </p>
                </div>

                <button
                  className="remove-address-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeAddress(addr.id);
                  }}
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

          <button
            className="primary-btn"
            disabled={!selectedAddressId}
            onClick={() => navigate("/payment")}
          >
            Continue to Payment
          </button>
        </div>

        {/* RIGHT */}
        <div className="checkout-right">
          <h2>Your Order</h2>

          {cart.items.map(item => (
            <div key={item.cartItemId} className="cart-item-box">
              <img src={item.imageUrl} alt={item.productName} />

              <div className="cart-info">
                <h4>{item.productName}</h4>
                <p className="gray-small">Qty: {item.quantity}</p>
              </div>

              <div className="cart-price">
                ₹{item.totalPrice.toLocaleString()}
                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.cartItemId)}
                >
                  Remove
                </button>
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
