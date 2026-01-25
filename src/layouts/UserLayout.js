import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SidebarUser from '../components/user/SidebarUser';
import Navbar from '../components/Navbar'; // pakai navbar temen dulu

import './UserLayout.css';

function UserLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="user-layout">
      {/* Sidebar */}
      <SidebarUser isOpen={isSidebarOpen} />

      {/* Main content */}
      <div className="user-main">
        {/* Topbar */}
        <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Page content */}
        <div className="user-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default UserLayout;
