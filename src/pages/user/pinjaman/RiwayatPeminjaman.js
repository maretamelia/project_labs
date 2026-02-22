import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LihatDetailIcon from '../../../assets/icons/lihatdetail.svg';
import './RiwayatPeminjaman.css';
import SearchBar from '../../../components/SearchBar';
import Pagination from '../../../components/Pagination';
import DetailPinjaman from './DetailPinjaman';

function RiwayatPeminjaman() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedData, setSelectedData] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const ITEMS_PER_PAGE = 5;

  const [setIsFilterOpen] = useState(false);
  const [filterValues] = useState({
    startDate: '',
    endDate: '',
    minJumlah: '',
    maxJumlah: '',
    status: []
  });

  const [riwayatData, setRiwayatData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const fetchRiwayat = async () => {
      try {
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
        setError('Gagal mengambil data riwayat peminjaman.');
      } finally {
        setLoading(false);
      }
    };

    fetchRiwayat();
  }, []);

  /* ================= FILTER ================= */
  const filteredData = riwayatData.filter(item => {
    const matchSearch = (item.barang?.nama_barang || '')
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchMin =
      filterValues.minJumlah === '' ||
      item.jumlah >= Number(filterValues.minJumlah);

    const matchMax =
      filterValues.maxJumlah === '' ||
      item.jumlah <= Number(filterValues.maxJumlah);

    const matchStatus =
      filterValues.status.length === 0 ||
      filterValues.status.includes(item.status);

    return matchSearch && matchMin && matchMax && matchStatus;
  });

  /* ================= PAGINATION ================= */
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

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

                  <td>{item.barang?.nama_barang || '-'}</td>

                  <td>{item.jumlah}</td>

                  {/* TANGGAL PINJAM FIX */}
                  <td>
                    {item.tanggal_peminjaman
                      ? item.tanggal_peminjaman.split('T')[0]
                      : '-'}
                  </td>

                  {/* TANGGAL KEMBALI FIX */}
                  <td>
                    {item.tanggal_pengembalian
                      ? item.tanggal_pengembalian.split('T')[0]
                      : '-'}
                  </td>

                  <td>
                    <span className={`status-badge ${item.status?.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </td>

                  <td className="aksi-cell">
                    <img
                      src={LihatDetailIcon}
                      alt="detail"
                      className="aksi-icon"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setSelectedData(item);
                        setIsDetailOpen(true);
                      }}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={filteredData.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
      />

      {/* ================= DETAIL MODAL ================= */}
      <DetailPinjaman
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        data={selectedData}
      />
    </div>
  );
}

export default RiwayatPeminjaman;
