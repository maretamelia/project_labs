import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LihatDetailIcon from '../../../assets/icons/lihatdetail.svg';
import './RiwayatPeminjaman.css';
import SearchBar from '../../../components/SearchBar';
import Pagination from '../../../components/Pagination';
import FilterModal from '../../../components/FilterModal';
import { FiCalendar } from 'react-icons/fi';

function RiwayatPeminjaman() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterValues, setFilterValues] = useState({
    startDate: '',
    endDate: '',
    minJumlah: '',
    maxJumlah: ''
  });

  const ITEMS_PER_PAGE = 5;

  const [riwayatData] = useState([
    {
      id: 1,
      namaBarang: 'Proyektor',
      jumlah: 1,
      tanggalPinjam: '2025-05-13',
      tanggalKembali: '2025-05-15',
      status: 'Ditolak'
    },
    {
      id: 2,
      namaBarang: 'Laptop',
      jumlah: 1,
      tanggalPinjam: '2025-05-10',
      tanggalKembali: '2025-05-12',
      status: 'Selesai'
    },
    {
      id: 3,
      namaBarang: 'Kamera',
      jumlah: 2,
      tanggalPinjam: '2025-05-08',
      tanggalKembali: '2025-05-10',
      status: 'Selesai'
    },
    {
      id: 4,
      namaBarang: 'Speaker',
      jumlah: 1,
      tanggalPinjam: '2025-05-06',
      tanggalKembali: '2025-05-08',
      status: 'Selesai'
    }
  ]);

  const handleFilterChange = (key, value) => {
    setFilterValues(prev => ({
      ...prev,
      [key]: value
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
      maxJumlah: ''
    });
    setCurrentPage(1);
  };

  const filteredData = riwayatData.filter(item => {
    const matchSearch = item.namaBarang
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchMin =
      filterValues.minJumlah === '' ||
      item.jumlah >= Number(filterValues.minJumlah);

    const matchMax =
      filterValues.maxJumlah === '' ||
      item.jumlah <= Number(filterValues.maxJumlah);

    const itemDate = new Date(item.tanggalPinjam);

    const matchStartDate =
      filterValues.startDate === '' ||
      itemDate >= new Date(filterValues.startDate);

    const matchEndDate =
      filterValues.endDate === '' ||
      itemDate <= new Date(filterValues.endDate);

    return (
      matchSearch &&
      matchMin &&
      matchMax &&
      matchStartDate &&
      matchEndDate
    );
  });

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Handler untuk navigate ke detail peminjaman
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

      <div className="riwayat-table-wrapper">
        <table className="riwayat-table">
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
                <td colSpan="6" style={{ textAlign: 'center' }}>
                  Data tidak ditemukan
                </td>
              </tr>
            ) : (
              paginatedData.map(item => (
                <tr key={item.id}>
                  <td>{item.namaBarang}</td>
                  <td>{item.jumlah}</td>
                  <td>{item.tanggalPinjam}</td>
                  <td>{item.tanggalKembali}</td>
                  <td>
                    <span className={`status-badge ${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="aksi-cell">
                    <button
                      className="aksi-btn"
                      onClick={() => handleDetail(item.id)}
                      title="Lihat Detail"
                    >
                      <img
                        src={LihatDetailIcon}
                        alt="detail"
                        className="aksi-icon"
                      />
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
                  onChange={(e) =>
                    handleFilterChange('startDate', e.target.value)
                  }
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
                  onChange={(e) =>
                    handleFilterChange('endDate', e.target.value)
                  }
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
                onChange={(e) =>
                  handleFilterChange('minJumlah', e.target.value)
                }
                placeholder="0"
              />
            </div>

            <div className="filter-field">
              <label>Max</label>
              <input
                type="number"
                value={filterValues.maxJumlah}
                onChange={(e) =>
                  handleFilterChange('maxJumlah', e.target.value)
                }
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
    </div>
  );
}

export default RiwayatPeminjaman;