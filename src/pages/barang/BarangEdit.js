import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiUpload } from 'react-icons/fi';
import { getBarang, updateBarang } from '../../services/barangservices';
import { getKategoris } from '../../services/kategoriservices';
import './BarangCreate.css';

function EditBarang() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    nama_barang: '',
    category_id: '', // Disimpan sebagai string agar sinkron dengan <select>
    kode_barang: '',
    stok: '',
    deskripsi: '',
    image: null,
    created_at: ''
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [kategoriOptions, setKategoriOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Ambil Kategori dan Detail Barang secara paralel
        const [resKategori, resBarang] = await Promise.all([
          getKategoris(),
          getBarang(id)
        ]);

        const daftarKategori = resKategori.data.data || resKategori.data;
        setKategoriOptions(daftarKategori);

        // 2. Mapping data dari Laravel ke State React
        const b = resBarang.data.data || resBarang.data;
        setFormData({
          nama_barang: b.nama_barang || '',
          // PENTING: ID dipaksa jadi String agar Select Option terpilih otomatis
          category_id: b.category_id ? String(b.category_id) : '',
          kode_barang: b.kode_barang || '',
          stok: b.stok || '',
          deskripsi: b.deskripsi || '',
          created_at: b.created_at || '',
          image: null 
        });

        // 3. Set Preview Gambar (Sesuaikan dengan URL storage kamu)
        if (b.image) {
          setImagePreview(`http://localhost:8000/storage/${b.image}`);
        }

        setLoading(false);
      } catch (error) {
        console.error('Gagal mengambil data:', error);
        alert('Data barang tidak ditemukan');
        navigate('/data-barang');
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData(prev => ({ ...prev, image: file }));

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Pastikan category_id dikirim sebagai angka lagi saat masuk ke FormData di service
      await updateBarang(id, formData);
      alert('Barang berhasil diperbarui!');
      navigate('/data-barang'); 
    } catch (error) {
      console.error('Gagal update:', error);
      alert('Gagal menyimpan perubahan.');
    }
  };

  const handleCancel = () => navigate('/data-barang');

  if (loading) return <div className="loading" style={{padding: '20px'}}>Memuat data...</div>;

  return (
    <div className="tambah-barang-page">
      <div className="tambah-barang-header">
        <h1 className="header-title">Edit Barang</h1>
        <p className="header-subtitle">Ubah informasi barang: {formData.kode_barang}</p>
      </div>

      <div className="tambah-barang-container">
        <div className="form-section">
          <form onSubmit={handleSubmit}>
            {/* Input Gambar */}
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
      {/* Tampilkan preview gambar di dalam area upload jika ada */}
      {imagePreview ? (
        <div className="upload-preview-container">
          <img src={imagePreview} alt="Selected" className="upload-preview-img" />
          <div className="upload-overlay">
            <FiUpload size={24} />
            <span>Ganti Gambar</span>
          </div>
        </div>
      ) : (
        <>
          <FiUpload size={40} />
          <span>Klik untuk upload gambar</span>
        </>
      )}
    </label>
  </div>
</div>

            {/* Nama */}
            <div className="form-group">
              <label className="form-label">Nama Barang</label>
              <input
                type="text"
                name="nama_barang"
                value={formData.nama_barang}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>

            {/* Dropdown Kategori */}
            <div className="form-group">
              <label className="form-label">Kategori</label>
              <select
                name="category_id"
                value={String(formData.category_id)} // Pastikan String
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value="">Pilih kategori</option>
                {kategoriOptions.map((kat) => (
                  <option key={kat.id} value={String(kat.id)}>
                    {kat.nama_kategori}
                  </option>
                ))}
              </select>
            </div>

            {/* Kode Barang (Read Only) */}
            <div className="form-group">
              <label className="form-label">Kode Barang</label>
              <input
                type="text"
                value={formData.kode_barang}
                className="form-input"
                style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
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
                required
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

        {/* Bagian Preview di Samping */}
        <div className="preview-section">
          <div className="preview-label">Preview Perubahan</div>
          <div className="preview-card">
            <div className="preview-image">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" />
              ) : (
                <div className="preview-placeholder">No Image</div>
              )}
            </div>
            <div className="preview-kode">{formData.kode_barang || 'KODE-XXX'}</div>
            <div className="preview-stok">{formData.stok || 0} Barang</div>
            <div className="preview-nama">{formData.nama_barang || 'Nama Barang'}</div>
            <div className="preview-info">
              <p>Kategori: {kategoriOptions.find(c => String(c.id) === String(formData.category_id))?.nama_kategori || '-'}</p>
              <p>Dibuat: {formData.created_at ? formData.created_at.split('T')[0] : '-'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditBarang;