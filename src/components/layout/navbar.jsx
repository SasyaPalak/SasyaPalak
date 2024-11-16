import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import profile from "../../assets/user.png";
import "../../styles/Navbar.css";

function Navbar() {
  const [user, setUser] = useState({ imageUrl: profile });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/user/profile");
        setUser({
          imageUrl: response.data.imageUrl || profile,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Company Name */}
        <div className="navbar-brand">
          <Link to="/Dashboard" className="company-name">
            AgriSmart Solutions
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="navbar-links">
          <Link to="/Dashboard" className="nav-link">
            Home
          </Link>
          <Link to="/loan-form" className="nav-link">
            Loan Form
          </Link>
          <Link to="/crop-yield" className="nav-link">
            Crop Yield Form
          </Link>
        </div>

        {/* User Profile Section */}
        <div className="user-profile">
          <img src={user.imageUrl} alt="User Profile" className="user-image" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
