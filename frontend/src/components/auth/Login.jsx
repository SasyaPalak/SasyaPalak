import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../routes/axios";
import "../../styles/Login.css"; // Import CSS file

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("/login/", { email, password });
      setMessage(response.data.message);

      // Navigate to the dashboard after successful login
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.detail || "Login Failed");
      } else {
        setMessage("Login Failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {message && <p className={message.includes("Failed") ? "error-message" : "success-message"}>{message}</p>}
      <p>
        Don&apos;t have an account?{" "}
        <Link to="/signup">Register here</Link>
      </p>
      <p>
        Forgot your password? <Link to="/request-otp">Reset it here</Link>
      </p>
    </div>
  );
}

export default Login;
