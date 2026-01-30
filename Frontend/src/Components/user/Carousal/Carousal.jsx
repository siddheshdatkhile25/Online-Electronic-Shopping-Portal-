import React from "react";
import { useNavigate } from "react-router-dom";
import "./Carousal.css";

const Carousal = ({ title, products }) => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="productCarousal">
        <h2 className="product-title">{title}</h2>

        <div className="card-container">
          {products.map((item) => (
            <div
              key={item.id}
              className="card"
              onClick={() => navigate(`/product/${item.id}`)}
            >
              <div className="image">
                <img
                  src={
                    item.imageUrls && item.imageUrls.length > 0
                      ? item.imageUrls[0] // ✅ first image
                      : "/placeholder.png"
                  }
                  alt={item.name}
                />
              </div>

              <div className="data">
                <div className="productname">{item.name}</div>

                <div className="price">
                  {item.discountPercentage > 0 ? (
                    <>
                      <span className="old-price">₹{item.price}</span>
                      <span className="new-price">₹{item.discountedPrice}</span>
                    </>
                  ) : (
                    `₹${item.price}`
                  )}
                </div>
              </div>

              <div className="review">
                <div className="rating">
                  ⭐ {item.rating || 4.5}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousal;
