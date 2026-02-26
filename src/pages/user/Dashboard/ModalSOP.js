import { useEffect } from 'react';
import './ModalSOP.css';

export default function ModalSOP() {
  useEffect(() => {
    const sudahLihat = localStorage.getItem('sop_seen');
    let timeout;

    if (!sudahLihat) {
      timeout = setTimeout(openModal, 600);
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  function openModal() {
    const overlay = document.getElementById('sop-overlay');
    if (!overlay) return;
    overlay.classList.add('active');

    document.querySelectorAll('.step-item, .modal-footer').forEach(el => {
      el.style.animation = 'none';
      void el.offsetHeight;
      el.style.animation = '';
    });
  }

  function closeModal() {
    const overlay = document.getElementById('sop-overlay');
    if (overlay) overlay.classList.remove('active');
    localStorage.setItem('sop_seen', 'true');
  }

  function handleOverlayClick(e) {
    if (e.target === document.getElementById('sop-overlay')) {
      closeModal();
    }
  }

  return (
    <div className="overlay" id="sop-overlay" onClick={handleOverlayClick}>
      <div className="modal">

        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <div className="modal-badge">SOP Sistem</div>
            <div className="modal-title">
              Alur <span>Peminjaman</span> Barang
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="steps">

          <div className="step-item type-action">
            <div className="step-left">
              <div className="step-icon">📦</div>
              <div className="step-line"></div>
            </div>
            <div className="step-content">
              <div className="step-label">Langkah 1</div>
              <div className="step-title">Lihat Barang</div>
              <div className="step-desc">Telusuri daftar barang yang tersedia untuk dipinjam.</div>
            </div>
          </div>

          <div className="step-item type-form">
            <div className="step-left">
              <div className="step-icon">📝</div>
              <div className="step-line"></div>
            </div>
            <div className="step-content">
              <div className="step-label">Langkah 2</div>
              <div className="step-title">Isi Form</div>
              <div className="step-desc">Lengkapi formulir peminjaman dengan data yang diperlukan.</div>
            </div>
          </div>

          <div className="step-item type-wait">
            <div className="step-left">
              <div className="step-icon">⏳</div>
              <div className="step-line"></div>
            </div>
            <div className="step-content">
              <div className="step-label">Langkah 3</div>
              <div className="step-title">Menunggu Persetujuan</div>
              <div className="step-desc">Admin akan mereview dan memproses permintaan peminjaman kamu.</div>
            </div>
          </div>

          <div className="step-item type-return">
            <div className="step-left">
              <div className="step-icon">🔄</div>
              <div className="step-line"></div>
            </div>
            <div className="step-content">
              <div className="step-label">Langkah 4</div>
              <div className="step-title">Ajukan Pengembalian</div>
              <div className="step-desc">Setelah selesai, ajukan pengembalian barang melalui sistem.</div>
            </div>
          </div>

          <div className="step-item type-wait">
            <div className="step-left">
              <div className="step-icon">⏳</div>
              <div className="step-line"></div>
            </div>
            <div className="step-content">
              <div className="step-label">Langkah 5</div>
              <div className="step-title">Menunggu Persetujuan</div>
              <div className="step-desc">Admin memverifikasi kondisi barang yang dikembalikan.</div>
            </div>
          </div>

          <div className="step-item type-done">
            <div className="step-left">
              <div className="step-icon">✅</div>
              <div className="step-line"></div>
            </div>
            <div className="step-content">
              <div className="step-label">Langkah 6</div>
              <div className="step-title">Selesai</div>
              <div className="step-desc">Proses peminjaman berhasil diselesaikan. Terima kasih!</div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn-primary" onClick={closeModal}>Mengerti, Lanjutkan →</button>
        </div>

      </div>
    </div>
  );
}