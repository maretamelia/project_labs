import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// ==============================
// GET PINJAMAN USER
// ==============================
export const getPinjamanSaya = async () => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.get(
      `${API_URL}/user/pinjaman`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      'Error fetch pinjaman:',
      error.response?.data || error.message
    );
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
      barang_id: data.barang_id,                 // WAJIB id dari API barang
      jumlah_pinjam: data.jumlah_pinjam,
      tanggal_peminjaman: data.tanggal_peminjaman,
      tanggal_pengembalian: data.tanggal_pengembalian,
      keterangan: data.keterangan || '',
    };

    const response = await axios.post(
      `${API_URL}/user/pinjaman`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      'Error create pinjaman:',
      error.response?.data || error.message
    );
    throw error;
  }
};