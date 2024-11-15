import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../styles/Admin.css";

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <header className="header">
        <h2>Admin Panel</h2>
      </header>

      {/* Main Navigation Links */}
      <nav className="center-nav">
        <ul className="nav-links">
          <li>
            <Link to="/admin/add-bank" className="nav-link">
              Add Bank
            </Link>
          </li>
          <li>
            <Link to="/admin/view-message" className="nav-link">
              View Messages
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminDashboard;
