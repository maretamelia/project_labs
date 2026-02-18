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
            <img src={data?.barang?.gambar || '/placeholder-image.jpg'}
            alt={data?.barang?.nama_barang}
          />
          </div>
          <div className="title-with-badge"></div>
          <div className="product-details">

            <h2 className="product-title">{data?.barang?.nama_barang || 'Nama Barang'}</h2>
            
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
              <span className="value">{data?.barang?.kategori?.nama_kategori || 'Tidak ada kategori'}</span>
            </div>
            
            <div className="detail-row date-wrapper">
            <div className="date-item">
            <span className="icon">🕒</span>
            <span className="label">Tanggal Peminjaman</span>
            <span className="value">
            {data?.tanggal_peminjaman?.split('T')[0] || '-'}
            </span>
        </div>

  <div className="date-item">
    <span className="icon">🕒</span>
    <span className="label">Tanggal Kembali</span>
    <span className="value">
      {data?.tanggal_pengembalian?.split('T')[0] || '-'}
    </span>
      </div>
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