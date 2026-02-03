import React, { useState } from 'react';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './AddProductModal.css';

function AddProductModal({ isOpen, onClose, onSelectProduct }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [barangList] = useState([
    { id: '1', namaBarang: 'test lagi', kategori: 'Elektronik', image: 'kk.jpg', stok: 47, unit: 'pcs' },
    { id: '2', namaBarang: 'Bust', kategori: 'Elektronik', image: 'placeholder', stok: 42, unit: 'kg' },
    { id: '3', namaBarang: 'testing', kategori: 'Mikrokontroler', image: 'kk.jpg', stok: 132, unit: 'pcs' },
    { id: '4', namaBarang: 'manap', kategori: 'Alat Tulis', image: 'placeholder', stok: 8, unit: 'pcs' },
    { id: '5', namaBarang: 'djigdli', kategori: 'Elektronik', image: 'placeholder', stok: 1235, unit: 'mm' },
    { id: '6', namaBarang: 'Laptop Dell', kategori: 'Elektronik', image: 'placeholder', stok: 5, unit: 'unit' },
    { id: '7', namaBarang: 'Proyektor', kategori: 'Audio Visual', image: 'placeholder', stok: 3, unit: 'unit' },
    { id: '8', namaBarang: 'Kamera Canon', kategori: 'Audio Visual', image: 'placeholder', stok: 2, unit: 'unit' },
    { id: '9', namaBarang: 'Speaker', kategori: 'Audio Visual', image: 'placeholder', stok: 10, unit: 'unit' },
    { id: '10', namaBarang: 'Microphone', kategori: 'Audio Visual', image: 'placeholder', stok: 5, unit: 'unit' },
  ]);
  const [loading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBarang, setSelectedBarang] = useState(null);

  const ITEMS_PER_PAGE = 12;

  if (!isOpen) return null;

  // Pagination
  const filteredBarang = barangList.filter(barang => {
    const matchSearch =
      barang.namaBarang.toLowerCase().includes(searchTerm.toLowerCase()) ||
      barang.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory =
      selectedCategory === 'All Categories' || barang.kategori === selectedCategory;
    return matchSearch && matchCategory;
  });

  const totalPages = Math.ceil(filteredBarang.length / ITEMS_PER_PAGE);
  const paginatedBarang = filteredBarang.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Handlers
  const handleNext = () => {
    if (!selectedBarang) {
      alert('Silakan pilih barang terlebih dahulu');
      return;
    }
    onSelectProduct(selectedBarang);
    handleClose();
  };

  const handleClose = () => {
    setSearchTerm('');
    setSelectedCategory('All Categories');
    setCurrentPage(1);
    setSelectedBarang(null);
    onClose();
  };

  const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  const getCategoryColor = (kategori) => {
    const colors = {
      'Elektronik': '#D098CC',
      'Mikrokontroler': '#10B981',
      'Alat Tulis': '#F59E0B',
      'Peralatan Lab': '#3B82F6',
      'Audio Visual': '#EF4444'
    };
    return colors[kategori] || '#9CA3AF';
  };

  const categories = ['All Categories', ...new Set(barangList.map(b => b.kategori))];

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Header */}
        <div className="modal-header-top">
          <h2 className="modal-title">Add Product</h2>
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
          <span className="modal-filter-label">All Categories</span>
        </div>

        {/* Categories Tags */}
        <div className="modal-categories">
          {categories.map(category => (
            <button
              key={category}
              className={`category-badge ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(1);
              }}
              style={selectedCategory === category ? { backgroundColor: getCategoryColor(category) } : {}}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="modal-products-grid">
          {loading && <div className="grid-loading">Memuat data barang...</div>}

          {!loading && paginatedBarang.length === 0 && (
            <div className="grid-empty">Tidak ada barang yang cocok</div>
          )}

          {!loading &&
            paginatedBarang.map(barang => (
              <div
                key={barang.id}
                className={`product-item ${selectedBarang?.id === barang.id ? 'selected' : ''}`}
                onClick={() => setSelectedBarang(barang)}
              >
                <div className="product-category" style={{ backgroundColor: getCategoryColor(barang.kategori) }}>
                  {barang.kategori}
                </div>
                <div className="product-image-box">
                  <div className="product-placeholder">📦</div>
                </div>
                <div className="product-details">
                  <h4 className="product-title">{barang.namaBarang}</h4>
                  <p className="product-stock-info">
                    <span className="stock-label">Stok Total:</span>
                    <span className="stock-amount">{barang.stok} {barang.unit}</span>
                  </p>
                </div>
                {selectedBarang?.id === barang.id && <div className="selection-mark">✓</div>}
              </div>
            ))}
        </div>

        {/* Pagination */}
        <div className="modal-pagination-section">
          <span className="pagination-text">
            Menampilkan {paginatedBarang.length} sampai {Math.min(currentPage * ITEMS_PER_PAGE, filteredBarang.length)} dari {filteredBarang.length} produk
          </span>
          <div className="pagination-nav">
            <button className="pagination-arrow" onClick={handlePrevPage} disabled={currentPage === 1}>
              <FiChevronLeft size={18} />
            </button>
            <span className="page-number">
              Halaman {currentPage} of {totalPages || 1}
            </span>
            <button className="pagination-arrow" onClick={handleNextPage} disabled={currentPage === totalPages}>
              <FiChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="modal-footer-section">
          <button className="btn-batal" onClick={handleClose}>
            Batal
          </button>
          <button className="btn-next" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddProductModal;
