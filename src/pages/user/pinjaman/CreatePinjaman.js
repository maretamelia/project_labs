import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CreatePinjaman.css';
import { createPinjaman } from '../../../services/pinjamanServices';

function CreatePinjaman() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedBarang = location.state?.selectedBarang;

  const [formData, setFormData] = useState({
    namaBarang: '',
    kategori: '',
    barang_id: '',
    jumlah: '',
    tanggal_peminjaman: '',
    tanggal_pengembalian: '',
    keterangan: ''
  });

  const [errors, setErrors] = useState({ jumlah: '' });
  const [loading, setLoading] = useState(false);

  // Populate form data
  useEffect(() => {
    if (!selectedBarang) return;
    setFormData(prev => ({
      ...prev,
      namaBarang: selectedBarang.nama_barang ?? selectedBarang.nama ?? '',
      kategori: selectedBarang.kategori ?? '',
      barang_id: selectedBarang.barang_id ?? ''
    }));
  }, [selectedBarang]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'jumlah') {
      setErrors(prev => ({ ...prev, jumlah: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi wajib
    if (
      !formData.barang_id ||
      !formData.jumlah||
      !formData.tanggal_peminjaman ||
      !formData.tanggal_pengembalian
    ) {
      alert('Mohon lengkapi semua field yang wajib diisi!');
      return;
    }

    // Validasi jumlah
    if (Number(formData.jumlah) < 1) {
      setErrors(prev => ({ ...prev, jumlah: 'Jumlah barang harus lebih dari 0' }));
      return;
    }

    // Validasi tanggal
    if (new Date(formData.tanggal_pengembalian) < new Date(formData.tanggal_peminjaman)) {
      alert('Tanggal kembali tidak boleh sebelum tanggal peminjaman!');
      return;
    }

    submitPinjaman();
  };

  const submitPinjaman = async () => {
    setLoading(true);
    try {
      await createPinjaman({
        barang_id: formData.barang_id,
        jumlah: formData.jumlah,
        tanggal_peminjaman: formData.tanggal_peminjaman,
        tanggal_pengembalian: formData.tanggal_pengembalian,
        keterangan: formData.keterangan,
      });

      alert('Peminjaman berhasil dibuat!');
      navigate('/user/PinjamanSaya');
    } catch (err) {
      console.error('Gagal membuat peminjaman:', err);
      alert(err.response?.data?.message || 'Gagal membuat peminjaman');
    } finally {
      setLoading(false);
    }
  };

  const handleBatal = () => {
    if (window.confirm('Apakah Anda yakin ingin membatalkan? Data yang sudah diisi akan hilang.')) {
      navigate('/user/PinjamanSaya');
    }
  };

  return (
    <div className="create-pinjaman-page">
      <div className="create-pinjaman-header">
        <h1 className="create-pinjaman-title">Create Peminjaman</h1>
        <p className="create-pinjaman-subtitle">Tambah data peminjaman</p>
      </div>

      <div className="create-pinjaman-container">
        <div className="form-card">
          <div className="form-card-header">
            <h2 className="form-card-title">Data Produk Pinjaman</h2>
            <p className="form-card-subtitle">Tambah data peminjaman</p>
          </div>

          {formData.kategori && (
            <div className="kategori-bar">
              <div className="kategori-item">
                <div className="kategori-icon">📦</div>
                <span className="kategori-label">Kategori:</span>
                <span className="kategori-value">{formData.kategori}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="peminjaman-form">
            <div className="form-group full-width">
              <label>Nama Barang</label>
              <input 
                type="text" 
                value={selectedBarang?.nama_barang ?? ''} 
                readOnly 
                className="readonly-input"
              />
            </div>

            <div className="form-row-three-col">
              <div className="form-group">
                <label>Jumlah Barang <span className="required">*</span></label>
                <input
                  type="number"
                  name="jumlah"
                  value={formData.jumlah}
                  onChange={handleInputChange}
                  min="1"
                  required
                />
                {errors.jumlah && (
                  <span className="error-message">{errors.jumlah}</span>
                )}
              </div>

              <div className="form-group">
                <label>Tanggal Peminjaman <span className="required">*</span></label>
                <input
                  type="date"
                  name="tanggal_peminjaman"
                  value={formData.tanggal_peminjaman}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Tanggal Kembali <span className="required">*</span></label>
                <input
                  type="date"
                  name="tanggal_pengembalian"
                  value={formData.tanggal_pengembalian}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label>Keterangan</label>
              <textarea
                name="keterangan"
                value={formData.keterangan}
                onChange={handleInputChange}
                rows="4"
              />
            </div>

            <div className="form-actions">
              <button type="button" className="btn-batal" onClick={handleBatal}>
                Batal
              </button>
              <button type="submit" className="btn-simpan" disabled={loading}>
                {loading ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePinjaman;
