import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';
import Notifikasi from './Notifikasi';
import Usermenu from './Usermenu';



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

  // Fetch notifications from API
  const fetchNotifications = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await axios.get('http://localhost:8000/api/profile/notification', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotifications(response.data.data || []);
    } catch (err) {
      console.error('Gagal mengambil notifikasi', err);
    }
  };

  // Fetch notifications on component mount
  useEffect(() => {
    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter(n => !n.is_read).length;

  // Mark notification as read
  const handleMarkAsRead = async (notificationId) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await axios.post(
        `http://localhost:8000/api/profile/notification/${notificationId}/read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Update notification in state
      setNotifications(prev =>
        prev.map(n => (n.id === notificationId ? { ...n, is_read: true } : n))
      );
    } catch (err) {
      console.error('Gagal menandai notifikasi sebagai dibaca', err);
    }
  };

  const handleMarkAllRead = () => {
    notifications.forEach(n => {
      if (!n.is_read) handleMarkAsRead(n.id);
    });
  };

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
