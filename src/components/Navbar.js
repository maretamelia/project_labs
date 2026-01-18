import React, { useState } from 'react';
import './Navbar.css';

function Navbar({ userName = "Grisella", userRole = "Admin", userAvatar, onMenuToggle }) {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="navbar">
      {/* Hamburger Menu - Klik buat toggle sidebar */}
      <button className="hamburger-btn" onClick={onMenuToggle}>
        <span className="hamburger-icon">☰</span>
      </button>

      {/* Right Side - Notification & User */}
      <div className="navbar-right">
        {/* Notification Bell */}
        <div className="notification-wrapper">
          <button 
            className="notification-btn"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <span className="bell-icon">🔔</span>
            <span className="notification-badge"></span>
          </button>
          
          {/* Dropdown Notifikasi (Optional) */}
          {showNotifications && (
            <div className="notification-dropdown">
              <div className="notification-header">Notifikasi</div>
              <div className="notification-item">
                <p>Tidak ada notifikasi baru</p>
              </div>
            </div>
          )}
        </div>

        {/* User Info */}
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
    </div>
  );
}

export default Navbar;