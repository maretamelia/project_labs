// EditPinjaman.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDetailPinjaman, updatePinjaman } from '../../../services/pinjamanServices';
import AddProductModal from '../../../components/AddProductModal';
import './EditPinjaman.css';
import Swal from 'sweetalert2';

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
  const [showAddProduct, setShowAddProduct] = useState(false);

  // ===============================
  // FETCH DETAIL PINJAMAN
  // ===============================
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

  // ===============================
  // HANDLE INPUT
  // ===============================
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ===============================
  // HANDLE PILIH BARANG
  // ===============================
  const handleSelectBarang = (barang) => {
    setBarangId(barang.id);

    setFormData(prev => ({
      ...prev,
      namaBarang: barang.nama_barang,
      kategori: barang.kategori?.nama_kategori || ''
    }));

    setShowAddProduct(false);
  };

  // ===============================
  // HANDLE SUBMIT
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // VALIDASI REQUIRED
    if (
      !barangId ||
      !formData.jumlah ||
      !formData.tanggalPinjam ||
      !formData.tanggalKembali ||
      !formData.keterangan.trim()
    ) {
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

  // Swal untuk sukses
  await Swal.fire({
    icon: 'success',
    title: 'Berhasil!',
    text: 'Peminjaman berhasil diupdate!',
    confirmButtonText: 'OK'
  });

  navigate('/user/PinjamanSaya');
} catch (error) {
  console.error(error);

  // Swal untuk error
  Swal.fire({
    icon: 'error',
    title: 'Gagal',
    text: error.response?.data?.message || 'Gagal update peminjaman',
    confirmButtonText: 'OK'
  });
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

            {/* =================== BARANG =================== */}
            <div className="form-row">
              <div className="form-group full-width">
                <label>Nama Barang</label>
                <input
                  type="text"
                  name="namaBarang"
                  value={formData.namaBarang}
                  readOnly
                  required
                  onClick={() => setShowAddProduct(true)}
                  placeholder="Klik untuk pilih barang"
                  style={{ cursor: 'pointer' }}
                />
              </div>

              <div className="form-group">
                <label>Kategori</label>
                <input
                  type="text"
                  value={formData.kategori}
                  disabled
                />
              </div>
            </div>

            {/* =================== JUMLAH & TANGGAL =================== */}
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
                  required
                />
              </div>

              <div className="form-group">
                <label>Tanggal Kembali</label>
                <input
                  type="date"
                  name="tanggalKembali"
                  value={formData.tanggalKembali}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* =================== KETERANGAN =================== */}
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

            {/* =================== BUTTON =================== */}
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

      {/* =================== ADD PRODUCT MODAL =================== */}
      {showAddProduct && (
        <AddProductModal
          isOpen={showAddProduct}
          onClose={() => setShowAddProduct(false)}
          onSelectProduct={handleSelectBarang}
        />
      )}
    </div>
  );
}

export default EditPinjaman;
