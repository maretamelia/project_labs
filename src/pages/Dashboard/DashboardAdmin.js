import React, { useState } from 'react';
import { 
  FiPackage, 
  FiTrendingUp, 
  FiCheckCircle 
} from 'react-icons/fi';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import './DashboardAdmin.css';


function Dashboard() {
  const [selectedYear, setSelectedYear] = useState('2025');

  // Data untuk statistik cards
  const statsCards = [
    {
      id: 1,
      title: 'Total barang',
      value: '3000',
      icon: <FiPackage />,
      color: 'blue',
      bgGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 3,
      title: 'Jumlah barang di pinjam',
      value: '1000',
      icon: <FiTrendingUp />,
      color: 'purple',
      bgGradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    },
    {
      id: 4,
      title: 'Jumlah barang dikembalikan',
      value: '12',
      icon: <FiCheckCircle />,
      color: 'green',
      bgGradient: 'linear-gradient(135deg, #81FBB8 0%, #28C76F 100%)'
    }
  ];

  // Data untuk line chart - Statistik Peminjaman
  const lineChartData = [
    { month: 'Jan', jumlah: 50 },
    { month: 'Feb', jumlah: 200 },
    { month: 'Mar', jumlah: 80 },
    { month: 'Apr', jumlah: 300 },
    { month: 'Mei', jumlah: 100 },
    { month: 'Jun', jumlah: 350 },
    { month: 'Jul', jumlah: 150 },
    { month: 'Agst', jumlah: 320 },
    { month: 'Sep', jumlah: 90 },
    { month: 'Okt', jumlah: 120 },
    { month: 'Nov', jumlah: 280 },
    { month: 'Des', jumlah: 180 }
  ];

  // Data untuk bar chart - Status Peminjaman
  const barChartData = [
    { month: 'Jan', peminjaman: 280, pengembalian: 200, terlambat: 150 },
    { month: 'Feb', peminjaman: 320, pengembalian: 280, terlambat: 180 },
    { month: 'Mar', peminjaman: 350, pengembalian: 320, terlambat: 200 },
    { month: 'Apr', peminjaman: 380, pengembalian: 350, terlambat: 220 },
    { month: 'Mei', peminjaman: 450, pengembalian: 380, terlambat: 250 },
    { month: 'Jun', peminjaman: 480, pengembalian: 420, terlambat: 180 },
    { month: 'Jul', peminjaman: 520, pengembalian: 480, terlambat: 280 },
    { month: 'Agst', peminjaman: 550, pengembalian: 520, terlambat: 320 },
    { month: 'Sep', peminjaman: 580, pengembalian: 550, terlambat: 280 },
    { month: 'Okt', peminjaman: 620, pengembalian: 580, terlambat: 350 },
    { month: 'Nov', peminjaman: 680, pengembalian: 620, terlambat: 380 },
    { month: 'Des', peminjaman: 720, pengembalian: 680, terlambat: 420 }
  ];

  // Data barang akan habis
  const lowStockItems = [
    { name: 'Proyektor', stock: 'Stok Tersedia', count: 1, color: '#667eea' },
    { name: 'Sensor', stock: 'Stok Tersedia', count: 2, color: '#f093fb' },
    { name: 'Led', stock: 'Stok Tersedia', count: 2, color: '#a8edea' },
    { name: 'Breadboard', stock: 'Stok Tersedia', count: 2, color: '#81FBB8' },
    { name: 'Mikrotik', stock: 'Stok Tersedia', count: 3, color: '#ffa502' }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        {/* Stats Cards */}
        <div className="stats-grid">
          {statsCards.map((card) => (
            <div key={card.id} className="stat-card">
              <div className="stat-card-content">
                <div className="stat-info">
                  <div className="stat-value">{card.value}</div>
                  <div className="stat-title">{card.title}</div>
                </div>
                <div 
                  className="stat-icon"
                  style={{ background: card.bgGradient }}
                >
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="charts-grid">
          {/* Line Chart - Statistik Peminjaman */}
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
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#9ca3af"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="#9ca3af"
                    style={{ fontSize: '12px' }}
                    tickFormatter={(value) => `${value} Jt`}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                    formatter={(value) => [`Rp ${value}.000`, 'Jumlah']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="jumlah" 
                    stroke="#b57edc" 
                    strokeWidth={3}
                    dot={{ fill: '#b57edc', r: 5 }}
                    activeDot={{ r: 7 }}
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
              {lowStockItems.map((item, index) => (
                <div key={index} className="low-stock-item">
                  <div className="low-stock-info">
                    <div className="low-stock-name">{item.name}</div>
                    <div className="low-stock-status">{item.stock}</div>
                  </div>
                  <div 
                    className="low-stock-count"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.count}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bar Chart - Status Peminjaman */}
        <div className="chart-card chart-full">
          <div className="chart-header">
            <h3 className="chart-title">Status peminjaman</h3>
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
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="month" 
                  stroke="#9ca3af"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#9ca3af"
                  style={{ fontSize: '12px' }}
                  tickFormatter={(value) => `${value} Jt`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend 
                  wrapperStyle={{ fontSize: '13px' }}
                  iconType="circle"
                />
                <Bar 
                  dataKey="peminjaman" 
                  fill="#b57edc" 
                  radius={[8, 8, 0, 0]}
                  name="Peminjaman"
                />
                <Bar 
                  dataKey="pengembalian" 
                  fill="#f093fb" 
                  radius={[8, 8, 0, 0]}
                  name="Pengembalian"
                />
                <Bar 
                  dataKey="terlambat" 
                  fill="#ffa502" 
                  radius={[8, 8, 0, 0]}
                  name="Terlambat"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;