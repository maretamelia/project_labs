// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import SidebarUser from './components/user/SidebarUser';
import Navbar from './components/Navbar';
import RouteIndex from './RouteIndex';
import './App.css';

function AppContent() {
  const location = useLocation(); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const isUserPath = location.pathname.startsWith('/user');
  const hideLayout = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="app-container">
      {!hideLayout && (isUserPath ? (
        <SidebarUser isOpen={isSidebarOpen} />
      ) : (
        <Sidebar isOpen={isSidebarOpen} />
      ))}

      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'} ${hideLayout ? 'no-layout' : ''}`}>
        {!hideLayout && (
          <Navbar 
            userName="Grisella"
            userRole={isUserPath ? 'user' : 'admin'}
            onMenuToggle={toggleSidebar}
          />
        )}

        <div className="content-wrapper">
          <RouteIndex />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
