import React, { useState } from 'react';
import './Navbar.css';
import Notifikasi from './Notifikasi';

function Navbar({ userName = "Grisella", userRole = "Admin", userAvatar, onMenuToggle }) {
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // Data notifikasi ADMIN
  const adminNotifications = [
    {
      id: 1,
      icon: '📋',
      iconBg: '#2196F3',
      title: 'Pengajuan Peminjaman Baru',
      message: 'Ada 5 pengajuan peminjaman yang menunggu persetujuan.',
      time: '5 minutes ago',
      isRead: false
    },
    {
      id: 2,
      icon: '⚠️',
      iconBg: '#F44336',
      title: 'Pengembalian Terlambat',
      message: 'Mahasiswa A terlambat mengembalikan Arduino UNO.',
      time: '1 hour ago',
      isRead: false
    },
    {
      id: 3,
      icon: '✅',
      iconBg: '#4CAF50',
      title: 'Barang Dikembalikan',
      message: 'Mahasiswa B telah mengembalikan Breadboard.',
      time: '2 hours ago',
      isRead: true
    },
    {
      id: 4,
      icon: '🔧',
      iconBg: '#FF9800',
      title: 'Permintaan Pemeliharaan',
      message: 'Barang ID #123 memerlukan pemeliharaan rutin.',
      time: '3 hours ago',
      isRead: false
    },
    {
      id: 5,
      icon: '📦',
      iconBg: '#9C27B0',
      title: 'Stok Barang Menipis',
      message: 'Stok Sensor Ultrasonic tersisa 2 unit.',
      time: '1 day ago',
      isRead: true
    }
  ];

  // Data notifikasi USER (7 dummy seperti yang diminta)
  const userNotifications = [
    {
      id: 1,
      icon: '💬',
      iconBg: '#2196F3',
      title: 'Peminjaman Disetujui',
      message: 'Peminjaman barang kamu telah disetujui. Silahkan ambil barang sesuai jadwal.',
      time: '1 Weeks ago',
      isRead: false
    },
    {
      id: 2,
      icon: '💬',
      iconBg: '#F44336',
      title: 'Peminjaman Ditolak',
      message: 'Maaf, pengajuan peminjaman barang kamu ditolak oleh admin.',
      time: '1 Weeks ago',
      isRead: false
    },
    {
      id: 3,
      icon: '💬',
      iconBg: '#FFC107',
      title: 'Pengajuan Peminjaman Dikirim',
      message: 'Pengajuan peminjaman barang berhasil dikirim. Silahkan tunggu persetujuan admin.',
      time: '1 Weeks ago',
      isRead: false
    },
    {
      id: 4,
      icon: '💬',
      iconBg: '#4CAF50',
      title: 'Pengembalian Berhasil',
      message: 'Barang telah kamu pinjam. Harap gunakan dengan baik dan kembalikan tepat waktu',
      time: '1 Weeks ago',
      isRead: false
    },
    {
      id: 5,
      icon: '💬',
      iconBg: '#9C27B0',
      title: 'Barang Dipinjam',
      message: 'Barang telah kamu pinjam. Harap gunakan dengan baik dan kembalikan tepat waktu',
      time: '1 Weeks ago',
      isRead: false
    },
    {
      id: 6,
      icon: '💬',
      iconBg: '#FF9800',
      title: 'Penginggat Pengembalian',
      message: 'Waktu pengembalian barang akan segera berakhir. Jangan lupa mengembalikan tepat waktu',
      time: '1 Weeks ago',
      isRead: false
    },
    {
      id: 7,
      icon: '💬',
      iconBg: '#F44336',
      title: 'Peminjaman Terlambat',
      message: 'Masa peminjaman telah lewat. Segera kembalikan barang untuk menghadiri sanksi.',
      time: '1 Weeks ago',
      isRead: false
    }
  ];

  // Pilih notifikasi berdasarkan role
  const initialNotifications = userRole === "Admin" 
    ? adminNotifications 
    : userNotifications;

  const [notifications, setNotifications] = useState(initialNotifications);

  // Handler untuk Mark All as Read
  const handleMarkAllRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  // Handler untuk Delete Notifikasi
  const handleDeleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  // Hitung jumlah notifikasi yang belum dibaca
  const unreadCount = notifications.filter(notif => !notif.isRead).length;

  return (
    <div className="navbar">
      <button className="hamburger-btn" onClick={onMenuToggle}>
        <span className="hamburger-icon">☰</span>
      </button>

      <div className="navbar-right">
        <div className="notification-wrapper">
          <button 
            className="notification-btn"
            onClick={() => setIsNotifOpen(true)}
          >
            <span className="bell-icon">🔔</span>
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </button>
        </div>

        <div className="user-info">
          <div className="user-details">
            <span className="user-name">{userName}</span>
            <span className="user-role">{userRole}</span>
          </div>
          <div className="user-avatar">
            {userAvatar ? (
              <img src={userAvatar} alt={userName} />
            ) : (
              <div className="avatar-placeholder">
                {userName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>
      </div>

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