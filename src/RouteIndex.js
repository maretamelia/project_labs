import React from 'react';
import { Routes, Route } from 'react-router-dom';

// import halaman admin
import KategoriList from './pages/kategori/KategoriList';
import BarangList from './pages/barang/BarangList';
import BarangCreate from './pages/barang/BarangCreate';
import BarangEdit from './pages/barang/BarangEdit';
import BarangDetail from './pages/barang/BarangDetail';
import DaftarPeminjamanList from './pages/RiwayatPeminjaman/RiwayatPeminjaman';
import Dashboard from './pages/user/Dashboard/Dashboard';
import CreatePinjaman from './pages/user/pinjaman/CreatePinjaman';
import PinjamanSaya from './pages/user/pinjaman/PinjamanSaya';
import EditPinjaman from './pages/user/pinjaman/EditPinjaman';
import RiwayatPeminjaman from './pages/user/pinjaman/RiwayatPeminjaman';
import DetailPeminjaman from './pages/user/DetailPeminjaman/DetailPeminjaman';
import SOP from './pages/user/sop/SOP';
import DaftarBarang from './pages/user/DaftarBarang/DaftarBarang';
import DashboardAdmin from './pages/Dashboard/DashboardAdmin';

// **FIX IMPORT SESUAI HURUF BESAR**
import Login from './pages/autentikasi/Login';
import Register from './pages/autentikasi/Register';

export default function RouteIndex() {
  return (
    <Routes>
      {/* ====================== ADMIN ====================== */}
      <Route path="/dashboard-admin" element={<DashboardAdmin />} />
      <Route path="/kategori" element={<KategoriList />} />
      <Route path="/data-barang" element={<BarangList />} />
      <Route path="/barang/create" element={<BarangCreate />} />
      <Route path="/barang/edit/:id" element={<BarangEdit />} />
      <Route path="/barang/:id" element={<BarangDetail />} />
      <Route path="/daftar-peminjaman" element={<DaftarPeminjamanList />} />
      <Route path="/riwayat-peminjaman" element={<RiwayatPeminjaman />} />

      {/* ====================== LOGIN / REGISTER ====================== */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ====================== USER ====================== */}
      <Route path="/user" element={<Dashboard />} />
      <Route path="/user/DaftarBarang" element={<DaftarBarang />} />
      <Route path="/user/PinjamanSaya" element={<PinjamanSaya />} />
      <Route path="/user/pinjaman/create" element={<CreatePinjaman />} />
      <Route path="/user/EditPinjaman/:id" element={<EditPinjaman />} />
      <Route path="/user/RiwayatPeminjaman" element={<RiwayatPeminjaman />} />
      <Route path="/user/pinjaman/:id" element={<DetailPeminjaman />} />
      <Route path="/user/sop" element={<SOP />} />
    </Routes>
  );
}
