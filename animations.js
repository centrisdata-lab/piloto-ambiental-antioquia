/* ============================================================
   ANIMACIONES JS — Piloto Ambiental Antioquia
   Pareja de animations.css. Incluye 3 comportamientos:
   1. Clic en foto → zoom in-place (sin oscurecer fondo)
   2. Resplandor que sigue al mouse en tarjetas .hv-glow
   3. Entrada de cada slide al hacer scroll (+ red de seguridad
      para que TODAS las slides se vean al exportar a PDF)

   Cárgalo al final del <body>, después de que el HTML de las
   slides ya exista en el DOM.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function(){

  /* ---------- 1. Clic en foto → zoom in-place ---------- */
  (function(){
    document.querySelectorAll('.frame').forEach(function(frame){
      frame.addEventListener('click', function(e){
        var wasZoomed = frame.classList.contains('zoomed');
        document.querySelectorAll('.frame.zoomed').forEach(function(f){ f.classList.remove('zoomed'); });
        if (!wasZoomed) frame.classList.add('zoomed');
        e.stopPropagation();
      });
    });
    document.addEventListener('click', function(){
      document.querySelectorAll('.frame.zoomed').forEach(function(f){ f.classList.remove('zoomed'); });
    });
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape') {
        document.querySelectorAll('.frame.zoomed').forEach(function(f){ f.classList.remove('zoomed'); });
      }
    });
  })();

  /* ---------- 2. Resplandor que sigue al mouse (.hv-glow) ---------- */
  (function(){
    document.querySelectorAll('.hv-glow').forEach(function(card){
      card.addEventListener('mousemove', function(e){
        var rect = card.getBoundingClientRect();
        var x = ((e.clientX - rect.left) / rect.width) * 100;
        var y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mx', x + '%');
        card.style.setProperty('--my', y + '%');
      });
    });
  })();

  /* ---------- 3. Entrada de slide al hacer scroll ---------- */
  (function(){
    if (window.matchMedia('print').matches) {
      document.querySelectorAll('.slide').forEach(function(s){ s.classList.add('in-view'); });
      return;
    }
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.slide').forEach(function(slide, i){
      if (i === 0) {
        slide.classList.add('in-view'); // la primera slide siempre visible de entrada
      } else {
        observer.observe(slide);
      }
    });

    // red de seguridad: si el usuario exporta a PDF sin haber hecho scroll
    // por toda la presentación, esto fuerza que todas las slides se vean.
    window.addEventListener('beforeprint', function(){
      document.querySelectorAll('.slide').forEach(function(s){ s.classList.add('in-view'); });
    });
  })();

});

/* ============================================================
   Si tienes un botón "Exportar a PDF" con onclick="window.print()",
   cámbialo por esto para forzar in-view ANTES de imprimir
   (más confiable que depender solo de 'beforeprint'):

   <button onclick="
     document.querySelectorAll('.slide').forEach(function(s){s.classList.add('in-view');});
     window.print();
   ">Exportar a PDF</button>
   ============================================================ */
