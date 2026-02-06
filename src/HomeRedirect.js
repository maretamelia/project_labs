import React from "react";
import { Navigate } from "react-router-dom";

export default function HomeRedirect() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // BELUM LOGIN / LOGOUT
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // SUDAH LOGIN → SESUAI ROLE
  if (user.role === "admin") {
    return <Navigate to="/dashboard-admin" replace />;
  }

  return <Navigate to="/dashboard-user" replace />;
}
