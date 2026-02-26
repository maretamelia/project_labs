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
// ==============================
// GET RIWAYAT PEMINJAMAN USER
// ==============================
export const getRiwayatPinjamanSaya = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/user/peminjaman/riwayat`, {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetch riwayat user:', error.response?.data || error.message);
    throw error;
  }
};
// ==============================
// GET RIWAYAT PEMINJAMAN ADMIN
// ==============================
export const getRiwayatPeminjamanAdmin = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/admin/peminjaman/riwayat`, {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    });
    return response.data.data; // karena API return { success, data }
  } catch (error) {
    console.error('Error fetch riwayat admin:', error.response?.data || error.message);
    throw error;
  }
};

// Export Riwayat Pinjaman

export const exportRiwayatAdmin = async (filters, format = 'excel') => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/admin/peminjaman/export`, {
      ...filters,
      format: format // bisa 'excel' atau 'pdf'
    }, {
      headers: { 
        Authorization: `Bearer ${token}`, 
        Accept: 'application/json' 
      },
      responseType: 'blob',
    });

    // Logika untuk mendownload file secara otomatis
    const blob = new Blob([response.data]);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    
    // Penamaan file otomatis
    const fileName = `riwayat-peminjaman-${new Date().getTime()}.${format === 'excel' ? 'xlsx' : 'pdf'}`;
    link.setAttribute('download', fileName);
    
    document.body.appendChild(link);
    link.click();
    link.remove();
    
  } catch (error) {
    console.error('Error export riwayat:', error.response?.data || error.message);
    throw error;
  }
};