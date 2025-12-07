import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom"
import './Carousal.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const navigate = useNavigate();


const Carousal = ({ title, products }) => {

  return (
    <div className="container">
      <div className="productCarousal">
        <h2 className="product-title">{title}</h2>

        <div className="card-container">
            {products.map((item, index) => (
              <div key={index} className="card"
              onClick={() => navigate(`/product/${item.category}/${item.id}`)}
              >
                <div className="image">
                  <img src={item.images[0]} alt={item.name} />
                </div>

                <div className="data">
                  <div className="productname">{item.name}</div>
                  <div className="price">₹{item.price}</div>
                </div>

                <div className="review">
                  <div className="rating">
                    ⭐ {item.rating} ({item.ratingCount})
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
