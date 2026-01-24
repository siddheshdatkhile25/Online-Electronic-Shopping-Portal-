import React from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-page">
      <div className="forgot-card">
        <h3 className="forgot-title">Forgot Password</h3>
        <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '1.5rem' }}>
          Enter your email to receive reset instructions.
        </p>

        <form>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '500' }}>
              Email Address
            </label>
            <input
              type="email"
              className="input-field"
              placeholder="Enter your email"
            />
          </div>

          <button type="submit" className="submit-btn">
            Send Reset Link
          </button>

          <button 
            type="button" 
            className="submit-btn" 
            style={{ marginTop: '1rem', backgroundColor: '#1f2937' }}
            onClick={() => navigate(`/otp`)}
          >
            Send OTP
          </button>
        </form>

        <div className="login-link">
          <a href="/login">Back to Login</a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
