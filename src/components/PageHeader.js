// File: src/components/PageHeader.jsx
import React from 'react';
import './PageHeader.css';

function PageHeader({ title, subtitle }) {
  console.log('PageHeader props:', title, subtitle);
  return (
    <div className="page-header">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
}


export default PageHeader;
