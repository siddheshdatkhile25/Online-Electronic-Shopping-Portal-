import "./wishlist.css";
import { useEffect, useState } from "react";
import api from "../../../api/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load wishlist items
  const loadWishlist = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/users/wishlist");
      setWishlist(res.data || []);
    } catch (error) {
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  // Remove from wishlist
  const removeFromWishlist = async (productId) => {
    try {
      await api.delete(`/api/users/wishlist/remove/${productId}`);
      toast.success("Removed from wishlist");
      loadWishlist();
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  // Move to cart
  const moveToCart = async (productId) => {
    try {
      await api.post(`/api/users/wishlist/move-to-cart/${productId}`);
      toast.success("Moved to cart");
      loadWishlist();
    } catch (error) {
      toast.error("Failed to move item");
    }
  };

  if (loading) {
    return (
      <div className="wishlist-container">
        <h2>Loading wishlist...</h2>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <h1 className="wishlist-title">Your Wishlist</h1>
      <p className="gray">Save items you love for later</p>

      {wishlist.length === 0 ? (
        <div className="empty-box">
          <p>Your wishlist is empty</p>
          <button className="shop-btn" onClick={() => navigate("/")}>
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((item) => (
            <div key={item.productId} className="wishlist-card">
              <img
                src={item.imageUrl || "/placeholder.png"}
                alt={item.name}
                className="wishlist-img"
              />

              <div className="wishlist-details">
                <h3>{item.name}</h3>
                <p className="price">₹{item.price.toLocaleString()}</p>
              </div>

              <div className="wishlist-actions">
                <button
                  className="cart-btn"
                  onClick={() => moveToCart(item.productId)}
                >
                  Move to Cart
                </button>

                <button
                  className="remove-btn"
                  onClick={() => removeFromWishlist(item.productId)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
