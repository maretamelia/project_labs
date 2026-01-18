import React from 'react';
import './Pagination.css';

function Pagination({ currentPage, totalPages, currentItems, totalItems, onPageChange }) {
  return (
    <div className="pagination">
      <span className="pagination-info">
        Menampilkan {currentItems} dari {totalItems} data
      </span>
      <div className="pagination-buttons">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => onPageChange(i + 1)}
            className={`pagination-btn ${currentPage === i + 1 ? 'active' : ''}`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;