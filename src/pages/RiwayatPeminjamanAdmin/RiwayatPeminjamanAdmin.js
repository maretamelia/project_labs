import React, { useState, useEffect, useMemo } from 'react';
import PageHeader from '../../components/PageHeader';
import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';
import FilterModal from '../../components/FilterModal';
import DetailPeminjamanModal from './DetailPeminjamanAdmin';
import { BsThreeDots } from 'react-icons/bs';
import { getRiwayatPeminjamanAdmin } from '../../services/pinjamanServices';
import './RiwayatPeminjamanAdmin.css';

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
  const [riwayatData, setRiwayatData] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FORMAT TANGGAL ================= */
  const formatTanggal = (tanggal) => {
    if (!tanggal) return '-';
    const date = new Date(tanggal);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    fetchRiwayat();
  }, []);

  const fetchRiwayat = async () => {
    setLoading(true);
    try {
      const data = await getRiwayatPeminjamanAdmin();
      setRiwayatData(data || []);
    } catch (err) {
      console.error(err);
      alert('Gagal mengambil data riwayat!');
    } finally {
      setLoading(false);
    }
  };

  /* ================= FILTER ================= */
  const filteredData = useMemo(() => {
    return riwayatData.filter(item => {

      const namaBarang = item?.barang?.nama_barang?.toLowerCase() || '';
      const namaUser = item?.user?.name?.toLowerCase() || '';
      const search = searchTerm.toLowerCase();

      const matchSearch =
        namaBarang.includes(search) ||
        namaUser.includes(search);

      const matchMin =
        filterValues.minJumlah === '' ||
        item.jumlah >= Number(filterValues.minJumlah);

      const matchMax =
        filterValues.maxJumlah === '' ||
        item.jumlah <= Number(filterValues.maxJumlah);

      const itemDate = new Date(item.tanggal_peminjaman);

      const startDate = filterValues.startDate
        ? new Date(filterValues.startDate)
        : null;

      const endDate = filterValues.endDate
        ? new Date(filterValues.endDate + 'T23:59:59')
        : null;

      const matchStartDate =
        !startDate || itemDate >= startDate;

      const matchEndDate =
        !endDate || itemDate <= endDate;

      return matchSearch && matchMin && matchMax && matchStartDate && matchEndDate;
    });
  }, [riwayatData, searchTerm, filterValues]);

  /* ================= PAGINATION ================= */
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  /* ================= DETAIL ================= */
  const handleDetail = (item) => {
    setSelectedData({
      namaPeminjam: item?.user?.name || '-',
      namaBarang: item?.barang?.nama_barang || '-',
      jumlah: item?.jumlah || 0,
      tanggalPinjam: formatTanggal(item?.tanggal_peminjaman),
      tanggalKembali: formatTanggal(item?.tanggal_pengembalian),
      status: item?.status || '-'
    });
    setIsDetailModalOpen(true);
    setOpenMenuId(null);
  };

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  return (
    <div className="riwayat-page">
      <PageHeader title="Riwayat Peminjaman" subtitle="Daftar Riwayat Peminjaman" />

      <SearchBar
        placeholder="Cari nama barang atau peminjam..."
        searchTerm={searchTerm}
        onSearchChange={(value) => {
          setSearchTerm(value);
          setCurrentPage(1);
        }}
        onOpenFilter={() => setIsFilterOpen(true)}
      />

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>
      ) : (
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
                  <td colSpan="8" className="empty-table">Data tidak ditemukan</td>
                </tr>
              ) : (
                paginatedData.map((item, index) => (
                  <tr key={item.id}>
                    <td>{startIndex + index + 1}</td>
                    <td>{item?.user?.name || '-'}</td>
                    <td>{item?.barang?.nama_barang || '-'}</td>
                    <td>{item?.jumlah || 0}</td>
                    <td>{formatTanggal(item?.tanggal_peminjaman)}</td>
                    <td>{formatTanggal(item?.tanggal_pengembalian)}</td>
                    <td>
                      <span className={`status-badge ${item?.status?.toLowerCase() || ''}`}>
                        {item?.status || '-'}
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
      )}

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={() => {
          setCurrentPage(1);
          setIsFilterOpen(false);
        }}
        onReset={() => {
          setFilterValues({
            startDate: '',
            endDate: '',
            minJumlah: '',
            maxJumlah: ''
          });
          setCurrentPage(1);
        }}
      />

      <Pagination
        currentPage={currentPage}
        totalItems={filteredData.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
      />

      <DetailPeminjamanModal
        isOpen={isDetailModalOpen}
        data={selectedData}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedData(null);
        }}
      />
    </div>
  );
}

export default RiwayatPeminjamanAdmin;
