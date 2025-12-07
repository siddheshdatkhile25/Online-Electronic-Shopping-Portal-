import "./payment.css";
import { useEffect, useState } from "react";
import productsData from "../../../data/ProductData.json";

export default function Payment() {
  const [cartItems, setCartItems] = useState([]);
  const [saveCard, setSaveCard] = useState(false);

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

  const subtotal = cartItems.reduce((sum, p) => sum + p.price, 0);

  //Razorpay
  const payWithRazorpay = () => {
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded");
      return;
    }

    const options = {
      key: "rzp_test_123456789abcde",
      amount: subtotal * 100,
      currency: "INR",
      name: "ElectroKart",
      description: "Order Payment",
      image: "/logo.png",

      theme: { color: "#000000" },

      handler: function (response) {
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
      },

      prefill: {
        name: "Tushar Pawar",
        email: "tushar@example.com",
        contact: "9999999999",
      },

      method: {
        upi: true,
        card: true,
        wallet: true,
        netbanking: true,
      },

      modal: {
        ondismiss: function () {
          console.log("Payment popup closed");
        },
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="payment-wrapper">
      <div className="payment-container">

        {/* LEFT SIDE */}
        <div className="payment-left">
          <h1 className="payment-title">Checkout</h1>

          <div className="steps">
            <span className="step">Address</span>
            <span className="divider">/</span>
            <span className="active-step">Payment</span>
          </div>

          {/* Razorpay + UPI Buttons */}
          <div className="quick-pay">
            <button className="razorpay-btn" onClick={payWithRazorpay}>
              Pay with Razorpay
            </button>

            <button className="upi-btn" onClick={payWithRazorpay}>
              Pay via UPI Apps
            </button>
          </div>

          <h3 className="form-heading">Or Pay Using Card</h3>

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

            <button className="confirm-btn" onClick={payWithRazorpay}>
              Confirm & Pay
            </button>
          </div>
        </div>

        {/* RIGHT SIDE SUMMARY */}
        <div className="payment-right">
          <h2>Your Cart</h2>

          {cartItems.map((item) => (
            <div key={item.id} className="cart-item-box">
              <img src={item.images[0]} className="cart-img" />

              <div className="cart-info">
                <h3>{item.name}</h3>
                <p className="gray-small">Quantity: 1</p>
                <p className="price">₹{item.price.toLocaleString()}</p>
              </div>
            </div>
          ))}

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
