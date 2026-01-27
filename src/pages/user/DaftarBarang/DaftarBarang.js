import React, { useState } from 'react';
import './DaftarBarang.css';
import DetailDaftarBarang from './DetailBarang';

function DaftarBarang() {
  const [isDetailPopupOpen, setIsDetailPopupOpen] = useState(false);
  const [selectedBarang, setSelectedBarang] = useState(null);

  // Data dummy
  const barang = [
    { 
      id: 1, 
      nama: 'Arduino UNO', 
      kategori: 'Tersedia', 
      stok: 10,
      kategoriProduk: 'Mikrokontroler',
      lokasi: 'Lab Elektronika - Rak A3',
      kode: 'ARD-001',
      deskripsi: 'Arduino UNO R3 adalah board mikrokontroler berbasis ATmega328P yang sangat populer untuk proyek IoT dan embedded system.'
    },
    { 
      id: 2, 
      nama: 'Breadboard', 
      kategori: 'Kosong', 
      stok: 0,
      kategoriProduk: 'Komponen Elektronik',
      lokasi: 'Lab Elektronika - Rak B2',
      kode: 'BRD-002',
      deskripsi: 'Breadboard 830 titik untuk prototyping rangkaian elektronik tanpa solder.'
    },
    { 
      id: 3, 
      nama: 'Sensor Ultrasonic', 
      kategori: 'Tersedia', 
      stok: 15,
      kategoriProduk: 'Sensor',
      lokasi: 'Lab Elektronika - Rak A5',
      kode: 'SNS-003',
      deskripsi: 'Sensor jarak ultrasonik HC-SR04 untuk mengukur jarak hingga 4 meter.'
    },
    { 
      id: 4, 
      nama: 'LED RGB', 
      kategori: 'Tersedia', 
      stok: 50,
      kategoriProduk: 'Komponen Elektronik',
      lokasi: 'Lab Elektronika - Rak C1',
      kode: 'LED-004',
      deskripsi: 'LED RGB common cathode 5mm untuk indikator warna.'
    },
    { 
      id: 4, 
      nama: 'LED RGB', 
      kategori: 'Tersedia', 
      stok: 50,
      kategoriProduk: 'Komponen Elektronik',
      lokasi: 'Lab Elektronika - Rak C1',
      kode: 'LED-004',
      deskripsi: 'LED RGB common cathode 5mm untuk indikator warna.'
    },
    { 
      id: 4, 
      nama: 'LED RGB', 
      kategori: 'Tersedia', 
      stok: 50,
      kategoriProduk: 'Komponen Elektronik',
      lokasi: 'Lab Elektronika - Rak C1',
      kode: 'LED-004',
      deskripsi: 'LED RGB common cathode 5mm untuk indikator warna.'
    },
    { 
      id: 4, 
      nama: 'LED RGB', 
      kategori: 'Tersedia', 
      stok: 50,
      kategoriProduk: 'Komponen Elektronik',
      lokasi: 'Lab Elektronika - Rak C1',
      kode: 'LED-004',
      deskripsi: 'LED RGB common cathode 5mm untuk indikator warna.'
    },
    { 
      id: 4, 
      nama: 'LED RGB', 
      kategori: 'Tersedia', 
      stok: 50,
      kategoriProduk: 'Komponen Elektronik',
      lokasi: 'Lab Elektronika - Rak C1',
      kode: 'LED-004',
      deskripsi: 'LED RGB common cathode 5mm untuk indikator warna.'
    },
  ];

  const handleLihatDetail = (item) => {
    setSelectedBarang(item);
    setIsDetailPopupOpen(true);
  };

  const handleCloseDetailPopup = () => {
    setIsDetailPopupOpen(false);
    setSelectedBarang(null);
  };

  return (
    <div className="daftar-barang-page">
      {/* HEADER */}
      <div className="daftar-barang-header">
        <h1>Daftar Barang</h1>
        <p>Daftar barang yang tersedia</p>
      </div>

      <div className="barang-grid">
        {barang.map(item => (
          <div key={item.id} className="barang-card">
            <div className="barang-image">
              <p>Gambar {item.nama}</p>
            </div>
            <h3>{item.nama}</h3>
            <p>{item.kategori}</p>
            <p>Stok: {item.stok}</p>
            <button onClick={() => handleLihatDetail(item)}>
              Lihat Detail
            </button>
          </div>
        ))}
      </div>

      <DetailDaftarBarang 
        isOpen={isDetailPopupOpen}
        onClose={handleCloseDetailPopup}
        data={selectedBarang}
      />
    </div>
  );
}

export default DaftarBarang;