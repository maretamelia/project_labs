import React from 'react';
import './SOP.css';

function SOP() {
  // Data Syarat dan Ketentuan Peminjaman
  const syaratPeminjaman = [
    'Siswa harus memiliki akun website peminjaman',
    'Peminjaman hanya dapat dilakukan untuk barang yang stoknya tersedia',
    'Peminjaman harus disetujui admin sebelum barang diambil',
    'Barang dipinjam sesuai tujuan pembelajaran/praktikum',
    'Peminjam bertanggung jawab atas barang yang dipinjam',
    'Keterlambatan pengembalian dapat dikenakan sanksi'
  ];

  // Data Prosedur Peminjaman
  const prosedurPeminjaman = [
    'Siswa login ke website peminjaman laboratorium',
    'Siswa mengakses menu barang untuk melihat stok barang yang tersedia',
    'Siswa memilih barang yang di pinjam',
    'Siswa mengisi formulir peminjaman',
    'Status peminjaman otomatis menjadi menunggu persetujuan admin',
    'Admin menyetujui peminjaman',
    'Status peminjaman berubah menjadi aktif',
    'Siswa mengambil dan menerima barang',
    'Siswa mengembalikan barang ke laboratorium sesuai tanggal pengembalian',
    'Admin melakukan pengecekan kondisi barang',
    'Admin mengonfirmasi pengembalian di website',
    'Status peminjaman berubah menjadi selesai dan stok barang diperbarui'
  ];

  return (
    <div className="sop-page">
      
      {/* Header */}
      <div className="sop-header">
        <h1 className="sop-header-title">STANDART OPERASIONAL PROSEDURE</h1>
        <p className="sop-header-subtitle">Detail Standart Operasional Prosedure</p>
      </div>

      {/* Content Container - 2 Card Terpisah */}
      <div className="sop-content-container">
        
        {/* Card 1: Syarat dan Ketentuan */}
        <div className="sop-content-box">
          <div className="sop-section">
            <h2 className="sop-section-title">SYARAT DAN KETENTUAN PEMINJAMAN</h2>
            <div className="sop-items">
              {syaratPeminjaman.map((item, index) => (
                <div key={index} className="sop-item">
                  <span className="sop-item-number">{index + 1}.</span>
                  <p className="sop-item-text">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 2: Prosedur Peminjaman */}
        <div className="sop-content-box">
          <div className="sop-section">
            <h2 className="sop-section-title">PROSEDUR PEMINJAMAN</h2>
            <div className="sop-items">
              {prosedurPeminjaman.map((item, index) => (
                <div key={index} className="sop-item">
                  <span className="sop-item-number">{index + 1}.</span>
                  <p className="sop-item-text">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default SOP;