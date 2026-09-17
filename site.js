/* TinyRTS showcase: hero video + modal trailer, map explorer, lightbox, lazy clips, counters. No dependencies. */
(() => {
  'use strict';
  const T = window.SITE_TEXT || {};
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ---------- hero background video ---------- */
  const bg = $('#hero-bg');
  if (bg) {
    if (reduced) { bg.removeAttribute('autoplay'); bg.pause(); }
    else bg.play().catch(() => {});
  }

  /* ---------- trailer modal ---------- */
  const modal = $('#trailer-modal');
  const openTrailer = () => {
    if (!modal) return;
    const holder = $('.modal-video', modal);
    holder.innerHTML = '';
    const v = document.createElement('video');
    v.controls = true; v.autoplay = true; v.playsInline = true; v.preload = 'auto';
    v.poster = modal.dataset.poster || '';
    for (const src of (modal.dataset.sources || '').split(',')) {
      const s = document.createElement('source');
      s.src = src.trim(); s.type = src.trim().endsWith('.webm') ? 'video/webm' : 'video/mp4';
      v.appendChild(s);
    }
    holder.appendChild(v);
    modal.hidden = false; document.body.classList.add('modal-open');
    if (bg) bg.pause();
    $('.modal-close', modal).focus();
    v.play().catch(() => {});
  };
  const closeTrailer = () => {
    if (!modal || modal.hidden) return;
    $('.modal-video', modal).innerHTML = '';
    modal.hidden = true; document.body.classList.remove('modal-open');
    if (bg && !reduced) bg.play().catch(() => {});
    $('#play-trailer')?.focus();
  };
  $$('[data-open-trailer]').forEach(b => b.addEventListener('click', e => { e.preventDefault(); openTrailer(); }));
  modal?.addEventListener('click', e => { if (e.target === modal || e.target.closest('.modal-close')) closeTrailer(); });

  /* ---------- clips: play only while visible ---------- */
  const clips = $$('video.clip');
  if (clips.length && 'IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver(entries => {
      for (const en of entries) {
        const v = en.target;
        if (en.intersectionRatio >= 0.4) v.play().catch(() => {}); else v.pause();
      }
    }, { threshold: [0, 0.4, 1] });
    clips.forEach(v => io.observe(v));
  }

  /* ---------- lightbox ---------- */
  const shots = $$('a.shot');
  const box = $('#lightbox');
  let current = -1;
  const showShot = i => {
    if (!box || !shots.length) return;
    current = (i + shots.length) % shots.length;
    const a = shots[current];
    const img = $('img', box);
    img.src = a.href; img.alt = $('img', a).alt;
    $('.lightbox-caption', box).textContent = $('figcaption', a.closest('figure'))?.textContent || '';
    $('.lightbox-count', box).textContent = `${current + 1} / ${shots.length}`;
    box.hidden = false; document.body.classList.add('modal-open');
    $('.lightbox-close', box).focus();
  };
  const closeShot = () => {
    if (!box || box.hidden) return;
    box.hidden = true; document.body.classList.remove('modal-open');
    if (current >= 0) shots[current].focus();
  };
  shots.forEach((a, i) => a.addEventListener('click', e => { e.preventDefault(); showShot(i); }));
  box?.addEventListener('click', e => {
    if (e.target.closest('.lightbox-prev')) showShot(current - 1);
    else if (e.target.closest('.lightbox-next')) showShot(current + 1);
    else if (e.target === box || e.target.closest('.lightbox-close')) closeShot();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeShot(); closeTrailer(); }
    if (box && !box.hidden) {
      if (e.key === 'ArrowLeft') showShot(current - 1);
      if (e.key === 'ArrowRight') showShot(current + 1);
    }
  });

  /* ---------- counters ---------- */
  const counters = $$('[data-count]');
  if (counters.length) {
    const fmt = new Intl.NumberFormat(document.documentElement.lang === 'es' ? 'es-ES' : 'en-US');
    const run = el => {
      const to = Number(el.dataset.count); const suffix = el.dataset.suffix || '';
      if (reduced) { el.textContent = fmt.format(to) + suffix; return; }
      const t0 = performance.now(); const dur = 900;
      const step = now => {
        const p = Math.min(1, (now - t0) / dur); const e = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt.format(Math.round(to * e)) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => {
        for (const en of entries) if (en.isIntersecting) { run(en.target); io.unobserve(en.target); }
      }, { threshold: 0.6 });
      counters.forEach(c => io.observe(c));
    } else counters.forEach(run);
  }

  /* ---------- map explorer ---------- */
  const explorer = $('#map-explorer');
  if (!explorer) return;
  const canvas = $('canvas', explorer);
  const ctx = canvas.getContext('2d');
  const tip = $('.map-tip', explorer);
  const info = $('.map-info', explorer);
  const tabs = $$('.map-tab', explorer);
  const cache = new Map();
  let map = null, scale = 1, markers = [];

  const COLORS = {
    '~': '#4fb0b3', '.': '#8fc357', '^': '#b3d96a', 'n': '#4a7473', 'r': '#d1bb6e', 'u': '#d1bb6e', 'e': '#d1bb6e', 'w': '#d1bb6e',
    tree: '#3c7d3b', gold: '#f2c03a', goldEdge: '#7a5a12', camp: '#c8503c', campEdge: '#3a1410', water: '#2f7f83',
    neutral: '#e9c552', neutralEdge: '#5a3d0c', castle: ['#3f8fbf', '#d0483a', '#e3ba3b', '#9a5fc4'], castleEdge: '#111a22',
  };
  const WATER_CAMPS = new Set(['PirateCove', 'CoastBattery', 'Lighthouse', 'TurtleBeach', 'Fumarole']);

  const draw = () => {
    if (!map) return;
    const cssW = Math.min(explorer.clientWidth - 2, 960);
    scale = cssW / map.cols;
    const cssH = Math.round(map.rows * scale);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(cssW * dpr); canvas.height = Math.round(cssH * dpr);
    canvas.style.width = cssW + 'px'; canvas.style.height = cssH + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = false;
    const s = scale;
    // terrain
    for (let y = 0; y < map.rows; y++) {
      const row = map.terrain[y];
      for (let x = 0; x < map.cols; x++) {
        ctx.fillStyle = COLORS[row[x]] || COLORS['.'];
        ctx.fillRect(x * s, y * s, s + 0.5, s + 0.5);
      }
    }
    // plateau rim: darker line under each plateau edge that faces south is already 'n'; add a light top edge
    ctx.fillStyle = 'rgba(255,255,255,0.18)';
    for (let y = 1; y < map.rows; y++) for (let x = 0; x < map.cols; x++)
      if (map.terrain[y][x] === '^' && map.terrain[y - 1][x] !== '^') ctx.fillRect(x * s, y * s, s, Math.max(1, s * 0.25));
    // foam: lighten water next to land
    ctx.fillStyle = 'rgba(255,255,255,0.22)';
    for (let y = 0; y < map.rows; y++) for (let x = 0; x < map.cols; x++) {
      if (map.terrain[y][x] !== '~') continue;
      const n = [[0, -1], [0, 1], [-1, 0], [1, 0]].some(([dx, dy]) => map.terrain[y + dy]?.[x + dx] && map.terrain[y + dy][x + dx] !== '~');
      if (n) ctx.fillRect(x * s, y * s, s, s);
    }
    // resources
    markers = [];
    for (const [k, x, y, amount] of map.resources) {
      if (k === 't') {
        ctx.fillStyle = COLORS.tree;
        ctx.beginPath(); ctx.arc((x + 0.5) * s, (y + 0.45) * s, s * 0.42, 0, Math.PI * 2); ctx.fill();
      } else {
        ctx.fillStyle = COLORS.goldEdge; ctx.fillRect(x * s + 0.5, y * s + 0.5, s - 1, s - 1);
        ctx.fillStyle = COLORS.gold; ctx.fillRect(x * s + 1.5, y * s + 1.5, s - 3, s - 3);
        markers.push({ x: x + 0.5, y: y + 0.5, r: 1, title: T.gold, detail: amount ? T.goldAmount.replace('{n}', amount) : '' });
      }
    }
    // neutrals
    for (const n of map.neutrals) {
      const cx = (n.x + 1) * s, cy = (n.y + 1) * s, r = Math.max(4, s * 1.1);
      ctx.beginPath(); ctx.moveTo(cx, cy - r); ctx.lineTo(cx + r, cy); ctx.lineTo(cx, cy + r); ctx.lineTo(cx - r, cy); ctx.closePath();
      ctx.fillStyle = COLORS.neutral; ctx.fill(); ctx.lineWidth = 1.5; ctx.strokeStyle = COLORS.neutralEdge; ctx.stroke();
      markers.push({ x: n.x + 1, y: n.y + 1, r: 2, title: T.neutrals[n.kind] || n.kind, detail: T.neutralDetail });
    }
    // camps
    for (const c of map.camps) {
      const cx = (c.x + (c.stake ? 0.5 : 2.5)) * s, cy = (c.y + (c.stake ? 0.5 : 2)) * s;
      if (c.stake && c.r) {
        ctx.beginPath(); ctx.arc(cx, cy, c.r * s, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(200,80,60,0.45)'; ctx.lineWidth = 1; ctx.setLineDash([3, 3]); ctx.stroke(); ctx.setLineDash([]);
      }
      const r = Math.max(4, s * 0.9);
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = WATER_CAMPS.has(c.id) ? COLORS.water : COLORS.camp; ctx.fill();
      ctx.lineWidth = 1.5; ctx.strokeStyle = COLORS.campEdge; ctx.stroke();
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(cx - r * 0.3, cy - r * 0.15, r * 0.2, 0, Math.PI * 2); ctx.arc(cx + r * 0.3, cy - r * 0.15, r * 0.2, 0, Math.PI * 2); ctx.fill();
      const name = (c.id && T.camps[c.id]) || c.label || T.campGeneric;
      const tier = c.tier ? (T.tiers[c.tier] || c.tier) : '';
      markers.push({ x: cx / s, y: cy / s, r: c.stake && c.r ? c.r : 3, title: name, detail: tier ? T.tierLabel.replace('{t}', tier) : T.campDetail });
    }
    // starts
    map.starts.forEach((st, i) => {
      ctx.fillStyle = COLORS.castleEdge; ctx.fillRect(st.x * s - 1, st.y * s - 1, 5 * s + 2, 2 * s + 2);
      ctx.fillStyle = COLORS.castle[i % 4]; ctx.fillRect(st.x * s, st.y * s, 5 * s, 2 * s);
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      for (let k = 0; k < 5; k += 2) ctx.fillRect((st.x + k) * s, st.y * s, s, Math.max(1, s * 0.35));
      markers.push({ x: st.x + 2.5, y: st.y + 1, r: 3.5, title: T.start.replace('{n}', i + 1), detail: T.startDetail });
    });
    info.textContent = T.mapInfo.replace('{w}', map.cols).replace('{h}', map.rows).replace('{p}', map.players).replace('{c}', map.camps.length);
  };

  const terrainName = ch => ({ '~': T.water, '.': T.grass, '^': T.plateau, 'n': T.cliff }[ch] || T.stairs);
  canvas.addEventListener('mousemove', e => {
    if (!map) return;
    const rect = canvas.getBoundingClientRect();
    const tx = (e.clientX - rect.left) / scale, ty = (e.clientY - rect.top) / scale;
    let best = null, bd = Infinity;
    for (const m of markers) {
      const d = Math.hypot(m.x - tx, m.y - ty);
      if (d <= m.r && d < bd) { best = m; bd = d; }
    }
    const ix = Math.floor(tx), iy = Math.floor(ty);
    const ch = map.terrain[iy]?.[ix];
    let title, detail;
    if (best) { title = best.title; detail = best.detail; }
    else if (ch) {
      const tree = map.resources.some(([k, x, y]) => k === 't' && x === ix && y === iy);
      title = tree ? T.forest : terrainName(ch); detail = `${ix}, ${iy}`;
    } else { tip.hidden = true; return; }
    tip.innerHTML = `<strong>${title}</strong>${detail ? '<br>' + detail : ''}`;
    tip.hidden = false;
    const px = e.clientX - rect.left, py = e.clientY - rect.top;
    tip.style.left = Math.min(px + 14, rect.width - tip.offsetWidth - 4) + 'px';
    tip.style.top = (py > rect.height - 60 ? py - tip.offsetHeight - 12 : py + 14) + 'px';
  });
  canvas.addEventListener('mouseleave', () => { tip.hidden = true; });

  const load = async id => {
    tabs.forEach(t => { const on = t.dataset.map === id; t.classList.toggle('on', on); t.setAttribute('aria-selected', on ? 'true' : 'false'); });
    if (!cache.has(id)) {
      info.textContent = T.loading;
      try {
        const r = await fetch(`data/maps/${id}.json`);
        cache.set(id, await r.json());
      } catch (err) { info.textContent = T.loadError; return; }
    }
    map = cache.get(id);
    $('.map-desc', explorer).textContent = (T.mapDesc && T.mapDesc[id]) || '';
    draw();
  };
  tabs.forEach(t => t.addEventListener('click', () => load(t.dataset.map)));
  window.addEventListener('resize', () => { clearTimeout(window.__mapResize); window.__mapResize = setTimeout(draw, 120); });
  load(tabs[0]?.dataset.map || 'valley');
})();
