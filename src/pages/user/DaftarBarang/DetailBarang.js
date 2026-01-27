import React from 'react';
import './DetailBarang.css';

const DetailBarang = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content-detail" onClick={(e) => e.stopPropagation()}>
        
        <div className="detail-header">
          <h2 className="detail-title">{data?.nama || 'Nama Barang'}</h2>
        </div>

        <div className="detail-info-row">
          <div className="info-item">
            <span className="info-label">stok :</span>
            <span className="info-value">{data?.stok || '0'} pcs</span>
          </div>
          <div className="info-item">
            <span className="info-label">kategori produk :</span>
            <span className="info-value">{data?.kategoriProduk || '-'}</span>
          </div>
        </div>

        <div className="detail-image-container">
          <img 
            src={data?.gambar || '/placeholder-image.jpg'} 
            alt={data?.nama}
            className="detail-image"
          />
        </div>

        <div className="detail-description">
          <h3 className="description-title">Deskripsi</h3>
          <p className="description-text">
            {data?.deskripsi || 'Tidak ada deskripsi'}
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