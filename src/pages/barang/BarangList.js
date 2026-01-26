import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import PageHeader from "../../components/PageHeader";
import SearchBar from "../../components/SearchBar";
import FilterModal from "../../components/FilterModal";
import Pagination from "../../components/Pagination";
import BarangCard from "../../components/BarangCard";

import './BarangList.css';  

const dummyBarangs = [
  { id: 1, nama: "Arduino Uno", stok: 25, max_stok: 30, image: "/images/arduino.jpg" },
  { id: 2, nama: "Breadboard", stok: 18, max_stok: 30, image: "/images/breadboard.jpg" },
];

export default function Barang() {
  // --- Semua useState harus di sini ---
  const [barangs, setBarangs] = useState(dummyBarangs);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterValues, setFilterValues] = useState({
    startDate: '',
    endDate: '',
    minJumlah: '',
    maxJumlah: ''
  });

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus barang ini?")) {
      setBarangs(barangs.filter(b => b.id !== id));
    }
  };

  const handleFilterChange = (key, value) => {
    setFilterValues({ ...filterValues, [key]: value });
  };

  const handleApplyFilter = () => {
    console.log('Filter applied:', filterValues);
    setIsFilterOpen(false);
  };

  const handleResetFilter = () => {
    setFilterValues({
      startDate: '',
      endDate: '',
      minJumlah: '',
      maxJumlah: ''
    });
  };

  return (
    <div className="layout">
      <Sidebar />

      <div className="main-content">
        <div className="page-wrapper">
          <PageHeader title="Daftar Barang" subtitle="Daftar barang yang tersedia" />

          <div className="toolbar">
            <div className="toolbar-left">
              <SearchBar />
              {/* tombol filter bisa memanggil setIsFilterOpen(true) */}
            </div>

            <Link to="/barang/create" className="btn-add">
              + Tambah Barang
            </Link>
          </div>

          <FilterModal
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            onApply={handleApplyFilter}
            onReset={handleResetFilter}
          >
            {/* Input filter bisa dimasukkan di sini */}
          </FilterModal>

          <div className="barang-grid">
            {barangs.map((b) => (
              <BarangCard key={b.id} barang={b} onDelete={handleDelete} />
            ))}
          </div>

          <Pagination />
        </div>
      </div>
    </div>
  );
}
