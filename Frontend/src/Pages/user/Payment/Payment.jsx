import "./payment.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axiosInstance";

export default function Payment() {
  const [cart, setCart] = useState({ items: [], cartTotal: 0 });
  const [loading, setLoading] = useState(true);
  const [saveCard, setSaveCard] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
    fetchOrderId();
  }, []);

  const fetchOrderId = () => {
    try {
      // Get orderId from localStorage (set during checkout)
      const storedOrderId = localStorage.getItem("orderId");
      if (storedOrderId) {
        setOrderId(storedOrderId);
      }
    } catch (err) {
      console.error("Failed to get order ID:", err);
    }
  };

  const loadCart = async () => {
    try {
      const res = await api.get("/api/users/cart");
      setCart(res.data);
    } finally {
      setLoading(false);
    }
  };

  const handleCOD = async () => {
    if (!orderId) {
      setError("Order not found. Please go back and try again.");
      return;
    }

    try {
      setPaying(true);
      setError("");
      console.log("Setting payment mode for orderId:", orderId);
      const response = await api.put(`/api/payments/${orderId}/mode`, {
        paymentMode: "COD",
      });
      console.log("Payment mode set to COD:", response.data);
      navigate("/orders");
    } catch (err) {
      setError("Failed to set payment mode. Please try again.");
      console.error("Payment error:", err.response?.data || err.message);
    } finally {
      setPaying(false);
    }
  };

  const handleConfirmPayment = () => {
    alert("Payment successful (mock)");
    navigate("/orders");
  };

  if (loading) return <h2 style={{ padding: 40 }}>Loading payment…</h2>;

  return (
    <div className="payment-wrapper">
      <div className="payment-container">

        {/* LEFT */}
        <div className="payment-left">
          <h1 className="page-title">Checkout</h1>

          <div className="steps">
            <span className="step">Address</span>
            <span className="divider">›</span>
            <span className="active-step">Payment</span>
          </div>

          {error && <div style={{ color: "red", marginBottom: 16 }}>{error}</div>}

  

          {/* QUICK PAY */}
          <div className="card-section">
            <h3 className="section-title">Quick Pay</h3>

            <div className="quick-pay">
              <button className="razorpay-btn" onClick={handleConfirmPayment}>
                Pay with Razorpay
              </button>
              <button className="upi-btn" onClick={handleCOD}>
                Pay Via Cash On Delivery
              </button>
            </div>
          </div>

          {/* CARD PAYMENT */}
          <div className="card-section">
            <h3 className="section-title">Pay Using Card</h3>

            <div className="payment-form">
              <input className="input-field" placeholder="Cardholder Name" />
              <input className="input-field" placeholder="Card Number" />

              <div className="row-3">
                <select className="input-field">
                  <option>MM</option>
                </select>
                <select className="input-field">
                  <option>YY</option>
                </select>
                <input className="input-field" placeholder="CVC" />
              </div>

              <label className="save-card">
                <input
                  type="checkbox"
                  checked={saveCard}
                  onChange={() => setSaveCard(!saveCard)}
                />
                Save card for future payments
              </label>

              <button className="confirm-btn" onClick={handleConfirmPayment}>
                Confirm & Pay
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="payment-right">
          <h2 className="order-title">Your Order</h2>

          {cart.items.map(item => (
            <div key={item.cartItemId} className="order-item">
              <img src={item.imageUrl} alt={item.productName} />

              <div className="order-info">
                <p className="product-name">{item.productName}</p>
                <span className="qty">Qty: {item.quantity}</span>
              </div>

              <div className="order-price">
                ₹{item.totalPrice.toLocaleString()}
              </div>
            </div>
          ))}

          <div className="summary">
            <div className="summary-line">
              <span>Subtotal</span>
              <span>₹{cart.cartTotal.toLocaleString()}</span>
            </div>

            <div className="summary-line total">
              <span>Total</span>
              <span>₹{cart.cartTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
