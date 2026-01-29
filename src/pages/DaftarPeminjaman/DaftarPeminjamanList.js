import React, { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';
import FilterModal from '../../components/FilterModal';
import './DaftarPeminjamanList.css';

const DaftarPeminjaman = [
  {
    id: 1,
    nama: 'Alzel Danendra',
    barang: 'Proyektor',
    jumlah: 1,
    tglPinjam: '2025-09-15',
    tglKembali: '2025-09-20',
    status: 'Peminjaman',
  },
  {
    id: 2,
    nama: 'Alzel Danendra',
    barang: 'Proyektor',
    jumlah: 1,
    tglPinjam: '2025-09-15',
    tglKembali: '2025-09-20',
    status: 'Pengembalian',
  },
  {
    id: 3,
    nama: 'Alzel Danendra',
    barang: 'Proyektor',
    jumlah: 1,
    tglPinjam: '2025-09-15',
    tglKembali: '2025-09-20',
    status: 'Terlambat',
  },
];

function DaftarPeminjamanList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // FILTER STATE
  const [tanggalDari, setTanggalDari] = useState('');
  const [tanggalKe, setTanggalKe] = useState('');
  const [minJumlah, setMinJumlah] = useState('');
  const [maxJumlah, setMaxJumlah] = useState('');
  const [statusFilter, setStatusFilter] = useState([]);

  const itemsPerPage = 6;

  const toggleStatus = (status) => {
    setStatusFilter(prev =>
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const resetFilter = () => {
    setTanggalDari('');
    setTanggalKe('');
    setMinJumlah('');
    setMaxJumlah('');
    setStatusFilter([]);
  };

  const filteredData = DaftarPeminjaman.filter(item => {
    const searchMatch =
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.barang.toLowerCase().includes(searchTerm.toLowerCase());

    const tanggalMatch =
      (!tanggalDari || item.tglPinjam >= tanggalDari) &&
      (!tanggalKe || item.tglPinjam <= tanggalKe);

    const jumlahMatch =
      (!minJumlah || item.jumlah >= Number(minJumlah)) &&
      (!maxJumlah || item.jumlah <= Number(maxJumlah));

    const statusMatch =
      statusFilter.length === 0 || statusFilter.includes(item.status);

    return searchMatch && tanggalMatch && jumlahMatch && statusMatch;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const getStatusClass = (status) => {
    switch (status) {
      case 'Peminjaman':
        return 'status peminjaman';
      case 'Pengembalian':
        return 'status pengembalian';
      case 'Terlambat':
        return 'status terlambat';
      default:
        return 'status';
    }
  };

  return (
    <div className="peminjaman-container">

      <PageHeader
        title=" Daftar Peminjaman"
        subtitle="Daftar Peminjaman"
      />

      <div className="peminjaman-controls">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onOpenFilter={() => setIsFilterOpen(true)}
          placeholder="Cari data peminjaman..."
        />
      </div>

      <div className="table-wrapper">
        <table className="peminjaman-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Nama Barang</th>
              <th>Jumlah</th>
              <th>Tgl Pinjam</th>
              <th>Tgl Kembali</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={item.id}>
                <td>{indexOfFirstItem + index + 1}</td>
                <td>{item.nama}</td>
                <td>{item.barang}</td>
                <td>{item.jumlah}</td>
                <td>{item.tglPinjam}</td>
                <td>{item.tglKembali}</td>
                <td>
                  <span className={getStatusClass(item.status)}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <button className="btn-action">⋮</button>
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
        totalItems={filteredData.length}
        onPageChange={setCurrentPage}
      />

      {/* FILTER MODAL */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={() => setIsFilterOpen(false)}
        onReset={resetFilter}
      >
        <div className="filter-modal">

          <h4>Tanggal</h4>
          <input type="date" value={tanggalDari} onChange={e => setTanggalDari(e.target.value)} />
          <input type="date" value={tanggalKe} onChange={e => setTanggalKe(e.target.value)} />

          <h4>Jumlah</h4>
          <input type="number" placeholder="Min" value={minJumlah} onChange={e => setMinJumlah(e.target.value)} />
          <input type="number" placeholder="Max" value={maxJumlah} onChange={e => setMaxJumlah(e.target.value)} />

          <h4>Status</h4>
          {['Peminjaman', 'Pengembalian', 'Terlambat'].map(s => (
            <label key={s}>
              <input
                type="checkbox"
                checked={statusFilter.includes(s)}
                onChange={() => toggleStatus(s)}
              />
              {s}
            </label>
          ))}

        </div>
      </FilterModal>

    </div>
  );
}

export default DaftarPeminjamanList;
