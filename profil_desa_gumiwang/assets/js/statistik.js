/* statistik.js - render chart sederhana dengan canvas vanilla */
(function(){
  'use strict';

  function drawBarChart(canvasId, data){
    const c = document.getElementById(canvasId);
    if(!c) return;
    const ctx = c.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const w = c.clientWidth, h = c.clientHeight || 280;
    c.width = w*dpr; c.height = h*dpr;
    ctx.scale(dpr,dpr);

    ctx.clearRect(0,0,w,h);
    const padding = {top:20,right:20,bottom:50,left:40};
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;
    const max = Math.max(...data.map(d=>d.value)) * 1.15;
    const barW = chartW / data.length * 0.6;
    const gap = chartW / data.length * 0.4;

    // axis
    ctx.strokeStyle = '#e3e8ef';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, padding.top+chartH);
    ctx.lineTo(padding.left+chartW, padding.top+chartH);
    ctx.stroke();

    // bars
    data.forEach((d,i) => {
      const x = padding.left + i*(barW+gap) + gap/2;
      const barH = (d.value/max)*chartH;
      const y = padding.top + chartH - barH;
      const grad = ctx.createLinearGradient(0,y,0,y+barH);
      grad.addColorStop(0, d.color || '#5b8def');
      grad.addColorStop(1, (d.color || '#5b8def')+'aa');
      ctx.fillStyle = grad;
      // rounded top
      const r = 6;
      ctx.beginPath();
      ctx.moveTo(x, y+r);
      ctx.quadraticCurveTo(x, y, x+r, y);
      ctx.lineTo(x+barW-r, y);
      ctx.quadraticCurveTo(x+barW, y, x+barW, y+r);
      ctx.lineTo(x+barW, y+barH);
      ctx.lineTo(x, y+barH);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#2b3445';
      ctx.font = '600 11px Segoe UI';
      ctx.textAlign = 'center';
      ctx.fillText(d.value, x+barW/2, y-6);

      ctx.fillStyle = '#6c7a89';
      ctx.font = '11px Segoe UI';
      ctx.fillText(d.label, x+barW/2, padding.top+chartH+18);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const dataUsia = [
      {label:'0-12',  value:320, color:'#5b8def'},
      {label:'13-25', value:540, color:'#6dbf9a'},
      {label:'26-45', value:760, color:'#f5a962'},
      {label:'46-60', value:430, color:'#d36a8b'},
      {label:'60+',   value:210, color:'#9b8df0'}
    ];
    drawBarChart('chartUsia', dataUsia);

    window.addEventListener('resize', () => {
      drawBarChart('chartUsia', dataUsia);
    });
  });
})();
