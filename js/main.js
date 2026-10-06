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

  let W, H, cols, rows, cell, field, targets, glowNodes = [], glowEpoch = 0;

  function hexToRgb(hex) {
    const v = parseInt(hex.slice(1), 16);
    return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
  }
  const COOL = hexToRgb('#7f9a96');   // muted mint
  const MID  = hexToRgb('#0a0a0a');   // black ground
  const WARM = hexToRgb('#9e4320');   // subdued warm red-orange
  const HOT  = hexToRgb('#cf3532');   // primary red

  function lerp(a, b, t) { return a + (b - a) * t; }
  function mixColor(t) {
    // t in [-1, 1]: -1 = muted mint, 0 = black, positive range moves through orange to red
    if (t <= 0) {
      const k = t + 1; // 0..1
      return [lerp(COOL[0], MID[0], k), lerp(COOL[1], MID[1], k), lerp(COOL[2], MID[2], k)];
    }
    if (t < 0.55) {
      const k = t / 0.55;
      return [lerp(MID[0], WARM[0], k), lerp(MID[1], WARM[1], k), lerp(MID[2], WARM[2], k)];
    }
    const k = (t - 0.55) / 0.45;
    return [lerp(WARM[0], HOT[0], k), lerp(WARM[1], HOT[1], k), lerp(WARM[2], HOT[2], k)];
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
    chooseGlowNodes();
  }

  function chooseGlowNodes() {
    glowNodes = [];
    const used = new Set();
    // Exactly seven grid intersections; keep them away from the extreme outer edge.
    while (glowNodes.length < 7 && cols > 4 && rows > 4) {
      const gx = 1 + Math.floor(Math.random() * (cols - 2));
      const gy = 1 + Math.floor(Math.random() * (rows - 2));
      const key = `${gx},${gy}`;
      if (!used.has(key)) {
        used.add(key);
        glowNodes.push([gx, gy]);
      }
    }
    glowEpoch = performance.now();
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
      draw(ts);
    }
    if (!reduceMotion) requestAnimationFrame(step);
  }

  function draw(ts = performance.now()) {
    ctx.clearRect(0, 0, W, H);
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const idx = y * cols + x;
        let v = field[idx];
        const [r, g, b] = mixColor(v);
        ctx.fillStyle = `rgb(${r|0},${g|0},${b|0})`;
        ctx.fillRect(x * cell, y * cell, cell - 1.4, cell - 1.4);
      }
    }

    // Seven synchronized 1 px white points at grid intersections.
    // They breathe very faintly and relocate together every ~5.5 seconds.
    if (ts - glowEpoch > 5500) chooseGlowNodes();
    const phase = ((ts - glowEpoch) % 2400) / 2400;
    const pulse = 0.025 + 0.075 * (0.5 - 0.5 * Math.cos(phase * Math.PI * 2));
    ctx.save();
    ctx.fillStyle = `rgba(255,255,255,${pulse.toFixed(3)})`;
    ctx.shadowColor = `rgba(255,255,255,${(pulse * 0.8).toFixed(3)})`;
    ctx.shadowBlur = 3;
    for (const [gx, gy] of glowNodes) {
      ctx.beginPath();
      ctx.arc(gx * cell, gy * cell, 1, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  window.addEventListener('resize', resize);
  resize();
  if (reduceMotion) { draw(performance.now()); } else { requestAnimationFrame(step); }
}
