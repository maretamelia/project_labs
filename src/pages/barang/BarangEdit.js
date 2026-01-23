import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function BarangEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [kodeBarang, setKodeBarang] = useState('');
  const [nama, setNama] = useState('');
  const [kategori, setKategori] = useState('');
  const [stok, setStok] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [gambarFile, setGambarFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [kategoriList, setKategoriList] = useState([]);

  useEffect(() => {
    const dummyData = {
      1: {
        kodeBarang: 'ARDU001',
        nama: 'Arduino Uno',
        kategori: 'Elektronik',
        stok: 25,
        deskripsi: 'Mikrokontroler populer untuk pemula dan hobi.',
        gambar: 'https://cdn.sparkfun.com/assets/parts/1/1/0/3/7/15853-Arduino_Uno_R3_Front.jpg',
      },
      2: {
        kodeBarang: 'BREAD001',
        nama: 'Breadboard',
        kategori: 'Elektronik',
        stok: 30,
        deskripsi: 'Papan percobaan untuk rangkaian elektronik.',
        gambar: 'https://www.electronics-tutorials.ws/io/io_3.jpg',
      },
    };

    const barang = dummyData[id];
    if (barang) {
      setKodeBarang(barang.kodeBarang);
      setNama(barang.nama);
      setKategori(barang.kategori);
      setStok(barang.stok);
      setDeskripsi(barang.deskripsi);
      setPreview(barang.gambar);
    }

    setKategoriList(['Elektronik', 'Pakaian', 'Aksesoris']);
  }, [id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
      alert('Ukuran file terlalu besar (max 2MB)');
      return;
    }
    setGambarFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      kodeBarang,
      nama,
      kategori,
      stok,
      deskripsi,
      gambar: gambarFile || preview,
    };
    console.log('Data Barang Terupdate:', formData);
    alert('Barang berhasil diupdate! (sementara di console)');
    navigate('/barang');
  };

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto' }}>
      <h2>Edit Barang</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>

        {/* Upload Gambar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label>Image</label>
          <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '2px dashed #ccc', padding: '20px', borderRadius: '6px', cursor: 'pointer' }}>
            {preview ? (
              <img src={preview} alt="Preview" style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '6px' }} />
            ) : (
              <span>Click atau drop file di sini</span>
            )}
            <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
          </label>
        </div>

        {/* Kode Barang */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label>Kode Barang</label>
          <input
            type="text"
            value={kodeBarang}
            onChange={(e) => setKodeBarang(e.target.value)}
            required
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        {/* Nama Barang */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label>Nama Barang</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        {/* Kategori */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label>Kategori</label>
          <select
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            required
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="">Pilih Kategori</option>
            {kategoriList.map((k, idx) => (
              <option key={idx} value={k}>{k}</option>
            ))}
          </select>
        </div>

        {/* Stok */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label>Stok</label>
          <input
            type="number"
            value={stok}
            onChange={(e) => setStok(e.target.value)}
            required
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        {/* Deskripsi */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label>Deskripsi</label>
          <textarea
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            rows="3"
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <button
          type="submit"
          style={{ backgroundColor: '#6B46C1', color: 'white', padding: '10px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default BarangEdit;
