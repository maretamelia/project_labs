// src/pages/autentikasi/Login.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // ✅ pakai Link untuk SPA navigation
import './style.css'; // pastikan style.css ada di folder yang sama atau sesuaikan path

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({ message: '', type: '' });

  // Validasi email
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Handle submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      showAlert('Email tidak valid!', 'error');
      return;
    }

    if (!password) {
      showAlert('Password tidak boleh kosong!', 'error');
      return;
    }

    showAlert('Login berhasil untuk: ' + email, 'success');

    // TODO: Tambahkan logic backend login disini
    // fetch('/api/login', { method: 'POST', ... })
  };

  const loginWithGoogle = () => {
    showAlert('Menghubungkan dengan Google...', 'info');
    // TODO: Tambahkan logic Google OAuth disini
  };

  const showAlert = (message, type = 'info') => {
    setAlert({ message, type });
    setTimeout(() => setAlert({ message: '', type: '' }), 3000);
  };

  return (
    <div className="container">
      {alert.message && (
        <div className={`custom-alert custom-alert-${alert.type}`}>
          {alert.message}
        </div>
      )}

      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Selamat Datang</h1>
          <p className="auth-subtitle">Masuk ke akun Anda untuk melanjutkan</p>
        </div>

        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="login-email">Email</label>
            <div className="input-wrapper">
              <input
                type="email"
                id="login-email"
                placeholder="nama@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <div className="input-wrapper">
              <input
                type="password"
                id="login-password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="forgot-password">
            <Link to="/forgot-password">Lupa password?</Link>
          </div>

          <button type="submit" className="button">Masuk</button>

          <div className="divider">
            <span>atau lanjutkan dengan</span>
          </div>

          <button type="button" className="social-btn" onClick={loginWithGoogle}>
            Login dengan Google
          </button>
        </form>

        <div className="auth-footer">
          Belum punya akun? <Link to="/register">Daftar sekarang</Link>
        </div>
      </div>
    </div>
  );
}
