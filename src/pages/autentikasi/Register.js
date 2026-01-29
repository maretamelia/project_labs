import React from "react";
import './style.css'; 
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="container">
      <h2>Register</h2>
      <input type="text" placeholder="Nama Lengkap" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button>Register</button>
      
      <p style={{ marginTop: '15px', fontSize: '14px' }}>
        Sudah punya akun? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
