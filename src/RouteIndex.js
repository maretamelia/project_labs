// src/RouteIndex.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';

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
import Profile from './pages/Profile/Profile';

// ================= AUTH =================
import Login from './pages/autentikasi/Login';
import Register from './pages/autentikasi/Register';

export default function RouteIndex() {
  return (
    <Routes>

      {/* ================= AUTH ================= */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ================= ADMIN ================= */}
      <Route
        path="/dashboard-admin"
        element={
          <ProtectedRoute role="admin">
            <DashboardAdmin />
          </ProtectedRoute>
        }
      />

      <Route
        path="/kategori"
        element={
          <ProtectedRoute role="admin">
            <KategoriList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/data-barang"
        element={
          <ProtectedRoute role="admin">
            <BarangList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/barang/create"
        element={
          <ProtectedRoute role="admin">
            <BarangCreate />
          </ProtectedRoute>
        }
      />

      <Route
        path="/barang/edit/:id"
        element={
          <ProtectedRoute role="admin">
            <BarangEdit />
          </ProtectedRoute>
        }
      />

      <Route
        path="/barang/:id"
        element={
          <ProtectedRoute role="admin">
            <BarangDetail />
          </ProtectedRoute>
        }
      />

      <Route
        path="/daftar-peminjaman"
        element={
          <ProtectedRoute role="admin">
            <DaftarPeminjamanList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/riwayat-peminjaman"
        element={
          <ProtectedRoute role="admin">
            <RiwayatPeminjamanAdmin />
          </ProtectedRoute>
        }
      />

      {/* ================= USER ================= */}
      <Route
        path="/user"
        element={
          <ProtectedRoute role="user">
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/DaftarBarang"
        element={
          <ProtectedRoute role="user">
            <DaftarBarang />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/PinjamanSaya"
        element={
          <ProtectedRoute role="user">
            <PinjamanSaya />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/pinjaman/create"
        element={
          <ProtectedRoute role="user">
            <CreatePinjaman />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/EditPinjaman/:id"
        element={
          <ProtectedRoute role="user">
            <EditPinjaman />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/RiwayatPeminjaman"
        element={
          <ProtectedRoute role="user">
            <RiwayatPeminjaman />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/pinjaman/:id"
        element={
          <ProtectedRoute role="user">
            <DetailPeminjaman />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/sop"
        element={
          <ProtectedRoute role="user">
            <SOP />
          </ProtectedRoute>
        }
      />

      {/* ================= PROFILE (BISA DIAKSES SEMUA LOGIN) ================= */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}
