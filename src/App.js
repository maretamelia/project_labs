import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import './App.css';

// import halaman kategori
import KategoriList from './pages/kategori/KategoriList';

// Import halaman barang
import BarangList from './pages/barang/BarangList';
import BarangCreate from './pages/barang/BarangCreate';
import BarangEdit from './pages/barang/BarangEdit';
import BarangDetail from './pages/barang/BarangDetail';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="app-container">
        {/* Sidebar - Bisa hide/show */}
        <Sidebar isOpen={isSidebarOpen} />
        
        {/* Main Content Area */}
        <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          {/* Navbar */}
          <Navbar 
            userName="Grisella" 
            userRole="Admin" 
            onMenuToggle={toggleSidebar}
          />
          
          {/* Content */}
          <div className="content-wrapper">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <h1>Selamat datang, Amel!</h1>
                    <p>Ini halaman utama React-mu.</p>
                  </>
                }
              />
              {/* Route kategori */}
              <Route path="/kategori" element={<KategoriList />} />

              {/* Route barang */}
              <Route path="/barang" element={<BarangList />} />
              <Route path="/barang/create" element={<BarangCreate />} />
              <Route path="/barang/edit/:id" element={<BarangEdit />} />
              <Route path="/barang/:id" element={<BarangDetail />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;