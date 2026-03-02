// components/PublicRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // Agar token nahi hai → AuthForm dikhana
  if (!token) return children;

  // Agar token hai, just allow other routes, AuthForm ke liye redirect
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.role === "admin") return <Navigate to="/owner" />;
    // Normal user already logged in, AuthForm nahi dikhaana
    return <Navigate to="/" />;
  } catch {
    localStorage.removeItem("token");
    return children;
  }
};

export default PublicRoute;
