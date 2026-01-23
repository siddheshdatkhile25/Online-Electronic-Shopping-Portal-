import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // define this API
import "./ResetPassword.css";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const onSetPassword = async () => {
    if (!password || !confirmPassword) {
      toast.warning("Please fill both fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await resetPassword(password); // backend call

      if (response.status === "success") {
        toast.success("Password reset successful");
        navigate("/login");
      } else {
        toast.error(response.error || "Password reset failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="bg-page min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <div className="card shadow-sm p-4 reset-card">
        <h5 className="mb-4">Reset Password</h5>

        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Enter New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            className="form-control"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="text-center">
          <button
            type="button"
            className="btn btn-dark px-4"
            onClick={onSetPassword}
          >
            Set Password
          </button>
        </div>
      </div>

      <p className="text-muted mt-4">
        Or create an <Link to="/register">account</Link>
      </p>
    </div>
  );
}

export default ResetPassword;
