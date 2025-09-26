let viewerInstance = null;

function openLightbox(element) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const mainNav = document.querySelector('.main-nav');
  const movingBanner = document.querySelector('.moving-banner');

  // Mendukung dua cara pemanggilan: string src atau elemen dengan data-full-src
  let fullSizeSrc = '';
  if (typeof element === 'string') {
    fullSizeSrc = element;
  } else if (element && element.getAttribute) {
    fullSizeSrc = element.getAttribute('data-full-src') || element.querySelector('img')?.src || '';
  }

  if (mainNav) {
    mainNav.style.display = 'none';
  }
  if (movingBanner) {
    movingBanner.style.display = 'none';
  }

  // Hancurkan instance lama jika ada
  if (viewerInstance) {
    viewerInstance.destroy();
    viewerInstance = null;
  }

  // Tampilkan lightbox
  lightbox.style.display = "block";
  // Atur sumber gambar di lightbox
  lightboxImg.src = fullSizeSrc;

  // Aktifkan Viewer.js hanya pada gambar lightbox
  lightboxImg.onload = function() {
    if (viewerInstance) {
      viewerInstance.destroy();
    }
    viewerInstance = new Viewer(lightboxImg, {
      inline: false,
      navbar: false,
      toolbar: true,
      title: false,
      hidden() {
        // Pastikan lightbox juga tertutup jika Viewer.js ditutup
        closeLightbox();
      }
    });
    viewerInstance.show();
  };
  // Jika gambar sudah di-cache
  if (lightboxImg.complete) {
    lightboxImg.onload();
  }
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  const mainNav = document.querySelector('.main-nav');
  const movingBanner = document.querySelector('.moving-banner');
  lightbox.style.display = "none";
  if (mainNav) {
    mainNav.style.display = '';
  }
  if (movingBanner) {
    movingBanner.style.display = '';
  }
  if (viewerInstance) {
    viewerInstance.destroy();
    viewerInstance = null;
  }
}


// Event tombol close
document.getElementById('close-btn').addEventListener('click', function(e) {
  e.stopPropagation();
  closeLightbox();
});

// Tutup lightbox jika klik di luar gambar (overlay)
document.getElementById('lightbox').addEventListener('click', function(e) {
  // Tutup hanya jika klik di overlay (bukan gambar atau tombol close)
  if (e.target === this) {
    closeLightbox();
  }
});