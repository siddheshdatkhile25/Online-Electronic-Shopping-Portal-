import React, { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";
import { registerUser } from "../../../services/user";
import { toast } from "react-toastify";

const STATE_DISTRICT_MAP = {
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"],
  "Karnataka": ["Bengaluru Urban", "Mysore", "Mangalore"],
  "Delhi": ["New Delhi", "North Delhi", "South Delhi"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  "Other": ["-- Select District --"]
};

function Register() {
  const navigate = useNavigate();

  // basic fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName]  = useState("");
  const [email, setEmail]        = useState("");
  const [phone, setPhone]        = useState("");

  // address lines
  const [addrLine1, setAddrLine1] = useState("");
  const [addrLine2, setAddrLine2] = useState("");
  const [addrLine3, setAddrLine3] = useState("");
  const [pincode, setPincode] = useState("");
  const [district, setDistrict]   = useState("");
  const [stateName, setStateName] = useState("");

  // auth
  const [password, setPassword]  = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // district options update when state changes
  const districtsForSelectedState = useMemo(() => {
    if (!stateName) return [];
    return STATE_DISTRICT_MAP[stateName] || [];
  }, [stateName]);

  const handleRegister = async () => {
    // minimal validation
    if (!firstName.trim() || !email.trim() || !password || !confirmPassword) {
      toast.warning("Please fill required fields: First name, Email and Passwords.");
      return;
    }
    if (password !== confirmPassword) {
      toast.warning("Passwords do not match.");
      return;
    }

    const user = {
      firstname: firstName.trim(),
      lastname: lastName.trim(),
      email: email.trim(),
      password : password.trim(),
      phone: phone.trim(),
      address: {
        addressLine1: addrLine1.trim(),
        addressLine2: addrLine2.trim(),
        city: addrLine3.trim(),
        district : district,
        state: stateName,
        pincode : pincode
      }
    }

    const response = await registerUser(user);
    console.log(response);
    

    if(response){
      toast.success('Successfully Registered !')


      navigate('/login')
    }else{
      toast.error("invalid data")
    }





    sessionStorage.setItem("user", JSON.stringify(response));
    
  };

  return (
    <div className="auth-page">
      <div className="register-card">
        <h3>Register here</h3>

        {/* Name row */}
        <div className="row-2">
          <input
            className="form-control"
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            className="form-control"
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="row-2">
          <input
            className="form-control"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="form-control"
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="row-1">
          <input
            className="form-control"
            type="text"
            placeholder="Line 1: Room no, Floor, Building"
            value={addrLine1}
            onChange={(e) => setAddrLine1(e.target.value)}
          />
        </div>

        <div className="row-1">
          <input
            className="form-control"
            type="text"
            placeholder="Line 2: Street, Area..."
            value={addrLine2}
            onChange={(e) => setAddrLine2(e.target.value)}
          />
        </div>

        <div className="row-1">
          <input
            className="form-control"
            type="text"
            placeholder="Line 3: Town, City"
            value={addrLine3}
            onChange={(e) => setAddrLine3(e.target.value)}
          />
        </div>

        <div className="row-2">
          <select
            className="form-control"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          >
            <option value="">Select District</option>
            {districtsForSelectedState.length === 0 && (
              <option value="">Select state first</option>
            )}
            {districtsForSelectedState.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <select
            className="form-control"
            value={stateName}
            onChange={(e) => {
              setStateName(e.target.value);
                setDistrict(""); 
              }}
              >
              <option value="">Select State</option>
              {Object.keys(STATE_DISTRICT_MAP).map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
              </select>
            </div>

        <div className="row-2">
          <input
            className="form-control"
            type="text"
            placeholder="Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
        </div>

            {/* Passwords */}
        <div className="row-2">
          <input
            className="form-control"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="form-control"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="actions">
          <button className="btn-primary" onClick={handleRegister}>
            Register
          </button>
        </div>

        <p className="footer-text">
          Already have an account?
          <Link to="/login" className="footer-link"> Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
