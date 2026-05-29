/* bantuan.js - handle submit form pengajuan bantuan + form kontak */
(function(){
  'use strict';

  function bindForm(formId, successMsg, btnHtml){
    const form = document.getElementById(formId);
    if(!form) return;
    const btn = form.querySelector('button[type="submit"]');
    DesaValidation.attachLive(form);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if(btn.disabled) return;
      if(!DesaValidation.validateForm(form)) return;

      btn.disabled = true;
      const oldHtml = btn.innerHTML;
      btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Memproses...';

      setTimeout(() => {
        DesaValidation.showSuccess(successMsg);
        form.reset();
        btn.disabled = false;
        btn.innerHTML = btnHtml || oldHtml;
      }, 900);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    bindForm('formBantuan',
      'Pengajuan bantuan Anda berhasil diajukan. Mohon menunggu verifikasi.',
      '<i class="bi bi-send me-1"></i> Ajukan Bantuan');
    bindForm('formKontak',
      'Pesan Anda berhasil dikirim. Terima kasih atas masukannya.',
      '<i class="bi bi-send me-1"></i> Kirim Pesan');
  });
})();
