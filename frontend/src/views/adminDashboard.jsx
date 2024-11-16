import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../styles/Admin.css";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      {/*Navbar*/}
      <Navbar />

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

      {/*Footer*/}
      <Footer />
    </div>
  );
}

export default AdminDashboard;
