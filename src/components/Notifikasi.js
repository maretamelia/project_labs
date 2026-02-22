import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Notifikasi.css';

const Notifikasi = ({ isOpen, onClose, notifications = [], onMarkAllRead, onDeleteNotification }) => {
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [notifToDelete, setNotifToDelete] = useState(null);

  React.useEffect(() => {
    if (!isOpen) {
      setOpenMenuId(null);
      setShowDeleteConfirm(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleMenuToggle = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleLihatDetail = () => {
    setOpenMenuId(null);
    navigate('/user/pinjamansaya');
    onClose();

  };

  const handleHapusClick = (id) => {
    setNotifToDelete(id);
    setShowDeleteConfirm(true);
    setOpenMenuId(null); 
  };

  const handleConfirmDelete = async () => {
    if (onDeleteNotification) {
      await onDeleteNotification(notifToDelete);
    }
    setShowDeleteConfirm(false);
    setNotifToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setNotifToDelete(null);
  };

  return (
    <div className="notifikasi-overlay" onClick={onClose}>
      <div className="notifikasi-panel" onClick={(e) => e.stopPropagation()}>
        
        <div className="notifikasi-header">
          <div className="header-title">
            <h2>Notifications</h2>
            <span className="notif-badge">{notifications.length}</span>
          </div>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="notifikasi-tabs">
          <button className="tab-btn active">Baru</button>
        </div>

        <div className="notifikasi-list">
          {notifications.length === 0 ? (
            <div className="empty-notif">
              <p>Tidak ada notifikasi</p>
            </div>
          ) : (
            notifications.map(notif => (
              <div key={notif.id} className="notif-item">
                <div className="notif-icon" style={{ backgroundColor: notif.title.includes('Terlambat') || notif.title.includes('Menolak') ? '#F44336' : '#2196F3' }}>
                  {notif.title.includes('Terlambat') || notif.title.includes('Menolak') ? '⚠️' : '🔔'}
                </div>
                <div className="notif-content">
                  <h3 className="notif-title">{notif.title}</h3>
                  <p className="notif-message">{notif.body}</p>
                </div>
                <div className="notif-meta">
                  <span className="notif-time">{new Date(notif.created_at).toLocaleString()}</span>
                  <div className="notif-options-wrapper">
                    <button 
                      className="notif-options"
                      onClick={() => handleMenuToggle(notif.id)}
                    >
                      ⋮
                    </button>
                    
                    {openMenuId === notif.id && (
                      <div className="notif-dropdown-menu">
                        <button 
                          className="menu-item"
                          onClick={() => handleHapusClick(notif.id)}
                        >
                          Hapus Pembaruan
                        </button>
                        <button 
                          className="menu-item"
                          onClick={handleLihatDetail}
                        >
                          Lihat Detail
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {notifications.length > 0 && (
          <div className="notifikasi-footer">
            <button className="btn-mark-read" onClick={onMarkAllRead}>
              ✓ Mark all as read
            </button>
          </div>
        )}

        {showDeleteConfirm && (
          <div className="delete-confirm-overlay" onClick={handleCancelDelete}>
            <div className="delete-confirm-box" onClick={(e) => e.stopPropagation()}>
              <h3>Hapus Notifikasi?</h3>
              <p>Apakah Anda yakin ingin menghapus notifikasi ini?</p>
              <div className="confirm-buttons">
                <button className="btn-cancel" onClick={handleCancelDelete}>
                  Batal
                </button>
                <button className="btn-confirm" onClick={handleConfirmDelete}>
                  Hapus
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifikasi;