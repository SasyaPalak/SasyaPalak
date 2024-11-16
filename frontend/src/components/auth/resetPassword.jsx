import React, { useState } from "react";
import axios from "axios";
import "../../styles/ResetPassword.css";

function ResetPassword() {
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Handle input changes for password reset
  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  // Reset Password with Axios
  const resetPassword = async () => {
    try {
      const response = await axios.post(
        "/api/user/reset-password",
        passwordData
      );
      setMessage(response.data.message || "Password updated successfully!");
      setError("");
      setPasswordData({ oldPassword: "", newPassword: "" });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to reset password. Please check your credentials."
      );
      setMessage("");
    }
  };

  return (
    <div className="reset-password">
      <h2>Reset Password</h2>

      <label>Old Password:</label>
      <input
        type="password"
        name="oldPassword"
        value={passwordData.oldPassword}
        onChange={handlePasswordChange}
      />

      <label>New Password:</label>
      <input
        type="password"
        name="newPassword"
        value={passwordData.newPassword}
        onChange={handlePasswordChange}
      />

      <button onClick={resetPassword}>Reset Password</button>

      {/* Messages and Errors */}
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default ResetPassword;
