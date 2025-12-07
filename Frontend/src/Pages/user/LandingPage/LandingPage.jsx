import React from 'react'
import './LandingPage.css'
import imgicons from '../../../data/carouselImages.json'
import Carousal from '../../../Components/user/Carousal/Carousal'
import products from '../../../data/ProductData.json'


const { phones } = products
const { tablets } = products

function LandingPage() {

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

                <div className="category-carousel">
                    <div className="category-bar">
                        {imgicons.slice(0, 9).map((icon, index) => (
                            <div key={index} className='category'>
                                <div className='category-circle'>
                                    <div className="category-image">
                                        <img src={icon.src} alt={icon.alt} title={icon.title} />
                                    </div>
                                </div>
                                <div>{icon.title}</div>
                            </div>
                        ))}
                    </div>
                </div>
                


                {Object.entries(products).map(([categoryName , productList]) =>(
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
