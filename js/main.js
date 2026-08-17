(function () {
  var dot = document.getElementById('statusDot');
  var text = document.getElementById('statusText');
  var now = new Date();
  var mins = now.getHours() * 60 + now.getMinutes();
  var open = mins >= (9 * 60 + 30) && mins < (19 * 60);
  if (open) { dot.classList.remove('closed'); text.textContent = 'Open now · till 7:00pm'; }
  else { dot.classList.add('closed'); text.textContent = 'Closed now · opens 9:30am'; }
})();

// Scroll-driven reveal animations (AOS - https://unpkg.com/aos)
if (window.AOS) {
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  AOS.init({
    duration: 650,
    easing: 'ease-out-cubic',
    once: true,
    offset: 60,
    disable: reduceMotion
  });
}

// Safety net: if the AOS script fails to load (some mobile networks/
// browsers block third-party CDN scripts), aos.css still hides
// [data-aos] elements by default with no JS to ever reveal them.
// Force everything visible after a short delay if that happens.
window.setTimeout(function () {
  if (!window.AOS) {
    document.querySelectorAll('[data-aos]').forEach(function (el) {
      el.removeAttribute('data-aos');
    });
  }
}, 2000);

// Subtle hero parallax — moves the ticket-stub background slower than
// the page scroll, bounded card version (not viewport-fixed, since the
// hero image sits inside a rounded card, not a full-bleed header).
(function () {
  var bg = document.querySelector('.stub-bg');
  if (!bg) return;
  var reduceMotionCheck = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotionCheck) return;

  var maxShift = 22; // px — kept small so it reads as "depth", not a slide
  var ticking = false;

  function update() {
    var rect = bg.parentElement.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    var center = rect.top + rect.height / 2;
    var progress = (center - vh / 2) / vh; // ~ -1 (above) to 1 (below)
    var clamped = Math.max(-1, Math.min(1, progress));
    bg.style.transform = 'translateY(' + (clamped * maxShift).toFixed(1) + 'px)';
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();

// Ambient liquid gradient backdrop (Granim.js - cdnjs.cloudflare.com)
// Kept within the site's own lavender/purple palette so it reads as
// "the page breathing," not a mismatched color overlay.
(function () {
  var canvas = document.getElementById('granim-canvas');
  if (!canvas) return;
  if (typeof Granim === 'undefined') {
    console.warn('Granim.js failed to load from the CDN — ambient gradient skipped.');
    return;
  }
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    console.info('Ambient gradient skipped: prefers-reduced-motion is on.');
    return;
  }

  // Set the actual drawing-buffer resolution — without this the canvas
  // defaults to 300x150px internally and gets blurrily stretched by CSS.
  function sizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  sizeCanvas();
  window.addEventListener('resize', sizeCanvas);

  new Granim({
    element: '#granim-canvas',
    direction: 'diagonal',
    isPausedWhenNotInView: true,
    states: {
      'default-state': {
        gradients: [
          ['#E4E0F7', '#8479B8'],
          ['#C6BFEC', '#6C5FA5'],
          ['#D9CFF0', '#4C4178'],
          ['#8479B8', '#C6BFEC']
        ],
        transitionSpeed: 4500,
        loop: true
      }
    }
  });
})();