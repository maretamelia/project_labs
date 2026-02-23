import React, { useState, useEffect } from 'react';
import './DaftarBarang.css';
import DetailDaftarBarang from './DetailBarang';
import PageHeader from '../../../components/PageHeader';
import SearchBar from '../../../components/SearchBar';
import Pagination from '../../../components/Pagination';
import FilterModal from '../../../components/FilterModal';
import { getBarangsUser } from '../../../services/barangservices';

function DaftarBarang() {
  const [barangList, setBarangList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDetailPopupOpen, setIsDetailPopupOpen] = useState(false);
  const [selectedBarang, setSelectedBarang] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [filterValues, setFilterValues] = useState({
    minStock: '',
    maxStock: ''
  });

  useEffect(() => {
    fetchBarang();
  }, []);

  const fetchBarang = async () => {
    try {
      const response = await getBarangsUser();
      const data = response.data.data || response.data;
      setBarangList(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Gagal memuat barang:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filtering
  const filteredBarang = barangList
    .filter((item) => {
      const matchesSearch = item.nama_barang
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesMin =
        filterValues.minStock === '' ||
        item.stok >= parseInt(filterValues.minStock);

      const matchesMax =
        filterValues.maxStock === '' ||
        item.stok <= parseInt(filterValues.maxStock);

      return matchesSearch && matchesMin && matchesMax;
    })
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  // Pagination
  const totalPages = Math.ceil(filteredBarang.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBarang.slice(indexOfFirstItem, indexOfLastItem);

  const handleLihatDetail = (item) => {
    setSelectedBarang(item);
    setIsDetailPopupOpen(true);
  };

  if (loading) return <div className="content-wrapper1">Memuat data...</div>;

  return (
    <div className="main-content">
      <div className="content-wrapper1">
        <PageHeader title="Daftar Barang" subtitle="Peminjaman Laboratorium" />

        <div className="toolbar">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={(v) => {
              setSearchTerm(v);
              setCurrentPage(1);
            }}
            onOpenFilter={() => setIsFilterOpen(true)}
            placeholder="Cari alat atau bahan..."
          />
        </div>

        <div className="items-grid">
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <div key={item.id} className="item-card">
                <div className="item-image">
                  {item.image ? (
                    <img
                      src={`http://localhost:8000/storage/${item.image}`}
                      alt={item.nama_barang}
                    />
                  ) : (
                    <div style={{ padding: '20px', textAlign: 'center', color: '#ccc' }}>
                      No Image
                    </div>
                  )}
                </div>

                <div className="item-info">
                  <h3 className="item-name">{item.nama_barang}</h3>
                  <p className="item-stock">
                    Kategori: {item.kategori?.nama_kategori || 'Umum'}
                  </p>
                  <p className="item-stock">
                    Tersedia: <strong>{item.stok} unit</strong>
                  </p>
                </div>

                <div className="item-actions">
                  <button
                    className="btn-detail"
                    onClick={() => handleLihatDetail(item)}
                  >
                    Lihat Detail
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '50px' }}>
              Data tidak ditemukan.
            </div>
          )}
        </div>

        {filteredBarang.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            currentItems={currentItems.length}
            totalItems={filteredBarang.length}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      <DetailDaftarBarang
        isOpen={isDetailPopupOpen}
        onClose={() => setIsDetailPopupOpen(false)}
        data={selectedBarang}
      />

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={() => setIsFilterOpen(false)}
        onReset={() =>
          setFilterValues({
            minStock: '',
            maxStock: '',
          })
        }
      >
        <div className="filter-section">
          <div className="filter-section-title">Rentang Stok</div>

          <div className="filter-row">
            <div className="filter-field">
              <label>Min</label>
              <input
                type="number"
                className="filter-input"
                value={filterValues.minStock}
                onChange={(e) =>
                  setFilterValues({
                    ...filterValues,
                    minStock: e.target.value,
                  })
                }
              />
              <small className="input-note">contoh: 0</small>
            </div>

            <div className="filter-field">
              <label>Max</label>
              <input
                type="number"
                className="filter-input"
                value={filterValues.maxStock}
                onChange={(e) =>
                  setFilterValues({
                    ...filterValues,
                    maxStock: e.target.value,
                  })
                }
              />
              <small className="input-note">contoh: 100</small>
            </div>
          </div>
        </div>
      </FilterModal>
    </div>
  );
}

export default DaftarBarang;