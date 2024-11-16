import React, { useState } from "react";
import axios from "../routes/axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";

function OTPVerify() {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const storedEmail = localStorage.getItem("email");

  const handleOTPVerify = async (e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setLoading(true);

    console.log("Stored Email:", storedEmail);
    console.log("Entered OTP:", otp);

    try {
      const response = await axios.post("/verify-otp/", {
        email: storedEmail,
        otp: parseInt(otp),
      });

      if (response.status === 200) {
        localStorage.setItem("otpVerified", "true");
        localStorage.setItem("verifiedOtp", otp);

        setMessage("OTP verified successfully.");
        setTimeout(() => {
          navigate("/reset-password", { replace: true });
        }, 2000);
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        setMessage(`Error ${status}: ${data.detail || "Unknown error"}`);
      } else {
        setMessage("No response received. Please try again later.");
      }
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/*Navbar */}
      <Navbar />

      <h2>Enter OTP</h2>
      <form onSubmit={handleOTPVerify}>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
      {message && <p style={{ color: error ? "red" : "green" }}>{message}</p>}

      {/*Footer*/}
      <Footer />
    </div>
  );
}

export default OTPVerify;
