import "./AddAddress.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../../api/axiosInstance";

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

  const [addresses, setAddresses] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch addresses on mount and after add
  const fetchAddresses = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/api/users/addresses");
      setAddresses(res.data);
    } catch (err) {
      setError("Failed to load addresses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ================= SUBMIT ADDRESS =================
  const submitForm = async () => {
    try {
      setError("");
      setLoading(true);
      const payload = {
        addressLine1: form.address,
        addressLine2: form.apartment || "N/A",
        city: form.city,
        district: form.city, // using city as district for now
        state: form.state,
        pincode: form.zipcode,
      };
      await api.post("/api/users/addresses", payload);
      await fetchAddresses(); // Refresh list
      // Optionally clear form
      setForm({
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
    } catch {
      setError("Failed to add address");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="address-wrapper">
      <h1 className="address-title">Add Address</h1>
      <div className="form-container">
        <h3 className="section-title">Shipping Information</h3>
        {error && <div style={{color: 'red', marginBottom: 8}}>{error}</div>}
        <div className="two-input">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
          />
        </div>
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="apartment"
          placeholder="Apartment, suite, etc (optional)"
          value={form.apartment}
          onChange={handleChange}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
        />
        <div className="three-input">
          <select name="country" value={form.country} onChange={handleChange}>
            <option value="">Country</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="UK">United Kingdom</option>
          </select>
          <select name="state" value={form.state} onChange={handleChange}>
            <option value="">State</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Karnataka">Karnataka</option>
          </select>
          <input
            type="text"
            name="zipcode"
            placeholder="Zipcode"
            value={form.zipcode}
            onChange={handleChange}
          />
        </div>
        <input
          type="text"
          name="optional"
          placeholder="Optional"
          value={form.optional}
          onChange={handleChange}
        />
        {/* FIXED CHECKBOX ALIGNMENT */}
        <div className="checkbox-row">
          <label>
            <input
              type="checkbox"
              name="saveInfo"
              checked={form.saveInfo}
              onChange={handleChange}
            />
            Save contact information
          </label>
        </div>
        <button className="submit-btn" onClick={submitForm} disabled={loading}>
          {loading ? "Saving..." : "ADD ADDRESS"}
        </button>
      </div>
      <div style={{marginTop: 32}}>
        <h3>Saved Addresses</h3>
        {loading && <div>Loading...</div>}
        {!loading && addresses.length === 0 && <div>No addresses found.</div>}
        {!loading && addresses.length > 0 && (
          <ul style={{paddingLeft: 16}}>
            {addresses.map(addr => (
              <li key={addr.id} style={{marginBottom: 8}}>
                {addr.addressLine1}, {addr.addressLine2}, {addr.city}, {addr.state}, {addr.pincode}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
