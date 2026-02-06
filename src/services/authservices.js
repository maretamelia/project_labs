import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

export const login = async (email, password) => {
  const res = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });
  return res.data;
};

export const logout = async () => {
  const token = localStorage.getItem('token');

  await axios.post(
    `${API_URL}/logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
