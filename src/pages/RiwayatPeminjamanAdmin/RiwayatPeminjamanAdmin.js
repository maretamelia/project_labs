import React, { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import './RiwayatPeminjamanAdmin.css';
import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';
import FilterModal from '../../components/FilterModal';
import DetailPeminjamanModal from './DetailPeminjamanAdmin';
import { BsThreeDots } from 'react-icons/bs';

function RiwayatPeminjamanAdmin() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState(null);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

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
      namaPeminjam: 'Alzel Danendra',
      namaBarang: 'Proyektor',
      jumlah: 1,
      tanggalPinjam: '2025-05-13',
      tanggalKembali: '2025-05-15',
      status: 'Ditolak'
    },
    {
      id: 2,
      namaPeminjam: 'Algioziel Malik',
      namaBarang: 'Laptop',
      jumlah: 1,
      tanggalPinjam: '2025-05-10',
      tanggalKembali: '2025-05-12',
      status: 'Selesai'
    },
    {
      id: 3,
      namaPeminjam: 'Mikaila Anjasmana',
      namaBarang: 'Kamera',
      jumlah: 2,
      tanggalPinjam: '2025-05-08',
      tanggalKembali: '2025-05-10',
      status: 'Selesai'
    },
    {
      id: 4,
      namaPeminjam: 'Jingga',
      namaBarang: 'Speaker',
      jumlah: 1,
      tanggalPinjam: '2025-05-06',
      tanggalKembali: '2025-05-08',
      status: 'Selesai'
    }
  ]);

  /* ===== HANDLER ===== */
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

  /* ===== FILTER LOGIC ===== */
  const filteredData = riwayatData.filter(item => {
    const matchSearch =
      item.namaBarang.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.namaPeminjam.toLowerCase().includes(searchTerm.toLowerCase());

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

  /* ===== PAGINATION ===== */
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  /* ===== AKSI ===== */
  const handleDetail = (item) => {
    setSelectedData(item);
    setIsDetailModalOpen(true);
    setOpenMenuId(null);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedData(null);
  };

  const handleHapus = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      // console.log('Hapus peminjaman id:', id);
      setOpenMenuId(null);
    }
  };

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  return (
    <div className="riwayat-page">
      <PageHeader
        title="Riwayat Peminjaman"
        subtitle="Daftar Riwayat Peminjaman"
      />

      <SearchBar
        placeholder="Cari nama barang atau peminjam..."
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
              <th>No</th>
              <th>Nama</th>
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
                <td colSpan="8" className="empty-table">
                  Data tidak ditemukan
                </td>
              </tr>
            ) : (
              paginatedData.map((item, index) => (
                <tr key={item.id}>
                  <td>{startIndex + index + 1}</td>
                  <td>{item.namaPeminjam}</td>
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
                    <div className="aksi-menu-wrapper">
                      <button
                        className="aksi-btn-ellipsis"
                        onClick={() => toggleMenu(item.id)}
                      >
                        <BsThreeDots />
                      </button>

                      {openMenuId === item.id && (
                        <div className="aksi-dropdown-menu">
                          <button
                            className="aksi-dropdown-item detail"
                            onClick={() => handleDetail(item)}
                          >
                            Detail
                          </button>
                          <button
                            className="aksi-dropdown-item hapus"
                            onClick={() => handleHapus(item.id)}
                          >
                            Hapus
                          </button>
                        </div>
                      )}
                    </div>
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
                value={filterValues.endDate}
                onChange={(e) =>
                  handleFilterChange('endDate', e.target.value)
                }
              />
            </div>
          </div>
        </div>

        <div className="filter-section">
          <div className="filter-section-title">Jumlah Barang</div>
          <div className="filter-row">
            <div className="filter-field">
              <label>Min</label>
              <input
                type="number"
                placeholder="0"
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
                placeholder="999"
                value={filterValues.maxJumlah}
                onChange={(e) =>
                  handleFilterChange('maxJumlah', e.target.value)
                }
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

      <DetailPeminjamanModal
        isOpen={isDetailModalOpen}
        data={selectedData}
        onClose={handleCloseDetailModal}
      />
    </div>
  );
}

export default RiwayatPeminjamanAdmin;
