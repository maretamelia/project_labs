// PinjamanSaya.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PinjamanSaya.css';
import DetailPinjaman from './DetailPinjaman';
import SearchBar from '../../../components/SearchBar';
import Pagination from '../../../components/Pagination';
import FilterModal from '../../../components/FilterModal';
import { FiCalendar } from 'react-icons/fi';
import EditIcon from '../../../assets/icons/edit.svg';
import LihatDetailIcon from '../../../assets/icons/lihatdetail.svg';

function PinjamanSaya() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDetailPopupOpen, setIsDetailPopupOpen] = useState(false);
  const [selectedPinjaman, setSelectedPinjaman] = useState(null);
  const [filterValues, setFilterValues] = useState({
    startDate: '',
    endDate: '',
    minJumlah: '',
    maxJumlah: ''
  });

  const ITEMS_PER_PAGE = 5;

  const [pinjaman] = useState([
    { id: 1, nama: 'Proyektor', jumlah: 1, tanggalPinjam: '2025-09-15', tanggalKembali: '2025-09-20', status: 'Menunggu' },
    { id: 2, nama: 'Laptop', jumlah: 1, tanggalPinjam: '2025-09-12', tanggalKembali: '2025-09-18', status: 'Dipinjam' },
    { id: 3, nama: 'Kamera', jumlah: 2, tanggalPinjam: '2025-09-10', tanggalKembali: '2025-09-15', status: 'Dikembalikan' },
    { id: 4, nama: 'Speaker', jumlah: 1, tanggalPinjam: '2025-09-05', tanggalKembali: '2025-09-10', status: 'Terlambat' },
    { id: 5, nama: 'Mic', jumlah: 1, tanggalPinjam: '2025-09-01', tanggalKembali: '2025-09-05', status: 'Disetujui' },
  ]);

  const handleEdit = (item) => {
    navigate(`/user/EditPinjaman/${item.id}`, { state: { item } });
  };

  const handleDetail = (item) => {
    setSelectedPinjaman(item);
    setIsDetailPopupOpen(true);
  };

  const handleCloseDetailPopup = () => {
    setIsDetailPopupOpen(false);
    setSelectedPinjaman(null);
  };

  const handleBuatPeminjaman = () => {
    navigate('/user/pinjaman/create');
  };

  const handleFilterChange = (key, value) => {
    setFilterValues(prev => ({ ...prev, [key]: value }));
  };

  const handleApplyFilter = () => {
    setCurrentPage(1);
    setIsFilterOpen(false);
  };

  const handleResetFilter = () => {
    setFilterValues({ startDate: '', endDate: '', minJumlah: '', maxJumlah: '' });
    setCurrentPage(1);
  };

  const filteredData = pinjaman.filter(item => {
    const matchSearch = item.nama.toLowerCase().includes(searchTerm.toLowerCase());
    const matchMin = filterValues.minJumlah === '' || item.jumlah >= Number(filterValues.minJumlah);
    const matchMax = filterValues.maxJumlah === '' || item.jumlah <= Number(filterValues.maxJumlah);
    const itemDate = new Date(item.tanggalPinjam);
    const matchStartDate = filterValues.startDate === '' || itemDate >= new Date(filterValues.startDate);
    const matchEndDate = filterValues.endDate === '' || itemDate <= new Date(filterValues.endDate);
    return matchSearch && matchMin && matchMax && matchStartDate && matchEndDate;
  });

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const getStatusClass = status => status.toLowerCase();

  return (
    <div className="pinjaman-page">
      <div className="pinjaman-header">
        <h1 className="pinjaman-header-title">Pinjaman Saya</h1>
        <p className="pinjaman-header-subtitle">Daftar Barang Yang Dipinjam</p>
      </div>

      <div className="pinjaman-topbar">
        <SearchBar
          placeholder="Cari nama barang..."
          searchTerm={searchTerm}
          onSearchChange={(value) => {
            setSearchTerm(value);
            setCurrentPage(1);
          }}
          onOpenFilter={() => setIsFilterOpen(true)}
        />
        <button className="btn-add" onClick={handleBuatPeminjaman}>
          + Buat Peminjaman
        </button>
      </div>

      <div className="pinjaman-table-wrapper">
        <table className="pinjaman-table">
          <thead>
            <tr>
              <th>Nama Barang</th>
              <th>Jumlah</th>
              <th>Tanggal Pinjam</th>
              <th>Tanggal Kembali</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty-table">Data tidak ditemukan</td>
              </tr>
            ) : (
              paginatedData.map(item => (
                <tr key={item.id}>
                  <td>{item.nama}</td>
                  <td>{item.jumlah}</td>
                  <td>{item.tanggalPinjam}</td>
                  <td>{item.tanggalKembali}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="aksi-cell">
                    {item.status === 'Menunggu' && (
                      <button
                        className="aksi-btn edit-btn"
                        onClick={() => handleEdit(item)}
                        title="Edit"
                      >
                        <img src={EditIcon} alt="Edit" className="aksi-icon"/>
                      </button>
                    )}
                    <button
                      className="aksi-btn view-btn"
                      onClick={() => handleDetail(item)}
                      title="Detail"
                    >
                      <img src={LihatDetailIcon} alt="Detail" className="aksi-icon"/>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

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
              <label>Dari</label>
              <div className="filter-input-with-icon">
                <FiCalendar />
                <input
                  type="date"
                  value={filterValues.startDate}
                  onChange={(e) => handleFilterChange('startDate', e.target.value)}
                />
              </div>
            </div>
            <div className="filter-field">
              <label>Ke</label>
              <div className="filter-input-with-icon">
                <FiCalendar />
                <input
                  type="date"
                  value={filterValues.endDate}
                  onChange={(e) => handleFilterChange('endDate', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="filter-section">
          <div className="filter-section-title">Jumlah Produk</div>
          <div className="filter-row">
            <div className="filter-field">
              <label>Min</label>
              <input
                type="number"
                value={filterValues.minJumlah}
                onChange={(e) => handleFilterChange('minJumlah', e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="filter-field">
              <label>Max</label>
              <input
                type="number"
                value={filterValues.maxJumlah}
                onChange={(e) => handleFilterChange('maxJumlah', e.target.value)}
                placeholder="999"
              />
            </div>
          </div>
        </div>
      </FilterModal>

      <Pagination
        currentPage={currentPage}
        totalItems={filteredData.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
      />

      <DetailPinjaman 
        isOpen={isDetailPopupOpen}
        onClose={handleCloseDetailPopup}
        data={selectedPinjaman}
      />
    </div>
  );
}

export default PinjamanSaya;