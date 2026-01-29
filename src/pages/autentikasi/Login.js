import React from "react";
import './style.css'; 
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="container">
      <h2>Login</h2>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button>Login</button>

      {/* Link ke register */}
      <p style={{ marginTop: '15px', fontSize: '14px' }}>
        Belum punya akun? <Link to="/Register">Register</Link>
      </p>
    </div>
  );
}
