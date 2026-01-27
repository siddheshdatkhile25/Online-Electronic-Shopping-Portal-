import "./payment.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axiosInstance";

export default function Payment() {
  const [cart, setCart] = useState({ items: [], cartTotal: 0 });
  const [loading, setLoading] = useState(true);
  const [saveCard, setSaveCard] = useState(false);

  const navigate = useNavigate();

  // ================= LOAD CART FROM BACKEND =================
  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/users/cart");
      setCart(res.data);
    } catch {
      setCart({ items: [], cartTotal: 0 });
    } finally {
      setLoading(false);
    }
  };

  // ================= PAYMENT HANDLER (TEMP) =================
  const handleConfirmPayment = () => {
    if (cart.items.length === 0) {
      alert("Cart is empty");
      return;
    }

    alert("Payment successful (mock). Order placed.");

    // 🔜 Next step: Razorpay success callback
    navigate("/orders"); // or order-success page
  };

  if (loading) {
    return (
      <div className="payment-wrapper">
        <h2 style={{ padding: "40px" }}>Loading payment...</h2>
      </div>
    );
  }

  return (
    <div className="payment-wrapper">
      <div className="payment-container">

        {/* ================= LEFT SIDE ================= */}
        <div className="payment-left">
          <h1 className="payment-title">Checkout</h1>

          <div className="steps">
            <span className="step">Address</span>
            <span className="divider">/</span>
            <span className="active-step">Payment</span>
          </div>

          {/* QUICK PAY (UI ONLY) */}
          <div className="quick-pay">
            <button className="razorpay-btn" onClick={handleConfirmPayment}>
              Pay with Razorpay
            </button>

            <button className="upi-btn" onClick={handleConfirmPayment}>
              Cash On Delivery
            </button>
          </div>

          <h3 className="form-heading">Or Pay Using Card</h3>

          {/* CARD FORM (UI ONLY – DO NOT PROCESS) */}
          <div className="payment-form">
            <input className="input-field" placeholder="Cardholder Name" />
            <input className="input-field" placeholder="Card Number" />

            <div className="row-3">
              <select className="input-field">
                <option>Month</option>
              </select>
              <select className="input-field">
                <option>Year</option>
              </select>
              <input className="input-field" placeholder="CVC" />
            </div>

            <div className="save-card-row">
              <label>
                <input
                  type="checkbox"
                  checked={saveCard}
                  onChange={() => setSaveCard(!saveCard)}
                />
                Save card for future payments
              </label>
            </div>

            <button className="confirm-btn" onClick={handleConfirmPayment}>
              Confirm & Pay
            </button>
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="payment-right">
          <h2>Your Cart</h2>

          {cart.items.length === 0 && (
            <p className="gray-small">Your cart is empty</p>
          )}

          {cart.items.map((item) => (
            <div key={item.cartItemId} className="cart-item-box">
              <img
                src={item.imageUrl || "https://via.placeholder.com/80"}
                className="cart-img"
                alt={item.productName}
              />

              <div className="cart-info">
                <h3>{item.productName}</h3>
                <p className="gray-small">Quantity: {item.quantity}</p>
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
