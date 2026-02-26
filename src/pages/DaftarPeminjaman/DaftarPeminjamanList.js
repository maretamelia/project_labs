import React, { useState, useEffect, useMemo } from 'react';
import PageHeader from '../../components/PageHeader';
import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';
import ActionModal from '../../components/Actionmodal';
import FilterModal from '../../components/FilterModal';
import DetailPeminjamanModal from '../RiwayatPeminjamanAdmin/DetailPeminjamanAdmin';
import './DaftarPeminjamanList.css';
import { getDaftarPeminjamanAdmin, approvePeminjaman, rejectPeminjaman } from '../../services/pinjamanServices';
import Swal from 'sweetalert2';

function DaftarPeminjamanList() {
  const [peminjamanData, setPeminjamanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterValues, setFilterValues] = useState({
    startDate: '',
    endDate: '',
    status: ''
  });

  const itemsPerPage = 6;

  const STATUS_MAP = {
    pending: 'Menunggu',
    disetujui: 'Disetujui',
    ditolak: 'Ditolak',
    dikembalikan: 'Dikembalikan',
    selesai: 'Selesai',
    pending_back: 'Proses Pengembalian',
    terlambat: 'Terlambat'
  };

  useEffect(() => {
    fetchPeminjaman();
  }, []);

  const fetchPeminjaman = async () => {
    setLoading(true);
    try {
      const data = await getDaftarPeminjamanAdmin();
      setPeminjamanData(data || []);
    } catch (err) {
      console.error('Gagal fetch daftar peminjaman:', err);
      alert('Gagal mengambil data peminjaman admin!');
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // HANDLER ACTION / DETAIL
  // =========================
  const handleActionClick = (item) => {
    if (!item) return;

    if (['pending', 'pending_back'].includes(item.status)) {
      setSelectedItem(item);
      setIsActionModalOpen(true);
    } else if (item.status === 'disetujui') {
      setSelectedItem({
        namaPeminjam: item.user?.name,
        namaBarang: item.barang?.nama_barang,
        jumlah: item.jumlah,
        tanggalPinjam: formatDate(item.tanggal_peminjaman),
        tanggalKembali: formatDate(item.tanggal_pengembalian),
        status: item.status
      });
      setIsDetailModalOpen(true);
    }
  };

  const handleActionApply = async (aksiStatus, itemData) => {
    if (!itemData) return;

    try {
      if (aksiStatus === 'Diterima') {
        setIsActionModalOpen(false);
        setSelectedItem(null);

        const confirmResult = await Swal.fire({
          title: 'Konfirmasi',
          text: 'Apakah Anda yakin ingin menerima peminjaman ini?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Ya, terima',
          cancelButtonText: 'Batal',
          reverseButtons: true
        });

        if (!confirmResult.isConfirmed) return;

        const response = await approvePeminjaman(itemData.id);
        const updatedItem = response?.data;

        if (updatedItem) {
          setPeminjamanData(prev =>
            prev.map(p => p?.id === itemData.id ? { ...p, status: updatedItem.status } : p)
          );

          await Swal.fire({
            icon: 'success',
            title: 'Berhasil!',
            text: `Peminjaman berhasil diproses! Status: ${updatedItem.status}`,
            confirmButtonText: 'OK'
          });
        }

      } else if (aksiStatus === 'Ditolak') {
        setIsActionModalOpen(false);
        setSelectedItem(null);

        const { value: alasan } = await Swal.fire({
          title: 'Alasan Penolakan',
          input: 'text',
          inputLabel: 'Masukkan alasan penolakan',
          inputPlaceholder: 'Contoh: Barang sedang rusak',
          showCancelButton: true,
          confirmButtonText: 'Tolak',
          cancelButtonText: 'Batal',
          inputValidator: (value) => {
            if (!value) return 'Alasan tidak boleh kosong!';
          }
        });

        if (!alasan) return;

        const response = await rejectPeminjaman(itemData.id, alasan);
        const updatedItem = response?.data;

        if (updatedItem) {
          setPeminjamanData(prev =>
            prev
              .map(p =>
                p?.id === itemData.id
                  ? { ...p, status: updatedItem.status, keterangan: updatedItem.keterangan }
                  : p
              )
              .filter(p => p?.status !== 'ditolak')
          );

          await Swal.fire({
            icon: 'success',
            title: 'Berhasil!',
            text: 'Peminjaman ditolak dan masuk riwayat!',
            confirmButtonText: 'OK'
          });
        }
      }

    } catch (err) {
      console.error('Gagal melakukan aksi:', err);
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: 'Gagal melakukan aksi. Cek console untuk detail.',
        confirmButtonText: 'OK'
      });
    }
  };

  // =========================
  // UTILS
  // =========================
  const getStatusClass = (status) => {
    const s = (status ?? '').toLowerCase().trim();
    switch (s) {
      case 'pending':
      case 'pending_back':
        return 'status-badge menunggu';
      case 'dikembalikan':
        return 'status-badge dikembalikan';
      case 'terlambat':
        return 'status-badge terlambat';
      case 'disetujui':
        return 'status-badge disetujui';
      case 'ditolak':
        return 'status-badge ditolak';
      case 'dipinjam':
        return 'status-badge dipinjam';
      case 'selesai':
        return 'status-badge selesai';
      default:
        return 'status-badge unknown';
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

  // =========================
  // FILTER & PAGINATION
  // =========================
  const filteredData = useMemo(() => {
    return peminjamanData.filter(item => {
      if (!item) return false;

      const matchSearch =
        item.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.barang?.nama_barang?.toLowerCase().includes(searchTerm.toLowerCase());

      const itemDate = new Date(item.tanggal_peminjaman);
      const startDate = filterValues.startDate ? new Date(filterValues.startDate) : null;
      const endDate = filterValues.endDate ? new Date(filterValues.endDate + 'T23:59:59') : null;

      const matchStartDate = !startDate || itemDate >= startDate;
      const matchEndDate = !endDate || itemDate <= endDate;

      const matchStatus =
        filterValues.status === '' ||
        item.status?.toLowerCase() === filterValues.status.toLowerCase();

      return matchSearch && matchStartDate && matchEndDate && matchStatus;
    });
  }, [peminjamanData, searchTerm, filterValues]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // =========================
  // RENDER
  // =========================
  return (
    <div className="peminjaman-container">
      <PageHeader title="Daftar Peminjaman" subtitle="Daftar Peminjaman seluruh user" />
      <div className="peminjaman-controls">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={(val) => { setSearchTerm(val); setCurrentPage(1); }}
          placeholder="Cari data peminjaman..."
          onOpenFilter={() => setIsFilterOpen(true)}
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
                <tr key={item?.id ?? index}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>{item?.user?.name ?? '-'}</td>
                  <td>{item?.barang?.nama_barang ?? '-'}</td>
                  <td>{item?.jumlah ?? 0} pcs</td>
                  <td>{formatDate(item?.tanggal_peminjaman)}</td>
                  <td>{formatDate(item?.tanggal_pengembalian)}</td>
                  <td>
                    <span className={getStatusClass(item?.status)}>
                      {STATUS_MAP[item?.status] || '-'}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn-action"
                      onClick={() => handleActionClick(item)}
                    >
                      ⋮
                    </button>
                  </td>
                </tr>
              ))}
              {currentItems.length === 0 && (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center' }}>Data tidak ditemukan</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filterValues={filterValues}
        onFilterChange={(key, value) =>
          setFilterValues(prev => ({ ...prev, [key]: value }))
        }
        onApply={() => { setCurrentPage(1); setIsFilterOpen(false); }}
        onReset={() => {
          setFilterValues({ startDate: '', endDate: '', status: '' });
          setCurrentPage(1);
        }}
        showStatus={true}
        statusOptions={[
  { value: 'pending', label: 'Menunggu' },
  { value: 'disetujui', label: 'Disetujui' },
  { value: 'pending_back', label: 'Proses Pengembalian' },
]}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        currentItems={currentItems.length}
        totalItems={filteredData.length}
        onPageChange={setCurrentPage}
      />

      <ActionModal
        isOpen={isActionModalOpen}
        onClose={() => { setIsActionModalOpen(false); setSelectedItem(null); }}
        onApply={handleActionApply}
        status={selectedItem?.status ?? 'unknown'}
        itemData={selectedItem}
      />

      <DetailPeminjamanModal
        isOpen={isDetailModalOpen}
        data={selectedItem}
        onClose={() => { setIsDetailModalOpen(false); setSelectedItem(null); }}
      />
    </div>
  );
}

export default DaftarPeminjamanList;