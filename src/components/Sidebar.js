import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

// Tambahkan di sini
import { MdDashboard, MdInventory, MdCategory, MdAssignment, MdHistory } from 'react-icons/md';

function Sidebar({ isOpen = true }) {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="logo-icon">🔬</div>
          <div className="logo-text">
            <span className="logo-title">LABS SIJA</span>
            <span className="logo-subtitle">Management System</span>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
       <Link
          to="/dashboard-admin"
          className={`sidebar-item ${isActive('/dashboard-admin') ? 'active' : ''}`}
        >
          <span className="sidebar-icon"><MdDashboard /></span>
          <span className="sidebar-text">Dashboard</span>
        </Link>

        <Link to="/data-barang" className={`sidebar-item ${isActive('/data-barang') ? 'active' : ''}`}>
          <span className="sidebar-icon"><MdInventory /></span>
          <span className="sidebar-text">Data Barang</span>
        </Link>

        <Link to="/kategori" className={`sidebar-item ${isActive('/kategori') ? 'active' : ''}`}>
          <span className="sidebar-icon"><MdCategory /></span>
          <span className="sidebar-text">Kategori Barang</span>
        </Link>

        <Link to="/daftar-peminjaman" className={`sidebar-item ${isActive('/daftar-peminjaman') ? 'active' : ''}`}>
          <span className="sidebar-icon"><MdAssignment /></span>
          <span className="sidebar-text">Daftar Peminjaman</span>
        </Link>

        <Link to="/riwayat-peminjaman" className={`sidebar-item ${isActive('/riwayat-peminjaman') ? 'active' : ''}`}>
          <span className="sidebar-icon"><MdHistory /></span>
          <span className="sidebar-text">Riwayat Peminjaman</span>
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;