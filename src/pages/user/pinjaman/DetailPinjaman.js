import React from 'react';
import './DetailPinjaman.css';

const STATUS_MAP = {
  pending: 'Menunggu',
  disetujui: 'Disetujui',
  ditolak: 'Ditolak',
  dikembalikan: 'Dikembalikan',
  selesai: 'Selesai',
  pending_back: 'Proses Pengembalian',
};

const DetailPinjaman = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  // Handle data structure yang mungkin sudah di-map atau raw
  const pinjaman = data.raw || data;
  
  const getStatusClass = (status) => {
    if (!status) return '';
    return status.toLowerCase();
  };

  // const today = new Date();
  // const tanggalKembali = pinjaman?.tanggal_pengembalian
  // ? new Date(pinjaman.tanggal_pengembalian)
  // : null;
// const todayStr = today.toISOString().split("T")[0];
// const kembaliStr = pinjaman?.tanggal_pengembalian?.split("T")[0];

// const bolehKembalikan =
//   pinjaman?.status?.toLowerCase() === "disetujui" &&
//   kembaliStr &&
//   todayStr >= kembaliStr;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>

        <div className="popup-body">
          <div className="product-image">
            <img
              src={pinjaman?.barang?.image ? `http://localhost:8000/storage/${pinjaman?.barang?.image}` : '/placeholder-image.jpg'}
              alt={pinjaman?.barang?.nama_barang}
            />
          </div>

          <div className="product-details">
            <h2 className="product-title">
              {pinjaman?.barang?.nama_barang || 'Nama Barang'}
            </h2>

            <span className={`status-badge ${getStatusClass(pinjaman?.status)}`}>
              {STATUS_MAP[pinjaman?.status] || pinjaman?.status || 'Menunggu'}
            </span>

            <div className="detail-row">
              <span className="icon">📦</span>
              <span className="label">Jumlah:</span>
              <span className="value">{pinjaman?.jumlah ?? '0'} pcs</span>
            </div>

            <div className="detail-row">
              <span className="icon">🏷️</span>
              <span className="label">Kategori Produk:</span>
              <span className="value">
                {pinjaman?.barang?.kategori?.nama_kategori || 'Tidak ada kategori'}
              </span>
            </div>

            <div className="detail-row date-wrapper">
              <div className="date-item">
                <span className="icon">🕒</span>
                <span className="label">Tanggal Peminjaman</span>
                <span className="value">
                  {pinjaman?.tanggal_peminjaman ? pinjaman?.tanggal_peminjaman?.split('T')[0] : '-'}
                </span>
              </div>

              <div className="date-item">
                <span className="icon">🕒</span>
                <span className="label">Tanggal Kembali</span>
                <span className="value">
                  {pinjaman?.tanggal_pengembalian ? pinjaman?.tanggal_pengembalian?.split('T')[0] : '-'}
                </span>
              </div>
            </div>

            <div className="description-section">
              <p className="description-label">Keterangan:</p>
              <p className="description-text">
                {pinjaman?.keterangan || 'Tidak ada keterangan'}
              </p>
            </div>

            <button
              className="btn-kembalikan"
              disabled={pinjaman.status !== 'disetujui'}
              onClick={async () => {
                try {
                  const res = await fetch(
                      `http://localhost:8000/api/user/pinjaman/${pinjaman.id}/return`,
                    {
                      method: "POST",
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                      },
                    }
                  );

                  const result = await res.json();

                  if (result.success) {
                    alert("Menunggu persetujuan admin");
                    onClose();
                    window.location.reload();
                  }
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              Dikembalikan
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPinjaman;
