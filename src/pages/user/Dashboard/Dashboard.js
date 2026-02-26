import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiBox, FiClock, FiCheckCircle, FiUpload } from 'react-icons/fi';
import ModalSOP from './ModalSOP';
import { getUserDashboardData } from '../../../services/dashboardUserService'; 
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ 
    stats: {}, 
    recent: [], 
    reminders: [], 
    rules: [] 
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await getUserDashboardData();
        setData(response.data.data);
      } catch (error) {
        console.error("Gagal memuat data user dashboard", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const stats = [
    { id: 1, icon: <FiBox />, count: data.stats?.dipinjam || 0, label: 'Sedang Dipinjam', color: 'beige' },
    { id: 2, icon: <FiClock />, count: data.stats?.menunggu || 0, label: 'Menunggu Persetujuan', color: 'gray' },
    { id: 3, icon: <FiUpload />, count: data.stats?.terlambat || 0, label: 'Terlambat', color: 'orange' },
    { id: 4, icon: <FiCheckCircle />, count: data.stats?.kembali || 0, label: 'Dikembalikan', color: 'pink' },
  ];

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard-page">

      <ModalSOP />

      {/* STATS CARDS */}
      <div className="stats-container">
        {stats.map(stat => (
          <div key={stat.id} className={`stat-card ${stat.color}`}>
            <div className="stat-icon-wrapper">{stat.icon}</div>
            <div className="stat-info">
              <div className="stat-count">{stat.count}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="table-header">
        <button className="btn-see-all" onClick={() => navigate('/user/pinjamansaya')}>
          See all →
        </button>
      </div>

      {/* TABLE RIWAYAT */}
      <div className="table-wrapper">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Barang</th>
              <th>Jumlah barang</th>
              <th>Tanggal Peminjaman</th>
              <th>Tanggal Kembali</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.recent?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}.</td>
                <td>{item.namaBarang}</td>
                <td>{item.jumlah}</td>
                <td>{item.tanggalPinjam}</td>
                <td>{item.tanggalKembali}</td>
                <td>
                  <span className={`status-badge ${item.status?.toLowerCase()}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* NOTIFIKASI CARDS */}
      <div className="notification-cards">
        <div className="notif-card warning">
          <div className="notif-icon">⚠️</div>
          <div className="notif-content">
            <h3>Pengingat Pengembalian</h3>
            <ul>
              {data.reminders && data.reminders.length > 0 ? (
                data.reminders.map((notif, index) => (
                  <li key={index}>{notif.nama} - {notif.pesan}</li>
                ))
              ) : (
                <li>Tidak ada tanggungan pengembalian terdekat</li>
              )}
            </ul>
          </div>
        </div>

        <div className="notif-card info">
          <div className="notif-icon">⚠️</div>
          <div className="notif-content">
            <h3>Aturan Peminjaman</h3>
            <ul>
              {data.rules?.length > 0 ? (
                data.rules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))
              ) : (
                <li>Memuat aturan...</li>
              )}
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;