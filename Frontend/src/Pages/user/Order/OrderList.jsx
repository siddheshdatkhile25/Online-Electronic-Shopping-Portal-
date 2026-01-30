import "./OrderList.css";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../../../api/axiosInstance';

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [reviewData, setReviewData] = useState({ rating: 5, comment: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null); // ✅ For success/failure messages
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  // Helper function to construct full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) {
      console.warn("No image path provided");
      return '/placeholder.png';
    }
    if (imagePath.startsWith('http')) {
      console.log("Full URL image:", imagePath);
      return imagePath;
    }
    const fullUrl = `http://localhost:8080${imagePath.startsWith('/') ? imagePath : '/' + imagePath}`;
    console.log("Constructed image URL:", fullUrl, "from:", imagePath);
    return fullUrl;
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        if (userId) {
          const response = await api.get(`/api/orders/my-orders/${userId}`);
          setOrders(response.data || []);
          setError(null);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders");
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'DELIVERED': return '#28a745';
      case 'IN_TRANSIT': return '#007bff';
      case 'PLACED': return '#ffc107';
      case 'CANCELLED': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const toggleOrder = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const handleShopClick = () => {
    navigate('/');
  };

  const openReviewModal = (orderId, item) => {
    setSelectedItem({ orderId, item });
    // Load existing review if any
    const existingReview = orders
      .find(o => o.orderId === orderId)
      ?.items.find(i => i.productId === item.productId)?.review;

    if (existingReview) {
      setReviewData(existingReview);
    } else {
      setReviewData({ rating: 5, comment: '' });
    }
    setShowReviewModal(true);
  };

  const closeReviewModal = () => {
    setShowReviewModal(false);
    setSelectedItem(null);
    setReviewData({ rating: 5, comment: '' });
  };

  const handleReviewSubmit = async () => {
    if (!selectedItem) return;

    try {
      // Prepare payload as expected by backend
      const payload = {
        userId: parseInt(userId),
        productId: selectedItem.item.productId,
        rating: reviewData.rating,
        comment: reviewData.comment
      };

      // Send review to backend
      await api.post(`/api/reviews/add`, payload);

      // Update local state to reflect review immediately
      const updatedOrders = orders.map(order => {
        if (order.orderId === selectedItem.orderId) {
          return {
            ...order,
            items: order.items.map(item => {
              if (item.productId === selectedItem.item.productId) {
                return { ...item, review: { rating: reviewData.rating, comment: reviewData.comment } };
              }
              return item;
            })
          };
        }
        return order;
      });

      setOrders(updatedOrders);
      closeReviewModal();

      // ✅ Show success message for 3 seconds
      setMessage("Review submitted successfully!");
      setTimeout(() => setMessage(null), 3000);

    } catch (err) {
      console.error("Error submitting review:", err);
      setMessage("Failed to submit review");
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div className="order-container">
      {/* ✅ Message Display */}
      {message && <div className="review-message">{message}</div>}

      {/* LEFT SIDE - Order List */}
      <div className="order-left">
        <h1 className="order-title">My Orders</h1>
        <p className="gray">View and track your order history</p>

        <div className="order-list">
          {loading ? (
            <div className="empty-box">
              <p>Loading your orders...</p>
            </div>
          ) : error ? (
            <div className="empty-box">
              <p>{error}</p>
              <button className="shop-btn" onClick={handleShopClick}>
                Start Shopping
              </button>
            </div>
          ) : orders.length === 0 ? (
            <div className="empty-box">
              <p>You haven't placed any orders yet</p>
              <button className="shop-btn" onClick={handleShopClick}>
                Start Shopping
              </button>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.orderId} className="order-card">
                {/* Order Header */}
                <div className="order-header">
                  <div>
                    <h3 className="order-id">{order.orderId}</h3>
                    <p className="gray-small">
                      Placed on {new Date(order.orderDateTime).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="order-header-right">
                    <span
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(order.orderStatus) }}
                    >
                      {order.orderStatus}
                    </span>
                    <button
                      className="expand-btn"
                      onClick={() => toggleOrder(order.id)}
                    >
                      {expandedOrder === order.id ? '−' : '+'}
                    </button>
                  </div>
                </div>

                {/* Order Items (Expandable) */}
                {expandedOrder === order.id && (
                  <div className="order-items">
                    {order.items.map((item, index) => (
                      <div key={`${item.productId}-${index}`} className="item-card">
                        <img src={getImageUrl(item.productImage)} alt={item.productName} className="item-img" />
                        <div className="item-details">
                          <h4 className="item-name">{item.productName}</h4>
                          <p className="gray-small">Product ID: {item.productId}</p>
                          <p className="price">₹{item.price.toLocaleString()}</p>

                          {/* Review Button/Display */}
                          {order.orderStatus === 'DELIVERED' && (
                            <>
                              {item.review ? (
                                <div className="review-display">
                                  <strong>Your Review:</strong> {item.review.rating}⭐
                                  <br />
                                  <em>{item.review.comment}</em>
                                  <button
                                    className="review-btn"
                                    onClick={() => openReviewModal(order.id, item)}
                                  >
                                    Edit Review
                                  </button>
                                </div>
                              ) : (
                                <button
                                  className="review-btn"
                                  onClick={() => openReviewModal(order.id, item)}
                                >
                                  Write a Review
                                </button>
                              )}
                            </>
                          )}
                        </div>
                        <div className="quantity">
                          <span className="gray-small">Qty: {item.quantity}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Order Footer */}
                <div className="order-footer">
                  <span className="total-label">Order Total:</span>
                  <strong className="total-amount">₹{order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}</strong>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Order Info Section */}
        <div className="info-section">
          <h2>Order Information</h2>

          <div className="info-row">
            <span>Cancellation Policy</span>
            <span>−</span>
          </div>
          <p className="info-desc">
            Orders can be cancelled within 24 hours of placement.
          </p>

          <div className="info-row">
            <span>Track Your Order</span>
            <span>+</span>
          </div>

          <div className="info-row">
            <span>Return & Refund</span>
            <span>+</span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Order Statistics */}
      <div className="order-right">
        <h2>Order Statistics</h2>

        <div className="summary-box">
          <div className="stat-card">
            <span className="stat-number">{orders.length}</span>
            <span className="stat-label">Total Orders</span>
          </div>

          <div className="stat-card">
            <span className="stat-number">
              {orders.filter(o => o.orderStatus === 'DELIVERED').length}
            </span>
            <span className="stat-label">Delivered</span>
          </div>

          <div className="stat-card">
            <span className="stat-number">
              {orders.filter(o => o.orderStatus === 'IN_TRANSIT').length}
            </span>
            <span className="stat-label">In Transit</span>
          </div>

          <div className="stat-card">
            <span className="stat-number">
              {orders.filter(o => o.orderStatus === 'PLACED').length}
            </span>
            <span className="stat-label">Processing</span>
          </div>

          <div className="summary-line total-spent">
            <span>Total Spent</span>
            <strong>₹{orders.reduce((sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + (item.price * item.quantity), 0), 0).toLocaleString()}</strong>
          </div>
        </div>

        <button className="shop-btn" onClick={handleShopClick}>
          Continue Shopping
        </button>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="modal-overlay" onClick={closeReviewModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Write a Review</h3>

            <div className="rating-section">
              <label>Rating</label>
              <select
                value={reviewData.rating}
                onChange={(e) => setReviewData({ ...reviewData, rating: parseInt(e.target.value) })}
              >
                <option value="5">5 - Excellent</option>
                <option value="4">4 - Very Good</option>
                <option value="3">3 - Good</option>
                <option value="2">2 - Fair</option>
                <option value="1">1 - Poor</option>
              </select>
            </div>

            <div className="comment-section">
              <label>Your Review</label>
              <textarea
                value={reviewData.comment}
                onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                placeholder="Share your experience with this product..."
              />
            </div>

            <div className="modal-actions">
              <button onClick={closeReviewModal}>Cancel</button>
              <button onClick={handleReviewSubmit}>Submit Review</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
