import React from 'react';
import './DetailPinjaman.css';

const DetailPinjaman = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  const getStatusClass = (status) => {
    if (!status) return '';
    return status.toLowerCase();
  };

  const today = new Date();
  const tanggalKembali = data?.tanggal_pengembalian
  ? new Date(data.tanggal_pengembalian)
  : null;
const todayStr = today.toISOString().split("T")[0];
const kembaliStr = data?.tanggal_pengembalian?.split("T")[0];

const bolehKembalikan =
  data?.status?.toLowerCase() === "disetujui" &&
  kembaliStr &&
  todayStr >= kembaliStr;
    console.log("STATUS:", data?.status);
    console.log("tanggalKembali:", tanggalKembali);
    console.log("today:", today);
    console.log("bolehKembalikan:", bolehKembalikan);

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>

        <div className="popup-body">
          <div className="product-image">
            <img
              src={data?.barang?.gambar || '/placeholder-image.jpg'}
              alt={data?.barang?.nama_barang}
            />
          </div>

          <div className="product-details">
            <h2 className="product-title">
              {data?.barang?.nama_barang || 'Nama Barang'}
            </h2>

            <span className={`status-badge ${getStatusClass(data?.status)}`}>
              {data?.status || 'Menunggu'}
            </span>

            <div className="detail-row">
              <span className="icon">📦</span>
              <span className="label">Jumlah:</span>
              <span className="value">{data?.jumlah || '0'} pcs</span>
            </div>

            <div className="detail-row">
              <span className="icon">🏷️</span>
              <span className="label">Kategori Produk:</span>
              <span className="value">
                {data?.barang?.kategori?.nama_kategori || 'Tidak ada kategori'}
              </span>
            </div>

            <div className="detail-row date-wrapper">
              <div className="date-item">
                <span className="icon">🕒</span>
                <span className="label">Tanggal Peminjaman</span>
                <span className="value">
                  {data?.tanggal_peminjaman?.split('T')[0] || '-'}
                </span>
              </div>

              <div className="date-item">
                <span className="icon">🕒</span>
                <span className="label">Tanggal Kembali</span>
                <span className="value">
                  {data?.tanggal_pengembalian?.split('T')[0] || '-'}
                </span>
              </div>
            </div>

            <div className="description-section">
              <p className="description-label">Keterangan:</p>
              <p className="description-text">
                {data?.keterangan || 'Tidak ada keterangan'}
              </p>
            </div>

            <button
              className="btn-kembalikan"
              disabled={!bolehKembalikan}
              onClick={async () => {
                try {
                  const res = await fetch(
                      `http://localhost:8000/api/user/pinjaman/${data.id}/return`,
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
