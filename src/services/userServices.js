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

export const updateUserProfile = async (profileData) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Token tidak ditemukan');

  const formData = new FormData();
  
  // Tambah field ke form data
  if (profileData.name) formData.append('name', profileData.name);
  if (profileData.email) formData.append('email', profileData.email);
  if (profileData.password) formData.append('password', profileData.password);
  if (profileData.password_confirmation) formData.append('password_confirmation', profileData.password_confirmation); 
  if (profileData.image) formData.append('image', profileData.image);

  const response = await axios.post(
    'http://localhost:8000/api/profile/update',
    formData,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data.data;
};
