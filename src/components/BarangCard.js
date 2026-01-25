import "./BarangCard.css";

export default function BarangCard({ barang }) {
  return (
    <div className="barang-card">
      <img
        src={barang.image}
        alt={barang.nama}
        className="barang-image"
      />

      <h3 className="barang-title">{barang.nama}</h3>
      <p className="barang-stok">
        Stok tersedia: {barang.stok}/{barang.max_stok}
      </p>

      <div className="barang-actions">
        <button className="btn-detail">Selengkapnya</button>
        <button className="btn-edit">✏️</button>
        <button className="btn-delete">🗑️</button>
      </div>
    </div>
  );
}
