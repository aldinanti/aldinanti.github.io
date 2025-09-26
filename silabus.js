let viewerInstance = null;

function openLightbox(element) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const mainNav = document.querySelector('.main-nav');
  const movingBanner = document.querySelector('.moving-banner');

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
  if (viewerInstance) {
    viewerInstance.destroy();
    viewerInstance = null;
  }

  //lightbox untuk membuka gambar
  lightbox.style.display = "block";
  lightboxImg.src = fullSizeSrc;

  //mengaktifkan viewer.js
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
        closeLightbox();
      }
    });
    viewerInstance.show();
  };
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

document.getElementById('close-btn').addEventListener('click', function(e) {
  e.stopPropagation();
  closeLightbox();
});
document.getElementById('lightbox').addEventListener('click', function(e) {
  // Tutup hanya jika klik di overlay (bukan gambar atau tombol close)
  if (e.target === this) {
    closeLightbox();
  }
});
