import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUpload } from 'react-icons/fi';
import './BarangCreate.css';



function TambahBarang() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama: '',
    kategori: '',
    kode_barang: '',
    stok: '',
    deskripsi: '',
    image: null
  });

  const [imagePreview, setImagePreview] = useState(null);

  const kategoriOptions = [
    'Mikrokontroler',
    'Sensor',
    'Aktuator',
    'Display',
    'Komunikasi',
    'Power Supply',
    'Lainnya'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (name === 'kategori') {
        return {
          ...prev,
          kategori: value,
          kode_barang: value
            ? value.substring(0, 3).toUpperCase() + '-001'
            : ''
        };
      }

      return {
        ...prev,
        [name]: value
      };
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      image: file
    }));

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('DATA BARANG:', formData);
    // nanti sambung ke API
    // navigate('/data-barang');
  };

  const handleCancel = () => navigate('/data-barang');

  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="tambah-barang-page">
      {/* ===== HEADER ===== */}
      <div className="tambah-barang-header">
        <h1 className="header-title">Tambah Barang</h1>
        <p className="header-subtitle">Tambah Data Barang</p>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="tambah-barang-container">
        {/* ===== FORM ===== */}
        <div className="form-section">
          <form onSubmit={handleSubmit}>
            {/* Image */}
            <div className="form-group">
              <label className="form-label">
                Image 
              </label>
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
                  <span>Click to upload image</span>
                </label>
              </div>
            </div>

            {/* Nama */}
            <div className="form-group">
              <label className="form-label">
                Nama
              </label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Masukkan nama barang"
              />
            </div>

            {/* Kategori */}
            <div className="form-group">
              <label className="form-label">
                Kategori 
              </label>
              <select
                name="kategori"
                value={formData.kategori}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="">Pilih kategori</option>
                {kategoriOptions.map((kat, i) => (
                  <option key={i} value={kat}>
                    {kat}
                  </option>
                ))}
              </select>
            </div>

            {/* Kode Barang */}
            <div className="form-group">
              <label className="form-label">
                Kode Barang 
              </label>
              <input
                type="text"
                name="kode_barang"
                value={formData.kode_barang}
                onChange={handleInputChange}
                className="form-input"
                placeholder="BRG-001"
              />
            </div>

            {/* Stok */}
            <div className="form-group">
              <label className="form-label">
                Stok 
              </label>
              <input
                type="number"
                name="stok"
                value={formData.stok}
                onChange={handleInputChange}
                className="form-input"
                min="0"
                placeholder="0"
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

            {/* BUTTON */}
            <div className="form-actions">
              <button type="button" className="btn-cancel" onClick={handleCancel}>
                Batal
              </button>
              <button type="submit" className="btn-submit">
                Simpan
              </button>
            </div>
          </form>
        </div>

        {/* ===== PREVIEW ===== */}
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
              <p>Tanggal: {getCurrentDate()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TambahBarang;
