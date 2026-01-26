import "./cart.css";
import { useEffect, useState } from "react";
import api from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ================= LOAD CART =================
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

  useEffect(() => {
    loadCart();
  }, []);

  // ================= REMOVE ITEM =================
  const removeItem = async (cartItemId) => {
    try {
      await api.delete(`/api/users/cart/remove/${cartItemId}`);
      toast.success("Item removed");
      loadCart();
    } catch {
      toast.error("Failed to remove item");
    }
  };

  // ================= UPDATE QUANTITY =================
  const updateQuantity = async (cartItemId, newQty) => {
    if (newQty < 1) return;

    try {
      await api.put("/api/users/cart/update", null, {
        params: {
          cartItemId,
          quantity: newQty,
        },
      });
      loadCart();
    } catch {
      toast.error("Failed to update quantity");
    }
  };

  // ================= CLEAR CART =================
  const clearCart = async () => {
    try {
      await api.delete("/api/users/cart/clear");
      toast.success("Cart cleared");
      loadCart();
    } catch {
      toast.error("Failed to clear cart");
    }
  };

  if (loading) {
    return (
      <div className="cart-container">
        <h2>Loading cart...</h2>
      </div>
    );
  }

  return (
    <div className="cart-container">
      {/* LEFT SIDE */}
      <div className="cart-left">
        <h1 className="cart-title">Your Cart</h1>
        <p className="gray">Not ready to checkout? Continue shopping</p>

        <div className="cart-list">
          {!cart || cart.items.length === 0 ? (
            <div className="empty-box">
              <p>Your cart is empty</p>
              <button className="shop-btn" onClick={() => navigate("/")}>
                Start Shopping
              </button>
            </div>
          ) : (
            cart.items.map((item) => (
              <div key={item.cartItemId} className="cart-card">
                <img
                  src="https://via.placeholder.com/100"
                  alt={item.productName}
                  className="cart-img"
                />

                <div className="cart-details">
                  <h3>{item.productName}</h3>

                  {/* QUANTITY CONTROLS */}
                  <div className="qty-box">
                    <button
                      className="qty-btn"
                      disabled={item.quantity === 1}
                      onClick={() =>
                        updateQuantity(item.cartItemId, item.quantity - 1)
                      }
                    >
                      −
                    </button>

                    <span className="qty-value">{item.quantity}</span>

                    <button
                      className="qty-btn"
                      onClick={() =>
                        updateQuantity(item.cartItemId, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <p className="price">
                    ₹{item.totalPrice.toLocaleString()}
                  </p>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.cartItemId)}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="cart-right">
        <h2>Order Summary</h2>

        <div className="summary-box">
          <div className="summary-line">
            <span>Subtotal</span>
            <strong>₹{cart.cartTotal.toLocaleString()}</strong>
          </div>

          <div className="summary-line">
            <span>Shipping</span>
            <span className="gray-small">Calculated at next step</span>
          </div>

          <div className="summary-line total">
            <span>Total</span>
            <strong>₹{cart.cartTotal.toLocaleString()}</strong>
          </div>
        </div>

        {cart.items.length > 0 && (
          <button className="clear-cart-btn" onClick={clearCart}>
            Clear Cart
          </button>
        )}

        <button
          className="checkout-btn"
          disabled={cart.items.length === 0}
          onClick={() => navigate("/checkout")}
        >
          Continue to Checkout
        </button>
      </div>
    </div>
  );
}
