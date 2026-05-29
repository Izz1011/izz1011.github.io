/* navbar.js - menandai link aktif sesuai halaman saat ini */
(function(){
  'use strict';
  document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navbar-desa .nav-link').forEach(a => {
      const href = a.getAttribute('href');
      if(href === path) a.classList.add('active');
    });
  });
})();