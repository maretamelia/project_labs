import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PinjamanSaya.css';
import AddProductModal from '../../../components/AddProductModal';
import DetailPinjaman from './DetailPinjaman';
import SearchBar from '../../../components/SearchBar';
import Pagination from '../../../components/Pagination';
import FilterModal from '../../../components/FilterModal';
import EditIcon from '../../../assets/icons/edit.svg';
import LihatDetailIcon from '../../../assets/icons/lihatdetail.svg';

const STATUS_LIST = [
  'Menunggu',
  'Disetujui',
  'Dipinjam',
  'Dikembalikan',
  'Ditolak',
  'Terlambat'
];

function PinjamanSaya() {
  const navigate = useNavigate();
  const ITEMS_PER_PAGE = 5;

  /* ================= STATE ================= */
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDetailPopupOpen, setIsDetailPopupOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [selectedPinjaman, setSelectedPinjaman] = useState(null);

  const [filterValues, setFilterValues] = useState({
    startDate: '',
    endDate: '',
    minJumlah: '',
    maxJumlah: '',
    status: []
  });

  /* ================= DATA DUMMY ================= */
  const [pinjaman] = useState([
    { id: 1, nama: 'Proyektor', jumlah: 1, tanggalPinjam: '2025-09-15', tanggalKembali: '2025-09-20', status: 'Menunggu' },
    { id: 2, nama: 'Laptop', jumlah: 1, tanggalPinjam: '2025-09-12', tanggalKembali: '2025-09-18', status: 'Dipinjam' },
    { id: 3, nama: 'Kamera', jumlah: 2, tanggalPinjam: '2025-09-10', tanggalKembali: '2025-09-15', status: 'Dikembalikan' },
    { id: 4, nama: 'Speaker', jumlah: 1, tanggalPinjam: '2025-09-05', tanggalKembali: '2025-09-10', status: 'Terlambat' },
    { id: 5, nama: 'Mic', jumlah: 1, tanggalPinjam: '2025-09-01', tanggalKembali: '2025-09-05', status: 'Disetujui' },
  ]);

  /* ================= HANDLER ================= */
  const handleFilterChange = (key, value) => {
    setFilterValues(prev => ({ ...prev, [key]: value }));
  };

  const handleStatusChange = (status) => {
    setFilterValues(prev => ({
      ...prev,
      status: prev.status.includes(status)
        ? prev.status.filter(s => s !== status)
        : [...prev.status, status]
    }));
  };

  const handleApplyFilter = () => {
    setCurrentPage(1);
    setIsFilterOpen(false);
  };

  const handleResetFilter = () => {
    setFilterValues({
      startDate: '',
      endDate: '',
      minJumlah: '',
      maxJumlah: '',
      status: []
    });
    setCurrentPage(1);
  };

  const handleEdit = (item) => {
    navigate(`/user/EditPinjaman/${item.id}`, { state: { item } });
  };

  const handleDetail = (item) => {
    setSelectedPinjaman(item);
    setIsDetailPopupOpen(true);
  };

  const handleSelectProduct = (barang) => {
    navigate('/user/pinjaman/create', { state: { selectedBarang: barang } });
  };

  /* ================= FILTER LOGIC ================= */
  const filteredData = pinjaman.filter(item => {
    const matchSearch = item.nama.toLowerCase().includes(searchTerm.toLowerCase());
    const matchMin = filterValues.minJumlah === '' || item.jumlah >= Number(filterValues.minJumlah);
    const matchMax = filterValues.maxJumlah === '' || item.jumlah <= Number(filterValues.maxJumlah);
    const itemDate = new Date(item.tanggalPinjam);
    const matchStartDate = !filterValues.startDate || itemDate >= new Date(filterValues.startDate);
    const matchEndDate = !filterValues.endDate || itemDate <= new Date(filterValues.endDate);
    const matchStatus = filterValues.status.length === 0 || filterValues.status.includes(item.status);
    return matchSearch && matchMin && matchMax && matchStartDate && matchEndDate && matchStatus;
  });

  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getStatusClass = status => status.toLowerCase();

  /* ================= RENDER ================= */
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
        <button className="btn-add" onClick={() => setIsAddProductOpen(true)}>
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
              <th style={{ minWidth: '120px' }}>Aksi</th> {/* pastikan kolom aksi ga kepotong */}
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
                      <button className="aksi-btn edit-btn" onClick={() => handleEdit(item)}>
                        <img src={EditIcon} alt="Edit" />
                      </button>
                    )}
                    <button className="aksi-btn view-btn" onClick={() => handleDetail(item)}>
                      <img src={LihatDetailIcon} alt="Detail" />
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
            {['startDate', 'endDate'].map((key, i) => (
              <div className="filter-field" key={key}>
                <label>{i === 0 ? 'Dari' : 'Ke'}</label>
                <input
                  type="date"
                  value={filterValues[key]}
                  onChange={(e) => handleFilterChange(key, e.target.value)}
                  className="filter-input"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <div className="filter-section-title">Status Peminjaman</div>
          {STATUS_LIST.map(status => (
            <label key={status} className="filter-checkbox1">
              <input
                type="checkbox"
                checked={filterValues.status.includes(status)}
                onChange={() => handleStatusChange(status)}
              />
              {status}
            </label>
          ))}
        </div>
      </FilterModal>

      <AddProductModal
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        onSelectProduct={handleSelectProduct}
      />

      <Pagination
        currentPage={currentPage}
        totalItems={filteredData.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
      />

      <DetailPinjaman
        isOpen={isDetailPopupOpen}
        onClose={() => setIsDetailPopupOpen(false)}
        data={selectedPinjaman}
      />
    </div>
  );
}

export default PinjamanSaya;
