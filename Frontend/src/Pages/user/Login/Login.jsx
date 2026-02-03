import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { logActivity } from "../../../services/logService";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onLogin = async () => {
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:8080/api/users/login", {
        email,
        password,
      });

      // Save JWT & role
      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("role", res.data.role);
      sessionStorage.setItem("email", res.data.email);
      sessionStorage.setItem("userId" , res.data.id);

      toast.success("Login successful!");

      //LOG LOGIN SUCCESS (FILE LOGGING)
      logActivity({
        userId: res.data.id,
        action: "LOGIN_SUCCESS"
      });
      console.log("logger called")

      // Role-based redirect
      if (res.data.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (error) {
      console.error(error);
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-md-5 shadow rounded p-4 bg-white login-card">

        <h3 className="text-center mb-3">Welcome</h3>
        <p className="text-center text-muted mb-4">
          Login with your email
        </p>

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

          <button
            className="btn btn-link p-0"
            onClick={() => navigate("/forget-password")}
          >
            Forgot Password?
          </button>
        </div>

        <button
          className="btn btn-dark w-100 mb-3"
          onClick={onLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-muted">
          Or create an <Link to="/register">account</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;