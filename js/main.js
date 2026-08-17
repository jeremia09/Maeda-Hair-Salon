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
// Wrapped in DOMContentLoaded so the CDN script has finished executing
// before we attempt to call AOS.init() — critical on slow mobile connections.
document.addEventListener('DOMContentLoaded', function () {
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    // Respect the OS setting but still make everything visible —
    // don't leave elements hidden in their pre-animation opacity:0 state.
    document.querySelectorAll('[data-aos]').forEach(function (el) {
      el.removeAttribute('data-aos');
    });
    return;
  }

  if (window.AOS) {
    AOS.init({
      duration: 650,
      easing: 'ease-out-cubic',
      once: true,
      offset: 40,           // lower threshold — better for small mobile viewports
      startEvent: 'DOMContentLoaded'
    });
  } else {
    // AOS CDN script was blocked or too slow — reveal everything immediately.
    document.querySelectorAll('[data-aos]').forEach(function (el) {
      el.removeAttribute('data-aos');
    });
  }
});

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

// Microscopic Floating Minerals — tsParticles v2 (cdn.jsdelivr.net)
// Hyper-delicate dust motes drifting slowly in sunlight.
// Vibe: organic wellness, botanical texture, clean and high-end.
(function () {
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  if (typeof tsParticles === 'undefined') {
    console.warn('tsParticles failed to load from the CDN — ambient particles skipped.');
    return;
  }

  // v2 API: tsParticles.load("elementId", options)
  tsParticles.load('tsparticles', {
    // Transparent background — the page's own --cream CSS var shows through
    background: { color: { value: 'transparent' } },

    fpsLimit: 40,

    particles: {
      number: {
        value: 110,
        density: { enable: true, value_area: 1100 }
      },

      // Colour palette: soft purples & warm neutrals lifted from the brand
      color: {
        value: ['#8479B8', '#6C5FA5', '#4C4178', '#C6BFEC', '#a49ac8']
      },

      // Round dust motes — vary in size for depth
      shape: { type: 'circle' },

      opacity: {
        value: 0.35,
        random: true,
        anim: {
          enable: true,
          speed: 0.35,
          opacity_min: 0.05,
          sync: false
        }
      },

      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 0.5,
          size_min: 0.6,
          sync: false
        }
      },

      // Very slow, organic drift — no strong direction
      move: {
        enable: true,
        speed: 0.28,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false
      },

      // No connecting lines — purely clean motes
      line_linked: { enable: false }
    },

    // No click/hover interactivity — purely ambient
    interactivity: {
      events: {
        onhover: { enable: false },
        onclick: { enable: false }
      }
    },

    retina_detect: true
  });
})();