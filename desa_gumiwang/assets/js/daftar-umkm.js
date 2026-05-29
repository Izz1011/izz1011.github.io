/* daftar-umkm.js - handle submit form pendaftaran UMKM */
(function(){
  'use strict';
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formDaftarUmkm');
    if(!form) return;
    const btn = form.querySelector('button[type="submit"]');
    DesaValidation.attachLive(form);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if(btn.disabled) return;
      if(!DesaValidation.validateForm(form)) return;

      btn.disabled = true;
      btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Memproses...';

      // Simulasi proses
      setTimeout(() => {
        DesaValidation.showSuccess('UMKM Anda berhasil didaftarkan. Tim desa akan menghubungi Anda.');
        form.reset();
        btn.disabled = false;
        btn.innerHTML = '<i class="bi bi-send me-1"></i> Daftarkan UMKM';
      }, 900);
    });
  });
})();