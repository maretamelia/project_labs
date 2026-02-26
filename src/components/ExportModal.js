import React from 'react';
import { IoClose } from 'react-icons/io5';
import { RiFileExcel2Fill} from 'react-icons/ri';
import pdfIcon from '../assets/icons/pdf-icon.svg';
import './ExportModal.css';

const ExportModal = ({ isOpen, onClose, onExportExcel, onExportPDF }) => {
  if (!isOpen) return null;

  return (
    <div className="export-modal-overlay">
      <div className="export-modal-content">
        <div className="export-modal-header">
          <h3>Export Riwayat Peminjaman</h3>
          <button className="close-btn" onClick={onClose}>
            <IoClose />
          </button>
        </div>

        <div className="export-options-container">
          {/* Tombol Excel (Hijau) */}
          <button className="export-option-card excel" onClick={onExportExcel}>
            <div className="icon-wrapper">
              <RiFileExcel2Fill size={60} />
            </div>
            <span>Export Excel</span>
          </button>

          {/* Tombol PDF (Merah) */}
          <button className="export-option-card pdf" onClick={onExportPDF}>
            <div className="icon-wrapper">
              <img src={pdfIcon} alt="PDF Icon" style={{ width: '60px', height: '60px' }} />
            </div>
            <span>Export PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;