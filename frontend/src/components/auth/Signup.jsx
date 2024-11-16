import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../layout/navbar";
import Footer from "../layout/footer";

function Signup() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    email: "",
    password: "",
    address: "",
    phone_number: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const statesOfNepal = [
    "Koshi Province",
    "Madhesh Province",
    "Bagmati Province",
    "Gandaki Province",
    "Lumbini Province",
    "Karnali Province",
    "Sudurpashchim Province",
  ];

  const genders = ["Male", "Female", "Rather Not Say", "Other"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setLoading(true);

    try {
      const response = await axios.post(
        "http://192.168.137.70:8000/api/register/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setMessage("Signup successful. Redirecting to OTP verification...");
        setTimeout(() => {
          navigate("/verify-otp", { state: { email: formData.email } });
        }, 2000);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error Response:", error.response?.data);
      setError(true);
      setMessage(
        error.response?.data?.detail || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="signup-form">
        <h2>Signup</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
          <div>
            <label htmlFor="gender">Select Gender:</label>
            <select
              name="gender"
              id="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                -- Select Gender --
              </option>
              {genders.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <input
            type="tel"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            placeholder="Phone Number"
            required
          />
          <div>
            <label htmlFor="address">Select Region:</label>
            <select
              name="address"
              id="address"
              value={formData.address}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                -- Select a Region --
              </option>
              {statesOfNepal.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>
        {message && <p style={{ color: error ? "red" : "green" }}>{message}</p>}
      </div>
      <Footer />
    </div>
  );
}

export default Signup;
