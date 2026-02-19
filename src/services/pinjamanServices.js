import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// ==============================
// GET PINJAMAN USER
// ==============================
export const getPinjamanSaya = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/user/pinjaman`, {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetch pinjaman user:', error.response?.data || error.message);
    throw error;
  }
};

// ==============================
// CREATE PINJAMAN USER
// ==============================
export const createPinjaman = async (data) => {
  try {
    const token = localStorage.getItem('token');
    const payload = {
      barang_id: data.barang_id,
      jumlah: data.jumlah,
      tanggal_peminjaman: data.tanggal_peminjaman,
      tanggal_pengembalian: data.tanggal_pengembalian,
      keterangan: data.keterangan || '',
    };
    const response = await axios.post(`${API_URL}/user/pinjaman`, payload, {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json', 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('Error create pinjaman user:', error.response?.data || error.message);
    throw error;
  }
};

// ==============================
// GET DAFTAR PEMINJAMAN ADMIN
// ==============================
export const getDaftarPeminjamanAdmin = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/admin/peminjaman`, {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetch daftar pinjaman admin:', error.response?.data || error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
    }
    throw error;
  }
};

// ==============================
// GET DETAIL PINJAMAN
// ==============================
export const getDetailPinjaman = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/user/pinjaman/${id}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetch detail pinjaman:', error.response?.data || error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
    }
    throw error;
  }
};

// ==============================
// UPDATE PINJAMAN
// ==============================
export const updatePinjaman = async (id, data) => {
  try {
    const token = localStorage.getItem('token');
    const payload = {
      barang_id: data.barang_id,
      jumlah: data.jumlah,
      tanggal_peminjaman: data.tanggal_peminjaman,
      tanggal_pengembalian: data.tanggal_pengembalian,
      keterangan: data.keterangan || '',
    };
    const response = await axios.put(`${API_URL}/user/pinjaman/${id}`, payload, {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json', 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('Error update pinjaman:', error.response?.data || error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
    }
    throw error;
  }
};

// ==============================
// DELETE PINJAMAN
// ==============================
export const deletePinjaman = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/user/pinjaman/${id}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('Error delete pinjaman:', error.response?.data || error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
    }
    throw error;
  }
};
// ==============================
// APPROVE PEMINJAMAN ADMIN
// ==============================
export const approvePeminjaman = async (id) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/admin/peminjaman/${id}/approve`, {}, {
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
  });
  return response.data;
};

// ==============================
// REJECT PEMINJAMAN ADMIN
// ==============================
export const rejectPeminjaman = async (id, alasan) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/admin/peminjaman/${id}/reject`, { alasan }, {
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
  });
  return response.data;
};
