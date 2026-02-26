import React from 'react';
import './FilterModal.css';

function FilterModal({
  isOpen,
  onClose,
  onApply,
  onReset,
  filterValues = {},
  onFilterChange,
  showStatus = false,
  statusOptions = [],
  children
}) {
  if (!isOpen) return null;

  return (
    <div className="filter-overlay" onClick={onClose}>
      <div className="filter-content" onClick={(e) => e.stopPropagation()}>
        <div className="filter-header">
          <h3>Filter</h3>
        </div>

        <div className="filter-body">

          {/* Tanggal Mulai */}
          {onFilterChange && (
            <>
              <div className="filter-group">
                <label>Tanggal Mulai</label>
                <input
                  type="date"
                  value={filterValues.startDate || ''}
                  onChange={(e) => onFilterChange('startDate', e.target.value)}
                  className="filter-input"
                />
              </div>

              <div className="filter-group">
                <label>Tanggal Akhir</label>
                <input
                  type="date"
                  value={filterValues.endDate || ''}
                  onChange={(e) => onFilterChange('endDate', e.target.value)}
                  className="filter-input"
                />
              </div>
            </>
          )}

          {/* Filter Status */}
          {showStatus && onFilterChange && (
            <div className="filter-group">
              <label>Status</label>
              <select
                value={filterValues.status || ''}
                onChange={(e) => onFilterChange('status', e.target.value)}
                className="filter-input"
              >
                <option value="">Semua Status</option>
                {statusOptions.map((s) => {
                  const value = typeof s === 'object' ? s.value : s;
                  const label = typeof s === 'object' ? s.label : s;
                  return (
                    <option key={value} value={value}>{label}</option>
                  );
                })}
              </select>
            </div>
          )}

          {/* Children (kalau ada field tambahan dari luar) */}
          {children}

          <div className="filter-footer">
            <button onClick={onReset} className="btn-reset">Reset</button>
            <button onClick={onApply} className="btn-apply">Terapkan</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterModal;