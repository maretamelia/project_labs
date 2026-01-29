import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiCalendar, FiPlus } from 'react-icons/fi';
import PageHeader from '../../components/PageHeader';
import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';
import FilterModal from '../../components/FilterModal';
import './BarangList.css';

function DataBarang() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStock, setFilterStock] = useState('');

  // Data dummy barang
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'Arduino Uno',
      image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400',
      stock: 25,
      available: 20,
      category: 'Microcontroller'
    },
    {
      id: 2,
      name: 'Breadboard',
      image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400',
      stock: 30,
      available: 25,
      category: 'Component'
    },
    {
      id: 3,
      name: 'Arduino Uno',
      image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400',
      stock: 25,
      available: 20,
      category: 'Microcontroller'
    },
    {
      id: 4,
      name: 'Breadboard',
      image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400',
      stock: 30,
      available: 25,
      category: 'Component'
    },
    {
      id: 5,
      name: 'Arduino Uno',
      image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400',
      stock: 25,
      available: 20,
      category: 'Microcontroller'
    },
    {
      id: 6,
      name: 'Breadboard',
      image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400',
      stock: 30,
      available: 25,
      category: 'Component'
    }
  ]);

  /* ============================================
     HANDLER FUNCTIONS
     ============================================ */
  
  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleApplyFilter = () => {
    setIsFilterOpen(false);
    // TODO: Logic filter di sini
    console.log('Filter applied:', { filterCategory, filterStock });
  };

  const handleResetFilter = () => {
    setFilterCategory('');
    setFilterStock('');
  };

  const handleEdit = (id) => {
    console.log('Edit item:', id);
    // TODO: Navigate to edit page or open edit modal
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus barang ini?')) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleAddItem = () => {
    console.log('Add new item');
    // TODO: Navigate to add page or open add modal
  };

  return (
  <div className="app-container">
      {/* ============================================
          SIDEBAR COMPONENT
          Uncomment dan sesuaikan dengan komponen Anda
          ============================================ */}
      {/* <Sidebar isOpen={isSidebarOpen} /> */}
      
      {/* 🔥 INI YANG DIUBAH - ganti 'with-sidebar' jadi 'sidebar-closed' dengan kondisi terbalik */}
      <div className={`main-content ${!isSidebarOpen ? 'sidebar-closed' : ''}`}>
        {/* ============================================
            NAVBAR COMPONENT
            Uncomment dan sesuaikan dengan komponen Anda
            Props yang dibutuhkan: userName, userRole, onMenuToggle
            ============================================ */}
        {/* <Navbar 
          userName="Grisella"
          userRole="Admin"
          onMenuToggle={handleMenuToggle}
        /> */}

        <div className="content-wrapper">
          {/* ============================================
              PAGE HEADER COMPONENT
              Uncomment dan sesuaikan dengan komponen Anda
              Props yang dibutuhkan: title, subtitle
              ============================================ */}
          <PageHeader 
            title="Daftar Barang"
            subtitle="Daftar barang yang tersedia"
          />

          <div className="toolbar">
            {/* ============================================
                SEARCH BAR COMPONENT
                Uncomment dan sesuaikan dengan komponen Anda
                Props: searchTerm, onSearchChange, onOpenFilter, placeholder
                ============================================ */}
            <SearchBar 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onOpenFilter={() => setIsFilterOpen(true)}
              placeholder="Cari barang..."
            />

            {/* ============================================
                TOMBOL TAMBAH BARANG
                Uncomment setelah import FiPlus dari react-icons/fi
                ============================================ */}
            <button className="btn-add-item" onClick={handleAddItem}>
              <FiPlus /> Tambah Barang
            </button>
          </div>

          {/* ============================================
              GRID CARDS BARANG
              Ini tetap aktif untuk menampilkan data
              ============================================ */}
          <div className="items-grid">
            {items.map(item => (
              <div key={item.id} className="item-card">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-info">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-stock">Stok tersedia: {item.available}/{item.stock}</p>
                </div>
                <div className="item-actions">
                  <button className="btn-detail">Selengkapnya</button>
                  <button 
                    className="btn-icon btn-edit"
                    onClick={() => handleEdit(item.id)}
                  >
                    ✏️
                  </button>
                  <button 
                    className="btn-icon btn-delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================
          FILTER MODAL COMPONENT
          Uncomment dan sesuaikan dengan komponen Anda
          Props: isOpen, onClose, onApply, onReset, children
          ============================================ */}
      {/* <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleApplyFilter}
        onReset={handleResetFilter}
      >
        <div className="filter-section">
          <div className="filter-section-title">Kategori</div>
          <div className="filter-field">
            <select 
              className="filter-input"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">Semua Kategori</option>
              <option value="microcontroller">Microcontroller</option>
              <option value="component">Component</option>
              <option value="sensor">Sensor</option>
              <option value="module">Module</option>
            </select>
          </div>
        </div>

        <div className="filter-section">
          <div className="filter-section-title">Stok</div>
          <div className="filter-field">
            <select 
              className="filter-input"
              value={filterStock}
              onChange={(e) => setFilterStock(e.target.value)}
            >
              <option value="">Semua Stok</option>
              <option value="available">Tersedia</option>
              <option value="low">Stok Menipis</option>
              <option value="empty">Habis</option>
            </select>
          </div>
        </div>
      </FilterModal> */}
    </div>
  );
}

export default DataBarang;