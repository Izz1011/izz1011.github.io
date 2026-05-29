/* validation.js - util validasi form reusable */
window.DesaValidation = (function(){
  'use strict';

  const patterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    digits: /^\d+$/,
    hp: /^(0|\+62)\d{8,13}$/,
    nik: /^\d{16}$/
  };

  /**
   * Validasi 1 field. Mengembalikan string error atau '' jika valid.
   */
  function validateField(input){
    const val = (input.value || '').trim();
    const type = input.dataset.validate || '';
    const required = input.hasAttribute('required') || input.dataset.required === 'true';

    if(required && !val) return 'Field ini wajib diisi.';
    if(!val) return '';

    switch(type){
      case 'email':
        if(!patterns.email.test(val)) return 'Format email tidak valid.';
        break;
      case 'hp':
        if(!patterns.digits.test(val)) return 'Nomor HP hanya boleh angka.';
        if(!patterns.hp.test(val)) return 'Nomor HP tidak valid (8-13 digit).';
        break;
      case 'nik':
        if(!patterns.digits.test(val)) return 'NIK hanya boleh angka.';
        if(!patterns.nik.test(val)) return 'NIK harus 16 digit.';
        break;
      case 'number':
        if(!patterns.digits.test(val.replace(/\./g,''))) return 'Hanya angka yang diperbolehkan.';
        break;
      case 'min3':
        if(val.length < 3) return 'Minimal 3 karakter.';
        break;
    }
    return '';
  }

  function showError(input, msg){
    const wrap = input.closest('.field-wrap') || input.parentElement;
    input.classList.add('is-invalid');
    wrap.classList.add('field-error');
    let el = wrap.querySelector('.error-msg');
    if(!el){
      el = document.createElement('div');
      el.className = 'error-msg';
      wrap.appendChild(el);
    }
    el.textContent = msg;
  }

  function clearError(input){
    const wrap = input.closest('.field-wrap') || input.parentElement;
    input.classList.remove('is-invalid');
    wrap.classList.remove('field-error');
  }

  /**
   * Validasi seluruh form. Return true jika valid.
   * Otomatis scroll ke field error pertama.
   */
  function validateForm(form){
    const fields = form.querySelectorAll('input, select, textarea');
    let firstError = null;
    fields.forEach(f => {
      if(f.type === 'submit' || f.type === 'button') return;
      const msg = validateField(f);
      if(msg){
        showError(f, msg);
        if(!firstError) firstError = f;
      } else {
        clearError(f);
      }
    });
    if(firstError){
      firstError.scrollIntoView({behavior:'smooth', block:'center'});
      setTimeout(()=>firstError.focus({preventScroll:true}), 350);
      return false;
    }
    return true;
  }

  /**
   * Attach live validation: hapus error saat user mengetik.
   */
  function attachLive(form){
    form.querySelectorAll('input, select, textarea').forEach(f => {
      const handler = () => {
        if(f.classList.contains('is-invalid')){
          const msg = validateField(f);
          if(!msg) clearError(f);
          else showError(f, msg);
        }
      };
      f.addEventListener('input', handler);
      f.addEventListener('blur', handler);
      f.addEventListener('change', handler);
    });
  }

  /**
   * Tampilkan success modal Bootstrap dengan pesan custom.
   */
  function showSuccess(message){
    const modalEl = document.getElementById('successModal');
    if(!modalEl) return alert(message || 'Berhasil!');
    const msgEl = modalEl.querySelector('.success-message');
    if(msgEl && message) msgEl.textContent = message;
    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
    modal.show();
  }

  return { validateField, validateForm, attachLive, showError, clearError, showSuccess };
})();
