import axios from 'axios';

const API_URL = 'http://localhost:8000/api/admin';

export const getDashboardData = async (year) => {
    const token = localStorage.getItem('token');

    return axios.get(`${API_URL}/dashboard-stats`, {
        params: { year },
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    });
};
