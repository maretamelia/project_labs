// src/services/userServices.js
import axios from 'axios';

export const fetchUserProfile = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) throw new Error('User tidak login');

  const role = user.role.toLowerCase();
  const url = role === 'admin'
    ? 'http://127.0.0.1:8000/api/admin/profile'
    : 'http://127.0.0.1:8000/api/user/profile';

  const token = localStorage.getItem('token');
  if (!token) throw new Error('Token tidak ditemukan');

  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};
