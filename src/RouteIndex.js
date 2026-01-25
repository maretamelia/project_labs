// src/RouteIndex.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// import halaman kategori
import KategoriList from './pages/kategori/KategoriList';

// import halaman barang
import BarangList from './pages/barang/BarangList';
import BarangCreate from './pages/barang/BarangCreate';
import BarangEdit from './pages/barang/BarangEdit';
import BarangDetail from './pages/barang/BarangDetail';

export default function RouteIndex() {
  return (
    <Routes>
      {/* Halaman utama */}
      <Route
        path="/"
        element={
          <>
            <h1>Selamat datang, Amel!</h1>
            <p>Ini halaman utama React-mu.</p>
          </>
        }
      />

      {/* Route kategori */}
      <Route path="/kategori" element={<KategoriList />} />

      {/* Route barang */}
      <Route path="/barang" element={<BarangList />} />
      <Route path="/barang/create" element={<BarangCreate />} />
      <Route path="/barang/edit/:id" element={<BarangEdit />} />
      <Route path="/barang/:id" element={<BarangDetail />} />
    </Routes>
  );
}
