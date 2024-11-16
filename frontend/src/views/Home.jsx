import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import Footer from "../components/layout/footer";
import logo from "../assets/test.jpg";

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

      {/* Services Section */}
      <section className="services">
        <div className="service-card">
          <h2 className="service-title">Loan Eligibility</h2>
          <p className="service-description">
            Find out if you qualify for a loan to support your agricultural
            needs.
          </p>
          <Link to="/loan-form" className="service-button">
            Check Eligibility
          </Link>
        </div>

        <div className="service-card">
          <h2 className="service-title">Crop Yield Prediction</h2>
          <p className="service-description">
            Predict the yield of your crops based on soil, climate, and other
            parameters.
          </p>
          <Link to="/crop-yield" className="service-button">
            Predict Now
          </Link>
        </div>

        <div className="service-card">
          <h2 className="service-title">Crop Disease Detection</h2>
          <p className="service-description">
            Identify and prevent crop diseases using advanced image recognition.
          </p>
          <Link to="/disease-detection" className="service-button">
            Diagnose Disease
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
