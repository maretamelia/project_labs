import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUpload } from 'react-icons/fi';
import { getKategoris } from '../../services/kategoriservices';
import { createBarang, getBarangs } from '../../services/barangservices';
import './BarangCreate.css';

function TambahBarang() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama: '',
    kategori: '', // simpan sebagai string
    kode_barang: '',
    stok: '',
    deskripsi: '',
    image: null
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [kategoriOptions, setKategoriOptions] = useState([]);

  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const response = await getKategoris();
        // pastikan data array
        const list = Array.isArray(response) ? response : (response.data?.data ?? response.data);
        // convert semua id jadi string supaya match dengan formData.kategori
        const options = list.map(k => ({
          id: k.id.toString(),
          name: k.nama_kategori
        }));
        setKategoriOptions(options);
      } catch (err) {
        console.error('Error fetching kategori:', err);
      }
    };
    fetchKategori();
  }, []);

  const handleInputChange = async (e) => {
  const { name, value } = e.target;

  if (name === 'kategori') {
    if (!value) {
      setFormData(prev => ({ ...prev, kategori: '', kode_barang: '' }));
      return;
    }

    try {
      // 1. Cari nama kategori untuk prefix
      const selectedKat = kategoriOptions.find(k => k.id === value);
      const prefix = selectedKat ? selectedKat.name.substring(0, 3).toUpperCase() : 'BRG';

      // 2. Ambil semua barang untuk hitung urutan
      const res = await getBarangs();
      const allBarang = res.data.data || res.data;

      // 3. Filter barang yang kategorinya sama
      const barangDiKategoriSama = allBarang.filter(b => String(b.category_id) === String(value));
      
      // 4. Tentukan nomor urut (jumlah barang + 1)
      const nextNumber = barangDiKategoriSama.length + 1;
      
      // 5. Format jadi 3 digit (misal: 001, 002)
      const formattedNumber = String(nextNumber).padStart(3, '0');

      setFormData(prev => ({
        ...prev,
        kategori: value,
        kode_barang: `${prefix}-${formattedNumber}`
      }));
    } catch (err) {
      console.error("Gagal generate kode:", err);
    }
  } else {
    setFormData(prev => ({ ...prev, [name]: value }));
  }
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
    await createBarang({
      nama_barang: formData.nama,
      category_id: parseInt(formData.kategori), // wajib integer
      stok: parseInt(formData.stok),
      deskripsi: formData.deskripsi,
      image: formData.image,
    });

    alert('Barang berhasil ditambahkan');
    navigate('/data-barang');
  } catch (err) {
    console.error('Gagal menambahkan barang:', err.message);
    alert('Gagal menambahkan barang: ' + err.message);
  }
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
      {/* HEADER */}
      <div className="tambah-barang-header">
        <h1 className="header-title">Tambah Barang</h1>
        <p className="header-subtitle">Tambah Data Barang</p>
      </div>

      {/* CONTENT */}
      <div className="tambah-barang-container">
        {/* FORM */}
        <div className="form-section1">
          <form onSubmit={handleSubmit}>
            {/* IMAGE */}
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
      {imagePreview ? (
        /* Jika sudah ada gambar, tampilkan gambarnya di kotak upload */
        <div className="upload-preview-container">
          <img src={imagePreview} alt="Selected" className="upload-preview-img" width={100} height={100} />
          <div className="upload-overlay">
            <FiUpload size={24} />
            <span>Klik untuk ganti gambar</span>
          </div>
        </div>
      ) : (
        /* Jika belum ada gambar, tampilkan ikon upload */
        <>
          <FiUpload size={40} />
          <span>Click to upload image</span>
        </>
      )}
    </label>
  </div>
</div>

            {/* NAMA */}
            <div className="form-group">
              <label className="form-label">Nama</label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Masukkan nama barang"
              />
            </div>

            {/* KATEGORI */}
            <div className="form-group">
              <label className="form-label">Kategori</label>
              <select
                name="kategori"
                value={formData.kategori}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="">Pilih kategori</option>
                {kategoriOptions.map(k => (
                  <option key={k.id} value={k.id}>{k.name}</option>
                ))}
              </select>
            </div>

            {/* KODE BARANG */}
            <div className="form-group">
              <label className="form-label">Kode Barang</label>
              <input
                type="text"
                name="kode_barang"
                value={formData.kode_barang}
                onChange={handleInputChange}
                className="form-input"
                placeholder="BRG-001"
              />
            </div>

            {/* STOK */}
            <div className="form-group">
              <label className="form-label">Stok</label>
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

            {/* DESKRIPSI */}
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
              <button type="button" className="btn-cancel" onClick={handleCancel}>Batal</button>
              <button type="submit" className="btn-submit">Simpan</button>
            </div>
          </form>
        </div>

        {/* PREVIEW */}
        <div className="preview-section">
          <div className="preview-label">Preview</div>
          <div className="preview-card">
            <div className="preview-image">
              {imagePreview ? <img src={imagePreview} alt="Preview" /> : <div className="preview-placeholder">No Image</div>}
            </div>
            <div className="preview-kode">{formData.kode_barang || 'KODE-XXX'}</div>
            <div className="preview-stok">{formData.stok || 0} Barang</div>
            <div className="preview-nama">{formData.nama || 'Nama Barang'}</div>
            <div className="preview-info">
              <p>Kategori: {kategoriOptions.find(k => k.id === formData.kategori)?.name || '-'}</p>
              <p>Tanggal: {getCurrentDate()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TambahBarang;
