import "./BarangCard.css";
import { Link } from "react-router-dom";

export default function BarangCard({ barang, onDelete }) { // <-- terima prop onDelete
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
        <Link to={`/barang/${barang.id}`} className="btn-detail">
          Selengkapnya
        </Link>
         <Link to={`/barang/edit/${barang.id}`} className="btn-edit">
          ✏️
        </Link>
        <button 
          className="btn-delete"
          onClick={() => onDelete(barang.id)} // <-- panggil fungsi hapus
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
