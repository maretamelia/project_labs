import React from 'react';
import './DetailPinjaman.css';

const DetailPinjaman = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  const getStatusClass = (status) => {
    if (!status) return '';
    return status.toLowerCase();
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="popup-body">
          <div className="product-image">
            <img src={data?.gambar || '/placeholder-image.jpg'} alt={data?.nama} />
          </div>
          <div className="title-with-badge"></div>
          <div className="product-details">

            <h2 className="product-title">{data?.nama || 'Nama Barang'}</h2>
            
            <span className={`status-badge ${getStatusClass(data?.status)}`}>
              {data?.status || 'Menunggu'}
            </span>
            
            <div className="detail-row">
              <span className="icon">📦</span>
              <span className="label">Jumlah:</span>
              <span className="value">{data?.jumlah || '0'} pcs</span>
            </div>
            
            <div className="detail-row">
              <span className="icon">🏷️</span>
              <span className="label">Kategori Produk:</span>
              <span className="value">{data?.kategori || 'Tidak ada kategori'}</span>
            </div>
            
            <div className="detail-row">
              <span className="icon">🕒</span>
              <span className="label">Tanggal peminjaman</span>
              <span className="icon">🕒</span>
              <span className="label">Tanggal Kembali</span>
            </div>
            
            <div className="date-row">
              <span className="date">{data?.tanggalPinjam || '-'}</span>
              <span className="date">{data?.tanggalKembali || '-'}</span>
            </div>
            
            <div className="description-section">
              <p className="description-label">Keterangan:</p>
              <p className="description-text">
                {data?.keterangan || 'Tidak ada keterangan'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPinjaman;