import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SidebarUser.css';
import { MdDashboard, MdInventory, MdAssignment, MdHistory, MdManageAccounts } from 'react-icons/md';

function SidebarUser({ isOpen = true }) {
  const location = useLocation();

  // Fungsi untuk menandai menu active
  const isActive = (exactPath) => {
    // Jika exactPath = '/user', hanya aktif kalau benar-benar di dashboard
    if (exactPath === '/user') return location.pathname === exactPath;
    // Untuk menu lain, aktif juga jika ada sub-path
    return location.pathname.startsWith(exactPath);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="logo-icon">🔬</div>
          <div className="logo-text">
            <span className="logo-title">LABORATORIUM SIJA</span>
            <span className="logo-subtitle">Manajemen Sistem</span>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <Link
          to="/user"
          className={`sidebar-item ${isActive('/user') ? 'active' : ''}`}
        >
          <span className="sidebar-icon"><MdDashboard /></span>
          <span className="sidebar-text">Dashboard</span>
        </Link>

        <Link
          to="/user/DaftarBarang"
          className={`sidebar-item ${isActive('/user/DaftarBarang') ? 'active' : ''}`}
        >
          <span className="sidebar-icon"><MdInventory /></span>
          <span className="sidebar-text">Daftar Barang</span>
        </Link>

        <Link
          to="/user/PinjamanSaya"
          className={`sidebar-item ${isActive('/user/PinjamanSaya') ? 'active' : ''}`}
        >
          <span className="sidebar-icon"><MdAssignment /></span>
          <span className="sidebar-text">Pinjaman Saya</span>
        </Link>

        <Link
          to="/user/RiwayatPeminjaman"
          className={`sidebar-item ${isActive('/user/RiwayatPeminjaman') ? 'active' : ''}`}
        >
          <span className="sidebar-icon"><MdHistory /></span>
          <span className="sidebar-text">Riwayat Peminjaman</span>
        </Link>
      </nav>
    </div>
  );
}

export default SidebarUser;
