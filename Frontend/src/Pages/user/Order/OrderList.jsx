import "./OrderList.css";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [reviewData, setReviewData] = useState({ rating: 5, comment: '' });
  const navigate = useNavigate();

  useEffect(() => {
    // Load orders from localStorage
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');

    const updatedOrders = storedOrders.map(order => {
      if (order.status === 'Processing') {
        return { ...order, status: 'Delivered' };
      }
      return order;
    });


    setOrders(updatedOrders);

    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return '#28a745';
      case 'In Transit':
        return '#007bff';
      case 'Processing':
        return '#ffc107';
      case 'Cancelled':
        return '#dc3545';
      default:
        return '#6c757d';
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
      .find(o => o.id === orderId)
      ?.items.find(i => i.id === item.id)?.review;

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

  const handleReviewSubmit = () => {
    if (!selectedItem) return;

    const updatedOrders = orders.map(order => {
      if (order.id === selectedItem.orderId) {
        return {
          ...order,
          items: order.items.map(item => {
            if (item.id === selectedItem.item.id) {
              return {
                ...item,
                review: reviewData
              };
            }
            return item;
          })
        };
      }
      return order;
    });

    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    closeReviewModal();
  };

  return (
    <div className="order-container">
      {/* LEFT SIDE - Order List */}
      <div className="order-left">
        <h1 className="order-title">My Orders</h1>
        <p className="gray">View and track your order history</p>

        <div className="order-list">
          {orders.length === 0 ? (
            <div className="empty-box">
              <p>You haven't placed any orders yet</p>
              <button className="shop-btn" onClick={handleShopClick}>
                Start Shopping
              </button>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="order-card">
                {/* Order Header */}
                <div className="order-header">
                  <div>
                    <h3 className="order-id">{order.id}</h3>
                    <p className="gray-small">
                      Placed on {new Date(order.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="order-header-right">
                    <span
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(order.status) }}
                    >
                      {order.status}
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
                      <div key={`${item.id}-${index}`} className="item-card">
                        <img src={item.image} alt={item.name} className="item-img" />
                        <div className="item-details">
                          <h4 className="item-name">{item.name}</h4>
                          <p className="gray-small">Category: {item.category}</p>
                          <p className="price">₹{item.price.toLocaleString()}</p>

                          {/* Review Button/Display */}
                          {order.status === 'Delivered' && (
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
                  <strong className="total-amount">₹{order.total.toLocaleString()}</strong>
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
              {orders.filter(o => o.status === 'Delivered').length}
            </span>
            <span className="stat-label">Delivered</span>
          </div>

          <div className="stat-card">
            <span className="stat-number">
              {orders.filter(o => o.status === 'In Transit').length}
            </span>
            <span className="stat-label">In Transit</span>
          </div>

          <div className="stat-card">
            <span className="stat-number">
              {orders.filter(o => o.status === 'Processing').length}
            </span>
            <span className="stat-label">Processing</span>
          </div>

          <div className="summary-line total-spent">
            <span>Total Spent</span>
            <strong>₹{orders.reduce((sum, order) => sum + order.total, 0).toLocaleString()}</strong>
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