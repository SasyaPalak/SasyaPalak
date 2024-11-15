import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Company Name */}
        <div className="navbar-brand">
          <Link to="/" className="company-name">
            AgriSmart Solutions
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="navbar-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/loan" className="nav-link">
            Loan Form
          </Link>
          <Link to="/crop-yield" className="nav-link">
            Crop Yield Form
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
