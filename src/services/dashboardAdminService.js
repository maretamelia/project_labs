import axios from 'axios';

// Sesuaikan BASE_URL dengan alamat server Laravel kamu
const API_URL = 'http://localhost:8000/api/admin'; 

export const getDashboardData = async (year) => {
    // Ambil token dari localStorage (pastikan kuncinya benar 'token')
    const token = localStorage.getItem('token');
    
    return await axios.get(`${API_URL}/admin/dashboard-stats`, {
        params: { year: year }, // Ini akan mengirim ?year=2026
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
        }
    });
};