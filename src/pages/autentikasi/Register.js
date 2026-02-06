// src/pages/autentikasi/Register.jsx
import React, { useState } from 'react';
import './style.css';
import { register } from '../../services/authservices'; // pastikan import function register yang sudah kita buat
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '' });

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const showAlert = (message, type = 'info') => {
    setAlert({ message, type });
    setTimeout(() => setAlert({ message: '', type: '' }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi
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
      // 🔥 Logic register ke backend
      const res = await register(name, email, password, confirmPassword);

      // Simpan user & token di localStorage
      localStorage.setItem('user', JSON.stringify(res.user));
      localStorage.setItem('token', res.token);

      showAlert(`Registrasi berhasil! Mengalihkan ke login...`, 'success');

      // Redirect ke dashboard user setelah 1 detik
      setTimeout(() => {
        navigate('/login'); // default role user
      }, 1000);
    } catch (err) {
      console.log(err.response?.data);
      const msg = err.response?.data?.message || 'Gagal registrasi, silakan coba lagi!';
      showAlert(msg, 'error');
    }
  };

  const registerWithGoogle = () => {
    showAlert('Mendaftar dengan Google...', 'info');
    // TODO: Tambahkan logic Google OAuth disini
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
          <p className="auth-subtitle">Daftar untuk memulai perjalanan Anda</p>
        </div>

        <form id="registerForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="register-name">Nama Lengkap</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="register-name"
                placeholder="Masukkan nama lengkap"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="register-email">Email</label>
            <div className="input-wrapper">
              <input
                type="email"
                id="register-email"
                placeholder="nama@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="register-password">Password</label>
            <div className="input-wrapper">
              <input
                type="password"
                id="register-password"
                placeholder="Min. 8 karakter"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="register-confirm-password">Konfirmasi Password</label>
            <div className="input-wrapper">
              <input
                type="password"
                id="register-confirm-password"
                placeholder="Ketik ulang password"
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="terms"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
            />
            <label htmlFor="terms">Saya setuju dengan syarat & ketentuan</label>
          </div>

          <button type="submit" className="button">Daftar Sekarang</button>

          <div className="divider">
            <span>atau daftar dengan</span>
          </div>

          <button type="button" className="social-btn" onClick={registerWithGoogle}>
            Daftar dengan Google
          </button>
        </form>

        <div className="auth-footer">
          Sudah punya akun? <a href="/login">Masuk di sini</a>
        </div>
      </div>
    </div>
  );
}
