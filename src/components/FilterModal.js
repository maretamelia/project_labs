import React from 'react';
import './FilterModal.css';

function FilterModal({ isOpen, onClose, onApply, onReset, children }) {
  if (!isOpen) return null;

  return (
    <div className="filter-overlay" onClick={onClose}>
      <div className="filter-content" onClick={(e) => e.stopPropagation()}>
        <div className="filter-header">
          <h3>Filter</h3>
        </div>
        
        <div className="filter-body">
          {children}

          <div className="filter-footer">
            <button onClick={onReset} className="btn-reset">
              Reset
            </button>
            <button onClick={onApply} className="btn-apply">
              Terapkan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterModal;