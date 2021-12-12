import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Login from "./Login.jsx";
import { Registration } from "./Registration.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";

const Auth = (props) => {
  return (
    <div className="auth-container">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
};

export default Auth;
