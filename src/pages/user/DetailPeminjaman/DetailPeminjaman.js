import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DetailPeminjaman.css';

function DetailPeminjaman() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Data dummy lengkap (nanti dari API)
  const allPeminjamanData = [
    {
      id: 1,
      namaBarang: 'Proyektor',
      gambar: 'https://topmultimedia.net/wp-content/uploads/2020/04/EB-2055_01-980x654.png',
      jumlah: 1,
      tanggalPinjam: '13 Mei 2025',
      tanggalKembali: '15 Mei 2025',
      status: 'Ditolak',
      keterangan: 'Digunakan untuk keperluan presentasi kelas'
    },
    {
      id: 2,
      namaBarang: 'Laptop',
      gambar: 'https://via.placeholder.com/400x400/f5f5f5/666?text=Laptop',
      jumlah: 1,
      tanggalPinjam: '10 Mei 2025',
      tanggalKembali: '12 Mei 2025',
      status: 'Selesai',
      keterangan: 'Digunakan untuk pengerjaan tugas akhir'
    },
    {
      id: 3,
      namaBarang: 'Kamera',
      gambar: 'https://via.placeholder.com/400x400/f5f5f5/666?text=Kamera',
      jumlah: 2,
      tanggalPinjam: '08 Mei 2025',
      tanggalKembali: '10 Mei 2025',
      status: 'Selesai',
      keterangan: 'Digunakan untuk dokumentasi acara kampus'
    },
    {
      id: 4,
      namaBarang: 'Speaker',
      gambar: 'https://via.placeholder.com/400x400/f5f5f5/666?text=Speaker',
      jumlah: 1,
      tanggalPinjam: '06 Mei 2025',
      tanggalKembali: '08 Mei 2025',
      status: 'Selesai',
      keterangan: 'Digunakan untuk seminar online'
    }
  ];

  // Cari data berdasarkan ID dari URL
  const detailPinjaman = allPeminjamanData.find(
    item => item.id === parseInt(id)
  );

  // Jika data tidak ditemukan, redirect atau tampilkan error
  if (!detailPinjaman) {
    return (
      <div className="detail-peminjaman-page">
        <div className="detail-header">
          <h1>Detail Peminjaman</h1>
          <p>Detail Peminjaman</p>
        </div>
        <div className="detail-card">
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <h3>Data tidak ditemukan</h3>
            <button className="btn-batal" onClick={() => navigate(-1)}>
              Kembali
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getStatusClass = (status) => {
    return status.toLowerCase();
  };

  const handleBatal = () => {
    navigate(-1);
  };

  return (
    <div className="detail-peminjaman-page">
      <div className="detail-headers">
        <h1>Detail Peminjaman</h1>
        <p>Detail Peminjaman</p>
      </div>

      <div className="detail-card">
        <div className="detail-content">
          <div className="detail-image-section">
            <div className="image-wrapper">
              <img 
                src={detailPinjaman.gambar} 
                alt={detailPinjaman.namaBarang}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/400x400/f5f5f5/666?text=No+Image';
                }}
              />
            </div>
          </div>

          <div className="detail-info-section">
            <div className="info-row">
              <span className="info-label">Nama Barang :</span>
              <span className="info-value">{detailPinjaman.namaBarang}</span>
            </div>

            <div className="info-row">
              <span className="info-label">Jumlah Barang :</span>
              <span className="info-value">{detailPinjaman.jumlah}</span>
            </div>

            <div className="info-row">
              <span className="info-label">Tanggal Peminjaman :</span>
              <span className="info-value">{detailPinjaman.tanggalPinjam}</span>
            </div>

            <div className="info-row">
              <span className="info-label">Tanggal Kembali :</span>
              <span className="info-value">{detailPinjaman.tanggalKembali}</span>
            </div>

            <div className="info-row">
              <span className="info-label">Status :</span>
              <span className={`status-badge ${getStatusClass(detailPinjaman.status)}`}>
                {detailPinjaman.status}
              </span>
            </div>

            <div className="info-row">
              <span className="info-label">Keterangan :</span>
              <span className="info-value">{detailPinjaman.keterangan}</span>
            </div>
          </div>
        </div>

        <div className="detail-footer">
          <button className="btn-batal" onClick={handleBatal}>
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailPeminjaman;