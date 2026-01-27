import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../api/axiosInstance";
import "./productDetails.css";
import { toast } from "react-toastify";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/products/id/${id}`)
      .then((res) => {
        setProduct(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Product not found");
        navigate("/");
      });
  }, [id, navigate]);

  if (loading) return <h2>Loading...</h2>;
  if (!product) return <h2>Product not found</h2>;

  const addToCart = async () => {
    try {
      await api.post("/api/users/cart/add", null, {
        params: {
          productId: product.id,
          quantity: 1,
        },
      });
      toast.success("Added to cart!");
      navigate("/cart");
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  const addToWishlist = async () => {
    try {
      await api.post(`/api/users/wishlist/add/${product.id}`);
      toast.success("Added to wishlist ❤️");
    } catch {
      toast.error("Failed to add to wishlist");
    }
  };

  return (
    <div className="pd-container">
      {/* LEFT */}
      <div className="pd-left">
        <div className="pd-main-img">
          <img src={product.imgUrl} alt={product.name} />
        </div>
      </div>

      {/* RIGHT */}
      <div className="pd-right">
        <h1 className="pd-title">{product.name}</h1>

        <p className="pd-price">
          {product.discountPercentage > 0 ? (
            <>
              <span style={{ textDecoration: "line-through", color: "gray", marginRight: "10px" }}>
                ₹{product.price}
              </span>
              <span style={{ color: "green", fontWeight: "bold" }}>
                ₹{product.discountedPrice}
              </span>
              <span style={{ marginLeft: "10px", color: "red" }}>
                ({product.discountPercentage}% OFF)
              </span>
            </>
          ) : (
            `₹${product.price}`
          )}
        </p>

        <p className="pd-desc">{product.description}</p>
        <p><strong>Brand:</strong> {product.brand}</p>

        <div className="pd-actions">
          <button className="pd-btn pd-cart-btn" onClick={addToCart}>
            🛒 Add to Cart
          </button>

          <button className="pd-btn pd-wishlist-btn" onClick={addToWishlist}>
            ❤️ Add to Wishlist
          </button>
        </div>

        <p className="pd-footer">
          Free shipping • <span>Free Returns</span>
        </p>
      </div>
    </div>
  );
}
