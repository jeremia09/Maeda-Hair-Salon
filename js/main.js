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
  // NOTE: we intentionally do NOT skip on prefers-reduced-motion here.
  // Static-ish floating dots at very low speed are not "motion" in the
  // accessibility sense, and skipping them leaves the background blank on
  // most iPhones which have Reduce Motion on by default.
  // The parallax and AOS animations (real motion) are still gated separately.

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function startParticles() {
    if (typeof tsParticles === 'undefined') return false;

    tsParticles.load('tsparticles', {
      background: { color: { value: 'transparent' } },

      // Cap FPS lower on mobile to save battery
      fpsLimit: reduceMotion ? 20 : 40,

      particles: {
        number: {
          value: 100,
          density: { enable: true, value_area: 900 }
        },

        // Brand palette: purples lifted from --rose / --gold-deep / --sand
        color: {
          value: ['#8479B8', '#6C5FA5', '#4C4178', '#C6BFEC', '#a49ac8']
        },

        shape: { type: 'circle' },

        opacity: {
          // Raised max to 0.55 so particles are visible on 2x/3x Retina screens
          value: 0.55,
          random: true,
          anim: {
            enable: !reduceMotion,
            speed: 0.3,
            opacity_min: 0.12,
            sync: false
          }
        },

        size: {
          // Raised to 4px base — at 3x DPI a 3px logical px is only 1 physical px
          value: 4,
          random: true,
          anim: {
            enable: !reduceMotion,
            speed: 0.4,
            size_min: 1,
            sync: false
          }
        },

        move: {
          enable: !reduceMotion,   // completely still if OS says reduce motion
          speed: 0.3,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false
        },

        line_linked: { enable: false }
      },

      interactivity: {
        events: {
          onhover: { enable: false },
          onclick: { enable: false }
        }
      },

      // Disabled — retina_detect doubles the particle count on Retina and
      // makes them tiny again, undoing our size increase
      retina_detect: false
    });

    return true;
  }

  // Try immediately (scripts are synchronous so this usually works on desktop)
  if (!startParticles()) {
    // CDN was slow (common on mobile) — retry once the full page has loaded
    window.addEventListener('load', function () {
      startParticles();
    });
  }
})();