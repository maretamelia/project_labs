import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiUpload } from 'react-icons/fi';
import './BarangCreate.css';

function EditBarang() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    nama: '',
    kategori: '',
    kode_barang: '',
    stok: '',
    deskripsi: '',
    image: null
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [tanggalPembuatan, setTanggalPembuatan] = useState('');

  const kategoriOptions = [
    'Mikrokontroler',
    'Sensor',
    'Aktuator',
    'Display',
    'Komunikasi',
    'Power Supply',
    'Lainnya'
  ];

  useEffect(() => {
    // dummy data (nanti ganti API)
    const dummyData = {
      id,
      nama: 'Arduino Uno',
      kategori: 'Mikrokontroler',
      kode_barang: 'MIK-001',
      stok: '15',
      deskripsi: 'Arduino Uno Rev3 dengan ATmega328P',
      image: null,
      tanggalPembuatan: '27/05/2025'
    };

    setFormData({
      nama: dummyData.nama,
      kategori: dummyData.kategori,
      kode_barang: dummyData.kode_barang,
      stok: dummyData.stok,
      deskripsi: dummyData.deskripsi,
      image: dummyData.image
    });

    setTanggalPembuatan(dummyData.tanggalPembuatan);

    if (dummyData.image) {
      setImagePreview(dummyData.image);
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData(prev => ({
      ...prev,
      image: file
    }));

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('DATA UPDATE:', formData);
    // navigate('/data-barang');
  };

  const handleCancel = () => navigate('/data-barang');

  return (
    <div className="tambah-barang-page">
      {/* Header */}
      <div className="tambah-barang-header">
        <h1 className="header-title">Edit Barang</h1>
        <p className="header-subtitle">Edit Daftar Barang</p>
      </div>

      <div className="tambah-barang-container">
        {/* FORM */}
        <div className="form-section">
          <form onSubmit={handleSubmit}>
            {/* Image */}
            <div className="form-group">
              <label className="form-label">Image</label>
              <div className="image-upload-area">
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImageChange}
                  hidden
                />
                <label htmlFor="image-upload" className="upload-label">
                  <FiUpload size={40} />
                  <span>
                    {imagePreview ? 'Click to change image' : 'Click to upload image'}
                  </span>
                </label>
              </div>
            </div>

            {/* Nama */}
            <div className="form-group">
              <label className="form-label">Nama</label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            {/* Kategori */}
            <div className="form-group">
              <label className="form-label">Kategori</label>
              <select
                name="kategori"
                value={formData.kategori}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="">Pilih kategori</option>
                {kategoriOptions.map((kat, i) => (
                  <option key={i} value={kat}>{kat}</option>
                ))}
              </select>
            </div>

            {/* ✅ KODE BARANG */}
            <div className="form-group">
              <label className="form-label">Kode Barang</label>
              <input
                type="text"
                name="kode_barang"
                value={formData.kode_barang}
                onChange={handleInputChange}
                className="form-input"
                placeholder="MIK-001"
                readOnly
              />
            </div>

            {/* Stok */}
            <div className="form-group">
              <label className="form-label">Stok</label>
              <input
                type="number"
                name="stok"
                value={formData.stok}
                onChange={handleInputChange}
                className="form-input"
                min="0"
              />
            </div>

            {/* Deskripsi */}
            <div className="form-group">
              <label className="form-label">Deskripsi</label>
              <textarea
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleInputChange}
                className="form-textarea"
                rows="4"
              />
            </div>

            <div className="form-actions">
              <button type="button" className="btn-cancel" onClick={handleCancel}>
                Batal
              </button>
              <button type="submit" className="btn-submit">
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>

        {/* PREVIEW */}
        <div className="preview-section">
          <div className="preview-label">Preview</div>

          <div className="preview-card">
            <div className="preview-image">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" />
              ) : (
                <div className="preview-placeholder">No Image</div>
              )}
            </div>

            <div className="preview-kode">
              {formData.kode_barang || 'KODE-XXX'}
            </div>

            <div className="preview-stok">
              {formData.stok || 0} Barang
            </div>

            <div className="preview-nama">
              {formData.nama || 'Nama Barang'}
            </div>

            <div className="preview-info">
              <p>Kategori: {formData.kategori || '-'}</p>
              <p>Tanggal: {tanggalPembuatan}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditBarang;
