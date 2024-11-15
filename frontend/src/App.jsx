import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./components/auth/Login";

function App() {
  return (
    <Router>
      <Login />
    </Router>
  );
}

export default App; // Ensure this line exists
