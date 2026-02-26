import React from 'react';
import { Outlet } from 'react-router-dom';
import Authorizer from '../components/Footer'; 
import './AdminLayout.css';

export default function AdminLayout() {
  return (
    <div className="layout-wrapper">
      <div className="main-container">
        <main className="content-area">
          <Outlet />
        </main>
        <div className="footer-wrapper">
          <Authorizer />
        </div>
      </div>
    </div>
  );
}