import "./cart.css";
import products from "../../../data/demoProducts.json";

export default function Cart() {

  // Cart items will come from JSON
  const cart = products;

  // Subtotal calculation
  const subtotal = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="cart-wrapper">

      {/* LEFT SIDE */}
      <div className="cart-left">
        <h1>Your cart</h1>
        <p className="small-gray">Not ready to checkout? Continue Shopping</p>

        <div className="cart-items-box">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              
              <img 
                src={item.images?.[0] || "/images/placeholder.png"} 
                alt={item.name} 
              />

              <div className="item-info">
                <h3 className="item-name">{item.name}</h3>
                <p className="item-size">Size: 6.2</p>
                <p className="item-qty">Quantity: 1</p>
                <p className="item-price">₹{item.price.toLocaleString()}</p>
              </div>

              <button className="remove-item">
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* ORDER INFO */}
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

        <input
          className="coupon-input"
          placeholder="Enter coupon code here"
        />

        <div className="summary-line">
          <span>Subtotal</span>
          <strong>₹{subtotal.toLocaleString()}</strong>
        </div>

        <div className="summary-line">
          <span>Shipping</span>
          <p className="small-gray">Calculated at the next step</p>
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
