import React, { useState, useRef, useEffect } from 'react';
import './Usermenu.css';

const Usermenu = ({ userName, userRole, userAvatar, onLogout }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Tutup menu kalau klik di luar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="user-menu" ref={menuRef}>
      <button className="user-menu-trigger" onClick={() => setOpen(!open)}>
        <div className="user-menu-info">
          <span className="user-menu-name">{userName}</span>
          <span className="user-menu-role">{userRole}</span>
        </div>

        {userAvatar ? (
          <img src={userAvatar} alt={userName} className="user-menu-avatar" />
        ) : (
          <div className="user-menu-avatar placeholder">
            {userName.charAt(0).toUpperCase()}
          </div>
        )}
      </button>

      {open && (
        <div className="user-menu-dropdown">
          <a href="/profile" className="user-menu-item">
            Profile
          </a>

          <button
            type="button"
            className="user-menu-item logout"
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                alert('LOGOUT CLICKED'); // 🔥 TES PENTING
                onLogout();
            }}
            >
            Logout
        </button>
        </div>
      )}
    </div>
  );
};

export default Usermenu;
