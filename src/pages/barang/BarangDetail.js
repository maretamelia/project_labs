import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function BarangDetail() {
  const { id } = useParams();
  const [barang, setBarang] = useState(null);

  useEffect(() => {
    const dummyData = {
      1: { 
        nama: 'Arduino Uno', 
        kategori: 'Elektronik', 
        stokTersedia: 20, 
        stokDipinjam: 5,
        deskripsi: 'Mikrokontroler populer untuk pemula dan hobi.',
        tanggalDibuat: '2025-01-15',
        gambar: 'https://cdn.sparkfun.com/assets/parts/1/1/0/3/7/15853-Arduino_Uno_R3_Front.jpg',
        gambarName: 'arduino_uno.jpg'
      },
      2: { 
        nama: 'Breadboard', 
        kategori: 'Elektronik', 
        stokTersedia: 30, 
        stokDipinjam: 0,
        deskripsi: 'Papan percobaan untuk rangkaian elektronik.',
        tanggalDibuat: '2025-01-20',
        gambar: 'https://www.electronics-tutorials.ws/io/io_3.jpg',
        gambarName: 'breadboard.jpg'
      },
    };

    const numericId = parseInt(id);
    setBarang(dummyData[numericId] || null);
  }, [id]);

  if (!barang) return <p>Barang tidak ditemukan</p>;

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>{barang.nama}</h2>

      {/* Gambar */}
      {barang.gambar && (
        <img 
          src={barang.gambar} 
          alt={barang.nama} 
          style={{ width: '300px', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '15px' }}
        />
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <p><strong>Nama Gambar:</strong> {barang.gambarName}</p>
        <p><strong>Nama Barang:</strong> {barang.nama}</p>
        <p><strong>Stok Tersedia:</strong> {barang.stokTersedia}</p>
        <p><strong>Stok Dipinjam:</strong> {barang.stokDipinjam}</p>
        <p><strong>Tanggal Dibuat:</strong> {barang.tanggalDibuat}</p>
        <p><strong>Deskripsi:</strong> {barang.deskripsi}</p>
      </div>

      <Link 
        to="/barang" 
        style={{ marginTop: '20px', display: 'inline-block', backgroundColor: '#6B46C1', color: 'white', padding: '8px 12px', borderRadius: '6px', textDecoration: 'none' }}
      >
        Kembali
      </Link>
    </div>
  );
}

export default BarangDetail;
