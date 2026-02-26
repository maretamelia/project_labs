// CreatePinjaman.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CreatePinjaman.css';
import { createPinjaman } from '../../../services/pinjamanServices';
import Swal from 'sweetalert2';


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

  // ===============================
  // AUTO ISI DATA BARANG
  // ===============================
  useEffect(() => {
    if (!selectedBarang) return;

    setFormData(prev => ({
      ...prev,
      namaBarang: selectedBarang.nama_barang || '',
      kategori: selectedBarang.kategori?.nama_kategori || '',
      barang_id: selectedBarang.id || ''
    }));
  }, [selectedBarang]);

  // ===============================
  // HANDLE INPUT
  // ===============================
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'jumlah') {
      setErrors(prev => ({ ...prev, jumlah: '' }));
    }
  };

  // ===============================
  // HANDLE SUBMIT
  // ===============================
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.barang_id ||
      !formData.jumlah ||
      !formData.tanggal_peminjaman ||
      !formData.tanggal_pengembalian ||
      !formData.keterangan.trim()
    ) {
      alert('Mohon lengkapi semua field wajib!');
      return;
    }

    if (Number(formData.jumlah) < 1) {
      setErrors(prev => ({
        ...prev,
        jumlah: 'Jumlah barang harus lebih dari 0'
      }));
      return;
    }

    if (
      new Date(formData.tanggal_pengembalian) <
      new Date(formData.tanggal_peminjaman)
    ) {
      alert('Tanggal kembali tidak boleh sebelum tanggal peminjaman!');
      return;
    }

    submitPinjaman();
  };

  // ===============================
  // SUBMIT KE BACKEND
  // ===============================
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

    await Swal.fire({
      icon: 'success',
      title: 'Berhasil!',
      text: 'Peminjaman berhasil dibuat!',
      confirmButtonText: 'OK'
    });

    navigate('/user/PinjamanSaya');
  } catch (err) {
    console.error(err);
    Swal.fire({
      icon: 'error',
      title: 'Gagal',
      text: err.response?.data?.message || 'Gagal membuat peminjaman',
      confirmButtonText: 'OK'
    });
  } finally {
    setLoading(false);
  }
};


  const handleBatal = async () => {
  const result = await Swal.fire({
    title: 'Yakin?',
    text: "Apakah Anda ingin membatalkan peminjaman?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, batal',
    cancelButtonText: 'Tidak',
    reverseButtons: true
  });

  if (result.isConfirmed) {
    navigate('/user/PinjamanSaya');
  }
};


  // ===============================
  // AMBIL GAMBAR DINAMIS
  // ===============================
  const imageField =
    selectedBarang?.gambar ||
    selectedBarang?.image ||
    selectedBarang?.foto ||
    selectedBarang?.foto_barang ||
    null;

  return (
    <div className="create-pinjaman-page">
      <div className="create-pinjaman-header">
        <h1 className="create-pinjaman-title">Tambah Peminjaman</h1>
        <p className="create-pinjaman-subtitle">Tambah data peminjaman</p>
      </div>

      <div className="create-pinjaman-container">
        <div className="form-card">

          {/* =================== KATEGORI + IMAGE =================== */}
          {formData.kategori && (
            <div className="kategori-bar">
              <div className="kategori-item">

                {imageField && (
                  <img
                    src={`http://localhost:8000/storage/${imageField}`}
                    alt="barang"
                    className="kategori-image"
                  />
                )}

                <div className="kategori-info">
                  <span className="kategori-label">Kategori: </span>
                  <span className="kategori-value">
                    {formData.kategori}
                  </span>
                </div>

              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="peminjaman-form">

            {/* NAMA BARANG */}
            <div className="form-group full-width">
              <label>Nama Barang</label>
              <input
                type="text"
                value={formData.namaBarang}
                readOnly
                required
                className="readonly-input"
              />
            </div>

            {/* JUMLAH & TANGGAL */}
            <div className="form-row-three-col">

              <div className="form-group">
                <label>Jumlah Barang</label>
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
                <label>Tanggal Peminjaman</label>
                <input
                  type="date"
                  name="tanggal_peminjaman"
                  value={formData.tanggal_peminjaman}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Tanggal Kembali</label>
                <input
                  type="date"
                  name="tanggal_pengembalian"
                  value={formData.tanggal_pengembalian}
                  onChange={handleInputChange}
                  required
                />
              </div>

            </div>

            {/* KETERANGAN */}
            <div className="form-group full-width">
              <label>Keterangan</label>
              <textarea
                name="keterangan"
                value={formData.keterangan}
                onChange={handleInputChange}
                rows="4"
                required
                placeholder="Tambahkan keterangan"
              />
            </div>

            {/* BUTTON */}
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
                disabled={loading}
              >
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
