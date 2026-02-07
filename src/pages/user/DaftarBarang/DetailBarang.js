import React from 'react';
import './DetailBarang.css';

const DetailBarang = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  // Helper untuk URL Gambar
  const imageUrl = data?.image 
    ? `http://localhost:8000/storage/${data.image}` 
    : '/placeholder-image.jpg';

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content-detail" onClick={(e) => e.stopPropagation()}>
        
        <div className="detail-header">
          {/* Gunakan nama_barang */}
          <h2 className="detail-title">{data?.nama_barang || 'Nama Barang'}</h2>
        </div>

        <div className="detail-info-row">
          <div className="info-item">
            <span className="info-label">stok :</span>
            <span className="info-value">{data?.stok ?? '0'} pcs</span>
          </div>
          <div className="info-item">
            <span className="info-label">Kategori :</span>
            {/* Menampilkan nama kategori dari relasi (jika ada) */}
            <span className="info-value">{data?.kategori?.nama_kategori || 'Umum'}</span>
          </div>
        </div>

        <div className="detail-image-container">
          <img 
            src={imageUrl} 
            alt={data?.nama_barang}
            className="detail-image"
          />
        </div>

        <div className="detail-description">
          <h3 className="description-title">Deskripsi</h3>
          <p className="description-text">
            {data?.deskripsi || 'Tidak ada deskripsi tersedia untuk barang ini.'}
          </p>
        </div>

        <div className="detail-footer">
          <button className="btn-tutup" onClick={onClose}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailBarang;