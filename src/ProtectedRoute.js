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
    // arahkan ke dashboard sesuai role asli
    if (user.role === "admin") {
      return <Navigate to="/dashboard-admin" replace />;
    }

    return <Navigate to="/dashboard-user" replace />;
  }

  // ROLE SESUAI
  return children;
}
