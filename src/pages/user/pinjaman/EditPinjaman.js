// EditPinjaman.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditPinjaman.css';
import { FiCalendar } from 'react-icons/fi';

function EditPinjaman() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    namaBarang: '',
    kategori: '',
    jumlah: '',
    tanggalPinjam: '',
    tanggalKembali: '',
    keterangan: ''
  });

  const [isLoading, setIsLoading] = useState(true);

  const kategoriOptions = [
    'Elektronik',
    'Mikrokontroler',
    'Alat Tulis',
    'Peralatan Lab',
    'Audio Visual'
  ];

  useEffect(() => {
    setIsLoading(true);
    // Dummy fetch data
    const dummyData = {
      id,
      namaBarang: 'Proyektor',
      kategori: 'Audio Visual',
      jumlah: 5,
      tanggalPinjam: '2025-09-15',
      tanggalKembali: '2025-09-20',
      keterangan: 'Untuk presentasi tugas'
    };
    setFormData(dummyData);
    setIsLoading(false);
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.namaBarang || !formData.kategori || !formData.jumlah ||
        !formData.tanggalPinjam || !formData.tanggalKembali) {
      alert('Mohon lengkapi semua field yang wajib diisi!');
      return;
    }

    if (new Date(formData.tanggalPinjam) >= new Date(formData.tanggalKembali)) {
      alert('Tanggal kembali harus lebih besar dari tanggal peminjaman!');
      return;
    }

    console.log('Form Edited:', formData);
    alert('Peminjaman berhasil diEdit!');
    navigate('/user/PinjamanSaya');
  };

  const handleBatal = () => {
    if (window.confirm('Apakah Anda yakin ingin membatalkan? Perubahan tidak akan disimpan.')) {
      navigate('/user/PinjamanSaya');
    }
  };

  if (isLoading) {
    return (
      <div className="Edit-pinjaman-page">
        <div className="loading-container">
          <p>Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="Edit-pinjaman-page">
      <div className="Edit-pinjaman-header">
        <h1 className="Edit-pinjaman-title">Edit Peminjaman</h1>
        <p className="Edit-pinjaman-subtitle">Update data peminjaman</p>
      </div>

      <div className="Edit-pinjaman-content">
        <div className="form-card">
          <form onSubmit={handleSubmit} className="peminjaman-form">
            
            {/* Nama Barang & Kategori */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="namaBarang">Nama Barang<span className="required">*</span></label>
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
                <label htmlFor="kategori">Kategori<span className="required"></span></label>
                <select
                  id="kategori"
                  name="kategori"
                  value={formData.kategori}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Pilih kategori</option>
                  {kategoriOptions.map((kat, idx) => (
                    <option key={idx} value={kat}>{kat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Jumlah & Tanggal */}
            <div className="form-row date-row">
              <div className="form-group">
                <label htmlFor="jumlah">Jumlah Barang<span className="required"></span></label>
                <input
                  type="number"
                  id="jumlah"
                  name="jumlah"
                  value={formData.jumlah}
                  onChange={handleInputChange}
                  min="1"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="tanggalPinjam">Tanggal Pinjam<span className="required"></span></label>
                <div className="input-with-icon">
                  <FiCalendar className="input-icon"/>
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
                <label htmlFor="tanggalKembali">Tanggal Kembali<span className="required"></span></label>
                <div className="input-with-icon">
                  <FiCalendar className="input-icon"/>
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
                rows="4"
                placeholder="Tambahkan keterangan (opsional)"
              />
            </div>

            {/* Buttons */}
            <div className="form-actions">
              <button type="button" className="btn-batal" onClick={handleBatal}>Batal</button>
              <button type="submit" className="btn-simpan">Simpan</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditPinjaman;
