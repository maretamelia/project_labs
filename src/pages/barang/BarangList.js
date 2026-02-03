import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import PageHeader from '../../components/PageHeader';
import SearchBar from '../../components/SearchBar';
import FilterModal from '../../components/FilterModal';
import './BarangList.css';

function DataBarang() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter values
  const [filterValues, setFilterValues] = useState({
    kategori: 'All',
    minStock: '',
    maxStock: '',
  });

  // Dummy data
  useEffect(() => {
    setItems([
      { id: 1, name: 'Arduino Uno', image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400', stock: 25, available: 20, category: 'Microcontroller' },
      { id: 2, name: 'Breadboard', image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400', stock: 30, available: 25, category: 'Component' },
      { id: 3, name: 'LED Merah', image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400', stock: 100, available: 80, category: 'Component' },
    ]);
  }, []);

  // Tombol navigasi
  const handleAddItem = () => navigate('/barang/create');
  const handleEditItem = (id) => navigate(`/barang/edit/${id}`);
  const handleDeleteItem = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus barang ini?')) {
      setItems(items.filter(item => item.id !== id));
    }
  };
  const handleViewItem = (id) => navigate(`/barang/${id}`);

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilterValues({ ...filterValues, [key]: value });
  };

  const handleApplyFilter = () => {
    setIsFilterOpen(false);
  };

  const handleResetFilter = () => {
    setFilterValues({
      kategori: 'All',
      minStock: '',
      maxStock: '',
    });
  };

  // Daftar kategori unik
  const categories = ['All', ...new Set(items.map(item => item.category))];

  // Filtered items
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      filterValues.kategori === 'All' || item.category === filterValues.kategori;

    const matchesMinStock =
      filterValues.minStock === '' || item.stock >= parseInt(filterValues.minStock);

    const matchesMaxStock =
      filterValues.maxStock === '' || item.stock <= parseInt(filterValues.maxStock);

    return matchesSearch && matchesCategory && matchesMinStock && matchesMaxStock;
  });

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="content-wrapper1">
          <PageHeader title="Data Barang" subtitle="Kelola semua barang di sini" />

          <div className="toolbar">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onOpenFilter={() => setIsFilterOpen(true)}
              placeholder="Cari barang..."
            />

            <button className="btn-add-item" onClick={handleAddItem}>
              <FiPlus /> Tambah Barang
            </button>
          </div>

          {/* Filter Modal */}
          <FilterModal
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            onApply={handleApplyFilter}
            onReset={handleResetFilter}
          >
            <div className="filter-section">
              <div className="filter-section-title">Kategori</div>
              <div className="filter-row">
                <div className="filter-field">
                  <select
                    value={filterValues.kategori}
                    onChange={(e) => handleFilterChange('kategori', e.target.value)}
                    className="filter-input"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="filter-section">
              <div className="filter-section-title">Stock</div>
              <div className="filter-row">
                <div className="filter-field">
                  <label>Min Stock</label>
                  <input
                    type="number"
                    value={filterValues.minStock}
                    onChange={(e) => handleFilterChange('minStock', e.target.value)}
                    className="filter-input"
                  />
                </div>
                <div className="filter-field">
                  <label>Max Stock</label>
                  <input
                    type="number"
                    value={filterValues.maxStock}
                    onChange={(e) => handleFilterChange('maxStock', e.target.value)}
                    className="filter-input"
                  />
                </div>
              </div>
            </div>
          </FilterModal>

          <div className="items-grid">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div key={item.id} className="item-card">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="item-info">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-stock">
                      Tersedia: {item.available}/{item.stock}
                    </p>
                    <p className="item-category">Kategori: {item.category}</p>
                  </div>
                  <div className="item-actions">
                    <button className="btn-detail" onClick={() => handleViewItem(item.id)}>
                      Selengkapnya
                    </button>
                    <button className="btn-icon btn-edit" onClick={() => handleEditItem(item.id)}>
                      <FiEdit2 />
                    </button>
                    <button className="btn-icon btn-delete" onClick={() => handleDeleteItem(item.id)}>
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-items">Barang tidak ditemukan.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataBarang;
