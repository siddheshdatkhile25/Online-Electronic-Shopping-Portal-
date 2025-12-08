import "./addAddress.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AddAddress() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    country: "",
    state: "",
    zipcode: "",
    optional: "",
    saveInfo: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const submitForm = () => {
    console.log("Address Added:", form);

    // Save to localStorage or backend later if needed
    // localStorage.setItem("addresses", JSON.stringify(form));

    navigate("/checkout"); // back to checkout
  };

  return (
    <div className="address-wrapper">
      <h1 className="address-title">Add Address</h1>

      <div className="form-container">

        <h3 className="section-title">Shipping Information</h3>

        <div className="two-input">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
          />
        </div>

        <input
          type="text"
          name="address"
          placeholder="Address"
          onChange={handleChange}
        />

        <input
          type="text"
          name="apartment"
          placeholder="Apartment, suite, etc (optional)"
          onChange={handleChange}
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          onChange={handleChange}
        />

        <div className="three-input">
          <select name="country" onChange={handleChange}>
            <option value="">Country</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="UK">United Kingdom</option>
          </select>

          <select name="state" onChange={handleChange}>
            <option value="">State</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Karnataka">Karnataka</option>
          </select>

          <input
            type="text"
            name="zipcode"
            placeholder="Zipcode"
            onChange={handleChange}
          />
        </div>

        <input
          type="text"
          name="optional"
          placeholder="Optional"
          onChange={handleChange}
        />

        {/* FIXED CHECKBOX ALIGNMENT */}
        <div className="checkbox-row">
          <label>
            <input
              type="checkbox"
              name="saveInfo"
              onChange={handleChange}
            />
            Save contact information
          </label>
        </div>

        <button className="submit-btn" onClick={submitForm}>
          ADD ADDRESS
        </button>
      </div>
    </div>
  );
}
