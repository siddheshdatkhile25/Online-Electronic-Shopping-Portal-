import React from 'react';
import './AboutUs.css';

function AboutUs() {
  return (
    <div className="about-us-container">
      <div className="about-us-header">
        <h1>About ElectroKart</h1>
        <p>Your Ultimate Destination for Electronic Shopping</p>
      </div>

      <div className="about-us-content">
        <section className="mission-section">
          <h2>Our Mission</h2>
          <p>
            At ElectroKart, we strive to provide an exceptional online shopping experience for electronic products.
            Our mission is to make high-quality electronics accessible to everyone, offering a wide range of products
            from smartphones and laptops to home appliances and accessories.
          </p>
        </section>

        <section className="vision-section">
          <h2>Our Vision</h2>
          <p>
            To become the leading e-commerce platform for electronics, known for our commitment to quality,
            customer satisfaction, and innovative technology solutions.
          </p>
        </section>

        <section className="features-section">
          <h2>Why Choose ElectroKart?</h2>
          <div className="features-grid">
            <div className="feature-item">
              <h3>Wide Product Range</h3>
              <p>Explore thousands of electronic products from top brands.</p>
            </div>
            <div className="feature-item">
              <h3>Secure Payments</h3>
              <p>Safe and secure payment options with multiple gateways.</p>
            </div>
            <div className="feature-item">
              <h3>Fast Delivery</h3>
              <p>Quick and reliable delivery to your doorstep.</p>
            </div>
            <div className="feature-item">
              <h3>Customer Support</h3>
              <p>24/7 customer support to assist you with any queries.</p>
            </div>
          </div>
        </section>

        <section className="team-section">
          <h2>Our Team</h2>
          <p>
            Our dedicated team of professionals works tirelessly to bring you the best shopping experience.
            From developers and designers to customer service representatives, we are committed to excellence.
          </p>
        </section>

        <section className="contact-section">
          <h2>Get in Touch</h2>
          <p>
            Have questions or feedback? Reach out to us through our Contact Us page or customer support channels.
          </p>
        </section>
      </div>
    </div>
  );
}

export default AboutUs;
