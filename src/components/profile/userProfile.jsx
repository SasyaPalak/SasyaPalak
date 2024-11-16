import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../styles/UserProfile.css";
import Navbar from "../layout/navbar";
import Footer from "../layout/footer";
import Profile from "../../assets/user.png";

function UserProfile() {
  const [profileData, setProfileData] = useState({
    fullName: "",
    contactNo: "",
    email: "",
    imageUrl: Profile,
  });

  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/user/profile");
        setProfileData({
          ...response.data,
          imageUrl: response.data.imageUrl || Profile,
        });
      } catch (err) {
        setError("Failed to fetch user profile. Please try again.");
        setMessage("");
      }
    };
    fetchProfile();
  }, []);

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const updateProfile = async () => {
    try {
      const response = await axios.post("/api/user/profile", profileData);
      setMessage(response.data.message || "Profile updated successfully!");
      setError("");
      setEditMode(false);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to update profile. Please try again."
      );
      setMessage("");
    }
  };

  return (
    <div>
      {/*Navbar */}
      <Navbar />
      <div className="user-profile">
        <h2>User Profile</h2>

        {/* Profile Section */}
        <div className="profile-section">
          <div className="profile-image">
            <img
              src={profileData.imageUrl}
              alt="Profile"
              className="profile-pic"
            />
          </div>
          <label>Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={profileData.fullName}
            onChange={handleProfileChange}
            disabled={!editMode}
          />

          <label>Contact No:</label>
          <input
            type="text"
            name="contactNo"
            value={profileData.contactNo}
            onChange={handleProfileChange}
            disabled={!editMode}
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleProfileChange}
            disabled={!editMode}
          />

          <div className="profile-buttons">
            {!editMode ? (
              <button onClick={() => setEditMode(true)}>Edit Profile</button>
            ) : (
              <button onClick={updateProfile}>Save Changes</button>
            )}
          </div>
        </div>

        {/* Password Reset Section */}
        <div className="password-reset-section">
          <h3>Reset Password</h3>
          <p>
            <Link to="/reset-password" className="reset-password-link">
              Click here to reset your password
            </Link>
          </p>
        </div>

        {/* Forgot Password Link */}
        <div className="forgot-password">
          <Link to="/request-otp">Forgot Password?</Link>
        </div>

        {/* Messages and Errors */}
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
      {/*Footer */}
      <Footer />
    </div>
  );
}

export default UserProfile;
