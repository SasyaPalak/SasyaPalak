import React, { useState } from "react";
import axios from "axios";
import Footer from "../layout/footer";
import Navbar from "../layout/navbar";
import "../../styles/LoanForm.css";
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

      if (response.data.loan_status === "Eligible") {
        navigate("/crop-yield");
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
          {/* Married Field */}
          <fieldset>
            <legend>Marital Status:</legend>
            <label>
              <input
                type="radio"
                name="Married"
                value="Yes"
                checked={formData.Married === "Yes"}
                onChange={handleChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="Married"
                value="No"
                checked={formData.Married === "No"}
                onChange={handleChange}
              />
              No
            </label>
          </fieldset>

          {/* Dependents Field */}
          <fieldset>
            <legend>Dependents:</legend>
            <label>
              <input
                type="radio"
                name="Dependents"
                value="0"
                checked={formData.Dependents === "0"}
                onChange={handleChange}
              />
              0
            </label>
            <label>
              <input
                type="radio"
                name="Dependents"
                value="1"
                checked={formData.Dependents === "1"}
                onChange={handleChange}
              />
              1
            </label>
            <label>
              <input
                type="radio"
                name="Dependents"
                value="2"
                checked={formData.Dependents === "2"}
                onChange={handleChange}
              />
              2
            </label>
            <label>
              <input
                type="radio"
                name="Dependents"
                value="3+"
                checked={formData.Dependents === "3+"}
                onChange={handleChange}
              />
              3+
            </label>
          </fieldset>

          {/* Education Field */}
          <fieldset>
            <legend>Education:</legend>
            <label>
              <input
                type="radio"
                name="Education"
                value="Graduate"
                checked={formData.Education === "Graduate"}
                onChange={handleChange}
              />
              Graduate
            </label>
            <label>
              <input
                type="radio"
                name="Education"
                value="Not Graduate"
                checked={formData.Education === "Not Graduate"}
                onChange={handleChange}
              />
              Not Graduate
            </label>
          </fieldset>

          {/* Self-Employed Field */}
          <fieldset>
            <legend>Self-Employed:</legend>
            <label>
              <input
                type="radio"
                name="Self_Employed"
                value="Yes"
                checked={formData.Self_Employed === "Yes"}
                onChange={handleChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="Self_Employed"
                value="No"
                checked={formData.Self_Employed === "No"}
                onChange={handleChange}
              />
              No
            </label>
          </fieldset>

          {/* Applicant Income Field */}
          <label htmlFor="ApplicantIncome">Applicant Income:</label>
          <input
            type="number"
            name="ApplicantIncome"
            value={formData.ApplicantIncome}
            onChange={handleChange}
            placeholder="Enter income"
            min="0"
            step="1"
            id="ApplicantIncome"
          />

          {/* Coapplicant Income Field */}
          <label htmlFor="CoapplicantIncome">Coapplicant Income:</label>
          <input
            type="number"
            name="CoapplicantIncome"
            value={formData.CoapplicantIncome}
            onChange={handleChange}
            placeholder="Enter coapplicant income"
            min="0"
            step="1"
            id="CoapplicantIncome"
          />

          {/* Loan Amount Field */}
          <label htmlFor="LoanAmount">Loan Amount:</label>
          <input
            type="number"
            name="LoanAmount"
            value={formData.LoanAmount}
            onChange={handleChange}
            placeholder="Enter loan amount"
            min="0"
            step="1"
            id="LoanAmount"
          />

          {/* Loan Amount Term Field */}
          <label htmlFor="Loan_Amount_Term">Loan Amount Term (Months):</label>
          <input
            type="number"
            name="Loan_Amount_Term"
            value={formData.Loan_Amount_Term}
            onChange={handleChange}
            placeholder="Enter loan term"
            min="0"
            step="1"
            id="Loan_Amount_Term"
          />

          {/* Credit History Field */}
          <fieldset>
            <legend>Credit History:</legend>
            <label>
              <input
                type="radio"
                name="Credit_History"
                value="1"
                checked={formData.Credit_History === "1"}
                onChange={handleChange}
              />
              1
            </label>
            <label>
              <input
                type="radio"
                name="Credit_History"
                value="0"
                checked={formData.Credit_History === "0"}
                onChange={handleChange}
              />
              0
            </label>
          </fieldset>

          {/* Property Area Field */}
          <fieldset>
            <legend>Property Area:</legend>
            <label>
              <input
                type="radio"
                name="Property_Area"
                value="Urban"
                checked={formData.Property_Area === "Urban"}
                onChange={handleChange}
              />
              Urban
            </label>
            <label>
              <input
                type="radio"
                name="Property_Area"
                value="Semiurban"
                checked={formData.Property_Area === "Semiurban"}
                onChange={handleChange}
              />
              Semiurban
            </label>
            <label>
              <input
                type="radio"
                name="Property_Area"
                value="Rural"
                checked={formData.Property_Area === "Rural"}
                onChange={handleChange}
              />
              Rural
            </label>
          </fieldset>

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
