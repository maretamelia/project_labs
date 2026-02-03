import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CreatePinjaman.css';
import { FiCalendar } from 'react-icons/fi';

function CreatePinjaman() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedBarang = location.state?.selectedBarang;

  // State untuk form
  const [formData, setFormData] = useState({
    namaBarang: '',
    kategori: '',
    barangId: '',
    jumlah: '',
    tanggalPinjam: '',
    tanggalKembali: '',
    keterangan: ''
  });

  // State untuk error form
  const [errors, setErrors] = useState({
    jumlah: ''
  });

  // Populate form dengan data barang yang dipilih dari modal
  useEffect(() => {
    if (selectedBarang) {
      console.log('Data barang diterima:', selectedBarang);
      setFormData(prev => ({
        ...prev,
        namaBarang: selectedBarang.namaBarang || '',
        kategori: selectedBarang.kategori || '',
        barangId: selectedBarang.id || ''
      }));
    }
  }, [selectedBarang]);

  // Handle perubahan input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error jika ada
    if (name === 'jumlah') {
      setErrors(prev => ({
        ...prev,
        jumlah: ''
      }));
    }
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi form
    if (!formData.barangId || !formData.jumlah || 
        !formData.tanggalPinjam || !formData.tanggalKembali) {
      alert('Mohon lengkapi semua field yang wajib diisi!');
      return;
    }

    // Validasi jumlah barang
    if (formData.jumlah < 1) {
      setErrors(prev => ({
        ...prev,
        jumlah: 'Jumlah barang harus diisi'
      }));
      return;
    }

    // Validasi tanggal
    if (new Date(formData.tanggalPinjam) >= new Date(formData.tanggalKembali)) {
      alert('Tanggal kembali harus lebih besar dari tanggal peminjaman!');
      return;
    }

    // Kirim data ke API
    submitPinjaman();
  };

  // Fungsi submit peminjaman
  const submitPinjaman = async () => {
    try {
      const response = await fetch('/api/peminjaman', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          barangId: formData.barangId,
          jumlah: formData.jumlah,
          tanggalPinjam: formData.tanggalPinjam,
          tanggalKembali: formData.tanggalKembali,
          keterangan: formData.keterangan
        })
      });

      if (!response.ok) {
        throw new Error('Gagal membuat peminjaman');
      }

      const result = await response.json();
      console.log('Peminjaman berhasil dibuat:', result);
      
      // Redirect ke halaman peminjaman saya
      alert('Peminjaman berhasil dibuat!');
      navigate('/user/pinjamansaya');
    } catch (err) {
      console.error('Error submitting peminjaman:', err);
      alert('Gagal membuat peminjaman: ' + err.message);
    }
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

      {/* Main Content */}
      <div className="create-pinjaman-container">
        {/* Form Card */}
        <div className="form-card">
          {/* Card Header */}
          <div className="form-card-header">
            <h2 className="form-card-title">Data Produk Pinjaman</h2>
            <p className="form-card-subtitle">Tambah data peminjaman</p>
          </div>

          {/* Kategori Bar - Preview dari barang yang dipilih */}
          {formData.kategori && (
            <div className="kategori-bar">
              <div className="kategori-item">
                <div className="kategori-icon">📦</div>
                <span className="kategori-label">Kategori:</span>
                <span className="kategori-value">{formData.kategori}</span>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="peminjaman-form">
            {/* Row 1: Jumlah & Tanggal - 3 Kolom */}
            <div className="form-row-three-col">
              <div className="form-group">
                <label htmlFor="jumlah">
                  Jumlah Barang <span className="required">*</span>
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
                {errors.jumlah && (
                  <span className="error-message">{errors.jumlah}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="tanggalPinjam">
                  Tanggal Peminjaman <span className="required">*</span>
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
                  Tanggal Kembali <span className="required">*</span>
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

            {/* Row 2: Keterangan - Full Width */}
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
    </div>
  );
}

export default CreatePinjaman;