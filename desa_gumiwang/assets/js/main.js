/* main.js - inisialisasi umum semua halaman */
(function(){
  'use strict';

  // Fade up animation on scroll
  const initFadeUp = () => {
    const els = document.querySelectorAll('.fade-up');
    if(!('IntersectionObserver' in window) || !els.length) return;
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    },{threshold:.12});
    els.forEach(el=>io.observe(el));
  };

  // Update tahun footer
  const updateYear = () => {
    const y = document.getElementById('year');
    if(y) y.textContent = new Date().getFullYear();
  };

  document.addEventListener('DOMContentLoaded', () => {
    initFadeUp();
    updateYear();
  });
})();
