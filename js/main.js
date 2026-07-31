// ---------- Nav toggle (mobile) ----------
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  }

  // ---------- Scroll reveal ----------
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  initHeatCanvas();
});

// ---------- Generative heat-grid ----------
// A soft simulated thermal-diffusion field: a coarse grid of cells whose
// values evolve like a UTCI raster cooling/warming over time. This stands
// in for real simulation renders as an abstract, media-art representation
// of the underlying microclimate work.
function initHeatCanvas() {
  const canvas = document.getElementById('heat-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let W, H, cols, rows, cell, field, targets;

  function hexToRgb(hex) {
    const v = parseInt(hex.slice(1), 16);
    return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
  }
  const COOL = hexToRgb('#123a52');
  const MID  = hexToRgb('#1c1c1c');
  const HOT  = hexToRgb('#d9382b');

  function lerp(a, b, t) { return a + (b - a) * t; }
  function mixColor(t) {
    // t in [-1, 1]: -1 = cool, 0 = mid/dark, 1 = hot
    if (t <= 0) {
      const k = t + 1; // 0..1
      return [lerp(COOL[0], MID[0], k), lerp(COOL[1], MID[1], k), lerp(COOL[2], MID[2], k)];
    } else {
      const k = t;
      return [lerp(MID[0], HOT[0], k), lerp(MID[1], HOT[1], k), lerp(MID[2], HOT[2], k)];
    }
  }

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    W = canvas.width = rect.width;
    H = canvas.height = rect.height;
    cell = Math.max(18, Math.floor(W / 46));
    cols = Math.ceil(W / cell) + 1;
    rows = Math.ceil(H / cell) + 1;
    field = new Float32Array(cols * rows);
    targets = new Float32Array(cols * rows);
    seed();
  }

  function seed() {
    for (let i = 0; i < field.length; i++) {
      field[i] = (Math.random() * 2 - 1) * 0.3;
      targets[i] = (Math.random() * 2 - 1);
    }
  }

  let last = 0;
  function step(ts) {
    if (!last) last = ts;
    const dt = ts - last;
    if (dt > 60) {
      last = ts;
      for (let i = 0; i < field.length; i++) {
        field[i] += (targets[i] - field[i]) * 0.025;
        if (Math.random() < 0.004) targets[i] = Math.random() * 2 - 1;
      }
      draw();
    }
    if (!reduceMotion) requestAnimationFrame(step);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const idx = y * cols + x;
        // small spatial smoothing for a diffused look
        let v = field[idx];
        const [r, g, b] = mixColor(v);
        ctx.fillStyle = `rgb(${r|0},${g|0},${b|0})`;
        ctx.fillRect(x * cell, y * cell, cell - 1.4, cell - 1.4);
      }
    }
  }

  window.addEventListener('resize', resize);
  resize();
  if (reduceMotion) { draw(); } else { requestAnimationFrame(step); }
}
