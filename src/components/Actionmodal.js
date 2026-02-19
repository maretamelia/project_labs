import React, { useState, useEffect } from 'react';
import './Actionmodal.css';

function ActionModal({ isOpen, onClose, onApply, status, itemData }) {
  const [aksiStatus, setAksiStatus] = useState('');

  // Reset saat modal ditutup / dibuka
  useEffect(() => {
    if (!isOpen) setAksiStatus('');
  }, [isOpen]);

  if (!isOpen) return null;

  const normalizedStatus = status?.toLowerCase();
  const isTerlambat = normalizedStatus === 'terlambat';
  const isDisabled = normalizedStatus === 'disetujui';

  const canApprove = ['pending', 'peminjaman', 'pengembalian', 'terlambat'].includes(normalizedStatus);

  const handleCheckboxChange = (value) => {
    setAksiStatus(aksiStatus === value ? '' : value);
  };

  const handleApply = () => {
    if (!aksiStatus) return;
    // Kirim ke parent function tanpa close modal dulu, parent yang close
    onApply(aksiStatus, itemData);
  };

  const handleReset = () => {
    setAksiStatus('');
  };

  const handleClose = () => {
    setAksiStatus('');
    onClose();
  };

  return (
    <>
      <div className="action-modal-overlay" onClick={handleClose}></div>
      <div className="action-modal">
        <h3 className="action-modal-title">Aksi</h3>

        <div className="action-modal-content">
          <h4 className="action-modal-subtitle">Status</h4>

          <label className={`action-checkbox-label ${isTerlambat ? 'danger' : ''}`}>
            <input
              type="checkbox"
              checked={aksiStatus === 'Diterima'}
              onChange={() => handleCheckboxChange('Diterima')}
              className="action-checkbox-input"
              disabled={isDisabled || !canApprove}
            />
            <span className={`action-checkbox-custom ${aksiStatus === 'Diterima' ? (isTerlambat ? 'checked-danger' : 'checked') : ''}`}>
              {aksiStatus === 'Diterima' && (
                <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
                  <path d="M1 5.5L5 9.5L13 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </span>
            <span className="action-checkbox-text">Diterima</span>
          </label>

          <label className={`action-checkbox-label ${isTerlambat ? 'danger' : ''}`}>
            <input
              type="checkbox"
              checked={aksiStatus === 'Ditolak'}
              onChange={() => handleCheckboxChange('Ditolak')}
              className="action-checkbox-input"
              disabled={isDisabled || !canApprove}
            />
            <span className={`action-checkbox-custom ${aksiStatus === 'Ditolak' ? (isTerlambat ? 'checked-danger' : 'checked') : ''}`}>
              {aksiStatus === 'Ditolak' && (
                <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
                  <path d="M1 5.5L5 9.5L13 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </span>
            <span className="action-checkbox-text">Ditolak</span>
          </label>
        </div>

        <div className="action-modal-buttons">
          <button 
            className="action-btn-reset"
            onClick={handleReset}
          >
            Reset
          </button>
          <button 
            className={`action-btn-apply ${isTerlambat ? 'danger' : ''}`}
            onClick={handleApply}
            disabled={isDisabled || !aksiStatus}
          >
            Apply
          </button>
        </div>
      </div>
    </>
  );
}

export default ActionModal;
