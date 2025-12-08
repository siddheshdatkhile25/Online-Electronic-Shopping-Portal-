import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


function ForgotPassword() {
  

  return (
    <div>
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
              //value={email}
              //onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="text-center mb-4">
            <button
              type="button"
              className="btn btn-dark px-5"
              //onClick={onSendOtp}
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
      
  )
}

export default ForgotPassword;
