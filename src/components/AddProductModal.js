import React, { useState, useEffect } from 'react';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './AddProductModal.css';
import axios from 'axios';

function AddProductModal({ isOpen, onClose, onSelectProduct }) {
  const [barangList, setBarangList] = useState([]); // WAJIB ARRAY
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedBarang, setSelectedBarang] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const ITEMS_PER_PAGE = 12;

  /* ================= FETCH BARANG ================= */
  useEffect(() => {
    if (!isOpen) return;

    const fetchBarang = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');

        const res = await axios.get(
          'http://localhost:8000/api/user/barang',
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
            },
          }
        );

        // 🔒 NORMALISASI RESPONSE (ANTI ERROR)
        let list = [];

        if (Array.isArray(res.data)) {
          list = res.data;
        } else if (Array.isArray(res.data?.data)) {
          list = res.data.data;
        } else if (Array.isArray(res.data?.data?.data)) {
          list = res.data.data.data;
        }

        setBarangList(list);
        setCurrentPage(1); 
      } catch (err) {
        console.error('Gagal fetch barang:', err);
        setBarangList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBarang();
  }, [isOpen]);

  if (!isOpen) return null;

  /* ================= FILTER ================= */
  const filteredBarang = barangList.filter(barang => {
    const nama = barang.nama_barang || '';
    const id = String(barang.id || '');

    const matchSearch =
      nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      id.includes(searchTerm);

    const matchCategory =
      selectedCategory === 'All Categories' ||
      barang.kategori?.nama_kategori === selectedCategory;

    return matchSearch && matchCategory;
  });

  /* ================= PAGINATION ================= */
  const totalPages = Math.max(
    1,
    Math.ceil(filteredBarang.length / ITEMS_PER_PAGE)
  );

  const paginatedBarang = filteredBarang.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  /* ================= CATEGORY ================= */
  const categories = [
    'All Categories',
    ...new Set(
      barangList
        .map(b => b.kategori?.nama_kategori)
        .filter(Boolean)
    ),
  ];

  const getCategoryColor = (kategori) => {
    const colors = {
      Elektronik: '#D098CC',
      Mikrokontroler: '#10B981',
      'Alat Tulis': '#F59E0B',
      'Peralatan Lab': '#3B82F6',
      'Audio Visual': '#EF4444',
    };
    return colors[kategori] || '#9CA3AF';
  };

  /* ================= HANDLERS ================= */
  const handleNext = () => {
  if (!selectedBarang) {
    alert('Silakan pilih barang terlebih dahulu');
    return;
  }

  onSelectProduct({
  id: selectedBarang.id,
  nama_barang: selectedBarang.nama_barang,
  kategori: selectedBarang.kategori, // ⬅️ kirim OBJECT
  stok: selectedBarang.stok,
  satuan: selectedBarang.satuan,
});

  handleClose();
};

  const handleClose = () => {
    setSearchTerm('');
    setSelectedCategory('All Categories');
    setCurrentPage(1);
    setSelectedBarang(null);
    onClose();
  };

  const handlePrevPage = () =>
    setCurrentPage(p => Math.max(p - 1, 1));

  const handleNextPage = () =>
    setCurrentPage(p => Math.min(p + 1, totalPages));

  /* ================= RENDER ================= */
  return (
    <div className="modal-overlay">
      <div className="modal-container">

        {/* Header */}
        <div className="modal-header-top">
          <h2 className="modal-title">Pilih Produk</h2>
          <button className="modal-close" onClick={handleClose}>
            <FiX size={24} />
          </button>
        </div>

        {/* Search */}
        <div className="modal-search-wrapper">
          <input
            type="text"
            placeholder="Search Product (Code/Name)"
            className="modal-search-input"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <span className="modal-filter-label">{selectedCategory}</span>
        </div>

        {/* Categories */}
        <div className="modal-categories">
          {categories.map(category => (
            <button
              key={category}
              className={`category-badge ${
                selectedCategory === category ? 'active' : ''
              }`}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(1);
              }}
              style={
                selectedCategory === category
                  ? { backgroundColor: getCategoryColor(category) }
                  : {}
              }
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products */}
        <div className="modal-products-grid">
          {loading && <div className="grid-empty">Loading...</div>}
          {!loading && paginatedBarang.length === 0 && (
            <div className="grid-empty">Tidak ada barang</div>
          )}

          {paginatedBarang.map(barang => (
            <div
              key={barang.id}
              className={`product-item ${
                selectedBarang?.id === barang.id ? 'selected' : ''
              }`}
              onClick={() => setSelectedBarang(barang)}
            >
              <div
                className="product-category"
                style={{
                  backgroundColor: getCategoryColor(
                    barang.kategori?.nama_kategori
                  ),
                }}
              >
                {barang.kategori?.nama_kategori}
              </div>

              <div className="product-image-box">
                {barang.image ? (
                  <img
                    src={`http://localhost:8000/storage/${barang.image}`}
                    alt={barang.nama_barang}
                    className="product-image"
                  />
                ) : (
                  <div className="product-placeholder">📦</div>
                )}
              </div>

              <div className="product-details">
                <h4 className="product-title">{barang.nama_barang}</h4>
                <p className="product-stock-info">
                  <span className="stock-label">Stok:</span>{' '}
                  {barang.stok} {barang.satuan}
                </p>
              </div>

              {selectedBarang?.id === barang.id && (
                <div className="selection-mark">✓</div>
              )}
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="modal-pagination-section">
          <span className="pagination-text">
            Menampilkan {paginatedBarang.length} dari {filteredBarang.length}
          </span>
          <div className="pagination-nav">
            <button
              className="pagination-arrow"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              <FiChevronLeft size={18} />
            </button>
            <span className="page-number">
              Halaman {currentPage} of {totalPages}
            </span>
            <button
              className="pagination-arrow"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <FiChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer-section">
          <button className="btn-batal" onClick={handleClose}>Batal</button>
          <button className="btn-next" onClick={handleNext}>Selanjutnya</button>
        </div>

      </div>
    </div>
  );
}

export default AddProductModal;
