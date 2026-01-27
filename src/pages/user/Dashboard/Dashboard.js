import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { FiBox, FiClock, FiCheckCircle, FiUpload } from 'react-icons/fi';

function Dashboard() {
  const navigate = useNavigate();

  const handleSeeAll = () => {
    navigate('/user/pinjamansaya');
  };

  const stats = [
    { id: 1, icon: <FiBox />, count: 2, label: 'Sedang Dipinjam', color: 'beige' },
    { id: 2, icon: <FiClock />, count: 4, label: 'Menunggu Persetujuan', color: 'gray' },
    { id: 3, icon: <FiUpload />, count: 5, label: 'Terlambat', color: 'orange' },
    { id: 4, icon: <FiCheckCircle />, count: 7, label: 'Dikembalikan', color: 'pink' },
  ];

  const peminjaman = [
    { no: 1, namaBarang: 'Breadboard', jumlah: 2, tanggalPinjam: '15/09/2025', tanggalKembali: '20/09/2025', status: 'Menunggu' },
    { no: 2, namaBarang: 'Breadboard', jumlah: 3, tanggalPinjam: '15/09/2025', tanggalKembali: '20/09/2025', status: 'Dipinjam' },
    { no: 3, namaBarang: 'Breadboard', jumlah: 2, tanggalPinjam: '15/09/2025', tanggalKembali: '20/09/2025', status: 'Terlambat' },
    { no: 4, namaBarang: 'Breadboard', jumlah: 4, tanggalPinjam: '15/09/2025', tanggalKembali: '20/09/2025', status: 'Disetujui' },
    { no: 5, namaBarang: 'Breadboard', jumlah: 1, tanggalPinjam: '15/09/2025', tanggalKembali: '20/09/2025', status: 'Dikembalikan' },
  ];

  const getStatusClass = (status) => {
    return status.toLowerCase();
  };

  return (
    <div className="dashboard-page">
      
      <div className="stats-container">
        {stats.map(stat => (
          <div key={stat.id} className={`stat-card ${stat.color}`}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <div className="stat-count">{stat.count}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="table-header">
      <button className="btn-see-all" onClick={handleSeeAll}>
          See all →
        </button>
      </div>

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
            {peminjaman.map(item => (
              <tr key={item.no}>
                <td>{item.no}.</td>
                <td>{item.namaBarang}</td>
                <td>{item.jumlah}</td>
                <td>{item.tanggalPinjam}</td>
                <td>{item.tanggalKembali}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(item.status)}`}>
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
            <h3>Penginggat Pengembalian</h3>
            <ul>
              <li>Breadboard - 2 hari lagi</li>
              <li>Kamera - Hari ini</li>
            </ul>
          </div>
        </div>

        <div className="notif-card info">
          <div className="notif-icon">⚠️</div>
          <div className="notif-content">
            <h3>Aturan Peminjaman</h3>
            <ul>
              <li>Maks. 3 barang</li>
              <li>Keterlambatan dikenakan sanksi</li>
              <li>Barang rusak wajib dilaporkan</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;