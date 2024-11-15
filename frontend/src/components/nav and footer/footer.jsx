import React from "react";
import "../styles/Footer.css";
import logo from "../assets/test.jpg";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Company Info Section */}
        <div className="footer-info">
          <div className="footer-logo">
            <img src={logo} alt="AgriSmart Solutions Logo" className="logo" />
          </div>
          <h2 className="company-name">AgriSmart Solutions</h2>
          <p>
            Empowering agriculture with technology for a sustainable future.
          </p>
        </div>

        {/* Contact Section */}
        <div className="footer-contact">
          <h3>Contact Us:</h3>
          <p>Email: info@agrismartsolutions.com</p>
          <p>Phone: +1-234-567-890</p>
        </div>

        {/* Map Section */}
        <div className="footer-map">
          <h3>Our Location:</h3>
          <iframe
            src="https://www.google.com/maps/embed?..."
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
  );
}

export default Footer;
