import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onLogin = () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    const userData = {
      email: email,
      password: password
    };

    // Store data in sessionStorage
    sessionStorage.setItem("user", JSON.stringify(userData));

    alert("Login successful!");

    // Navigate to home page
    navigate("/");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-md-5 shadow rounded p-4 bg-white login-card">

        <h3 className="text-center mb-3">Welcome</h3>
        <p className="text-center text-muted mb-4">Login with your email</p>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <input type="checkbox" className="form-check-input me-1" />
            <label className="form-check-label">Remember me</label>
          </div>

          <button className="btn btn-link p-0"
            onClick={()=>navigate(`/forget-password`)}
          >Forgot Password?</button>
        </div>

        <button className="btn btn-dark w-100 mb-3" onClick={onLogin}>
          Login
        </button>

        <p className="text-center text-muted">
          Or create an <Link to="/register">account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
