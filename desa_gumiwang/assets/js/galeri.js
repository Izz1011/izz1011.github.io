/* galeri.js - opsional lightbox sederhana saat klik gambar */
(function(){
  'use strict';
  document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.galeri-item');
    items.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const title = item.querySelector('h6')?.textContent || '';
        if(!img) return;
        const overlay = document.createElement('div');
        overlay.style.cssText = `
          position:fixed;inset:0;background:rgba(15,22,35,.9);
          display:flex;align-items:center;justify-content:center;
          z-index:9999;padding:2rem;cursor:zoom-out;flex-direction:column;
          animation:fadeIn .25s ease;
        `;
        overlay.innerHTML = `
          <img src="${img.src}" style="max-width:90vw;max-height:80vh;border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,.5)" alt="">
          <p style="color:#fff;margin-top:1rem;font-weight:500">${title}</p>
        `;
        overlay.addEventListener('click', () => overlay.remove());
        document.body.appendChild(overlay);
      });
    });
  });
})();
