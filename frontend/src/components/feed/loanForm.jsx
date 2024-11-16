import React, { useState } from "react";
import axios from "axios";
import Footer from "../layout/footer";
import Navbar from "../layout/navbar";
import { useNavigate } from "react-router-dom";

const LoanForm = () => {
  const [formData, setFormData] = useState({
    Married: "",
    Dependents: "",
    Education: "",
    Self_Employed: "",
    ApplicantIncome: "",
    CoapplicantIncome: "",
    LoanAmount: "",
    Loan_Amount_Term: "",
    Credit_History: "",
    Property_Area: "",
  });

  const [loanStatus, setLoanStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

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

    try {
      const response = await axios.post("/loan-form/", formData);
      setLoanStatus(response.data.loan_status);

      // If loan status is eligible, redirect to crop yield form
      if (response.data.loan_status === "Eligible") {
        navigate("/crop-yield"); // Redirect to the crop yield form page
      }
    } catch (err) {
      setError("There was an error processing your request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="loan-form-container">
        <h2>Loan Eligibility Checker</h2>
        <form onSubmit={handleSubmit}>
          <label>Married:</label>
          <div>
            <input
              type="radio"
              id="married-yes"
              name="Married"
              value="Yes"
              checked={formData.Married === "Yes"}
              onChange={handleChange}
            />
            <label htmlFor="married-yes">Yes</label>
            <input
              type="radio"
              id="married-no"
              name="Married"
              value="No"
              checked={formData.Married === "No"}
              onChange={handleChange}
            />
            <label htmlFor="married-no">No</label>
          </div>
          <br />

          <label>Dependents:</label>
          <div>
            <input
              type="radio"
              id="dependents-0"
              name="Dependents"
              value="0"
              checked={formData.Dependents === "0"}
              onChange={handleChange}
            />
            <label htmlFor="dependents-0">0</label>
            <input
              type="radio"
              id="dependents-1"
              name="Dependents"
              value="1"
              checked={formData.Dependents === "1"}
              onChange={handleChange}
            />
            <label htmlFor="dependents-1">1</label>
            <input
              type="radio"
              id="dependents-2"
              name="Dependents"
              value="2"
              checked={formData.Dependents === "2"}
              onChange={handleChange}
            />
            <label htmlFor="dependents-2">2</label>
            <input
              type="radio"
              id="dependents-3"
              name="Dependents"
              value="3+"
              checked={formData.Dependents === "3+"}
              onChange={handleChange}
            />
            <label htmlFor="dependents-3">3+</label>
          </div>
          <br />

          <label>Education:</label>
          <div>
            <input
              type="radio"
              id="graduate"
              name="Education"
              value="Graduate"
              checked={formData.Education === "Graduate"}
              onChange={handleChange}
            />
            <label htmlFor="graduate">Graduate</label>
            <input
              type="radio"
              id="not-graduate"
              name="Education"
              value="Not Graduate"
              checked={formData.Education === "Not Graduate"}
              onChange={handleChange}
            />
            <label htmlFor="not-graduate">Not Graduate</label>
          </div>
          <br />

          <label>Self Employed:</label>
          <div>
            <input
              type="radio"
              id="self-employed-yes"
              name="Self_Employed"
              value="Yes"
              checked={formData.Self_Employed === "Yes"}
              onChange={handleChange}
            />
            <label htmlFor="self-employed-yes">Yes</label>
            <input
              type="radio"
              id="self-employed-no"
              name="Self_Employed"
              value="No"
              checked={formData.Self_Employed === "No"}
              onChange={handleChange}
            />
            <label htmlFor="self-employed-no">No</label>
          </div>
          <br />

          <label>Applicant Income:</label>
          <input
            type="number"
            name="ApplicantIncome"
            value={formData.ApplicantIncome}
            onChange={handleChange}
            placeholder="Enter income"
            min="0"
            step="1"
          />
          <br />

          <label>Coapplicant Income:</label>
          <input
            type="number"
            name="CoapplicantIncome"
            value={formData.CoapplicantIncome}
            onChange={handleChange}
            placeholder="Enter coapplicant income"
            min="0"
            step="1"
          />
          <br />

          <label>Loan Amount:</label>
          <input
            type="number"
            name="LoanAmount"
            value={formData.LoanAmount}
            onChange={handleChange}
            placeholder="Enter loan amount"
            min="0"
            step="1"
          />
          <br />

          <label>Loan Amount Term (Months):</label>
          <input
            type="number"
            name="Loan_Amount_Term"
            value={formData.Loan_Amount_Term}
            onChange={handleChange}
            placeholder="Enter loan term (months)"
            min="0"
            step="1"
          />
          <br />

          <label>Credit History:</label>
          <div>
            <input
              type="radio"
              id="credit-history-1"
              name="Credit_History"
              value="1"
              checked={formData.Credit_History === "1"}
              onChange={handleChange}
            />
            <label htmlFor="credit-history-1">1</label>
            <input
              type="radio"
              id="credit-history-0"
              name="Credit_History"
              value="0"
              checked={formData.Credit_History === "0"}
              onChange={handleChange}
            />
            <label htmlFor="credit-history-0">0</label>
          </div>
          <br />

          <label>Property Area:</label>
          <div>
            <input
              type="radio"
              id="urban"
              name="Property_Area"
              value="Urban"
              checked={formData.Property_Area === "Urban"}
              onChange={handleChange}
            />
            <label htmlFor="urban">Urban</label>
            <input
              type="radio"
              id="semiurban"
              name="Property_Area"
              value="Semiurban"
              checked={formData.Property_Area === "Semiurban"}
              onChange={handleChange}
            />
            <label htmlFor="semiurban">Semiurban</label>
            <input
              type="radio"
              id="rural"
              name="Property_Area"
              value="Rural"
              checked={formData.Property_Area === "Rural"}
              onChange={handleChange}
            />
            <label htmlFor="rural">Rural</label>
          </div>
          <br />

          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Check Loan Eligibility"}
          </button>
        </form>

        {loanStatus && <h3>Loan Status: {loanStatus}</h3>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <Footer />
    </>
  );
};

export default LoanForm;
