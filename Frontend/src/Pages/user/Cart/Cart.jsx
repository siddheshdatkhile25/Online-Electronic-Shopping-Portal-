import "./Cart.css";
import { useEffect, useState } from "react";
import api from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Cart() {
  const [cart, setCart] = useState({ items: [], cartTotal: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ================= LOAD CART =================
  const loadCart = async () => {
    try {
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

  const updateQuantity = async (cartItemId, qty) => {
    if (qty < 1) return;
    try {
      await api.put("/api/users/cart/update", null, {
        params: { cartItemId, quantity: qty },
      });
      loadCart();
    } catch {
      toast.error("Failed to update quantity");
    }
  };

  const removeItem = async (id) => {
    await api.delete(`/api/users/cart/remove/${id}`);
    toast.success("Item removed");
    loadCart();
  };

  const clearCart = async () => {
    await api.delete("/api/users/cart/clear");
    toast.success("Cart cleared");
    loadCart();
  };

  if (loading) return <h2 style={{ padding: 40 }}>Loading...</h2>;

  return (
    <div className="cart-container">
      {/* LEFT */}
      <div className="cart-left">
        <h1 className="cart-title">Your Cart</h1>
        <p className="gray">Not ready to checkout? Continue shopping</p>

        {cart.items.length === 0 ? (
          <div className="empty-box">
            <p>Your cart is empty</p>
            <button className="shop-btn" onClick={() => navigate("/")}>
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="cart-list">
            {cart.items.map((item) => (
              <div className="cart-card" key={item.cartItemId}>
                {/* IMAGE */}
                <img
                  src={item.imageUrl}
                  alt={item.productName}
                  className="cart-img"
                />

                {/* DETAILS */}
                <div className="cart-middle">
                  <h3>{item.productName}</h3>

                  <div className="qty-box">
                    <button
                      disabled={item.quantity === 1}
                      onClick={() =>
                        updateQuantity(item.cartItemId, item.quantity - 1)
                      }
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.cartItemId, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* PRICE + REMOVE */}
                <div className="cart-right-info">
                  <p className="price">
                    ₹{item.totalPrice.toLocaleString()}
                  </p>
                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.cartItemId)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT */}
      <div className="cart-summary">
        <h2>Order Summary</h2>

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

        <button className="clear-btn" onClick={clearCart}>
          Clear Cart
        </button>

        <button
          className="checkout-btn"
          onClick={() => navigate("/checkout")}
        >
          Continue to Checkout
        </button>
      </div>
    </div>
  );
}
