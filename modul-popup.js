window.addEventListener('DOMContentLoaded', function(){
  var btnKalkIA = document.getElementById('mulai-kalkulus-ia');
  var btnKalkIIA = document.getElementById('mulai-kalkulus-iia');
  if (btnKalkIA) {
    btnKalkIA.addEventListener('click', function(e){
      e.preventDefault();
           showModulPopup('kalkulus1a.html');
    });
  }
  if (btnKalkIIA){
    btnKalkIIA.addEventListener('click', function(e) {
      e.preventDefault();
      showModulPopup('kalkulus2a.html');
    });
  }
});

let kalkulatorTargetUrl = 'kalkulus1a.html';
function showModulPopup(targetUrl) {
  kalkulatorTargetUrl = targetUrl || 'kalkulus1a.html';
  let popup = document.getElementById('modul-popup');
  if (popup) {
    popup.style.display = 'flex';
  }
}


window.addEventListener('DOMContentLoaded', function(){
  const popup = document.getElementById('modul-popup');
  if (popup){
    popup.querySelector('.modul-popup-overlay').onclick = closeModulPopup;
    popup.querySelector('.modul-popup-close').onclick = closeModulPopup;
    popup.querySelector('#btn-kalkulator').onclick = function(){window.location.href = kalkulatorTargetUrl;};
    popup.querySelector('#btn-latihan').onclick = function(){alert('masih dalam development');closeModulPopup();};
  }
});
function closeModulPopup(){
  const popup = document.getElementById('modul-popup');
  if (popup) popup.style.display = 'none';
}
