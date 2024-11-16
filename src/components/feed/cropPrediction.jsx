import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import Navbar from "../layout/navbar";
import Footer from "../layout/footer";
import "../../styles/CropYield.css";

function CropYield() {
  const [formData, setFormData] = useState({
    region: "",
    season: "",
    crop: "",
    area: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

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
      const response = await axios.post("http://192.168.137.70:8000/api/crop_tr/", formData);
      console.log(formData);

      // Check if response is successful and crop yield is good
      if (response.status === 200) {
        if (response.data.cropYieldStatus === "good") {
          setSuccessMessage("Congratulations! Good crop yield! You can proceed to profit calculation.");
          setTimeout(() => {
            // Redirect to calculation-profit page
            navigate("/financial-calculation"); 
          }, 2000); 
        } else {
          setSuccessMessage("Don't lose hope! You can try again next season.");
        }

        setFormData({
          region: "",
          season: "",
          crop: "",
          area: "",
        });
      }
    } catch (err) {
      // Handle error case
      setError("Error submitting data. Please try again.");
      console.error("Error submitting data:", err);
    } finally {
      // Reset loading state
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
            {regions.map((region, index) => (
              <option key={index} value={index + 1}>
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
            {seasons.map((season, index) => (
              <option key={index} value={index + 1}>
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
            {crops.map((crop, index) => (
              <option key={index} value={index + 1}>
                {crop}
              </option>
            ))}
          </select>
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
