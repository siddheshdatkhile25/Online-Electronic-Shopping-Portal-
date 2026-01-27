import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./ForgotPassword.css";
import { toast } from "react-toastify";
import { sendOtp } from "../../../services/user";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const onSentOtp = async () => {
    if (!email ) {
      toast.warning("Please Enter Email");
      return;
    }
    
    const response = await sendOtp(email);

    if(response){
      toast.success(response.message);
      localStorage.setItem("verify-email", email);
      navigate("/otp")
    }else{
      toast.error("Invalid Credentials !");
    }
  }

  const navigate = useNavigate();

  return (
    <div className="bg-page">
      <div className="forgot-card">
        <h3 className="forgot-title">Forgot Password</h3>
        <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '1.5rem' }}>
          Enter your email .
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
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit" className="submit-btn">
            Send Reset Link
          </button>

          <button 
            type="button" 
            className="submit-btn" 
            style={{ marginTop: '1rem', backgroundColor: '#1f2937' }}
            onClick={onSentOtp}
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
