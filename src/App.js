// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import SidebarUser from './components/user/SidebarUser';
import Navbar from './components/Navbar';
import RouteIndex from './RouteIndex'; // import RouteIndex langsung dari src
import './App.css';

function AppContent() {
  const location = useLocation(); // ini dipakai buat cek path
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Tentukan sidebar berdasarkan prefix path
  const isUserPath = location.pathname.startsWith('/user');

  return (
    <div className="app-container">
      {/* Sidebar berdasarkan URL */}
      {isUserPath ? (
        <SidebarUser isOpen={isSidebarOpen} />
      ) : (
        <Sidebar isOpen={isSidebarOpen} />
      )}

      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Navbar 
          userName="Grisella"
          userRole={isUserPath ? 'user' : 'admin'} // optional, biar Navbar tahu role
          onMenuToggle={toggleSidebar}
        />

        <div className="content-wrapper">
          <RouteIndex /> {/* Semua route admin/user jalan dari sini */}
        </div>
      </div>
    </div>
  );
}

// Router dibungkus di sini
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
