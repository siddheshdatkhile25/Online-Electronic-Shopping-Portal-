import React, { useEffect, useState } from 'react'
import './LandingPage.css'

import api from '../../../api/axiosInstance'

import Carousal from '../../../Components/user/Carousal/Carousal'
import products from '../../../data/ProductData.json'
import { useNavigate } from "react-router-dom";



function LandingPage() {
    const navigate = useNavigate();
    const [categories,setCategories]=useState([]);

    useEffect(()=>{
        api.get("/admin/categories")
        .then((res)=>{
            setCategories(res.data);
        })
        .catch((err)=>{
            console.error("error fectching categories",err);
        });

    },[]);
    return (
        <div className="container">
            <div className="main-body">
                <div className="heroSection">
                    <h2>
                        Discover the Latest in Electronics Shop Smart, Shop Fast!
                    </h2>

                    <p>
                        Discover the latest in smart technology, From gadgets to home essentials. Top brands at unbeatable prices, Delivered to your doorstep with ease.
                    </p>

                    <button className='shopNowbtn'>
                        Shop Now
                    </button>

                </div>

                <div className="latest-arrivals">

                    <h2>Our latest arrivals</h2>

                    <p className="latest-subtitle">
                        Create screens directly in Method or add your images from Sketch or Figma.
                        You can even sync designs from your cloud storage!
                    </p>

                    <button className="shopNowbtn">Shop All</button>

                    <div className="latest-grid">
                        <div className="latest-card"></div>
                        <div className="latest-card featured"></div>
                        <div className="latest-card"></div>
                    </div>

                </div>


     <div className="category-carousel">
  <h2 className="section-title">Shop by Category</h2>

  <div className="category-bar">
    {categories.map((cat) => (
      <div
        key={cat.id}
        className="category"
        onClick={() => navigate(`/product-listing/${cat.id}`)}
      >
        <div className="category-circle">
          <img
            src={cat.imageUrl}  
            alt={cat.name}
          />
        </div>
        <div className="category-title">{cat.name}</div>
      </div>
    ))}
  </div>
</div>





                {Object.entries(products).map(([categoryName, productList]) => (
                    <Carousal
                        key={categoryName}
                        title="Great Deals on iPhone Series "
                        products={productList} />
                ))}
                {/* <Carousal 
                key={categoryName}
                title="Great Deals on iPhone Series " 
                products={productList} /> */}
                {/* <Carousal title="Great Deals on Tablets Series " products={tablets} /> */}
            </div>

        </div>
    )
}

export default LandingPage
