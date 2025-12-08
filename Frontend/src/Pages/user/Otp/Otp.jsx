import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyOtp } from "../../services/users"; // create this API
import "./OtpVerify.css";

function OtpVerify() {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [secondsLeft, setSecondsLeft] = useState(600); // 10:00
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  // countdown timer
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [secondsLeft]);

  const handleChange = (index, e) => {
    const value = e.target.value.replace(/\D/g, ""); // only digits
    if (!value) {
      updateOtp(index, "");
      return;
    }

    updateOtp(index, value[value.length - 1]); // last digit

    // move to next input
    if (index < otp.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const updateOtp = (index, value) => {
    setOtp((prev) => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });
  };

  const formattedTime = () => {
    const m = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
    const s = String(secondsLeft % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const onVerify = async () => {
    const code = otp.join("");
    if (code.length !== 5) {
      toast.warning("Please enter 5 digit OTP");
      return;
    }

    try {
      const response = await verifyOtp(code); // backend call
      if (response.status === "success") {
        toast.success("OTP verified");
        // navigate where you want after success
        navigate("/login");
      } else {
        toast.error(response.error || "OTP verification failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="bg-page min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <div className="card shadow-sm p-4 otp-card">
        <h5 className="mb-4">Enter OTP</h5>

        <div className="d-flex justify-content-between mb-3">
          {otp.map((value, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={value}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="form-control otp-input"
            />
          ))}
        </div>

        <div className="text-end text-muted small mb-4">
          Resend in {formattedTime()}
        </div>

        <div className="text-center">
          <button className="btn btn-dark px-4" onClick={onVerify}>
            Verify OTP
          </button>
        </div>
      </div>

      <p className="text-muted mt-4">
        Or create an <Link to="/register">account</Link>
      </p>
    </div>
  );
}

export default OtpVerify;
