import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import logo from "../assets/homebg.jpg";

function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title">
          Empowering Agriculture with Smart Technology
        </h1>
        <p className="hero-subtitle">
          AgriSmart Solutions leverages AI to provide farmers and stakeholders
          with tools to enhance crop productivity, manage diseases, and access
          financial resources seamlessly.
        </p>
        <div className="auth-buttons">
          <Link to="/login" className="auth-button login-button">
            Login
          </Link>
          <Link to="/signup" className="auth-button signup-button">
            Signup
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
