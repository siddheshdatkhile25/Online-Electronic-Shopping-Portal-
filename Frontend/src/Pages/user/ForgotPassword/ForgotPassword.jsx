import React from "react";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  return (
    <div className="bg-page d-flex justify-content-center align-items-center">
      <div className="forgot-card card shadow-sm p-4">
        <h3 className="text-center mb-3">Forgot Password</h3>
        <p className="text-center text-muted mb-4">
          Enter your email to receive reset instructions.
        </p>

        <form>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
