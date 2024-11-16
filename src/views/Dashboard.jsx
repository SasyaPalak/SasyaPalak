import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";

function Dashboard() {
  return (
    <div>
      {/*Navbar */}
      <Navbar />
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
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Dashboard;
