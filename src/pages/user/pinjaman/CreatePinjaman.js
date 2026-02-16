import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CreatePinjaman.css';
import { FiCalendar } from 'react-icons/fi';
import { createPinjaman } from '../../../services/pinjamanServices';

function CreatePinjaman() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedBarang = location.state?.selectedBarang;

  // State untuk form
  const [formData, setFormData] = useState({
    namaBarang: '',
    kategori: '',
    barang_id: '',
    jumlah_pinjam: '',
    tanggal_peminjaman: '',
    tanggal_pengembalian: '',
    keterangan: ''
  });

  // State untuk error form
  const [errors, setErrors] = useState({ jumlah: '' });

  // State loading
  const [loading, setLoading] = useState(false);

  // Populate form dengan data barang yang dipilih dari halaman sebelumnya
  useEffect(() => {
    if (!selectedBarang) return;

    setFormData(prev => ({
      ...prev,
      namaBarang: selectedBarang.nama_barang ?? selectedBarang.nama ?? '',
      kategori: selectedBarang.kategori ?? '',
      barang_id: selectedBarang.barang_id ?? ''
    }));
  }, [selectedBarang]);

  // Handle perubahan input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'jumlah_pinjam') {
      setErrors(prev => ({ ...prev, jumlah: '' }));
    }
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi form
    // console.log('Form data:', formData);
    if (
      !formData.barang_id ||
      !formData.jumlah_pinjam ||
      !formData.tanggal_peminjaman ||
      !formData.tanggal_pengembalian
    ) {
      alert('Mohon lengkapi semua field yang wajib diisi!');
      return;
    }

    // Validasi jumlah barang
    if (Number(formData.jumlah_pinjam) < 1) {
      setErrors(prev => ({ ...prev, jumlah: 'Jumlah barang harus lebih dari 0' }));
      return;
    }

    // Validasi tanggal
    if (
      new Date(formData.tanggal_peminjaman) >=
      new Date(formData.tanggal_pengembalian)
    ) {
      alert('Tanggal kembali harus lebih besar dari tanggal peminjaman!');
      return;
    }

    submitPinjaman();
  };

  // Fungsi submit peminjaman
  const submitPinjaman = async () => {
    setLoading(true);
    try {
      // ===== DEBUG PAYLOAD =====
      // console.log('PAYLOAD:', {
      //   barang_id: formData.barang_id,
      //   jumlah_pinjam: formData.jumlah_pinjam,
      //   tanggal_peminjaman: formData.tanggal_peminjaman,
      //   tanggal_pengembalian: formData.tanggal_pengembalian,
      //   keterangan: formData.keterangan,
      // });

      await createPinjaman({
        barang_id: formData.barang_id,
        jumlah_pinjam: formData.jumlah_pinjam,
        tanggal_peminjaman: formData.tanggal_peminjaman,
        tanggal_pengembalian: formData.tanggal_pengembalian,
        keterangan: formData.keterangan,
      });

      alert('Peminjaman berhasil dibuat!');
      navigate('/user/PinjamanSaya');
    } catch (err) {
      console.error('Gagal membuat peminjaman:', err);
      alert(
        err.response?.data?.message || 'Gagal membuat peminjaman'
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle batal
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
                value={selectedBarang.nama_barang} 
                readOnly 
                className="readonly-input"
              />
            </div>
            <div className="form-row-three-col">
              <div className="form-group">
                <label>
                  Jumlah Barang <span className="required">*</span>
                </label>
                <input
                  type="number"
                  name="jumlah_pinjam"
                  value={formData.jumlah_pinjam}
                  onChange={handleInputChange}
                  min="1"
                  required
                />
                {errors.jumlah && (
                  <span className="error-message">{errors.jumlah}</span>
                )}
              </div>

              <div className="form-group">
                <label>
                  Tanggal Peminjaman <span className="required">*</span>
                </label>
                <div className="input-with-icon">
                  <FiCalendar />
                  <input
                    type="date"
                    name="tanggal_peminjaman"
                    value={formData.tanggal_peminjaman}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>
                  Tanggal Kembali <span className="required">*</span>
                </label>
                <div className="input-with-icon">
                  <FiCalendar />
                  <input
                    type="date"
                    name="tanggal_pengembalian"
                    value={formData.tanggal_pengembalian}
                    onChange={handleInputChange}
                    required
                  />
                </div>
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
