import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';

// Import Layouts
import AdminLayout from './layouts/AdminLayout';
import UserLayout from './layouts/UserLayout';

// ================= ADMIN PAGES =================
import KategoriList from './pages/kategori/KategoriList';
import BarangList from './pages/barang/BarangList';
import BarangCreate from './pages/barang/BarangCreate';
import BarangEdit from './pages/barang/BarangEdit';
import BarangDetail from './pages/barang/BarangDetail';
import DaftarPeminjamanList from './pages/DaftarPeminjaman/DaftarPeminjamanList';
import RiwayatPeminjamanAdmin from './pages/RiwayatPeminjamanAdmin/RiwayatPeminjamanAdmin';
import DashboardAdmin from './pages/Dashboard/DashboardAdmin';


// ================= USER PAGES =================
import Dashboard from './pages/user/Dashboard/Dashboard';
import CreatePinjaman from './pages/user/pinjaman/CreatePinjaman';
import PinjamanSaya from './pages/user/pinjaman/PinjamanSaya';
import EditPinjaman from './pages/user/pinjaman/EditPinjaman';
import RiwayatPeminjaman from './pages/user/pinjaman/RiwayatPeminjaman';
import DetailPeminjaman from './pages/user/DetailPeminjaman/DetailPeminjaman';
import SOP from './pages/user/sop/SOP';
import DaftarBarang from './pages/user/DaftarBarang/DaftarBarang';
import Profile from './pages/user/Profile/Profile';

// ================= AUTH & EXTRA =================
import Login from './pages/autentikasi/Login';
import Register from './pages/autentikasi/Register';
import NotFound from './pages/NotFound';

export default function RouteIndex() {
  return (
    <Routes>
      {/* DEFAULT & AUTH (Tanpa Layout/Footer) */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ================= GROUP ADMIN (Pakai AdminLayout) ================= */}
      <Route element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}>
        <Route path="/dashboard-admin" element={<DashboardAdmin />} />
        <Route path="/kategori" element={<KategoriList />} />
        <Route path="/data-barang" element={<BarangList />} />
        <Route path="/barang/create" element={<BarangCreate />} />
        <Route path="/barang/edit/:id" element={<BarangEdit />} />
        <Route path="/barang/:id" element={<BarangDetail />} />
        <Route path="/daftar-peminjaman" element={<DaftarPeminjamanList />} />
        <Route path="/riwayat-peminjaman" element={<RiwayatPeminjamanAdmin />} />
        <Route path="/Profile" 
        element={<Profile />} />
      </Route>


      {/* ================= GROUP USER (Pakai UserLayout) ================= */}
      <Route element={<ProtectedRoute role="user"><UserLayout /></ProtectedRoute>}>
        <Route path="/user" element={<Dashboard />} />
        <Route path="/user/DaftarBarang" element={<DaftarBarang />} />
        <Route path="/user/PinjamanSaya" element={<PinjamanSaya />} />
        <Route path="/user/pinjaman/create" element={<CreatePinjaman />} />
        <Route path="/user/EditPinjaman/:id" element={<EditPinjaman />} />
        <Route path="/user/RiwayatPeminjaman" element={<RiwayatPeminjaman />} />
        <Route path="/user/pinjaman/:id" element={<DetailPeminjaman />} />
        <Route path="/user/sop" element={<SOP />} />
        <Route path="/user/Profile" element={<Profile />} />
      </Route>

      {/* ================= 404 ================= */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}