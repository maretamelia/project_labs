import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';
import Notifikasi from './Notifikasi';
import Usermenu from './Usermenu';

// Static notifications - defined outside component to avoid dependency issues
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

function Navbar({ onMenuToggle }) {
  const navigate = useNavigate();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Guest',
    role: 'user',
    image: null,
  });

  // ================= GET USER DATA =================
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (user) {
      setUserData({
        name: user.name || 'Guest',
        role: user.role || 'user',
        image: user.image ? `http://localhost:8000/storage/${user.image}` : null,
      });
    }
  }, []);

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
  const [notifications, setNotifications] = useState([]);

  // Set notifications based on user role
  useEffect(() => {
    const initialNotifications = userData.role.toLowerCase() === 'admin' ? adminNotifications : userNotifications;
    setNotifications(initialNotifications);
  }, [userData.role]);
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
          userName={userData.name}
          userRole={userData.role}
          userAvatar={userData.image}
          onLogout={handleLogout}
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
