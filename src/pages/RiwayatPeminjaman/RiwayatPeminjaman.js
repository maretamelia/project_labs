import React, { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';
import FilterModal from '../../components/FilterModal';
import { FiEdit2, FiTrash2, FiCalendar, FiMoreVertical } from 'react-icons/fi';
import './RiwayatPeminjaman.css';

function RiwayatPeminjaman() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');

  const itemsPerPage = 6;

  // Data dummy peminjaman
  const [peminjaman, setPeminjaman] = useState([
    {
      no: 1,
      nama: 'Alzel Denendra',
      namaBarang: 'Proyektor',
      jumlahBarang: 1,
      tanggalPeminjaman: '15/09/2025',
      tanggalKembali: '20/09/2025',
      status: 'Selesai'
    },
    {
      no: 2,
      nama: 'Alzel Denendra',
      namaBarang: 'Proyektor',
      jumlahBarang: 1,
      tanggalPeminjaman: '15/09/2025',
      tanggalKembali: '20/09/2025',
      status: 'Ditolak'
    },
    {
      no: 3,
      nama: 'Alzel Denendra',
      namaBarang: 'Proyektor',
      jumlahBarang: 1,
      tanggalPeminjaman: '15/09/2025',
      tanggalKembali: '20/09/2025',
      status: 'Ditolak'
    },
    {
      no: 4,
      nama: 'Alzel Denendra',
      namaBarang: 'Proyektor',
      jumlahBarang: 1,
      tanggalPeminjaman: '15/09/2025',
      tanggalKembali: '20/09/2025',
      status: 'Ditolak'
    },
    {
      no: 5,
      nama: 'Alzel Denendra',
      namaBarang: 'Proyektor',
      jumlahBarang: 1,
      tanggalPeminjaman: '15/09/2025',
      tanggalKembali: '20/09/2025',
      status: 'Selesai'
    },
    {
      no: 6,
      nama: 'Alzel Denendra',
      namaBarang: 'Proyektor',
      jumlahBarang: 1,
      tanggalPeminjaman: '15/09/2025',
      tanggalKembali: '20/09/2025',
      status: 'Selesai'
    }
  ]);

  // Filter data berdasarkan search term
  const filteredPeminjaman = peminjaman.filter(item =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.namaBarang.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredPeminjaman.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPeminjaman.slice(indexOfFirstItem, indexOfLastItem);

  // Handler functions
  const handleApplyFilter = () => {
    setIsFilterOpen(false);
    console.log('Filter applied:', { filterStatus, filterDateFrom, filterDateTo });
    // TODO: Implement filter logic
  };

  const handleResetFilter = () => {
    setFilterStatus('');
    setFilterDateFrom('');
    setFilterDateTo('');
  };

  const handleActionClick = (id, action) => {
    console.log(`Action ${action} for item ${id}`);
    // TODO: Implement action logic
  };

  return ( 
  <div className="RiwayatPeminjaman-container"> <PageHeader title="Daftar Peminjaman" subtitle="Daftar Peminjaman" />

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onOpenFilter={() => setIsFilterOpen(true)}
        placeholder="Cari peminjaman..."
      />

      {/* Table Container */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Nama Barang</th>
              <th>Jumlah Barang</th>
              <th>Tanggal Peminjaman</th>
              <th>Tanggal Kembali</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.no}>
                <td>{item.no}</td>
                <td>{item.nama}</td>
                <td>{item.namaBarang}</td>
                <td>{item.jumlahBarang}</td>
                <td>{item.tanggalPeminjaman}</td>
                <td>{item.tanggalKembali}</td>
                <td>
                  <span className={`status-badge ${item.status.toLowerCase()}`}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <button 
                    className="btn-action"
                    onClick={() => handleActionClick(item.no, 'view')}
                  >
                    <FiMoreVertical />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Info & Controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        currentItems={currentItems.length}
        totalItems={filteredPeminjaman.length}
        onPageChange={setCurrentPage}
      />

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleApplyFilter}
        onReset={handleResetFilter}
      >
        <div className="filter-section">
          <div className="filter-section-title">Status</div>
          <div className="filter-field">
            <select
              className="filter-input"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">Semua Status</option>
              <option value="selesai">Selesai</option>
              <option value="ditolak">Ditolak</option>
              <option value="dipinjam">Dipinjam</option>
            </select>
          </div>
        </div>

        <div className="filter-section">
          <div className="filter-section-title">Tanggal Peminjaman</div>
          <div className="filter-field">
            <label>Dari:</label>
            <input
              type="date"
              className="filter-input"
              value={filterDateFrom}
              onChange={(e) => setFilterDateFrom(e.target.value)}
            />
          </div>
          <div className="filter-field">
            <label>Sampai:</label>
            <input
              type="date"
              className="filter-input"
              value={filterDateTo}
              onChange={(e) => setFilterDateTo(e.target.value)}
            />
          </div>
        </div>
      </FilterModal>
    </div>
  );
}

export default RiwayatPeminjaman;