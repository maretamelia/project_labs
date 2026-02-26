// src/pages/autentikasi/Register.jsx
import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import './style.css';
import { register } from '../../services/authservices';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [terms, setTerms] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '' });

  /* ================= VALIDASI ================= */
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const showAlert = (message, type = 'info') => {
    setAlert({ message, type });
    setTimeout(() => setAlert({ message: '', type: '' }), 3000);
  };

  /* ================= SUBMIT REGISTER ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim().length < 3) {
      showAlert('Nama minimal 3 karakter!', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showAlert('Email tidak valid!', 'error');
      return;
    }

    if (password.length < 8) {
      showAlert('Password minimal 8 karakter!', 'error');
      return;
    }

    if (password !== confirmPassword) {
      showAlert('Password tidak cocok! Silakan cek kembali.', 'error');
      return;
    }

    if (!terms) {
      showAlert('Anda harus menyetujui syarat & ketentuan!', 'error');
      return;
    }

    try {
      await register(name, email, password, confirmPassword);

      showAlert('Registrasi berhasil! Silakan login.', 'success');

      setTimeout(() => {
        navigate('/login');
      }, 1000);

    } catch (err) {
      const msg =
        err.response?.data?.message ||
        'Gagal registrasi, silakan coba lagi!';
      showAlert(msg, 'error');
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
          <h1 className="auth-title">Buat Akun Baru</h1>
          <p className="auth-subtitle">
            Daftar untuk memulai perjalanan Anda
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nama Lengkap</label>
            <input
              type="text"
              placeholder="Masukkan nama lengkap"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className="form-group password-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Min. 8 karakter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
          </div>

          {/* KONFIRMASI PASSWORD */}
          <div className="form-group password-group">
            <label>Konfirmasi Password</label>
            <div className="password-wrapper">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Ketik ulang password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span
                className="toggle-password"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
          </div>

          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
            />
            <label>Saya setuju dengan syarat & ketentuan</label>
          </div>

          <button type="submit" className="button">
            Daftar Sekarang
          </button>
        </form>

        <div className="auth-footer">
          Sudah punya akun? <a href="/login">Masuk di sini</a>
        </div>
        
      </div>
      <div className="autorizer">
        Sistem Peminjaman Laboratorium SIJA © 2026 — Developed by Mareta & Sofi
      </div>
    </div>
  );
}
