import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import RouteIndex from './RouteIndex'; // import RouteIndex langsung dari src
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <Router>
      <div className="app-container">
        <Sidebar isOpen={isSidebarOpen} />

        <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <Navbar 
            userName="Grisella" 
            userRole="Admin" 
            onMenuToggle={toggleSidebar}
          />

          <div className="content-wrapper">
            <RouteIndex />  {/* semua route jalan dari sini */}
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
