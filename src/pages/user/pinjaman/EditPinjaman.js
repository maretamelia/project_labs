// EditPinjaman.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDetailPinjaman, updatePinjaman } from '../../../services/pinjamanServices';
import { getBarangsUser } from '../../../services/barangservices'; // sesuaikan nama file
import './EditPinjaman.css';

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

  const [barangId, setBarangId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Popup state
  const [showBarangPopup, setShowBarangPopup] = useState(false);
  const [barangList, setBarangList] = useState([]);

  // Ambil detail peminjaman
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const detail = await getDetailPinjaman(id);

        setBarangId(detail?.barang?.id);
        setFormData({
          namaBarang: detail?.barang?.nama_barang || '',
          kategori: detail?.barang?.kategori?.nama_kategori || '',
          jumlah: detail?.jumlah || '',
          tanggalPinjam: detail?.tanggal_peminjaman
            ? detail.tanggal_peminjaman.split('T')[0]
            : '',
          tanggalKembali: detail?.tanggal_pengembalian
            ? detail.tanggal_pengembalian.split('T')[0]
            : '',
          keterangan: detail?.keterangan || ''
        });
      } catch (error) {
        console.error(error);
        alert('Gagal mengambil data peminjaman');
        navigate('/user/PinjamanSaya');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, [id, navigate]);

  // Ambil daftar barang untuk popup
  useEffect(() => {
    const fetchBarang = async () => {
      try {
        const response = await getBarangsUser();
        // pastikan barangList selalu array
        setBarangList(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Gagal ambil daftar barang', error);
        setBarangList([]);
      }
    };
    fetchBarang();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectBarang = (barang) => {
    setFormData(prev => ({
      ...prev,
      namaBarang: barang.nama_barang,
      kategori: barang.kategori?.nama_kategori || ''
    }));
    setBarangId(barang.id);
    setShowBarangPopup(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!barangId || !formData.jumlah) {
      alert('Mohon lengkapi semua field wajib!');
      return;
    }

    try {
      await updatePinjaman(id, {
        barang_id: barangId,
        jumlah: formData.jumlah,
        tanggal_peminjaman: formData.tanggalPinjam,
        tanggal_pengembalian: formData.tanggalKembali,
        keterangan: formData.keterangan
      });

      alert('Peminjaman berhasil diupdate!');
      navigate('/user/PinjamanSaya');
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Gagal update peminjaman');
    }
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
              <div className="form-group full-width">
                <label>Nama Barang</label>
                <input
                  type="text"
                  name="namaBarang"
                  value={formData.namaBarang}
                  readOnly
                  onClick={() => setShowBarangPopup(true)}
                  placeholder="Klik untuk pilih barang"
                />
              </div>

              <div className="form-group">
                <label>Kategori</label>
                <input
                  type="text"
                  name="kategori"
                  value={formData.kategori}
                  disabled
                />
              </div>
            </div>

            {/* Jumlah & Tanggal */}
            <div className="form-row date-row">
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
              </div>

              <div className="form-group">
                <label>Tanggal Pinjam</label>
                <input
                  type="date"
                  name="tanggalPinjam"
                  value={formData.tanggalPinjam}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Tanggal Kembali</label>
                <input
                  type="date"
                  name="tanggalKembali"
                  value={formData.tanggalKembali}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Keterangan */}
            <div className="form-group full-width">
              <label>Keterangan</label>
              <textarea
                name="keterangan"
                value={formData.keterangan}
                onChange={handleInputChange}
                rows="4"
                placeholder="Tambahkan keterangan (opsional)"
              />
            </div>

            {/* Buttons */}
            <div className="form-actions">
              <button type="button" className="btn-batal" onClick={handleBatal}>
                Batal
              </button>
              <button type="submit" className="btn-simpan">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Popup Barang */}
      {showBarangPopup && (
        <div className="popup-barang">
          <div className="popup-content">
            <h3>Pilih Barang</h3>
            <button className="close-btn" onClick={() => setShowBarangPopup(false)}>X</button>
            <ul className="barang-list">
              {Array.isArray(barangList) && barangList.map(barang => (
                <li key={barang.id} onClick={() => handleSelectBarang(barang)}>
                  {barang.nama_barang} - {barang.kategori?.nama_kategori}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditPinjaman;
