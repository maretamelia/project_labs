import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiCalendar } from 'react-icons/fi';
import PageHeader from '../../components/PageHeader';
import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';
import FilterModal from '../../components/FilterModal';
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

  useEffect(() => {
    const dummyData = [
      { id: 1, name: 'Mikrokontroler', totalBarang: 0, tanggalDibuat: '13 Mei 2026' },
      { id: 2, name: 'Sensor', totalBarang: 28, tanggalDibuat: '13 Mei 2026' },
      { id: 3, name: 'Mikrokontroler', totalBarang: 0, tanggalDibuat: '13 Mei 2026' },
      { id: 4, name: 'Sensor', totalBarang: 48, tanggalDibuat: '13 Mei 2026' },
      { id: 5, name: 'Mikrokontroler', totalBarang: 58, tanggalDibuat: '13 Mei 2026' },
      { id: 6, name: 'Sensor', totalBarang: 68, tanggalDibuat: '13 Mei 2026' },
      { id: 7, name: 'Aktuator', totalBarang: 12, tanggalDibuat: '13 Mei 2026' },
      { id: 8, name: 'Display', totalBarang: 35, tanggalDibuat: '13 Mei 2026' },
    ];
    setKategori(dummyData);
  }, []);

  const handleAddKategori = () => {
    if (namaKategori.trim()) {
      const newKategori = {
        id: Date.now(),
        name: namaKategori,
        totalBarang: 0,
        tanggalDibuat: new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
      };
      setKategori([newKategori, ...kategori]);
      setNamaKategori('');
      setIsModalOpen(false);
    }
  };

  const handleEditClick = (k) => {
    setEditKategori(k);
    setIsEditModalOpen(true);
  };

  const handleUpdateKategori = () => {
    if (editKategori && editKategori.name.trim()) {
      setKategori(kategori.map(k => k.id === editKategori.id ? editKategori : k));
      setIsEditModalOpen(false);
      setEditKategori(null);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus kategori ini?')) {
      setKategori(kategori.filter(k => k.id !== id));
    }
  };

  const filteredKategori = kategori.filter(k =>
    k.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <th>Total Produk</th>
              <th>Dibuat Tanggal</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((k, index) => (
              <tr key={k.id}>
                <td>{indexOfFirstItem + index + 1}.</td>
                <td>{k.name}</td>
                <td>{k.totalBarang} item</td>
                <td>{k.tanggalDibuat}</td>
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

      {/* Modal Tambah Kategori */}
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

      {/* Modal Edit Kategori */}
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
                  value={editKategori.name}
                  onChange={(e) => setEditKategori({ ...editKategori, name: e.target.value })}
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
        {/* Konten filter */}
        <div className="filter-section">
          <div className="filter-section-title">Tanggal</div>
          <div className="filter-row">
            <div className="filter-field">
              <label>Dari :</label>
              <div className="filter-input-with-icon">
                <FiCalendar className="filter-input-icon" />
                <input
                  type="date"
                  value={filterValues.startDate}
                  onChange={(e) => handleFilterChange('startDate', e.target.value)}
                  className="filter-input"
                />
              </div>
            </div>
            <div className="filter-field">
              <label>Ke :</label>
              <div className="filter-input-with-icon">
                <FiCalendar className="filter-input-icon" />
                <input
                  type="date"
                  value={filterValues.endDate}
                  onChange={(e) => handleFilterChange('endDate', e.target.value)}
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
                placeholder="Contoh : 1"
                value={filterValues.minJumlah}
                onChange={(e) => handleFilterChange('minJumlah', e.target.value)}
                className="filter-input"
              />
            </div>
            <div className="filter-field">
              <label>Max Jumlah</label>
              <input
                type="number"
                placeholder="Contoh : 10"
                value={filterValues.maxJumlah}
                onChange={(e) => handleFilterChange('maxJumlah', e.target.value)}
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
