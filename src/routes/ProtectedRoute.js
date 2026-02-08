import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // BELUM LOGIN
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // ROLE TIDAK SESUAI
  if (role && user.role !== role) {
    if (user.role === "admin") {
      return <Navigate to="/dashboard-admin" replace />;
    }

    if (user.role === "user") {
      return <Navigate to="/user" replace />;
    }
  }

  return children;
}
