import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import logo from "../assets/test.jpg";

function Home() {
  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>AgriSmart Solutions</h1>
        </div>
        <div className="navbar-links">
          <Link to="/login" className="nav-link">
            Login
          </Link>
          <Link to="/signup" className="nav-link">
            Signup
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <section className="intro-section">
          <h2>Empowering Agriculture with Smart Technology</h2>
          <p>
            AgriSmart Solutions leverages AI to provide farmers and stakeholders
            with tools to enhance crop productivity, manage diseases, and access
            financial resources seamlessly.
          </p>
        </section>

        <section className="features-section">
          <div className="feature">
            <h3>Loan Eligibility</h3>
            <p>
              Find out if you qualify for a loan to support your agricultural
              needs.
            </p>
            <Link to="/loan-form" className="feature-link">
              Check Eligibility
            </Link>
          </div>
          <div className="feature">
            <h3>Crop Yield Prediction</h3>
            <p>
              Predict the yield of your crops based on soil, climate, and other
              parameters.
            </p>
            <Link to="/crop-yield" className="feature-link">
              Predict Now
            </Link>
          </div>
          <div className="feature">
            <h3>Crop Disease Detection</h3>
            <p>
              Identify and prevent crop diseases using advanced image
              recognition.
            </p>
            <Link to="/crop-disease" className="feature-link">
              Diagnose Disease
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src={logo} alt="AgriSmart Solutions Logo" className="logo" />
          </div>
          <div className="footer-info">
            <p>
              <strong>Contact Us:</strong>
            </p>
            <p>Email: info@agrismartsolutions.com</p>
            <p>Phone: +1-234-567-890</p>
          </div>
          <div className="footer-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.4061676130814!2d85.31137257481387!3d27.673838726969812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19007c081f3b%3A0xabccae09a15d0cde!2sBuddha%20Tech%20Pvt.%20Ltd!5e0!3m2!1sen!2snp!4v1731728506223!5m2!1sen!2snp"
              title="Our Location"
              width="300"
              height="150"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
