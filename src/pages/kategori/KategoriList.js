import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import PageHeader from '../../components/PageHeader';
import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';
import FilterModal from '../../components/FilterModal';
import {
  getKategoris,
  createKategori,
  updateKategori,
  deleteKategori
} from '../../services/kategoriservices';
import './KategoriList.css';

function KategoriList() {
  const [kategori, setKategori] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [namaKategori, setNamaKategori] = useState('');
  const [editKategori, setEditKategori] = useState(null);
  const itemsPerPage = 6;

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterValues, setFilterValues] = useState({
    startDate: '',
    endDate: '',
    minJumlah: '',
    maxJumlah: ''
  });

  const handleFilterChange = (key, value) => {
    setFilterValues({ ...filterValues, [key]: value });
  };

  const handleApplyFilter = () => {
    console.log('Filter applied:', filterValues);
    setIsFilterOpen(false);
  };

  const handleResetFilter = () => {
    setFilterValues({
      startDate: '',
      endDate: '',
      minJumlah: '',
      maxJumlah: ''
    });
  };

  // ===== Fetch Kategori dari Backend =====
  useEffect(() => {
    fetchKategori();
  }, []);

  const fetchKategori = async () => {
    try {
      const response = await getKategoris();
      setKategori(response.data.data || response.data);
    } catch (error) {
      console.error('Gagal fetch kategori:', error);
    }
  };

  // ===== Tambah Kategori =====
  const handleAddKategori = async () => {
    if (!namaKategori.trim()) return;

    try {
      const response = await createKategori({ nama_kategori: namaKategori });
      const newKategori = response.data.data;
      setKategori([newKategori, ...kategori]);
      setNamaKategori('');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Gagal menambah kategori:', error);
      alert('Gagal menambah kategori');
    }
  };

  // ===== Edit Kategori =====
  const handleEditClick = (k) => {
    setEditKategori(k);
    setIsEditModalOpen(true);
  };

  const handleUpdateKategori = async () => {
    if (!editKategori || !editKategori.nama_kategori?.trim()) return;

    try {
      const response = await updateKategori(editKategori.id, {
        nama_kategori: editKategori.nama_kategori
      });
      const updatedKategori = response.data.data;
      setKategori(kategori.map(k =>
        k.id === updatedKategori.id ? updatedKategori : k
      ));
      setIsEditModalOpen(false);
      setEditKategori(null);
    } catch (error) {
      console.error('Gagal mengupdate kategori:', error);
      alert('Gagal mengupdate kategori');
    }
  };

  // ===== Delete Kategori =====
  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus kategori ini?')) return;

    try {
      await deleteKategori(id);
      setKategori(kategori.filter(k => k.id !== id));
    } catch (error) {
      console.error('Gagal menghapus kategori:', error);
      alert('Gagal menghapus kategori');
    }
  };

  // ===== Filter/Search/Pagination =====
  const filteredKategori = kategori.filter(k =>
    (k.nama_kategori || k.name).toLowerCase().includes(searchTerm.toLowerCase())
  )
.sort((a, b) => b.id - a.id);
  const totalPages = Math.ceil(filteredKategori.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredKategori.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="kategori-container">
      <PageHeader title="Kategori Barang" subtitle="Daftar kategori" />

      <div className="kategori-controls">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onOpenFilter={() => setIsFilterOpen(true)}
          placeholder="Cari kategori..."
        />
        <button onClick={() => setIsModalOpen(true)} className="btn-add">
          + Tambah Kategori
        </button>
      </div>

      <div className="table-wrapper">
        <table className="kategori-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Kategori</th>
              <th>Total Barang</th>
              <th>Dibuat Tanggal</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((k, index) => (
              <tr key={k.id}>
                <td>{indexOfFirstItem + index + 1}.</td>
                <td>{k.nama_kategori || k.name}</td>
                <td>{k.barangs_count || 0} item</td>
                <td>{k.created_at ? k.created_at.split('T')[0] : '-'}</td>
                <td>
                  <div className="action-buttons">
                    <button onClick={() => handleEditClick(k)} className="btn-edit">
                      <FiEdit2 />
                    </button>
                    <button onClick={() => handleDelete(k.id)} className="btn-delete">
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        currentItems={currentItems.length}
        totalItems={filteredKategori.length}
        onPageChange={setCurrentPage}
      />

      {/* Modal Tambah */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Tambah Kategori Baru</h3>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Nama</label>
                <input
                  type="text"
                  placeholder="Nama Kategori"
                  value={namaKategori}
                  onChange={(e) => setNamaKategori(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" onClick={() => setIsModalOpen(false)} className="btn-batal">
                Batal
              </button>
              <button onClick={handleAddKategori} className="btn-tambah">
                Tambah
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edit */}
      {isEditModalOpen && editKategori && (
        <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Kategori</h3>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Nama</label>
                <input
                  type="text"
                  placeholder="Nama Kategori"
                  value={editKategori.nama_kategori || editKategori.name}
                  onChange={(e) =>
                    setEditKategori({ ...editKategori, nama_kategori: e.target.value })
                  }
                  className="form-input"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" onClick={() => setIsEditModalOpen(false)} className="btn-batal">
                Batal
              </button>
              <button onClick={handleUpdateKategori} className="btn-tambah">
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleApplyFilter}
        onReset={handleResetFilter}
      >
        <div className="filter-section">
          <div className="filter-section-title">Tanggal</div>
          <div className="filter-row">
            <div className="filter-field">
              <label>Dari :</label>
              <div className="filter-input-with-icon">
                <input
                  type="date"
                  value={filterValues.startDate}
                  onChange={(e) =>
                    handleFilterChange('startDate', e.target.value)
                  }
                  className="filter-input"
                />
              </div>
            </div>

            <div className="filter-field">
              <label>Ke :</label>
              <div className="filter-input-with-icon">
                <input
                  type="date"
                  value={filterValues.endDate}
                  onChange={(e) =>
                    handleFilterChange('endDate', e.target.value)
                  }
                  className="filter-input"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="filter-section">
          <div className="filter-section-title">Jumlah Produk</div>
          <div className="filter-row">
            <div className="filter-field">
              <label>Min Jumlah</label>
              <input
                type="number"
                value={filterValues.minJumlah}
                onChange={(e) =>
                  handleFilterChange('minJumlah', e.target.value)
                }
                className="filter-input"
              />
            </div>

            <div className="filter-field">
              <label>Max Jumlah</label>
              <input
                type="number"
                value={filterValues.maxJumlah}
                onChange={(e) =>
                  handleFilterChange('maxJumlah', e.target.value)
                }
                className="filter-input"
              />
            </div>
          </div>
        </div>
      </FilterModal>
    </div>
  );
}

export default KategoriList;
