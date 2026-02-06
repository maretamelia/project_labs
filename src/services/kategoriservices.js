import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/admin';

export const getKategoris = () => axios.get(`${API_URL}/kategori`);
export const createKategori = (data) => axios.post(`${API_URL}/kategori`, data);
export const updateKategori = (id, data) => axios.put(`${API_URL}/kategori/${id}`, data);
export const deleteKategori = (id) => axios.delete(`${API_URL}/kategori/${id}`);
