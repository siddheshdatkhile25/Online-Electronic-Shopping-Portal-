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
  }, [id, navigate]);

  // ✅ ONLY NEW LOGIC (NECESSARY)
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

  if (loading) return <h2>Loading...</h2>;
  if (!product) return <h2>Product not found</h2>;

  return (
    <div className="pd-container">
      {/* LEFT SIDE */}
      <div className="pd-left">
        <div className="pd-main-img">
          <img src={mainImage || "/placeholder.png"} alt={product.name} />
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
          {/* ✅ ONLY CHANGE HERE */}
          <button className="pd-btn pd-cart-btn" onClick={addToCart}>
            🛒 Add to Cart
          </button>

          <button className="pd-btn pd-wishlist-btn">
            ❤️ Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}
