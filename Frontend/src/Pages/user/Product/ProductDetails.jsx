import { useParams, useNavigate } from "react-router-dom";
import productsData from "../../../data/ProductData.json";
import "./productDetails.css";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ProductDetails() {
  const { category, id } = useParams();
  const navigate = useNavigate();

  const selectedCategory = category.toLowerCase().replace(/s$/, "");

  const categoryMap = Object.fromEntries(
    Object.entries(productsData).map(([key, value]) => [
      key.toLowerCase().replace(/s$/, ""),
      value,
    ])
  );

  const productList = categoryMap[selectedCategory];
  if (!productList) return <h2>Category not found</h2>;

  const product = productList.find((p) => p.id === Number(id));
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

    const cartItem = { category, id: Number(id) };
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));

    toast.success("Added to cart!");
    navigate("/cart");
  };

  return (
    <div className="pd-container">

      {/* LEFT SIDE (Images) */}
      <div className="pd-left">
        <div className="pd-main-img">
          <img src={mainImg} alt={product.name} />
        </div>

        <div className="pd-thumbnails">
          {product.images.map((img, index) => (
            <div
              key={index}
              className={`thumb ${mainImg === img ? "active" : ""}`}
              onClick={() => setMainImg(img)}
            >
              <img src={img} alt="thumb" />
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE (Details) */}
      <div className="pd-right">
        
        <h1 className="pd-title">{product.name}</h1>

        <p className="pd-price">
          ₹{product.price.toLocaleString()}
          <span className="mrp">
            MRP: ₹{product.mrp.toLocaleString()} <span className="discount">({product.discount})</span>
          </span>
        </p>

        <p className="pd-desc">{product.description}</p>

        {/* Features */}
        {product.features && (
          <div className="pd-features">
            <h3>Key Features</h3>
            <ul>
              {product.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Add to Cart */}
        <button className="pd-btn" onClick={addToCart}>
          🛒 Add to Cart
        </button>

        <p className="pd-footer">
          Free shipping • <a href="#">Free Returns</a>
        </p>
      </div>

    </div>
  );
}
