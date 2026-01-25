import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SidebarUser.css';

import {
  MdDashboard,
  MdInventory,
  MdAssignment,
  MdHistory,
  MdDescription
} from 'react-icons/md';

function SidebarUser({ isOpen = true }) {
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
          to="/user/dashboard"
          className={`sidebar-item ${isActive('/user/dashboard') ? 'active' : ''}`}
        >
          <span className="sidebar-icon"><MdDashboard /></span>
          <span className="sidebar-text">Dashboard</span>
        </Link>

        <Link
          to="/user/barang"
          className={`sidebar-item ${isActive('/user/barang') ? 'active' : ''}`}
        >
          <span className="sidebar-icon"><MdInventory /></span>
          <span className="sidebar-text">Daftar Barang</span>
        </Link>

        <Link
          to="/user/pinjaman"
          className={`sidebar-item ${isActive('/user/pinjaman') ? 'active' : ''}`}
        >
          <span className="sidebar-icon"><MdAssignment /></span>
          <span className="sidebar-text">Pinjaman Saya</span>
        </Link>

        <Link
          to="/user/riwayat"
          className={`sidebar-item ${isActive('/user/riwayat') ? 'active' : ''}`}
        >
          <span className="sidebar-icon"><MdHistory /></span>
          <span className="sidebar-text">Riwayat Peminjaman</span>
        </Link>

        <Link
          to="/user/sop"
          className={`sidebar-item ${isActive('/user/sop') ? 'active' : ''}`}
        >
          <span className="sidebar-icon"><MdDescription /></span>
          <span className="sidebar-text">SOP</span>
        </Link>
      </nav>
    </div>
  );
}

export default SidebarUser;
