import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <p style={styles.text}>Halaman tidak ditemukan</p>

      <Link to="/login" style={styles.link}>
        Kembali ke Login
      </Link>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f9fafb',
  },
  title: {
    fontSize: '64px',
    color: '#6a0dad',
    marginBottom: '8px',
  },
  text: {
    fontSize: '16px',
    color: '#6b7280',
    marginBottom: '16px',
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
    background: '#6a0dad',
    padding: '10px 16px',
    borderRadius: '8px',
    fontWeight: '600',
  },
};