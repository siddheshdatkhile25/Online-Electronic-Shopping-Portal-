import React from 'react'
import './LandingPage.css'
import imgicons from '../../../data/carouselImages.json'
import Carousal from '../../../Components/user/Carousal/Carousal'
import products from '../../../data/ProductData.json'
import { useNavigate } from "react-router-dom";


const { phones } = products
const { tablets } = products

function LandingPage() {
    const navigate = useNavigate();

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

                    <button className='shopNowbtn'
                        onClick={() => {
                            const section = document.getElementsByClassName("category-carousel");
                            section?.scrollIntoView({ behavior: "smooth" });
                        }}
                    >
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
                    <div className="category-bar">
                        {imgicons.slice(0, 9).map((icon, index) => (
                            <div key={index}
                                className='category'
                                onClick={() => navigate(`/product-listing/${icon.slug}`)}
                            >
                                <div className='category-circle'>
                                    <div className="category-image">
                                        <img src={icon.src} alt={icon.alt} title={icon.text} />
                                    </div>
                                </div>
                                <div>{icon.title}</div>
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

            <hr />
            <div className="footer-section">

                <div className="footer-newsletter">
                    <h2>Sign up for our newsletter</h2>
                    <p>
                        Be the first to know about our special offers, new product launches, and events
                    </p>

                    <div className="newsletter-input">
                        <input type="email" placeholder="Email Address" />
                        <button>Sign Up</button>
                    </div>
                </div>

                <div className="footer-links">

                    <div className="footer-col">
                        <h4>Shop</h4>
                        <ul>
                            <li>Women's</li>
                            <li>Men's</li>
                            <li>Kids'</li>
                            <li>Shoes</li>
                            <li>Equipment</li>
                            <li>By Activity</li>
                            <li>Gift Cards</li>
                            <li>Sale</li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Help</h4>
                        <ul>
                            <li>Help Center</li>
                            <li>Order Status</li>
                            <li>Size Chart</li>
                            <li>Returns & Warranty</li>
                            <li>Contact Us</li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>About</h4>
                        <ul>
                            <li>About Us</li>
                            <li>Responsibility</li>
                            <li>Technology & Innovation</li>
                            <li>Explore our stories</li>
                        </ul>
                    </div>

                </div>
            </div>


        </div>
    )
}

export default LandingPage
