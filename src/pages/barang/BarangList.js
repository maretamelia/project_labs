import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function BarangList() {
  const [barang, setBarang] = useState([]);

  useEffect(() => {
    // Dummy data dengan URL gambar valid
    setBarang([
      { id: 1, nama: 'Arduino Uno', stok: 25, gambar: 'https://cdn.sparkfun.com/assets/parts/1/1/0/3/7/15853-Arduino_Uno_R3_Front.jpg' },
      { id: 2, nama: 'Breadboard', stok: 30, gambar: 'https://www.electronics-tutorials.ws/io/io_3.jpg' },
      { id: 3, nama: 'Resistor', stok: 100, gambar: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Resistors.jpg' },
    ]);
  }, []);

  // Hapus barang
  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus barang ini?')) {
      setBarang(barang.filter(b => b.id !== id));
    }
  };

  return (
    <div>
      <h2>Daftar Barang</h2>

      {/* Tombol tambah barang */}
      <Link
        to="/barang/create"
        style={{
          marginBottom: '10px',
          display: 'inline-block',
          backgroundColor: '#6B46C1',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '6px',
          textDecoration: 'none',
        }}
      >
        Tambah Barang
      </Link>

      {/* Card per barang */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '10px' }}>
        {barang.map((b) => (
          <div
            key={b.id}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              width: '200px',
              borderRadius: '8px',
              backgroundColor: '#F7FAFC',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Gambar */}
            <img
              src={b.gambar}
              alt={b.nama}
              style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '4px' }}
            />

            {/* Nama */}
            <h3 style={{ margin: '10px 0 5px 0' }}>{b.nama}</h3>

            {/* Stok */}
            <p>Stok: {b.stok}</p>

            {/* Tombol aksi */}
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '10px', gap: '5px' }}>
              {/* Selengkapnya */}
              <Link
                to={`/barang/${b.id}`}
                style={{
                  flex: 1,
                  backgroundColor: '#9F7AEA',
                  color: 'white',
                  textAlign: 'center',
                  padding: '5px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                }}
              >
                Selengkapnya
              </Link>

              {/* Edit */}
              <Link
                to={`/barang/edit/${b.id}`}
                style={{
                  flex: 1,
                  backgroundColor: '#F6AD55',
                  color: 'white',
                  textAlign: 'center',
                  padding: '5px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                }}
              >
                Edit
              </Link>

              {/* Hapus */}
              <button
                onClick={() => handleDelete(b.id)}
                style={{
                  flex: 1,
                  backgroundColor: 'red',
                  color: 'white',
                  border: 'none',
                  padding: '5px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BarangList;
