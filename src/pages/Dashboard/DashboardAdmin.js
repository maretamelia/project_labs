import React, { useState, useEffect } from 'react';
import { FiPackage, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { getDashboardData } from '../../services/dashboardAdminService';
import './DashboardAdmin.css';

function Dashboard() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    totalBarang: 0,
    dipinjam: 0,
    selesai: 0,
    lowStockItems: [],
    charts: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getDashboardData(selectedYear);
        const res = response.data.data;

        setData({
          totalBarang: res.stats.total_barang,
          dipinjam: res.stats.dipinjam,
          selesai: res.stats.selesai,
          lowStockItems: res.low_stock,
          charts: res.charts
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedYear]);

  // Data statis untuk icon dan title, nilai diambil dari API
  const statsCards = [
    {
      id: 1,
      title: 'Total barang',
      value: data.totalBarang,
      icon: <FiPackage />,
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 2, // ID disesuaikan urutannya
      title: 'Jumlah barang di pinjam',
      value: data.dipinjam,
      icon: <FiTrendingUp />,
      background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)'
    },
    {
      id: 3,
      title: 'Jumlah barang dikembalikan',
      value: data.selesai,
      icon: <FiCheckCircle />,
      background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    }
  ];

  if (loading) return <div className="loading-state">Loading Dashboard...</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        
        {/* --- STATS CARDS GRID --- */}
        <div className="stats-grid">
          {statsCards.map((card) => (
            <div key={card.id} className="stat-card">
              <div className="stat-card-content">
                <div className="stat-info">
                  <div className="stat-value">{card.value}</div>
                  <div className="stat-title">{card.title}</div>
                </div>
                {/* stat-icon akan melayang ke kanan atas karena position: absolute di CSS */}
                <div className="stat-icon" style={{ background: card.background }}>
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- CHARTS GRID --- */}
        <div className="charts-grid">
          {/* Statistik Peminjaman (Line Chart) */}
          <div className="chart-card chart-large">
            <div className="chart-header">
              <h3 className="chart-title">Statistik Peminjaman</h3>
              <select 
                className="year-select"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
              </select>
            </div>
            <div className="chart-content">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data.charts}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="peminjaman" 
                    stroke="#b57edc" 
                    strokeWidth={4} 
                    dot={{ r: 6, fill: '#b57edc', strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Barang Akan Habis */}
          <div className="chart-card">
            <div className="chart-header">
              <h3 className="chart-title">Barang Akan Habis</h3>
            </div>
            <div className="low-stock-list">
              {data.lowStockItems.map((item, index) => (
                <div key={index} className="low-stock-item">
                  <div className="low-stock-info">
                    <div className="low-stock-name">{item.name}</div>
                    <div className="low-stock-status">Stok Tersedia</div>
                  </div>
                  <div className="low-stock-count" style={{ backgroundColor: item.color }}>
                    {item.count}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- STATUS PEMINJAMAN (BAR CHART) --- */}
        <div className="chart-card chart-full">
          <div className="chart-header">
            <h3 className="chart-title">Status peminjaman</h3>
          </div>
          <div className="chart-content">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={data.charts} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#f9fafb'}} />
                <Legend iconType="circle" verticalAlign="bottom" height={36} />
                <Bar dataKey="peminjaman" fill="#b57edc" radius={[6, 6, 0, 0]} name="Peminjaman" />
                <Bar dataKey="pengembalian" fill="#f093fb" radius={[6, 6, 0, 0]} name="Selesai" />
                <Bar dataKey="terlambat" fill="#ffa502" radius={[6, 6, 0, 0]} name="Terlambat" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;