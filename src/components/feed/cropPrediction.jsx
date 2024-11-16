import React, { useState } from "react";
import axios from "axios";
import Navbar from "../layout/navbar";
import Footer from "../layout/footer";
import "../../styles/CropYield.css";

function CropYield() {
  const [formData, setFormData] = useState({
    region: "",
    season: "",
    crop: "",
    production: "",
    area: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  // Dropdown options
  const regions = [
    "Koshi Province",
    "Madhesh Province",
    "Bagmati Province",
    "Gandaki Province",
    "Lumbini Province",
    "Karnali Province",
    "Sudurpashchim Province",
  ];

  const seasons = ["Spring", "Winter", "Whole Year", "Summer (Monsoon)"];

  const crops = [
    "Rice",
    "Millet",
    "Lentil",
    "Barley",
    "Mustard",
    "Potato",
    "Maize",
    "Wheat",
    "Sugarcane",
    "Vegetables",
    "Fruits",
    "Tea",
    "Coffee",
    "Cardamom",
    "Tobacco",
    "Spices",
    "Soybean",
    "Cotton",
    "Jute",
    "Sunflower",
    "Medicinal Plants and Herbs",
    "Saffron",
    "Livestock Farming",
    "Horticulture Crops",
    "Pulses",
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // Send POST request to backend
      await axios.post("/crop-yield/", formData);

      // Display success message
      setSuccessMessage("Data submitted successfully!");

      // Reset form after successful submission
      setFormData({
        region: "",
        season: "",
        crop: "",
        production: "",
        area: "",
        email: "", // Reset email field
      });
    } catch (err) {
      // Handle error case
      setError("Error submitting data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      <div className="crop-yield-form">
        <h2>Crop Yield Form</h2>
        <form onSubmit={handleSubmit}>
          {/* Email - Added at the top of the form */}
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            title="Please enter a valid email address"
            className="email-input"
          />
          <br />

          {/* Region */}
          <label htmlFor="region">Region:</label>
          <select
            id="region"
            name="region"
            value={formData.region}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Region --</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
          <br />

          {/* Season */}
          <label htmlFor="season">Season:</label>
          <select
            id="season"
            name="season"
            value={formData.season}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Season --</option>
            {seasons.map((season) => (
              <option key={season} value={season}>
                {season}
              </option>
            ))}
          </select>
          <br />

          {/* Crop */}
          <label htmlFor="crop">Crop:</label>
          <select
            id="crop"
            name="crop"
            value={formData.crop}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Crop --</option>
            {crops.map((crop) => (
              <option key={crop} value={crop}>
                {crop}
              </option>
            ))}
          </select>
          <br />

          {/* Production */}
          <label htmlFor="production">Production (tons):</label>
          <input
            type="number"
            id="production"
            name="production"
            value={formData.production}
            onChange={handleChange}
            placeholder="Enter production (tons)"
            min="0"
            step="0.1"
            required
          />
          <br />

          {/* Area */}
          <label htmlFor="area">Area (hectares):</label>
          <input
            type="number"
            id="area"
            name="area"
            value={formData.area}
            onChange={handleChange}
            placeholder="Enter area (hectares)"
            min="0"
            step="0.1"
            required
          />
          <br />

          {/* Submit Button */}
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>

        {/* Messages */}
        {successMessage && <p className="success-message">{successMessage}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default CropYield;
