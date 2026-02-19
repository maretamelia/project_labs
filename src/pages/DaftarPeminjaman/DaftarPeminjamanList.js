import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/PageHeader';
import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';
import FilterModal from '../../components/FilterModal';
import ActionModal from '../../components/Actionmodal';
import './DaftarPeminjamanList.css';
import { getDaftarPeminjamanAdmin, approvePeminjaman, rejectPeminjaman } from '../../services/pinjamanServices';

function DaftarPeminjamanList() {
  const [peminjamanData, setPeminjamanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  useEffect(() => {
    fetchPeminjaman();
  }, []);

  const fetchPeminjaman = async () => {
    setLoading(true);
    try {
      const data = await getDaftarPeminjamanAdmin();
      setPeminjamanData(data);
    } catch (err) {
      console.error('Gagal fetch daftar peminjaman:', err);
      alert('Gagal mengambil data peminjaman admin!');
    } finally {
      setLoading(false);
    }
  };

  const handleActionClick = (item) => {
    setSelectedItem(item);
    setIsActionModalOpen(true);
  };

  // Fix: Map checkbox "Diterima"/"Ditolak" ke backend status
  const handleActionApply = async (aksiStatus, itemData) => {
    if (!itemData) return;

    try {
      if (aksiStatus === 'Diterima') {
        await approvePeminjaman(itemData.id);
        setPeminjamanData(prev => prev.map(p =>
          p.id === itemData.id ? { ...p, status: 'disetujui' } : p
        ));
        alert('Peminjaman berhasil disetujui!');
      } else if (aksiStatus === 'Ditolak') {
        const alasan = prompt('Masukkan alasan penolakan:');
        if (!alasan) return;
        await rejectPeminjaman(itemData.id, alasan);
        setPeminjamanData(prev => prev.map(p =>
          p.id === itemData.id ? { ...p, status: 'ditolak', keterangan: alasan } : p
        ));
        alert('Peminjaman ditolak!');
      }

      setIsActionModalOpen(false);
    } catch (err) {
      console.error('Gagal melakukan aksi:', err);
      alert('Gagal melakukan aksi. Cek console untuk detail.');
    }
  };

  const getStatusClass = (status) => {
    const s = (status ?? '').toLowerCase().trim();
    switch (s) {
      case 'peminjaman': return 'status peminjaman';
      case 'pengembalian': return 'status pengembalian';
      case 'terlambat': return 'status terlambat';
      case 'disetujui': return 'status disetujui';
      case 'ditolak': return 'status ditolak';
      default: return 'status';
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const totalPages = Math.ceil(peminjamanData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = peminjamanData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="peminjaman-container">
      <PageHeader title="Daftar Peminjaman" subtitle="Daftar Peminjaman seluruh user" />
      <div className="peminjaman-controls">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onOpenFilter={() => setIsFilterOpen(true)}
          placeholder="Cari data peminjaman..."
        />
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>
      ) : (
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
                  <td>{item.user?.nama ?? '-'}</td>
                  <td>{item.barang?.nama_barang ?? '-'}</td>
                  <td>{item.jumlah}</td>
                  <td>{formatDate(item.tanggal_peminjaman)}</td>
                  <td>{formatDate(item.tanggal_pengembalian)}</td>
                  <td>
                    <span className={getStatusClass(item.status)}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn-action" onClick={() => handleActionClick(item)}>
                      ⋮
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        currentItems={currentItems.length}
        totalItems={peminjamanData.length}
        onPageChange={setCurrentPage}
      />

      <ActionModal
        isOpen={isActionModalOpen}
        onClose={() => setIsActionModalOpen(false)}
        onApply={handleActionApply}
        status={selectedItem?.status}
        itemData={selectedItem}
      />
    </div>
  );
}

export default DaftarPeminjamanList;
