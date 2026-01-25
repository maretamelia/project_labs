import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import PageHeader from "../../components/PageHeader";
import SearchBar from "../../components/SearchBar";
import FilterModal from "../../components/FilterModal";
import Pagination from "../../components/Pagination";
import BarangCard from "../../components/BarangCard";
import { useState } from "react";

const dummyBarangs = [
  {
    id: 1,
    nama: "Arduino Uno",
    stok: 25,
    max_stok: 30,
    image: "/images/arduino.jpg",
  },
  {
    id: 2,
    nama: "Breadboard",
    stok: 18,
    max_stok: 30,
    image: "/images/breadboard.jpg",
  },
];

export default function Barang() {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="layout">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <div className="page-wrapper">
          <PageHeader
            title="Daftar Barang"
            subtitle="Daftar barang yang tersedia"
          />

          <div className="toolbar">
            <div className="toolbar-left">
              <SearchBar />
              <button onClick={() => setShowFilter(true)}>
                Filter
              </button>
            </div>

            <button className="btn-add">+ Tambah Barang</button>
          </div>

          {showFilter && (
            <FilterModal onClose={() => setShowFilter(false)} />
          )}

          <div className="barang-grid">
            {dummyBarangs.map((b) => (
              <BarangCard key={b.id} barang={b} />
            ))}
          </div>

          <Pagination />
        </div>
      </div>
    </div>
  );
}
