import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BarangCreate.css'; // pakai CSS yang sama dengan BarangCreate

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
    const formData = { kodeBarang, nama, kategori, stok, deskripsi, gambar: gambarFile || preview };
    console.log('Data Barang Terupdate:', formData);
    alert('Barang berhasil diupdate! (sementara di console)');
    navigate('/data-barang');
  };

  return (
    <div className="barang-create-container">
      <h2>Edit Barang</h2>
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
            <input type="file" accept="image/*" onChange={handleFileChange} />
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

        {/* Tombol Kembali & Update */}
        <div className="button-group">
          <button type="button" onClick={() => navigate('/data-barang')} className="btn-back">
            ← Kembali
          </button>
          <button type="submit" className="btn-submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default BarangEdit;
