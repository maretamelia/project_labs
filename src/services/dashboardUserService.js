import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const getUserDashboardData = async () => {
    const token = localStorage.getItem('token');
    return await axios.get(`${API_URL}/user/dashboard`, {
        headers: { 
            Authorization: `Bearer ${token}`,
            'Accept': 'application/json'
        }
    });
};