import { useParams, useNavigate } from "react-router-dom";
import productsData from "../../../data/ProductData.json";
import "./productDetails.css";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ProductDetails() {
  const { category, id } = useParams();
  const navigate = useNavigate();

  // Normalize URL category (phones → phone)
  const selectedCategory = category.toLowerCase().replace(/s$/, "");

  // Normalize JSON categories
  const categoryMap = {};
  Object.keys(productsData).forEach((key) => {
    const normalized = key.toLowerCase().replace(/s$/, "");
    categoryMap[normalized] = productsData[key];
  });

  const categoryProducts = categoryMap[selectedCategory];
  if (!categoryProducts) return <h2>Category not found</h2>;

  const product = categoryProducts.find((p) => p.id === Number(id));
  if (!product) return <h2>Product not found</h2>;

  const [mainImg, setMainImg] = useState(product.images[0]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const normalizedCategory = category.toLowerCase().replace(/s$/, "");

    const alreadyExists = cart.some(
      (item) =>
        item.id === Number(id) &&
        item.category.toLowerCase().replace(/s$/, "") === normalizedCategory
    );

    if (alreadyExists) {
      toast.info("Product already in cart!");
      navigate("/cart");
      return;
    }

    const cartItem = {
      category: category,
      id: Number(id),
    };

    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));

    toast.success("Added to cart!");
    navigate("/cart");
  };

  return (
    <div className="pd-container">

      {/* LEFT SIDE */}
      <div className="pd-left">
        <div className="pd-main-img">
          <img src={mainImg} alt={product.name} />
        </div>

        <div className="pd-small-container">
          {product.images.map((img, index) => (
            <div
              key={index}
              className={`pd-small-img ${mainImg === img ? "active-thumb" : ""}`}
              onClick={() => setMainImg(img)}
            >
              <img src={img} alt="thumbnail" />
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="pd-right">
        <h2 className="pd-title">{product.name}</h2>

        <p className="pd-price">
          MRP <strong>₹{product.price.toLocaleString()}</strong>
        </p>

        <p className="pd-desc">{product.description}</p>

        {product.features && (
          <div className="pd-features">
            <p className="pd-section-title">Key Features:</p>
            <ul>
              {product.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Add to Cart Button */}
        <button className="pd-cart-btn" onClick={addToCart}>
          Add to Cart
        </button>

        <p className="pd-footer-text">
          Free standard shipping • <a href="#">Free Returns</a>
        </p>
      </div>

    </div>
  );
}
