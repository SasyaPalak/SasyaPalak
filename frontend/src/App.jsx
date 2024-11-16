import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup.jsx";
import OTPRequest from "./views/otpRequest.jsx";
import OTPVerify from "./views/otpVerify.jsx";
import Home from "./views/Home.jsx";
import ContactUs from "./utils/ContactUs.jsx";
import UserProfile from "./components/profile/userProfile.jsx";
import ResetPassword from "./components/auth/resetPassword.jsx";
import AdminDashboard from "./views/adminDashboard.jsx";
import AddBank from "./components/feed/addBank.jsx";
import ViewMessages from "./components/feed/viewMessage.jsx";
import LoanForm from "./components/feed/loanForm.jsx";
import CropYield from "./components/feed/cropPrediction.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/request-otp" element={<OTPRequest />} />
        <Route path="/verify-otp" element={<OTPVerify />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/api/user/profile" element={<UserProfile />} />
        <Route path="/api/user/reset-password" element={<ResetPassword />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add-bank" element={<AddBank />} />
        <Route path="/admin/view-message" element={<ViewMessages />} />
        <Route path="/loan-form" element={<LoanForm />} />
        <Route path="/crop-yield" element={<CropYield />} />
      </Routes>
    </Router>
  );
}

export default App;
