import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// ==============================
// USER SERVICES
// ==============================

// GET PINJAMAN USER
export const getPinjamanSaya = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/user/pinjaman`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetch pinjaman:', error.response?.data || error.message);
    throw error;
  }
};

// CREATE PINJAMAN USER
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
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error create pinjaman:', error.response?.data || error.message);
    throw error;
  }
};

// DELETE PINJAMAN USER
export const deletePinjaman = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/user/pinjaman/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error delete pinjaman:', error.response?.data || error.message);
    throw error;
  }
};

// GET DETAIL PINJAMAN USER
export const getDetailPinjaman = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/user/pinjaman/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error get detail pinjaman:', error.response?.data || error.message);
    throw error;
  }
};

// UPDATE PINJAMAN USER
export const updatePinjaman = async (id, data) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/user/pinjaman/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error update pinjaman:', error.response?.data || error.message);
    throw error;
  }
};

// ==============================
// ADMIN SERVICES
// ==============================

// GET DAFTAR PEMINJAMAN SELURUH USER
export const getDaftarPeminjamanAdmin = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/admin/peminjaman`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetch daftar peminjaman admin:', error.response?.data || error.message);
    throw error;
  }
};

// APPROVE PEMINJAMAN ADMIN
export const approvePeminjaman = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/admin/peminjaman/${id}/approve`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error approve peminjaman:', error.response?.data || error.message);
    throw error;
  }
};

// REJECT PEMINJAMAN ADMIN
export const rejectPeminjaman = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/admin/peminjaman/${id}/reject`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error reject peminjaman:', error.response?.data || error.message);
    throw error;
  }
};
