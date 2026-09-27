#!/usr/bin/env python3
"""Exporta los mapas oficiales del repo del juego (../TinyRTS/data/maps) a public/data/maps en el formato compacto que
dibuja MapExplorer: terreno, salidas (esquina del castillo), recursos [tipo, x, y, cantidad], campamentos y edificios
neutrales. Los campamentos oficiales llevan su tipo como id y la esquina tal cual (el explorador los centra como una
huella de 5×4); los hechos a medida llevan como id su etiqueta (camp.map.X → X, traducida en content/*.ts) y una
esquina recalculada para que su centro caiga donde está el campamento.
Uso: python3 tools/export_maps.py crossroads vado marismas ...
"""
import json, os, sys

GAME = os.path.join(os.path.dirname(__file__), '..', '..', 'TinyRTS')
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'data', 'maps')


def official(kind):
    name = kind[0].upper() + kind[1:]
    return name, json.load(open(os.path.join(GAME, 'data', 'camps', name + '.json'), encoding='utf-8'))


def export(map_id):
    src = json.load(open(os.path.join(GAME, 'data', 'maps', map_id + '.json'), encoding='utf-8'))
    camps = []
    for c in src.get('camps', []):
        rot = c.get('rot', 0)
        if c['kind'] == 'custom':
            t = c['template']
            w, h = (t['height'], t['width']) if rot in (90, 270) else (t['width'], t['height'])
            camps.append({'id': t['label'].removeprefix('camp.map.'), 'tier': t.get('tier', ''),
                          'x': round(c['x'] + w / 2 - 2.5, 1), 'y': round(c['y'] + h / 2 - 2, 1)})
        else:
            name, t = official(c['kind'])
            camps.append({'id': name, 'tier': t.get('tier', ''), 'x': c['x'], 'y': c['y'], 'rot': rot})
    out = {
        'id': map_id, 'name': src['name'], 'players': src.get('players') or len(src['starts']),
        'cols': src['cols'], 'rows': src['rows'], 'terrain': src['terrain'],
        'starts': [{'x': s['castle']['x'], 'y': s['castle']['y']} for s in src['starts']],
        'resources': [['t' if r['kind'] == 'tree' else 'g', r['x'], r['y'], r.get('amount', 0) if r['kind'] == 'gold' else 0]
                      for r in src.get('resources', [])],
        'camps': camps,
        'neutrals': [{'kind': n['kind'], 'x': n['x'], 'y': n['y']} for n in src.get('neutrals', [])],
    }
    with open(os.path.join(OUT, map_id + '.json'), 'w', encoding='utf-8') as f:
        json.dump(out, f, ensure_ascii=False, separators=(',', ':'))
    print(f'{map_id}: {out["cols"]}×{out["rows"]}, {out["players"]} jugadores, {len(camps)} campamentos, {os.path.getsize(f.name) // 1024} KB')


for map_id in sys.argv[1:]: export(map_id)
