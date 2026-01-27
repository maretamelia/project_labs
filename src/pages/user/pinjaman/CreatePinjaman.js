import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreatePinjaman.css';
import { FiCalendar } from 'react-icons/fi';

function CreatePinjaman() {
  const navigate = useNavigate();

  // State untuk form
  const [formData, setFormData] = useState({
    namaBarang: '',
    kategori: '',
    jumlah: '',
    tanggalPinjam: '',
    tanggalKembali: '',
    keterangan: ''
  });

  // State untuk preview
  const [previewData, setPreviewData] = useState(null);

  // Dummy data kategori - nanti bisa diganti dari API
  const kategoriOptions = [
    'Elektronik',
    'Mikrokontroler',
    'Alat Tulis',
    'Peralatan Lab',
    'Audio Visual'
  ];

  // Handle perubahan input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Update preview secara real-time
    updatePreview({
      ...formData,
      [name]: value
    });
  };

  // Update preview
  const updatePreview = (data) => {
    if (data.namaBarang || data.kategori || data.tanggalPinjam || data.tanggalKembali) {
      setPreviewData(data);
    } else {
      setPreviewData(null);
    }
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi form
    if (!formData.namaBarang || !formData.kategori || !formData.jumlah || 
        !formData.tanggalPinjam || !formData.tanggalKembali) {
      alert('Mohon lengkapi semua field yang wajib diisi!');
      return;
    }

    // Validasi tanggal
    if (new Date(formData.tanggalPinjam) >= new Date(formData.tanggalKembali)) {
      alert('Tanggal kembali harus lebih besar dari tanggal peminjaman!');
      return;
    }

    // Kirim data ke API atau proses lebih lanjut
    console.log('Form submitted:', formData);
    
    // Redirect ke halaman peminjaman saya
    alert('Peminjaman berhasil dibuat!');
    navigate('/user/pinjamansaya');
  };

  // Handle batal
  const handleBatal = () => {
    if (window.confirm('Apakah Anda yakin ingin membatalkan? Data yang sudah diisi akan hilang.')) {
      navigate('/user/pinjamansaya');
    }
  };

  return (
    <div className="create-pinjaman-page">
      {/* Header */}
      <div className="create-pinjaman-header">
        <h1 className="create-pinjaman-title">Create Peminjaman</h1>
        <p className="create-pinjaman-subtitle">Tambah data peminjaman</p>
      </div>

      {/* Content Container */}
      <div className="create-pinjaman-content">
        {/* Form Section */}
        <div className="form-section">
          <div className="form-card">
            <div className="form-card-header">
              <h2 className="form-card-title">Data Produk Pinjaman</h2>
              <p className="form-card-subtitle">Tambah data peminjaman</p>
            </div>

            <form onSubmit={handleSubmit} className="peminjaman-form">
              {/* Nama Barang & Kategori */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="namaBarang">
                    Nama Barang <span className="required"></span>
                  </label>
                  <input
                    type="text"
                    id="namaBarang"
                    name="namaBarang"
                    value={formData.namaBarang}
                    onChange={handleInputChange}
                    placeholder="Masukkan nama barang"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="kategori">
                    Kategori barang <span className="required"></span>
                  </label>
                  <select
                    id="kategori"
                    name="kategori"
                    value={formData.kategori}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Pilih kategori</option>
                    {kategoriOptions.map((kat, index) => (
                      <option key={index} value={kat}>
                        {kat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Jumlah Barang & Tanggal */}
              <div className="form-row date-row">
                <div className="form-group">
                  <label htmlFor="jumlah">
                    Jumlah Barang <span className="required"></span>
                  </label>
                  <input
                    type="number"
                    id="jumlah"
                    name="jumlah"
                    value={formData.jumlah}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="1"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="tanggalPinjam">
                    Tanggal Peminjaman <span className="required"></span>
                  </label>
                  <div className="input-with-icon">
                    <FiCalendar className="input-icon" />
                    <input
                      type="date"
                      id="tanggalPinjam"
                      name="tanggalPinjam"
                      value={formData.tanggalPinjam}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="tanggalKembali">
                    Tanggal Kembali <span className="required"></span>
                  </label>
                  <div className="input-with-icon">
                    <FiCalendar className="input-icon" />
                    <input
                      type="date"
                      id="tanggalKembali"
                      name="tanggalKembali"
                      value={formData.tanggalKembali}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Keterangan */}
              <div className="form-group full-width">
                <label htmlFor="keterangan">Keterangan</label>
                <textarea
                  id="keterangan"
                  name="keterangan"
                  value={formData.keterangan}
                  onChange={handleInputChange}
                  placeholder="Tambahkan keterangan (opsional)"
                  rows="4"
                />
              </div>

              {/* Action Buttons */}
              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn-batal"
                  onClick={handleBatal}
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="btn-simpan"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Preview Section */}
        <div className="preview-section">
          <div className="preview-card">
            <div className="preview-header">
              <h3>Preview</h3>
            </div>

            <div className="preview-content">
              {previewData && (previewData.namaBarang || previewData.kategori) ? (
                <>
                  {/* Preview Image Placeholder */}
                  <div className="preview-image">
                    <div className="preview-image-placeholder">
                      <span className="preview-rating">0 Barang</span>
                    </div>
                  </div>

                  {/* Preview Info */}
                  <div className="preview-info">
                    <h4 className="preview-nama">
                      {previewData.namaBarang || 'Nama Barang'}
                    </h4>
                    
                    <div className="preview-detail">
                      <span className="preview-label">Kategori:</span>
                      <span className="preview-value">
                        {previewData.kategori || '-'}
                      </span>
                    </div>

                    <div className="preview-detail">
                      <span className="preview-label">Tanggal Peminjaman:</span>
                      <span className="preview-value">
                        {previewData.tanggalPinjam || '-'}
                      </span>
                    </div>

                    <div className="preview-detail">
                      <span className="preview-label">Tanggal Pengembalian:</span>
                      <span className="preview-value">
                        {previewData.tanggalKembali || '-'}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="preview-empty">
                  <p>Preview akan muncul di sini</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePinjaman;