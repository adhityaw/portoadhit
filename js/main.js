/* ======== EDIT YOUR LINKS HERE ======== */
var CONFIG = {
  email: "adhityawardantika2@gmail.com",   // shown in the toast and copied when someone clicks "Email Me"
  youtube: "https://youtube.com/@adhityawrdntika?si=pE084xambz3sbZP3",                 // e.g. "https://www.linkedin.com/in/your-name"
  github: "https://github.com/adhityaw",                   // e.g. "https://github.com/your-name"
  cv: ""                        // link to your CV (Google Drive, etc.)
};

(function(){
  var $ = function(s,r){return (r||document).querySelector(s)};
  var $$ = function(s,r){return [].slice.call((r||document).querySelectorAll(s))};

  /* toast */
  var toastEl = $('#toast'), tt;
  function toast(msg){
    toastEl.textContent = msg; toastEl.classList.add('on');
    clearTimeout(tt); tt = setTimeout(function(){toastEl.classList.remove('on')}, 2600);
  }

  /* mobile menu */
  var mb = $('#menuBtn'), mn = $('#mnav');
  function closeMenu(){ mn.classList.remove('open'); mb.setAttribute('aria-expanded','false'); mb.textContent = 'Menu'; }
  mb.addEventListener('click', function(){
    var o = mn.classList.toggle('open'); mb.setAttribute('aria-expanded', o); mb.textContent = o ? 'Close' : 'Menu';
  });
  $$('a', mn).forEach(function(a){ a.addEventListener('click', closeMenu); });

  /* back to top */
  $('#topBtn').addEventListener('click', function(){ window.scrollTo({top:0, behavior:'smooth'}); });

  /* marquee: repeat the group so the loop never shows a gap */
  $$('.mq .track').forEach(function(t){
    var g = t.firstElementChild;
    for(var i=0;i<3;i++){ t.appendChild(g.cloneNode(true)); }
  });

  /* count-up */
  function countUp(el){
    var to = +el.getAttribute('data-to'), t0 = null, dur = 1100;
    function step(ts){
      if(!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(to * e);
      if(p < 1) requestAnimationFrame(step);
    }
    el.textContent = 0; requestAnimationFrame(step);
  }

  /* scroll reveal */
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items = $$('.reveal');
  if('IntersectionObserver' in window && true){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(!en.isIntersecting) return;
        var el = en.target;
        var sibs = el.parentNode ? [].slice.call(el.parentNode.children).filter(function(c){return c.classList.contains('reveal')}) : [];
        var d = Math.max(0, sibs.indexOf(el)) * 90;
        setTimeout(function(){
          el.classList.add('is-in');
          $$('.count', el).forEach(countUp);
        }, d);
        io.unobserve(el);
      });
    }, {threshold:.15, rootMargin:'0px 0px -6% 0px'});
    items.forEach(function(el){ io.observe(el); });
  } else {
    items.forEach(function(el){ el.classList.add('is-in'); });
  }

  /* low-poly backdrop for the third project */
  (function(){
    var svg = $('#polybg'); if(!svg) return;
    var cols = 9, rows = 7, w = 400/(cols-1), h = 310/(rows-1), pts = [], seed = 7;
    function rnd(){ seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
    for(var r=0;r<rows;r++){ pts[r] = []; for(var c=0;c<cols;c++){
      var jx = (c===0||c===cols-1) ? 0 : (rnd()-.5)*w*.7, jy = (r===0||r===rows-1) ? 0 : (rnd()-.5)*h*.7;
      pts[r][c] = [c*w + jx, r*h + jy];
    }}
    var out = '';
    function tri(a,b,c){
      var l = 16 + Math.floor(rnd()*30);
      out += '<polygon points="'+a+' '+b+' '+c+'" fill="rgb('+l+','+l+','+(l+3)+')" stroke="rgb('+(l+6)+','+(l+6)+','+(l+9)+')" stroke-width=".6"/>';
    }
    for(var r=0;r<rows-1;r++) for(var c=0;c<cols-1;c++){
      var a=pts[r][c], b=pts[r][c+1], d=pts[r+1][c], e=pts[r+1][c+1];
      if((r+c)%2){ tri(a,b,d); tri(b,e,d); } else { tri(a,b,e); tri(a,e,d); }
    }
    svg.insertAdjacentHTML('beforeend', out);
  })();

  // zoom sertifikat
  (function(){
    var lb=document.createElement('div'); lb.className='lightbox'; lb.innerHTML='<img alt="">'; document.body.appendChild(lb);
    var im=lb.querySelector('img');
    $$('[data-zoom]').forEach(function(b){ b.addEventListener('click',function(){ im.src=b.getAttribute('data-zoom'); lb.classList.add('on'); }); });
    lb.addEventListener('click',function(){ lb.classList.remove('on'); });
    document.addEventListener('keydown',function(e){ if(e.key==='Escape') lb.classList.remove('on'); });
  })();
})();
