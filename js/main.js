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

// ---------- Hero grid-intersection glow points ----------
// The hero now uses a static background image. This transparent canvas only
// adds seven very faint synchronized 1 px white points over the background grid.
function initHeatCanvas() {
  const canvas = document.getElementById('heat-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let W = 0, H = 0, nodes = [], epoch = performance.now();

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = rect.width;
    H = rect.height;
    canvas.width = Math.max(1, Math.round(W * dpr));
    canvas.height = Math.max(1, Math.round(H * dpr));
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    chooseNodes();
    if (reduceMotion) draw(performance.now());
  }

  function chooseNodes() {
    // The background grid is ~50 px on desktop; snap points to approximate intersections.
    const spacing = W < 760 ? 34 : 50;
    const cols = Math.max(4, Math.floor(W / spacing));
    const rows = Math.max(4, Math.floor(H / spacing));
    const used = new Set();
    nodes = [];
    while (nodes.length < 7) {
      const gx = 1 + Math.floor(Math.random() * Math.max(1, cols - 2));
      const gy = 1 + Math.floor(Math.random() * Math.max(1, rows - 2));
      const key = gx + ',' + gy;
      if (!used.has(key)) {
        used.add(key);
        nodes.push([gx * spacing, gy * spacing]);
      }
    }
    epoch = performance.now();
  }

  function draw(ts) {
    ctx.clearRect(0, 0, W, H);
    if (ts - epoch > 5600) chooseNodes();
    const phase = ((ts - epoch) % 2600) / 2600;
    const pulse = 0.035 + 0.08 * (0.5 - 0.5 * Math.cos(phase * Math.PI * 2));
    ctx.save();
    ctx.fillStyle = `rgba(255,255,255,${pulse.toFixed(3)})`;
    ctx.shadowColor = `rgba(255,255,255,${(pulse * .7).toFixed(3)})`;
    ctx.shadowBlur = 2.5;
    for (const [x,y] of nodes) {
      ctx.beginPath();
      ctx.arc(x, y, 1, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function frame(ts) {
    draw(ts);
    if (!reduceMotion) requestAnimationFrame(frame);
  }

  window.addEventListener('resize', resize);
  resize();
  if (!reduceMotion) requestAnimationFrame(frame);
}

