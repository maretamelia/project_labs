import React from 'react';
import './SearchBar.css';
import { FiSearch, FiSliders } from 'react-icons/fi';

function SearchBar({ searchTerm, onSearchChange, onOpenFilter, placeholder = "Cari kategori..." }) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholder}
        className="search-input"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <button className="search-icon" onClick={() => console.log('Search clicked')}>
        <FiSearch />
      </button>

      <button className="filter-btn" onClick={onOpenFilter}>
        <FiSliders /> {/* tombol filter */}
      </button>
    </div>
  );
}

export default SearchBar;
