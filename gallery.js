document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxVideo = document.getElementById('lightbox-video');

  /* ==========================================================
     1. CLIC EN CUALQUIER PARTE DEL DOCUMENTO (DELEGACIÓN)
     ========================================================== */
  document.addEventListener('click', (e) => {

    // --- Caso VIDEO ---
    const videoTrigger = e.target.closest('.video-trigger');
    if (videoTrigger) {
      const videoSrc = videoTrigger.getAttribute('data-video-src');
      if (videoSrc) {
        lightbox.classList.add('is-video');
        lightboxVideo.src = videoSrc;
        lightbox.classList.add('active');
        lightboxVideo.play().catch(err => {
          console.log("El navegador bloqueó la reproducción automática: ", err);
        });
      }
      return; // Importante: no seguir evaluando como foto
    }

    // --- Caso FOTO ---
    const img = e.target.closest('.card-img');
    if (img && !img.closest('.video-trigger')) {
      lightbox.classList.remove('is-video');
      lightboxImg.src = img.src;
      lightbox.classList.add('active');
      return;
    }

    // --- Cerrar al hacer clic en el fondo oscuro ---
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  /* ==========================================================
     2. CERRAR MODAL Y DETENER REPRODUCCIÓN
     ========================================================== */
  function closeLightbox() {
    lightbox.classList.remove('active');

    if (lightboxVideo) {
      lightboxVideo.pause();
      lightboxVideo.currentTime = 0;
      lightboxVideo.src = '';
    }
    if (lightboxImg) {
      lightboxImg.src = '';
    }
  }

  // Cerrar con tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
});