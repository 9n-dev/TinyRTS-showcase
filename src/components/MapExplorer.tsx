import { useEffect, useRef, useState } from 'react';
import type { MapId, MapText } from '../content/en';
import { useContent } from '../i18n';

/** A map as the game stores it: one character per tile, plus lists of what stands on it. */
type GameMap = {
  cols: number; rows: number; players: number; terrain: string[];
  starts: { x: number; y: number }[];
  resources: [kind: 't' | 'g', x: number, y: number, amount: number][];
  camps: { id?: string; label?: string; tier?: string; x: number; y: number; r?: number; stake?: boolean }[];
  neutrals: { kind: string; x: number; y: number }[];
};
/** Something the pointer can name, in tiles. */
type Marker = { x: number; y: number; r: number; title: string; detail: string };
type Tip = { title: string; detail: string; x: number; y: number };

const COLORS = {
  terrain: { '~': '#4fb0b3', '.': '#8fc357', '^': '#b3d96a', n: '#4a7473' } as Record<string, string>, stairs: '#d1bb6e',
  tree: '#3c7d3b', gold: '#f2c03a', goldEdge: '#7a5a12', camp: '#c8503c', campEdge: '#3a1410', water: '#2f7f83',
  neutral: '#e9c552', neutralEdge: '#5a3d0c', castle: ['#3f8fbf', '#d0483a', '#e3ba3b', '#9a5fc4'], castleEdge: '#111a22',
};
const WATER_CAMPS = new Set(['PirateCove', 'CoastBattery', 'Lighthouse', 'TurtleBeach', 'Fumarole']);
const cache = new Map<MapId, Promise<GameMap>>();
const load = (id: MapId) => {
  if (!cache.has(id)) cache.set(id, fetch(`${import.meta.env.BASE_URL}data/maps/${id}.json`).then(response => {
    if (!response.ok) throw new Error(String(response.status));
    return response.json();
  }));
  return cache.get(id)!;
};

/** Paints the map `width` CSS pixels wide and returns what can be pointed at. */
function drawMap(canvas: HTMLCanvasElement, map: GameMap, width: number, text: MapText): Marker[] {
  const ctx = canvas.getContext('2d')!;
  const s = width / map.cols, height = Math.round(map.rows * s), dpr = Math.min(devicePixelRatio || 1, 2);
  canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
  canvas.style.width = `${width}px`; canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.imageSmoothingEnabled = false;
  for (let y = 0; y < map.rows; y++) for (let x = 0; x < map.cols; x++) {
    ctx.fillStyle = COLORS.terrain[map.terrain[y][x]] ?? COLORS.stairs;
    ctx.fillRect(x * s, y * s, s + 0.5, s + 0.5);
  }
  // A light top edge on each plateau; its south face is already cliff.
  ctx.fillStyle = 'rgba(255,255,255,0.18)';
  for (let y = 1; y < map.rows; y++) for (let x = 0; x < map.cols; x++)
    if (map.terrain[y][x] === '^' && map.terrain[y - 1][x] !== '^') ctx.fillRect(x * s, y * s, s, Math.max(1, s * 0.25));
  // Foam: lighter water next to land.
  ctx.fillStyle = 'rgba(255,255,255,0.22)';
  for (let y = 0; y < map.rows; y++) for (let x = 0; x < map.cols; x++) {
    if (map.terrain[y][x] !== '~') continue;
    const shore = [[0, -1], [0, 1], [-1, 0], [1, 0]].some(([dx, dy]) => { const near = map.terrain[y + dy]?.[x + dx]; return near && near !== '~'; });
    if (shore) ctx.fillRect(x * s, y * s, s, s);
  }
  const markers: Marker[] = [];
  for (const [kind, x, y, amount] of map.resources) {
    if (kind === 't') {
      ctx.fillStyle = COLORS.tree;
      ctx.beginPath(); ctx.arc((x + 0.5) * s, (y + 0.45) * s, s * 0.42, 0, Math.PI * 2); ctx.fill();
    } else {
      ctx.fillStyle = COLORS.goldEdge; ctx.fillRect(x * s + 0.5, y * s + 0.5, s - 1, s - 1);
      ctx.fillStyle = COLORS.gold; ctx.fillRect(x * s + 1.5, y * s + 1.5, s - 3, s - 3);
      markers.push({ x: x + 0.5, y: y + 0.5, r: 1, title: text.gold, detail: amount ? text.goldAmount.replace('{n}', String(amount)) : '' });
    }
  }
  for (const neutral of map.neutrals) {
    const cx = (neutral.x + 1) * s, cy = (neutral.y + 1) * s, r = Math.max(4, s * 1.1);
    ctx.beginPath(); ctx.moveTo(cx, cy - r); ctx.lineTo(cx + r, cy); ctx.lineTo(cx, cy + r); ctx.lineTo(cx - r, cy); ctx.closePath();
    ctx.fillStyle = COLORS.neutral; ctx.fill(); ctx.lineWidth = 1.5; ctx.strokeStyle = COLORS.neutralEdge; ctx.stroke();
    markers.push({ x: neutral.x + 1, y: neutral.y + 1, r: 2, title: text.neutrals[neutral.kind] ?? neutral.kind, detail: text.neutralDetail });
  }
  for (const camp of map.camps) {
    const staked = camp.stake && camp.r;   // placed in the editor: a stake and a radius rather than a 5×4 footprint
    const cx = (camp.x + (camp.stake ? 0.5 : 2.5)) * s, cy = (camp.y + (camp.stake ? 0.5 : 2)) * s;
    if (staked) {
      ctx.beginPath(); ctx.arc(cx, cy, camp.r! * s, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(200,80,60,0.45)'; ctx.lineWidth = 1; ctx.setLineDash([3, 3]); ctx.stroke(); ctx.setLineDash([]);
    }
    const r = Math.max(4, s * 0.9);
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = WATER_CAMPS.has(camp.id ?? '') ? COLORS.water : COLORS.camp; ctx.fill();
    ctx.lineWidth = 1.5; ctx.strokeStyle = COLORS.campEdge; ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.beginPath();
    ctx.arc(cx - r * 0.3, cy - r * 0.15, r * 0.2, 0, Math.PI * 2); ctx.arc(cx + r * 0.3, cy - r * 0.15, r * 0.2, 0, Math.PI * 2); ctx.fill();
    const tier = camp.tier ? text.tiers[camp.tier] ?? camp.tier : '';
    markers.push({ x: cx / s, y: cy / s, r: staked ? camp.r! : 3, title: (camp.id && text.camps[camp.id]) || camp.label || text.campGeneric,
      detail: tier ? text.tierLabel.replace('{t}', tier) : text.campDetail });
  }
  map.starts.forEach((start, i) => {
    ctx.fillStyle = COLORS.castleEdge; ctx.fillRect(start.x * s - 1, start.y * s - 1, 5 * s + 2, 2 * s + 2);
    ctx.fillStyle = COLORS.castle[i % 4]; ctx.fillRect(start.x * s, start.y * s, 5 * s, 2 * s);
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    for (let k = 0; k < 5; k += 2) ctx.fillRect((start.x + k) * s, start.y * s, s, Math.max(1, s * 0.35));
    markers.push({ x: start.x + 2.5, y: start.y + 1, r: 3.5, title: text.start.replace('{n}', String(i + 1)), detail: text.startDetail });
  });
  return markers;
}

export function MapExplorer() {
  const { t } = useContent();
  const { list, legend, text } = t.maps;
  const [id, setId] = useState<MapId>('valley');
  const [map, setMap] = useState<GameMap>();
  const [failed, setFailed] = useState(false);
  const [tip, setTip] = useState<Tip>();
  const stage = useRef<HTMLDivElement>(null), canvas = useRef<HTMLCanvasElement>(null), markers = useRef<Marker[]>([]);

  useEffect(() => {
    let current = true;
    setFailed(false);
    load(id).then(loaded => { if (current) setMap(loaded); }, () => { cache.delete(id); if (current) setFailed(true); });
    return () => { current = false; };
  }, [id]);

  useEffect(() => {
    if (!map) return;
    const paint = () => { markers.current = drawMap(canvas.current!, map, Math.min(stage.current!.clientWidth, 960), text); };
    const observer = new ResizeObserver(paint);
    observer.observe(stage.current!);
    return () => observer.disconnect();
  }, [map, text]);

  const point = (event: React.MouseEvent) => {
    if (!map) return;
    const rect = canvas.current!.getBoundingClientRect(), scale = rect.width / map.cols;
    const px = event.clientX - rect.left, py = event.clientY - rect.top, tx = px / scale, ty = py / scale;
    const near = markers.current.map(marker => ({ marker, d: Math.hypot(marker.x - tx, marker.y - ty) }))
      .filter(({ marker, d }) => d <= marker.r).sort((a, b) => a.d - b.d)[0]?.marker;
    const ix = Math.floor(tx), iy = Math.floor(ty), char = map.terrain[iy]?.[ix];
    if (!near && !char) return setTip(undefined);
    const tree = map.resources.some(([kind, x, y]) => kind === 't' && x === ix && y === iy);
    const ground = ({ '~': text.water, '.': text.grass, '^': text.plateau, n: text.cliff } as Record<string, string>)[char!] ?? text.stairs;
    setTip({ title: near?.title ?? (tree ? text.forest : ground), detail: near ? near.detail : `${ix}, ${iy}`,
      x: Math.min(px + 14, rect.width - 190), y: py > rect.height - 70 ? py - 58 : py + 14 });
  };

  const info = failed ? text.loadError : !map ? text.loading
    : text.mapInfo.replace('{w}', String(map.cols)).replace('{h}', String(map.rows)).replace('{p}', String(map.players)).replace('{c}', String(map.camps.length));
  return <div className="map-explorer">
    <div className="tabs" role="tablist">
      {list.map(entry => <button key={entry.id} type="button" role="tab" aria-selected={entry.id === id} onClick={() => setId(entry.id)}>{entry.name}</button>)}
    </div>
    <p className="map-desc">{list.find(entry => entry.id === id)!.desc}</p>
    <div className="map-stage" ref={stage}>
      <canvas ref={canvas} role="img" aria-label={`${t.ui.mapLabel}: ${list.find(entry => entry.id === id)!.name}`} onMouseMove={point} onMouseLeave={() => setTip(undefined)} />
      {tip && <div className="map-tip" style={{ left: tip.x, top: tip.y }}><strong>{tip.title}</strong>{tip.detail && <><br />{tip.detail}</>}</div>}
    </div>
    <p className="map-info" aria-live="polite">{info}</p>
    <ul className="map-legend">{legend.map(entry => <li key={entry.name}><i style={{ background: entry.color }} />{entry.name}</li>)}</ul>
  </div>;
}
