import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../../services/users"; // create this API
import "./Register.css";

function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const onRegister = async () => {
        if (!firstName || !lastName || !email || !phone || !dob || !password || !confirmPassword) {
            toast.warning("Please fill all fields");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const response = await register({
                firstName,
                lastName,
                email,
                phone,
                dob,
                password,
            });

            if (response.status === "success") {
                toast.success("Registration successful");
                navigate("/login");
            } else {
                toast.error(response.error || "Registration failed");
            }
        } catch (err) {
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="bg-page min-vh-100 d-flex flex-column">
            {/* Top black navbar */}
            <nav className="navbar navbar-dark bg-dark px-4">
                <div className="d-flex align-items-center">
                    <span className="navbar-brand mb-0 h1 me-4">ElectroKart</span>
                    <button className="btn btn-link text-white text-decoration-none p-0">
                        Shop
                    </button>
                </div>
                <div>
                    <Link to="/login" className="btn btn-link text-white text-decoration-none p-0">
                        Login
                    </Link>
                </div>
            </nav>

            {/* Center card */}
            <div className="flex-grow-1 d-flex justify-content-center align-items-center">
                <div className="card shadow-sm p-4 register-card">
                    <h4 className="mb-4">Register here</h4>

                    {/* First + Last name */}
                    <div className="row mb-3">
                        <div className="col-md-6 mb-2 mb-md-0">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="First name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Phone */}
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    {/* DOB (Date Picker) */}
                    <div className="mb-3">
                        <input
                            type="date"
                            className="form-control"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                        />
                    </div>


                    {/* Password */}
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-4">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    {/* Register button */}
                    <div className="text-center">
                        <button
                            type="button"
                            className="btn btn-dark px-5"
                            onClick={onRegister}
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
