import React from "react";
import "./SectionPage.css";
import products from "../../../data/ProductData.json";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const LatestPhones = () => {
    const navigate = useNavigate();

    const { categoryName } = useParams();

    const categoryProducts = products[categoryName] || [];


    return (
        <div className="latest-container">

            <div className="latest-header">
                <h2>{categoryName.toUpperCase()}</h2>
            </div>

            <div className="filter-bar">
                <div className="filter-left">
                    <h3>Top Brands</h3>
                    <div className="brand-filters">
                        <button className="active">iPhones</button>
                        <button className="active">Vivo</button>
                        <button className="active">Samsung</button>
                        <button className="active">Redmi</button>
                    </div>
                </div>

                <div className="filter-right">
                    <select>
                        <option>Sort By: Popular</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Rating</option>
                    </select>
                    <p>Showing {categoryProducts.length} Products</p>
                </div>
            </div>

            <div className="product-grid">
                {categoryProducts.map((item) => (
                    <div className="product-box" key={item.id}>
                        <img src={item.images[0]} alt={item.name} />

                        <h4>{item.name}</h4>

                        <p className="price">
                            MRP <span>₹{item.price.toLocaleString()}</span>
                        </p>

                        <button
                            className="view-btn"
                            onClick={() => navigate(`/product/${item.category}/${item.id}`)}
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>


        </div>
    );
};

export default LatestPhones;
