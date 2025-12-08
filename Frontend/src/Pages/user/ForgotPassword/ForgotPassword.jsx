import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { sendOtp } from "../../services/users"; // create this API
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const onSendOtp = async () => {
    if (email.trim().length === 0) {
      toast.warning("Please enter email");
      return;
    }

    try {
      const response = await sendOtp(email); // your backend call

      if (response.status === "success") {
        toast.success("OTP sent to your email");
      } else {
        toast.error(response.error || "Failed to send OTP");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="bg-page min-vh-100 d-flex flex-column">
      {/* Top black navbar */}
      <nav className="navbar navbar-dark bg-dark px-4">
        <div className="d-flex align-items-center">
          <span className="navbar-brand mb-0 h1 me-4">ElectroKart</span>
          <button className="btn btn-link text-white text-decoration-none p-0">
            Shop
          </button>
        </div>
        <div>
          <Link to="/login" className="btn btn-link text-white text-decoration-none p-0">
            Login
          </Link>
        </div>
      </nav>

      {/* Center card */}
      <div className="flex-grow-1 d-flex justify-content-center align-items-center">
        <div className="card shadow-sm p-4 forgot-card">
          <h4 className="mb-2">Forgot Password</h4>
          <p className="text-muted mb-4">Enter email</p>

          <div className="mb-4">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="text-center mb-4">
            <button
              type="button"
              className="btn btn-dark px-5"
              onClick={onSendOtp}
            >
              send OTP
            </button>
          </div>

          <p className="text-center text-muted mb-0">
            Or create an <Link to="/register">account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
