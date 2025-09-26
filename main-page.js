function footerSendMessage(e) {
  e.preventDefault();
  const email = document.getElementById('footer-email-input').value;
  const msg = document.getElementById('footer-message-input').value;
  alert('Pesan terkirim!\nEmail: ' + email + '\nPesan: ' + msg);
  e.target.reset();
}