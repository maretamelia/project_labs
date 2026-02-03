import React from 'react';
import { IoClose } from 'react-icons/io5';
import { FiCalendar } from 'react-icons/fi';
import './DetailPeminjamanAdmin.css';

function DetailPeminjamanAdmin({ isOpen, data, onClose }) {
  if (!isOpen || !data) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">Detail Barang</h2>
          <button className="modal-close-btn" onClick={onClose}>
            <IoClose />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Nama Peminjam */}
          <div className="form-group">
            <label className="form-label">Nama Peminjam</label>
            <input
              type="text"
              className="form-input"
              value={data.namaPeminjam}
              readOnly
            />
          </div>

          {/* Nama Barang */}
          <div className="form-group">
            <label className="form-label">Nama Barang</label>
            <input
              type="text"
              className="form-input"
              value={data.namaBarang}
              readOnly
            />
          </div>

          {/* Jumlah Barang */}
          <div className="form-group">
            <label className="form-label">Jumlah Barang</label>
            <input
              type="number"
              className="form-input"
              value={data.jumlah}
              readOnly
            />
          </div>

          {/* Tanggal Peminjaman dan Kembali */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Tanggal Peminjaman <span className="required"></span>
              </label>
              <div className="form-input-with-icon">
                <FiCalendar />
                <input
                  type="text"
                  className="form-input"
                  value={data.tanggalPinjam}
                  readOnly
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Tanggal Kembali <span className="required"></span>
              </label>
              <div className="form-input-with-icon">
                <FiCalendar />
                <input
                  type="text"
                  className="form-input"
                  value={data.tanggalKembali}
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="form-group">
            <label className="form-label">Status</label>
            <div className="status-display">
              <span className={`status-badge ${data.status.toLowerCase()}`}>
                {data.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPeminjamanAdmin;