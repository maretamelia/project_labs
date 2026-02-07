import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getBarang } from '../../services/barangservices';
import './BarangDetail.css';

function BarangDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [barang, setBarang] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await getBarang(id);
        const data = response.data.data || response.data;
        setBarang(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching detail:", error);
        alert("Gagal memuat detail barang.");
        navigate('/data-barang');
      }
    };
    fetchDetail();
  }, [id, navigate]);

  if (loading) return <div className="loading-state"><p>Memuat data barang...</p></div>;
  if (!barang) return <p className="error-state">Barang tidak ditemukan</p>;

  return (
    <div className="barang-detail-container">
      <h2>Detail: {barang.nama_barang}</h2>

      <div className="image-section">
        {barang.image ? (
          <img 
            src={`http://localhost:8000/storage/${barang.image}`} 
            alt={barang.nama_barang} 
            className="barang-image"
          />
        ) : (
          <div className="no-image">No Image Available</div>
        )}
      </div>

      <div className="barang-info">
        <p><strong>Kode Barang</strong> <span>{barang.kode_barang || '-'}</span></p>
        <p><strong>Nama Barang</strong> <span>{barang.nama_barang}</span></p>
        <p><strong>Kategori</strong> <span>{barang.kategori?.nama_kategori || 'Tanpa Kategori'}</span></p>
        <p><strong>Stok</strong> <span className="stok-badge">{barang.stok} Unit</span></p>
        <p><strong>Tanggal Input</strong> <span>{barang.created_at ? new Date(barang.created_at).toLocaleDateString('id-ID') : '-'}</span></p>
        
        <div className="deskripsi-section">
            <strong>Deskripsi</strong>
            <p>{barang.deskripsi || 'Tidak ada deskripsi.'}</p>
        </div>
      </div>

      <Link to="/data-barang" className="btn-back">
        ← Kembali ke Daftar
      </Link>
    </div>
  );
}

export default BarangDetail;