import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import './ForgotPassword.css'


function ForgotPassword() {
  const navigate = useNavigate();
  

return (
  <div className="forgot-page">
    <div className="card shadow-sm p-4 forgot-card">
      <h4 className="mb-2">Forgot Password</h4>
      <p className="text-muted mb-4">Enter your email to receive OTP</p>

      <div className="mb-4">
        <label className="form-label">Email</label>
        <input type="email" className="form-control" placeholder="Email" />
      </div>

      <div className="text-center mb-4">
        <button className="btn btn-dark px-5" onClick={() => navigate(`/otp`)}>
          Send OTP
        </button>
      </div>

      <p className="createaccoubt text-center text-muted mb-0">
        Or create an <Link to="/register">account</Link>
      </p>
    </div>
  </div>
);

}

export default ForgotPassword;
