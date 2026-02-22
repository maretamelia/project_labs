import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import PageHeader from '../../components/PageHeader';
import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination'; // Import komponen pagination yang sama
import FilterModal from '../../components/FilterModal';
import { getBarangs, deleteBarang } from '../../services/barangservices';
import Swal from 'sweetalert2';
import './BarangList.css';

function DataBarang() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // State halaman
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const itemsPerPage = 8; // Set 8 sesuai permintaanmu

  const [filterValues, setFilterValues] = useState({
    kategori: 'All',
    minStock: '',
    maxStock: '',
  });

  useEffect(() => {
    fetchBarang();
  }, []);

  const fetchBarang = async () => {
    try {
      const response = await getBarangs();
      const rawData = response?.data || response; 
      const list = Array.isArray(rawData.data) ? rawData.data : (Array.isArray(rawData) ? rawData : []);

      const formatted = list.map(item => ({
        id: item.id,
        name: item.nama_barang || item.nama || 'Tanpa Nama',
        image: item.image 
          ? `http://localhost:8000/storage/${item.image}` 
          : 'https://via.placeholder.com/150',
        stock: Number(item.stok || 0),
        available: Number(item.stok || 0) - (item.stok_dipinjam || 0),
        category: item.kategori?.nama_kategori || '-',
      }));

      setItems(formatted);
    } catch (err) {
      console.error('Gagal fetch barang', err);
    }
  };

  // Reset page ke 1 kalau lagi search
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterValues]);

  const handleDeleteItem = async (id) => {
  Swal.fire({
    title: 'Yakin hapus?',
    text: 'Barang akan dihapus permanen!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Ya, hapus!',
    cancelButtonText: 'Batal'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await deleteBarang(id);

        setItems(prevItems =>
          prevItems.filter(item => item.id !== id)
        );

        Swal.fire({
          icon: 'success',
          title: 'Berhasil!',
          text: 'Barang berhasil dihapus',
          timer: 1500,
          showConfirmButton: false
        });

      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Gagal!',
          text: error.response?.data?.message || 'Gagal menghapus barang'
        });
      }
    }
  });
};

  // Logika Filter
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterValues.kategori === 'All' || item.category === filterValues.kategori;
    const matchesMinStock = filterValues.minStock === '' || item.stock >= parseInt(filterValues.minStock);
    const matchesMaxStock = filterValues.maxStock === '' || item.stock <= parseInt(filterValues.maxStock);
    return matchesSearch && matchesCategory && matchesMinStock && matchesMaxStock;
  })
  .sort((a, b) => b.id - a.id);

  // Logika Pagination (Sama persis dengan KategoriList)
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="content-wrapper1">
          <PageHeader title="Daftar Barang" subtitle="Daftar Barang Tersedia" />

          <div className="toolbar">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onOpenFilter={() => setIsFilterOpen(true)}
              placeholder="Cari barang..."
            />
            <button className="btn-add-item" onClick={() => navigate('/barang/create')}>
              <FiPlus /> Tambah Barang
            </button>
          </div>

          <div className="items-grid">
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
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
                    <button className="btn-detail" onClick={() => navigate(`/barang/${item.id}`)}>
                      Selengkapnya
                    </button>
                    <button className="btn-icon btn-edit" onClick={() => navigate(`/barang/edit/${item.id}`)}>
                      <FiEdit2 />
                    </button>
                    <button className="btn-icon btn-delete" onClick={() => handleDeleteItem(item.id)}>
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-items"><p>Barang tidak ditemukan.</p></div>
            )}
          </div>

          {/* Panggil komponen Pagination yang sama dengan Kategori */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            currentItems={currentItems.length}
            totalItems={filteredItems.length}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* Filter Modal (Opsional, sesuaikan isinya) */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={() => setIsFilterOpen(false)}
        onReset={() => setFilterValues({ kategori: 'All', minStock: '', maxStock: '' })}
      >
        {/* Isi field filter kamu di sini */}
      </FilterModal>
    </div>
  );
}

export default DataBarang;