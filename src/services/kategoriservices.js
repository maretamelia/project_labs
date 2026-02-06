import api from './axios'; 

export const getKategoris = () => api.get('/admin/kategori');

export const createKategori = (data) =>
  api.post('/admin/kategori', data);

export const updateKategori = (id, data) =>
  api.put(`/admin/kategori/${id}`, data);

export const deleteKategori = (id) =>
  api.delete(`/admin/kategori/${id}`);
