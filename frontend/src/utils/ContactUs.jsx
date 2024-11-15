import React, { useState } from "react";
import axios from "axios";

function ContactUs() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.fullName || !formData.email || !formData.message) {
      setFeedback("All fields are required.");
      setError(true);
      return;
    }

    setLoading(true); // Start loading
    setFeedback("");
    setError(false);

    try {
      // Make a POST request to your API
      const response = await axios.post("/contact", formData);

      if (response.status === 200) {
        setFeedback("Your message has been submitted successfully.");
        setError(false);
        // Reset the form
        setFormData({
          fullName: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      if (error.response) {
        // Errors returned by the server
        setFeedback(`Error: ${error.response.data?.message || "Server error occurred."}`);
      } else if (error.request) {
        // Network or client-side issues
        setFeedback("Error: Unable to connect to the server. Please try again.");
      } else {
        // Other unexpected errors
        setFeedback("Error: Something went wrong. Please try again.");
      }
      setError(true);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Full Name:
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              aria-label="Full Name"
              required
              style={{
                display: "block",
                width: "100%",
                padding: "8px",
                marginTop: "5px",
              }}
            />
          </label>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              aria-label="Email"
              required
              style={{
                display: "block",
                width: "100%",
                padding: "8px",
                marginTop: "5px",
              }}
            />
          </label>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>
            Message:
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message here..."
              rows="5"
              aria-label="Message"
              required
              style={{
                display: "block",
                width: "100%",
                padding: "8px",
                marginTop: "5px",
              }}
            />
          </label>
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
          }}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
      {feedback && (
        <p style={{ color: error ? "red" : "green", marginTop: "15px" }}>
          {feedback}
        </p>
      )}
    </div>
  );
}

export default ContactUs;
