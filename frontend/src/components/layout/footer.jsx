import React from "react";
import "../../styles/Footer.css";
import logo from "../../assets/test.jpg";

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
  );
}

export default Footer;
