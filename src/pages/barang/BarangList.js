import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import PageHeader from '../../components/PageHeader';
import SearchBar from '../../components/SearchBar';
import './BarangList.css';

function DataBarang() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([]);

  // Dummy data
  useEffect(() => {
    setItems([
      { id: 1, name: 'Arduino Uno', image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400', stock: 25, available: 20, category: 'Microcontroller' },
      { id: 2, name: 'Breadboard', image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400', stock: 30, available: 25, category: 'Component' },
      { id: 3, name: 'LED Merah', image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400', stock: 100, available: 80, category: 'Component' },
    ]);
  }, []);

  // Handler tombol
  const handleAddItem = () => {
    navigate('/barang/create'); // arah ke halaman tambah barang
  };

  const handleEditItem = (id) => {
    navigate(`/barang/edit/${id}`); // arah ke halaman edit barang
  };

  const handleDeleteItem = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus barang ini?')) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleViewItem = (id) => {
    navigate(`/barang/${id}`); // arah ke halaman detail barang
  };

  // Filter search
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="content-wrapper">
          <PageHeader 
            title="Daftar Barang"
            subtitle="Kelola semua barang di sini"
          />

          <div className="toolbar">
            <SearchBar 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onOpenFilter={() => {}}
              placeholder="Cari barang..."
            />

            <button className="btn-add-item" onClick={handleAddItem}>
              <FiPlus /> Tambah Barang
            </button>
          </div>

          <div className="items-grid">
            {filteredItems.map(item => (
              <div key={item.id} className="item-card">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-info">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-stock">Tersedia: {item.available}/{item.stock}</p>
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataBarang;
