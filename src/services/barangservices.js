import api from './axios'; 

// =========================
// KATEGORI
// =========================
export const getKategoris = () => api.get('/admin/kategori');

// =========================
// BARANG
// =========================
// BARANG (USER / PUBLIC VIEW)
// =========================
// Tambahkan ini supaya Role User bisa akses tanpa kena block satpam (Middleware)
export const getBarangsUser = () => api.get('/user/barang');
export const getBarangUser = (id) => api.get(`/user/barang/${id}`);
// BARANG ADMIN
// GET semua barang
export const getBarangs = () => api.get('/admin/barang');

// GET detail barang
export const getBarang = (id) => api.get(`/admin/barang/${id}`);

// CREATE barang
export const createBarang = async (data) => {
  const formData = new FormData();
  formData.append('nama_barang', data.nama_barang);
  formData.append('category_id', data.category_id);
  formData.append('stok', data.stok);
  formData.append('deskripsi', data.deskripsi || '');
  if (data.image) formData.append('image', data.image);

  return api.post('/admin/barang', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// UPDATE barang
export const updateBarang = async (id, data) => {
  const formData = new FormData();
  formData.append('nama_barang', data.nama_barang);
  formData.append('category_id', data.category_id);
  formData.append('stok', data.stok);
  formData.append('deskripsi', data.deskripsi || '');
  if (data.image) formData.append('image', data.image);
  formData.append('_method', 'PUT');

  return api.post(`/admin/barang/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// DELETE barang
export const deleteBarang = (id) => api.delete(`/admin/barang/${id}`);