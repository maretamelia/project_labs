import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';
import Notifikasi from './Notifikasi';
import Usermenu from './Usermenu';

function Navbar({ userName = 'Grisella', userRole = 'Admin', userAvatar, onMenuToggle }) {
  const navigate = useNavigate();
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // ================= LOGOUT =================
  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      await axios.post(
        'http://127.0.0.1:8000/api/logout',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      localStorage.removeItem('token');
      localStorage.removeItem('user');

      navigate('/login');
    } catch (err) {
      console.error('Logout gagal', err.response?.data || err);
      alert('Logout gagal, coba lagi!');
    }
  };

  // ================= NOTIFIKASI =================
  const adminNotifications = [
    {
      id: 1,
      icon: '📋',
      iconBg: '#2196F3',
      title: 'Pengajuan Peminjaman Baru',
      message: 'Ada 5 pengajuan peminjaman yang menunggu persetujuan.',
      time: '5 minutes ago',
      isRead: false,
    },
    {
      id: 2,
      icon: '⚠️',
      iconBg: '#F44336',
      title: 'Pengembalian Terlambat',
      message: 'Mahasiswa A terlambat mengembalikan Arduino UNO.',
      time: '1 hour ago',
      isRead: false,
    },
  ];

  const userNotifications = [
    {
      id: 1,
      icon: '💬',
      iconBg: '#2196F3',
      title: 'Peminjaman Disetujui',
      message: 'Peminjaman kamu telah disetujui.',
      time: '1 week ago',
      isRead: false,
    },
  ];

  const initialNotifications = userRole.toLowerCase() === 'admin' ? adminNotifications : userNotifications;
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  const handleDeleteNotification = (id) => setNotifications(prev => prev.filter(n => n.id !== id));

  // ================= RENDER =================
  return (
    <div className="navbar">
      {/* LEFT: Hamburger */}
      <button className="hamburger-btn" onClick={onMenuToggle}>☰</button>

      {/* RIGHT */}
      <div className="navbar-right">
        {/* NOTIFIKASI */}
        <div className="notification-wrapper">
          <button className="notification-btn" onClick={() => setIsNotifOpen(true)}>
            🔔
            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
          </button>
        </div>

        {/* USER MENU */}
        <Usermenu
          userName={userName}
          userRole={userRole}
          userAvatar={userAvatar}
          onLogout={handleLogout} // tombol logout
        />
      </div>

      {/* MODAL NOTIFIKASI */}
      <Notifikasi
        isOpen={isNotifOpen}
        onClose={() => setIsNotifOpen(false)}
        notifications={notifications}
        onMarkAllRead={handleMarkAllRead}
        onDeleteNotification={handleDeleteNotification}
      />
    </div>
  );
}

export default Navbar;
