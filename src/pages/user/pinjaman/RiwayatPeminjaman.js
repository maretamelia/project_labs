import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LihatDetailIcon from '../../../assets/icons/lihatdetail.svg';
import './RiwayatPeminjaman.css';
import SearchBar from '../../../components/SearchBar';
import Pagination from '../../../components/Pagination';
import FilterModal from '../../../components/FilterModal';

function RiwayatPeminjaman() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  /* ===== FILTER STATE ===== */
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterValues, setFilterValues] = useState({
    startDate: '',
    endDate: '',
    minJumlah: '',
    maxJumlah: '',
    status: []
  });

  /* ===== DATA & LOADING ===== */
  const [riwayatData, setRiwayatData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ===== FETCH DATA ===== */
  useEffect(() => {
    const fetchRiwayat = async () => {
      try {
        setLoading(true);
        setError(null);

        // Ambil token dari localStorage atau sesuaikan
        const token = localStorage.getItem('token');

        const response = await axios.get(
          'http://localhost:8000/api/user/pinjaman/riwayat',
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json'
            }
          }
        );

        setRiwayatData(response.data.data);
      } catch (err) {
        console.error('Gagal fetch riwayat peminjaman:', err);
        setError('Gagal mengambil data riwayat peminjaman. Silakan login kembali.');
      } finally {
        setLoading(false);
      }
    };

    fetchRiwayat();
  }, []);

  /* ===== HANDLER FILTER ===== */
  const handleFilterChange = (key, value) => {
    setFilterValues(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleStatusChange = (value) => {
    setFilterValues(prev => ({
      ...prev,
      status: prev.status.includes(value)
        ? prev.status.filter(s => s !== value)
        : [...prev.status, value]
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

  /* ===== FILTER & SEARCH LOGIC ===== */
  const filteredData = riwayatData.filter(item => {
    const matchSearch = item.nama_barang
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchMin =
      filterValues.minJumlah === '' ||
      item.jumlah >= Number(filterValues.minJumlah);

    const matchMax =
      filterValues.maxJumlah === '' ||
      item.jumlah <= Number(filterValues.maxJumlah);

    const itemDate = new Date(item.tanggal_pinjam);

    const matchStartDate =
      !filterValues.startDate ||
      itemDate >= new Date(filterValues.startDate);

    const matchEndDate =
      !filterValues.endDate ||
      itemDate <= new Date(filterValues.endDate);

    const matchStatus =
      filterValues.status.length === 0 ||
      filterValues.status.includes(item.status);

    return (
      matchSearch &&
      matchMin &&
      matchMax &&
      matchStartDate &&
      matchEndDate &&
      matchStatus
    );
  });

  /* ===== PAGINATION ===== */
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleDetail = (id) => {
    navigate(`/user/pinjaman/${id}`);
  };

  return (
    <div className="riwayat-page">
      <div className="riwayat-header">
        <h1 className="riwayat-header-title">Riwayat Peminjaman</h1>
        <p className="riwayat-header-subtitle">Daftar Riwayat Peminjaman</p>
      </div>

      <SearchBar
        placeholder="Cari nama barang..."
        searchTerm={searchTerm}
        onSearchChange={(value) => {
          setSearchTerm(value);
          setCurrentPage(1);
        }}
        onOpenFilter={() => setIsFilterOpen(true)}
      />

      {/* TABLE */}
      <div className="riwayat-table-wrapper">
        <table className="riwayat-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Barang</th>
              <th>Jumlah</th>
              <th>Tanggal Pinjam</th>
              <th>Tanggal Kembali</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="empty-table">Loading...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="7" className="empty-table">{error}</td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan="7" className="empty-table">Data tidak ditemukan</td>
              </tr>
            ) : (
              paginatedData.map((item, index) => (
                <tr key={item.id}>
                  <td>{startIndex + index + 1}</td>
                  <td>{item.nama_barang}</td>
                  <td>{item.jumlah}</td>
                  <td>{item.tanggal_pinjam}</td>
                  <td>{item.tanggal_kembali}</td>
                  <td>
                    <span className={`status-badge ${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="aksi-cell">
                    <button
                      className="aksi-btn1"
                      onClick={() => handleDetail(item.id)}
                    >
                      <img src={LihatDetailIcon} alt="detail" className="aksi-icon" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* FILTER MODAL */}
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
              <input
                type="date"
                className="filter-input-date"
                value={filterValues.startDate}
                onChange={(e) =>
                  handleFilterChange('startDate', e.target.value)
                }
              />
            </div>

            <div className="filter-field">
              <label>Ke</label>
              <input
                type="date"
                className="filter-input-date"
                value={filterValues.endDate}
                onChange={(e) =>
                  handleFilterChange('endDate', e.target.value)
                }
              />
            </div>
          </div>
        </div>

        <div className="filter-section">
          <div className="filter-section-title">Jumlah</div>
          <div className="filter-row">
            <div className="filter-field">
              <label>Min</label>
              <input
                type="number"
                className="filter-input"
                placeholder="Contoh : 1"
                value={filterValues.minJumlah}
                onChange={(e) =>
                  handleFilterChange('minJumlah', e.target.value)
                }
              />
            </div>
            <div className="filter-field">
              <label>Max</label>
              <input
                type="number"
                className="filter-input"
                placeholder="Contoh : 10"
                value={filterValues.maxJumlah}
                onChange={(e) =>
                  handleFilterChange('maxJumlah', e.target.value)
                }
              />
            </div>
          </div>
        </div>

        <div className="filter-section">
          <div className="filter-section-title">Status Peminjaman</div>
          <div className="filter-checkbox-group">
            {['Selesai', 'Ditolak'].map(status => (
              <label key={status} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filterValues.status.includes(status)}
                  onChange={() => handleStatusChange(status)}
                />
                {status}
              </label>
            ))}
          </div>
        </div>
      </FilterModal>

      <Pagination
        currentPage={currentPage}
        totalItems={filteredData.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default RiwayatPeminjaman;
