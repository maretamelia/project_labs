// src/pages/autentikasi/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';

// ⬇️ TAMBAHAN PENTING
import { login } from '../../services/authservices';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const showAlert = (message, type = 'info') => {
    setAlert({ message, type });
    setTimeout(() => setAlert({ message: '', type: '' }), 3000);
  };

  // 🔥 INI YANG DIPERBAIKI
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      showAlert('Email tidak valid!', 'error');
      return;
    }

    if (!password) {
      showAlert('Password tidak boleh kosong!', 'error');
      return;
    }

    try {
      const res = await login(email, password);

      // ⬇️ SIMPAN TOKEN (WAJIB)
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));

      showAlert('Login berhasil', 'success');

      // optional redirect
      navigate('/kategori');
    } catch (err) {
      showAlert(
        err.response?.data?.message || 'Login gagal',
        'error'
      );
    }
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
          <p className="auth-subtitle">
            Masuk ke akun Anda untuk melanjutkan
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="button">
            Masuk
          </button>

          <div className="auth-footer">
            Belum punya akun? <Link to="/register">Daftar</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
