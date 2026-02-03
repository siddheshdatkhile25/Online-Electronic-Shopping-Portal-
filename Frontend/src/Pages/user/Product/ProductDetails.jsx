import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../api/axiosInstance";
import "./productDetails.css";
import { toast } from "react-toastify";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);

  // Reviews
  const [reviews, setReviews] = useState([]);

  // Edit Modal States
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editReview, setEditReview] = useState(null);
  const [editRating, setEditRating] = useState("");
  const [editComment, setEditComment] = useState("");

  const loggedUserId = Number(localStorage.getItem("userId"));

  useEffect(() => {
    api
      .get(`/products/id/${id}`)
      .then((res) => {
        const data = res.data.data;
        setProduct(data);

        if (data.imageUrls && data.imageUrls.length > 0) {
          setMainImage(data.imageUrls[0]);
        }

        setLoading(false);
      })
      .catch(() => {
        toast.error("Product not found");
        navigate("/");
      });

    // Fetch product reviews
    api
      .get(`/api/reviews/product/${id}`)
      .then((res) => setReviews(res.data))
      .catch(() => console.log("No reviews found"));
  }, [id, navigate]);

  if (loading) return <h2>Loading...</h2>;
  if (!product) return <h2>Product not found</h2>;

  // ADD TO CART
  const addToCart = async () => {
    try {
      await api.post("/api/users/cart/add", null, {
        params: {
          productId: product.id,
          quantity: 1,
        },
      });
      toast.success("Added to cart");
      navigate("/cart");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to cart");
    }
  };

  // ADD TO WISHLIST
  const addToWishlist = async () => {
    try {
      await api.post(`/api/users/wishlist/add/${product.id}`);
      toast.success("Added to wishlist ❤️");
    } catch {
      toast.error("Failed to add to wishlist");
    }
  };

  // OPEN EDIT MODAL
  const openEditModal = (rev) => {
    setEditReview(rev);
    setEditRating(rev.rating);
    setEditComment(rev.comment);
    setEditModalOpen(true);
  };

  // UPDATE REVIEW API
  const updateReview = async () => {
    try {
      await api.put(`/api/reviews/update`, {
        userId: loggedUserId,
        productId: id,
        rating: editRating,
        comment: editComment,
      });

      toast.success("Review updated!");

      const res = await api.get(`/api/reviews/product/${id}`);
      setReviews(res.data);

      setEditModalOpen(false);
    } catch {
      toast.error("Failed to update review");
    }
  };

  // DELETE REVIEW
  const deleteReview = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await api.delete(`/api/reviews/delete/${reviewId}`);

      toast.success("Review deleted!");

      const res = await api.get(`/api/reviews/product/${id}`);
      setReviews(res.data);
    } catch {
      toast.error("Failed to delete review");
    }
  };

  return (
    <div className="pd-container">
      {/* LEFT SIDE */}
      <div className="pd-left">
        <div className="pd-main-img">
          {product.stock === 0 && (
            <span className="unavailable-badge">Unavailable</span>
          )}

          <img
            src={mainImage || "/placeholder.png"}
            alt={product.name}
          />
        </div>

        {product.imageUrls?.length > 1 && (
          <div className="pd-thumbnails">
            {product.imageUrls.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`product-${index}`}
                className={`pd-thumb ${mainImage === img ? "active" : ""}`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className="pd-right">
        <h1 className="pd-title">{product.name}</h1>

        <p className="pd-price">
          {product.discountPercentage > 0 ? (
            <>
              <span style={{ textDecoration: "line-through", color: "gray" }}>
                ₹{product.price}
              </span>
              <span style={{ color: "green", fontWeight: "bold", marginLeft: 10 }}>
                ₹{product.discountedPrice}
              </span>
              <span style={{ color: "red", marginLeft: 10 }}>
                ({product.discountPercentage}% OFF)
              </span>
            </>
          ) : (
            `₹${product.price}`
          )}
        </p>

        <p className="pd-desc">{product.description}</p>

        <p>
          <strong>Brand:</strong> {product.brand}
        </p>

        <div className="pd-actions">
          <button className="pd-btn pd-cart-btn" onClick={addToCart}>
            🛒 Add to Cart
          </button>

          <button
            className="pd-btn pd-wishlist-btn"
            onClick={addToWishlist}
          >
            ❤️ Add to Wishlist
          </button>
        </div>

        <p className="pd-footer">
          Free shipping • <span>Free Returns</span>
        </p>

        <div style={{ marginTop: "40px" }}>
          <h2 style={{ marginBottom: "15px" }}>Customer Reviews</h2>

          {reviews.length === 0 ? (
            <p>No reviews yet. Be the first to review this product!</p>
          ) : (
            reviews.map((rev, index) => (
              <div key={index} className="review-card">
                <p className="review-rating">{rev.rating} ⭐</p>
                <p className="review-comment">{rev.comment}</p>

                <p className="review-user">
                  – {rev.userName || "Anonymous"} •{" "}
                  {rev.createdAt?.substring(0, 10)}
                </p>

                {rev.userId === loggedUserId && (
                  <div className="review-actions">
                    <button
                      className="edit-btn"
                      onClick={() => openEditModal(rev)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteReview(rev.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {editModalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Edit Review</h3>

            <label>Rating</label>
            <input
              type="number"
              min="1"
              max="5"
              value={editRating}
              onChange={(e) => setEditRating(e.target.value)}
            />

            <label>Comment</label>
            <textarea
              rows="3"
              value={editComment}
              onChange={(e) => setEditComment(e.target.value)}
            />

            <div className="modal-actions">
              <button className="save-btn" onClick={updateReview}>
                Save
              </button>
              <button
                className="close-btn"
                onClick={() => setEditModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
