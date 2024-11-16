// AddBank.jsx
import React, { useState } from "react";
import axios from "axios";
import Navbar from "../layout/navbar";
import Footer from "../layout/footer";

const AddBank = () => {
  const [bankData, setBankData] = useState({
    bankName: "",
    cropSpecialization: "",
    region: "",
  });
  const [bankFeedback, setBankFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const regions = [
    "Koshi Province",
    "Madhesh Province",
    "Bagmati Province",
    "Gandaki Province",
    "Lumbini Province",
    "Karnali Province",
    "Sudurpashchim Province",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBankData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddBank = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBankFeedback("");

    try {
      const response = await axios.post("/admin/add-bank", bankData);
      if (response.status === 200) {
        setBankFeedback("Bank added successfully.");
        setBankData({
          bankName: "",
          cropSpecialization: "",
          region: "",
        });
      }
    } catch (error) {
      setBankFeedback("Error adding bank. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {/*Navbar*/}
      <Navbar />

      <h2>Add Bank</h2>
      <form onSubmit={handleAddBank}>
        <div>
          <label>
            Bank Name:
            <input
              type="text"
              name="bankName"
              value={bankData.bankName}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Crop Specialization:
            <input
              type="text"
              name="cropSpecialization"
              value={bankData.cropSpecialization}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Region:
            <select
              name="region"
              value={bankData.region}
              onChange={handleChange}
              required
            >
              <option value="">Select Region</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Bank"}
        </button>
      </form>
      {bankFeedback && (
        <p style={{ color: bankFeedback.includes("Error") ? "red" : "green" }}>
          {bankFeedback}
        </p>
      )}

      {/*Footer*/}
      <Footer />
    </div>
  );
};

export default AddBank;
