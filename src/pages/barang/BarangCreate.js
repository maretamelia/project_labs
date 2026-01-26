import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BarangCreate.css'; // import CSS terpisah

function BarangCreate() {
  const navigate = useNavigate();
  const [kategori, setKategori] = useState('');
  const [kodeBarang, setKodeBarang] = useState('');
  const [nama, setNama] = useState('');
  const [stok, setStok] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [gambarFile, setGambarFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [kategoriList, setKategoriList] = useState([]);

  useEffect(() => {
    setKategoriList(['Elektronik', 'Pakaian', 'Aksesoris']);
  }, []);

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
    const formData = { kodeBarang, nama, kategori, stok, deskripsi, gambarFile };
    console.log('Data Barang Baru:', formData);
    alert('Barang berhasil ditambahkan! (sementara di console)');

    // Reset form
    setKodeBarang('');
    setNama('');
    setKategori('');
    setStok('');
    setDeskripsi('');
    setGambarFile(null);
    setPreview(null);

    navigate('/barang');
  };

  return (
    <div className="barang-create-container">
      <h2>Tambah Barang</h2>

      <form onSubmit={handleSubmit} className="barang-form">
        {/* Upload Gambar */}
        <div className="form-group">
          <label>Image</label>
          <label className="image-upload">
            {preview ? (
              <img src={preview} alt="Preview" className="image-preview" />
            ) : (
              <span>Click atau drop file di sini</span>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </label>
        </div>

        {/* Kode Barang */}
        <div className="form-group">
          <label>Kode Barang</label>
          <input
            type="text"
            value={kodeBarang}
            onChange={(e) => setKodeBarang(e.target.value)}
            required
          />
        </div>

        {/* Nama Barang */}
        <div className="form-group">
          <label>Nama Barang</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
          />
        </div>

        {/* Kategori */}
        <div className="form-group">
          <label>Kategori</label>
          <select
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            required
          >
            <option value="">Pilih Kategori</option>
            {kategoriList.map((k, idx) => (
              <option key={idx} value={k}>{k}</option>
            ))}
          </select>
        </div>

        {/* Stok */}
        <div className="form-group">
          <label>Stok</label>
          <input
            type="number"
            value={stok}
            onChange={(e) => setStok(e.target.value)}
            required
          />
        </div>

        {/* Deskripsi */}
        <div className="form-group">
          <label>Deskripsi</label>
          <textarea
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            rows="3"
          />
        </div>

        {/* Tombol Kembali & Simpan */}
        <div className="button-group">
          <button type="button" onClick={() => navigate('/data-barang')} className="btn-back">
            ← Kembali
          </button>
          <button type="submit" className="btn-submit">
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}

export default BarangCreate;
