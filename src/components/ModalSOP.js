import './ModalSOP.css';
// Auto-open popup saat halaman load (simulasi setelah login)
window.addEventListener('load', () => {
  setTimeout(openModal, 600);
});

function openModal() {
  const overlay = document.getElementById('overlay');
  overlay.classList.add('active');

  // Reset animasi setiap kali popup dibuka ulang
  document.querySelectorAll('.step-item, .modal-footer').forEach(el => {
    el.style.animation = 'none';
    el.offsetHeight; // trigger reflow
    el.style.animation = '';
  });
}

function closeModal() {
  document.getElementById('overlay').classList.remove('active');
}

// Klik di luar modal = tutup
function handleOverlayClick(e) {
  if (e.target === document.getElementById('overlay')) {
    closeModal();
  }
}

// Tekan Escape = tutup
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});