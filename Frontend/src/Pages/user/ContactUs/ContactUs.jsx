import React, { useState } from "react";
import "./Contact.css";

function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("Please fill all required fields.");
      return;
    }

    alert("Your message has been sent!");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="contact-page">
      <div className="contact-container">

        <h2 className="page-title">Contact Us</h2>
        <p className="subtitle">We’d love to hear from you. Reach out anytime!</p>

        <div className="contact-content">

          {/* LEFT — Form */}
          <div className="contact-form">
            <h3>Send us a message</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name *"
                value={form.name}
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email *"
                value={form.email}
                onChange={handleChange}
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone (optional)"
                value={form.phone}
                onChange={handleChange}
              />

              <textarea
                name="message"
                rows="5"
                placeholder="Your Message *"
                value={form.message}
                onChange={handleChange}
              ></textarea>

              <button type="submit" className="btn-submit">Send Message</button>
            </form>
          </div>

          {/* RIGHT — Info */}
          <div className="contact-info">
            <h3>Get in touch</h3>

            <div className="info-box">
              <h4>📍 Store Address</h4>
              <p>ElectroKart, 2nd Floor, Galaxy Plaza,<br />
                Near Metro Station, Mumbai, Maharashtra - 400001</p>
            </div>

            <div className="info-box">
              <h4>📞 Phone</h4>
              <p>+91 98234 56789</p>
            </div>

            <div className="info-box">
              <h4>📧 Email</h4>
              <p>support@electrokart.com</p>
            </div>

            <div className="info-box">
              <h4>🕒 Working Hours</h4>
              <p>Mon – Sat: 9:00 AM – 8:00 PM<br />Sunday: Closed</p>
            </div>
          </div>

        </div>

        {/* MAP Section */}
        <div className="map-container">
          <h3>Find us on the map</h3>
          <div className="map-box">
            {/* Replace src with your Google Map embed link */}
            <iframe
              title="map"
              src="https://maps.google.com/maps?q=mumbai&t=&z=13&ie=UTF8&iwloc=&output=embed"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ContactUs;
