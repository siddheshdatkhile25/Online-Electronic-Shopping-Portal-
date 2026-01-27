import "./payment.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axiosInstance";

export default function Payment() {
  const [cart, setCart] = useState({ items: [], cartTotal: 0 });
  const [loading, setLoading] = useState(true);
  const [saveCard, setSaveCard] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const res = await api.get("/api/users/cart");
      setCart(res.data);
    } finally {
      setLoading(false);
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

          {/* QUICK PAY */}
          <div className="card-section">
            <h3 className="section-title">Quick Pay</h3>

            <div className="quick-pay">
              <button className="razorpay-btn" onClick={handleConfirmPayment}>
                Pay with Razorpay
              </button>
              <button className="upi-btn" onClick={handleConfirmPayment}>
                Pay via UPI Apps
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
