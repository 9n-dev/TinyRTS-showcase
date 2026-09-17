"""Builds index.html (en) and es.html (es) from one template and two sets of strings.

Run from the repository root:  python3 tools/build_site.py
"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SITE = 'https://9n-dev.github.io/TinyRTS-showcase/'
REPO = 'https://github.com/9n-dev/TinyRTS-showcase'
RELEASE = REPO + '/releases/latest'

CAMPS = {
    'en': {'BatCave': 'Bat cave', 'Bear': 'Bear cave', 'CoastBattery': 'Coastal battery', 'Fumarole': 'Fumarole', 'GnollCamp': 'Gnoll camp',
           'Gnome': 'Gnome village', 'GnomeVillage': 'Gnome village', 'Goblin': 'Goblin camp', 'GoblinVillage': 'Goblin settlement',
           'Graveyard': 'Graveyard', 'Hive': 'Hive', 'Lighthouse': 'Pirate lighthouse', 'MinotaurLair': 'Minotaur lair',
           'PandaGrove': 'Panda grove', 'Pigsty': 'Goblin pigsty', 'PirateCove': 'Pirate cove', 'SpiderNest': 'Spider nest',
           'Swamp': 'Swamp', 'ThiefHideout': 'Thief hideout', 'Troll': 'Troll lair', 'TurtleBeach': 'Turtle beach'},
    'es': {'BatCave': 'Cueva de murciélagos', 'Bear': 'Cueva del oso', 'CoastBattery': 'Batería costera', 'Fumarole': 'Fumarola',
           'GnollCamp': 'Campamento gnoll', 'Gnome': 'Aldea gnoma', 'GnomeVillage': 'Aldea gnoma', 'Goblin': 'Campamento goblin',
           'GoblinVillage': 'Poblado goblin', 'Graveyard': 'Cementerio', 'Hive': 'Colmena', 'Lighthouse': 'Faro pirata',
           'MinotaurLair': 'Guarida del minotauro', 'PandaGrove': 'Bosquecillo de pandas', 'Pigsty': 'Cochiquera goblin',
           'PirateCove': 'Cala pirata', 'SpiderNest': 'Nido de arañas', 'Swamp': 'Ciénaga', 'ThiefHideout': 'Escondrijo de ladrones',
           'Troll': 'Guarida del troll', 'TurtleBeach': 'Playa de tortugas'},
}

S = {
'en': dict(
    lang='en', other='es.html', other_label='Versión en español', other_lang='es',
    title='TinyRTS',
    description='TinyRTS is a pixel-art real-time strategy game for Linux and Windows, built in Godot 4 and C#: neutral camps, elevation, fog of war, AI opponents and a built-in map editor.',
    og='A small pixel-art real-time strategy game built in Godot 4 and C#.',
    nav=[('#game', 'The game'), ('#maps', 'Maps'), ('#gallery', 'Screenshots'), ('#built', 'How it is built'), ('#credits', 'Credits')],
    tagline='A small real-time strategy game, built from scratch in Godot 4 and C#.',
    watch='Watch the trailer', explore='Explore the maps', trailer_note='52 seconds, with sound. Full quality in the',
    release='release on GitHub', repo='Repository',
    game_h='What you do in a game',
    game_p1='You start with a Castle, three Pawns and a handful of resources. Pawns cut trees, mine gold and carry every load back to the Castle by hand. Trees leave stumps and gold veins run dry, so sooner or later you build a second Castle on the next patch of resources. Sheep pens feed you passively; Houses raise the population cap; the Barracks, Archery and Monastery train Warriors, Archers, Lancers and Monks; nine technologies in three branches make everything sharper.',
    game_p2='The map is shared with neutral camps: goblins, trolls, spider nests, thief hideouts, pirate coves in the water. Each one has guardians, a fixed post they defend, regeneration if you leave them alone, and a reward when you clear them. Neutral markets, mercenaries and taverns sit in the middle of the map for whoever gets there first. The last player with a Castle standing wins.',
    clips=[('village', 'A living village: Pawns gathering and building while troops train', 'A living village'),
           ('battle', 'Blue and red armies clashing under the red towers', 'A battle between players'),
           ('camps', 'Clearing a goblin village guarded by spear and torch goblins', 'Clearing a neutral camp'),
           ('editor', 'Painting a forest, a camp and a tower in the editor, then playing the map', 'The map editor')],
    features_h='Features',
    features=[('Real-time simulation', 'at a fixed 20 Hz step, rendered at 60 fps with interpolation between ticks.'),
              ('Free movement in pixels.', 'A* on the 64 px grid without corner cutting, path smoothing and local separation via a spatial hash. Units never block cells; buildings, resources and terrain do. 200 units cross the map at 60 fps.'),
              ('An economy of trips.', 'Finite trees and gold veins, Pawns that gather, load up and deliver, passive food from sheep pens, expansion with a second Castle. Neutral market, mercenaries and tavern.'),
              ('Elevation that matters.', 'Plateaus and cliffs joined only by one-tile side stairs. Ranged units and towers gain range and vision from above; melee never crosses an edge.'),
              ('21 kinds of neutral camp', 'with 24 creatures from the Enemy Pack, including static water guardians like the harpoon shark and the bomb fish. The four-player map has 33 camps.'),
              ('AI opponents', 'for two to four players that expand, trade at the market, build towers on the way to the enemy and pick wave targets by path length or weakness. Tuned by playing hundreds of simulated games, because the simulation has no randomness and a single game is a chaotic sample rather than a measure.'),
              ('Fog of war', 'with three states, a minimap with alerts, and Warcraft 3 controls: box select, contextual right click, attack-move, stop and hold, control groups, edge and WASD scrolling. Every key can be rebound.'),
              ('Map editor', 'in the Mario Maker spirit. Paint terrain, resources, camps and start positions over the real world, press P to play the map in under a tenth of a second, Esc to keep editing. Brush, rectangle, fill and selection tools, copy and paste, rotate and mirror, and a validator that warns about unreachable bases, guarded resources or missing building room.'),
              ('Three official maps.', 'The Valley (96×64, two players), the Crossroads (160×160, four players, rotational symmetry) and Four Winds, made with the editor. The first two come from Python generators that validate symmetry, connectivity, choke widths and travel distances between bases.'),
              ('', 'Save slots with autosave, Spanish and English, 59 sound effects, music and ambience.')],
    maps_h='The maps, drawn from their data',
    maps_p='These are the three official maps as the game stores them: one character per tile for the terrain, plus lists of trees, gold veins, camps, neutral buildings and start positions. Hover to see what is where.',
    maps=[('valley', 'The Valley'), ('crossroads', 'The Crossroads'), ('cuatro-vientos', 'Four Winds')],
    map_desc={'valley': 'Two players face each other across a river valley: 27 camps, a pirate cove on the north-east coast and gnome and goblin villages closed by forest.',
              'crossroads': 'Four players with 90° rotational symmetry: each base has a natural expansion, two routes to its neighbours, 33 camps and a tavern at the centre.',
              'cuatro-vientos': 'Made with the in-game editor: a plateau with a stair north of each base and camps in between. Its stakes show the camp radius the editor uses.'},
    legend=[('#4fb0b3', 'Water'), ('#8fc357', 'Grass'), ('#b3d96a', 'Plateau'), ('#4a7473', 'Cliff'), ('#d1bb6e', 'Stairs'), ('#3c7d3b', 'Tree'),
            ('#f2c03a', 'Gold vein'), ('#c8503c', 'Camp'), ('#2f7f83', 'Water camp'), ('#e9c552', 'Market, mercenaries or tavern'), ('#3f8fbf', 'Start position')],
    text=dict(gold='Gold vein', goldAmount='{n} gold', forest='Tree', water='Water', grass='Grass', plateau='Plateau', cliff='Cliff', stairs='Stairs',
              campGeneric='Camp', campDetail='Neutral camp with guardians and a reward', tierLabel='Difficulty: {t}',
              tiers={'easy': 'easy', 'medium': 'medium', 'hard': 'hard'},
              neutrals={'market': 'Goblin market', 'mercenaries': 'Mercenary camp', 'tavern': 'Tavern'}, neutralDetail='Neutral building for whoever gets there first',
              start='Start {n}', startDetail='Castle and three Pawns', mapInfo='{w}×{h} tiles, {p} players, {c} camps', loading='Loading…', loadError='The map data could not be loaded.'),
    gallery_h='Screenshots',
    gallery=[('village', 'A large village with houses, a monastery, a barracks and towers', 'A village in full swing'),
             ('battle', 'Blue and red armies fighting beside a red tower and Castle', 'Assault on a red base'),
             ('spiders', 'Warriors and archers fighting spiders beside a pond', 'A spider nest'),
             ('goblin-village', 'A goblin village with a troll, closed by forest with a single entrance', 'A neutral goblin village'),
             ('stairs', 'A plateau with a side stair cut into its cliff', 'A plateau and its side stair'),
             ('plateau', 'A sheep pen on a plateau above the forest', 'A sheep pen on high ground'),
             ('menu', 'Main menu on a parchment panel with a blue banner', 'Main menu'),
             ('training', 'The Castle panel with the training queue and rally point', 'Training queue at the Castle'),
             ('editor', 'The map editor with its piece bar and tool bar', 'The map editor'),
             ('victory', 'The victory panel after the enemy Castle falls', 'Victory')],
    built_h='How it is built',
    built_p1='The game is two halves that never mix. The simulation is plain C# with no Godot nodes and no frame delta, advanced at a fixed rate, tested with xUnit without opening the engine and serialized to JSON for saving. The Godot layer draws that state and hosts an interface that never touches an entity: it only enqueues commands, and so does the AI.',
    built_p2='That split is what makes the rest possible. The test suite plays whole games: ten minutes of AI against AI on the Valley and fifteen minutes with four AIs on the Crossroads run headless in about thirty seconds, and they assert things like "nobody is eliminated before minute ten" and "no AI sits idle for a minute". A command-line harness drives the real engine with synthetic input and scripted orders, takes screenshots and measures frame time, so a change can be verified without a mouse.',
    facts=[('Engine', 'Godot 4.6.2 .NET, C# 12 on .NET 8, no other dependencies'),
           ('Renderer', 'Compatibility (OpenGL 3.3), nearest filtering, pixel snapping'),
           ('Code', 'About <b data-count="16000">0</b> lines of C# in <b data-count="88">0</b> files, plus <b data-count="4300">0</b> lines of tests'),
           ('Tests', '<b data-count="181">0</b>, including full simulated games'),
           ('Performance', '4 AIs and <b data-count="300">0</b> units at 60 fps with a 1.3 ms simulation tick'),
           ('Content', '<b data-count="29">0</b> unit types, 7 buildings, 9 technologies, <b data-count="21">0</b> camp kinds, 3 maps'),
           ('Text', '<b data-count="519">0</b> localized strings in Spanish and English')],
    built_p3='Terrain and static layers are retained draw commands, not nodes; sprites exist only for what animates; selection rings, foam and shadows are single nodes that redraw when something changes. The whole scene stays around a dozen draw calls with hundreds of units on screen.',
    built_p4='The project was built with Claude Code doing the programming and me leading the design, playing every build and deciding what goes in and what gets cut. The source repository is private; this site and its repository are the public presentation.',
    status_h='Status',
    status_p='Playable from start to finish: economy, building, training, combat, technology, AI for two and four players, neutral camps, saving, audio, editor, two languages. Development started on 8 September 2026. The roadmap points at a Steam release, which is why game statistics already live in the simulation and saves are one file per slot.',
    credits_h='Credits',
    credits=['Art: <a href="https://pixelfrog-assets.itch.io/tiny-swords">Tiny Swords</a> and its Enemy Pack by Pixel Frog, used under their license. The packs are not redistributed here.',
             'Font: Caladea by Huerta Tipográfica, SIL Open Font License.', 'Sounds: Pixabay.', 'Engine: Godot Engine.'],
    footer='Screenshots, video and text © 2026 9n-dev.', footer_link='Repository on GitHub',
    close='Close', prev='Previous', next='Next', modal_title='TinyRTS trailer',
),
'es': dict(
    lang='es', other='index.html', other_label='English version', other_lang='en',
    title='TinyRTS',
    description='TinyRTS es un juego de estrategia en tiempo real en pixel art para Linux y Windows, hecho en Godot 4 y C#: campamentos neutrales, altura, niebla de guerra, IA rival y editor de mapas integrado.',
    og='Un pequeño juego de estrategia en tiempo real en pixel art, hecho en Godot 4 y C#.',
    nav=[('#game', 'El juego'), ('#maps', 'Mapas'), ('#gallery', 'Capturas'), ('#built', 'Cómo está hecho'), ('#credits', 'Créditos')],
    tagline='Un pequeño juego de estrategia en tiempo real, hecho desde cero en Godot 4 y C#.',
    watch='Ver el tráiler', explore='Explorar los mapas', trailer_note='52 segundos, con sonido. A calidad completa en la',
    release='release de GitHub', repo='Repositorio',
    game_h='Qué se hace en una partida',
    game_p1='Empiezas con un Castillo, tres Peones y unos pocos recursos. Los Peones talan, pican oro y llevan cada carga al Castillo a mano. Los árboles dejan tocón y las vetas se agotan, así que antes o después levantas un segundo Castillo sobre el siguiente grupo de recursos. Los corrales dan comida sin trabajo; las Casas suben la población; el Cuartel, la Arquería y el Monasterio entrenan Guerreros, Arqueros, Lanceros y Monjes; nueve tecnologías en tres ramas lo afilan todo.',
    game_p2='El mapa se comparte con campamentos neutrales: goblins, trolls, nidos de arañas, guaridas de ladrones, calas piratas en el agua. Cada uno tiene guardianes, un puesto fijo que defienden, regeneración si los dejas en paz y una recompensa al limpiarlo. Mercados, mercenarios y tabernas neutrales esperan en el centro del mapa a quien llegue primero. Gana el último jugador con un Castillo en pie.',
    clips=[('village', 'Una aldea viva: Peones recolectando y construyendo mientras se entrena tropa', 'Una aldea viva'),
           ('battle', 'Ejércitos azul y rojo chocando bajo las torres rojas', 'Una batalla entre jugadores'),
           ('camps', 'Limpiando una aldea goblin defendida por goblins con lanza y antorcha', 'Limpiando un campamento neutral'),
           ('editor', 'Pintando un bosque, un campamento y una torre en el editor, y jugando el mapa', 'El editor de mapas')],
    features_h='Características',
    features=[('Simulación en tiempo real', 'a paso fijo de 20 Hz, dibujada a 60 fps interpolando entre ticks.'),
              ('Movimiento libre en píxeles.', 'A* sobre la cuadrícula de 64 px sin cortar esquinas, suavizado del camino y separación local por hash espacial. Las unidades nunca bloquean casillas; edificios, recursos y terreno sí. 200 unidades cruzan el mapa a 60 fps.'),
              ('Una economía de viajes.', 'Árboles y vetas finitos, Peones que recolectan, se cargan y entregan, comida pasiva de los corrales y expansión con un segundo Castillo. Mercado, mercenarios y taberna neutrales.'),
              ('Altura que cuenta.', 'Mesetas y acantilados unidos solo por escaleras laterales de una casilla. Las unidades a distancia y las torres ganan alcance y visión desde arriba; el cuerpo a cuerpo nunca cruza un borde.'),
              ('21 tipos de campamento neutral', 'con 24 criaturas del Enemy Pack, incluidos guardianes estáticos de agua como el tiburón arponero y el pez bomba. El mapa de cuatro jugadores tiene 33 campamentos.'),
              ('IA rival', 'para dos a cuatro jugadores que se expande, comercia en el mercado, levanta torres camino del enemigo y elige el objetivo de cada oleada por distancia o debilidad. Ajustada jugando cientos de partidas simuladas, porque la simulación no tiene azar y una sola partida es una muestra caótica, no una medida.'),
              ('Niebla de guerra', 'de tres estados, minimapa con avisos y controles de Warcraft 3: recuadro, click derecho contextual, atacar en movimiento, parar y mantener, grupos de control, bordes y WASD. Todas las teclas se pueden reasignar.'),
              ('Editor de mapas', 'al estilo Mario Maker. Se pinta terreno, recursos, campamentos y posiciones de salida sobre el mundo real, P prueba el mapa en menos de una décima de segundo y Esc devuelve al editor. Pincel, rectángulo, cubo y selección, copiar y pegar, girar y espejar, y un comprobador que avisa de bases inaccesibles, recursos vigilados o falta de sitio para construir.'),
              ('Tres mapas oficiales.', 'El Valle (96×64, dos jugadores), La Encrucijada (160×160, cuatro jugadores, simetría rotacional) y Cuatro vientos, hecho con el editor. Los dos primeros salen de generadores en Python que validan simetría, conectividad, anchura de los cuellos y distancias entre bases.'),
              ('', 'Ranuras de guardado con autoguardado, español e inglés, 59 sonidos, música y ambiente.')],
    maps_h='Los mapas, dibujados desde sus datos',
    maps_p='Estos son los tres mapas oficiales tal y como los guarda el juego: un carácter por casilla para el terreno, más listas de árboles, vetas de oro, campamentos, edificios neutrales y posiciones de salida. Pasa el ratón para ver qué hay en cada sitio.',
    maps=[('valley', 'El Valle'), ('crossroads', 'La Encrucijada'), ('cuatro-vientos', 'Cuatro vientos')],
    map_desc={'valley': 'Dos jugadores frente a frente en un valle con río: 27 campamentos, una cala pirata en la costa noreste y aldeas gnomas y goblins cerradas por bosque.',
              'crossroads': 'Cuatro jugadores con simetría rotacional de 90°: cada base tiene su expansión natural, dos rutas hacia las vecinas, 33 campamentos y una taberna en el centro.',
              'cuatro-vientos': 'Hecho con el editor del juego: una meseta con escalera al norte de cada base y campamentos entre medias. Sus estacas enseñan el radio de campamento que usa el editor.'},
    legend=[('#4fb0b3', 'Agua'), ('#8fc357', 'Hierba'), ('#b3d96a', 'Meseta'), ('#4a7473', 'Acantilado'), ('#d1bb6e', 'Escalera'), ('#3c7d3b', 'Árbol'),
            ('#f2c03a', 'Veta de oro'), ('#c8503c', 'Campamento'), ('#2f7f83', 'Campamento de agua'), ('#e9c552', 'Mercado, mercenarios o taberna'), ('#3f8fbf', 'Posición de salida')],
    text=dict(gold='Veta de oro', goldAmount='{n} de oro', forest='Árbol', water='Agua', grass='Hierba', plateau='Meseta', cliff='Acantilado', stairs='Escalera',
              campGeneric='Campamento', campDetail='Campamento neutral con guardianes y recompensa', tierLabel='Dificultad: {t}',
              tiers={'easy': 'fácil', 'medium': 'media', 'hard': 'difícil'},
              neutrals={'market': 'Mercado goblin', 'mercenaries': 'Campamento de mercenarios', 'tavern': 'Taberna'}, neutralDetail='Edificio neutral para quien llegue primero',
              start='Salida {n}', startDetail='Castillo y tres Peones', mapInfo='{w}×{h} casillas, {p} jugadores, {c} campamentos', loading='Cargando…', loadError='No se han podido cargar los datos del mapa.'),
    gallery_h='Capturas',
    gallery=[('village', 'Una aldea grande con casas, monasterio, cuartel y torres', 'Una aldea a pleno rendimiento'),
             ('battle', 'Ejércitos azul y rojo peleando junto a una torre y un Castillo rojos', 'Asalto a una base roja'),
             ('spiders', 'Guerreros y arqueros peleando con arañas junto a una charca', 'Un nido de arañas'),
             ('goblin-village', 'Una aldea goblin con un troll, cerrada por bosque con una sola entrada', 'Una aldea goblin neutral'),
             ('stairs', 'Una meseta con una escalera lateral tallada en el acantilado', 'Una meseta y su escalera lateral'),
             ('plateau', 'Un corral sobre una meseta por encima del bosque', 'Un corral en alto'),
             ('menu', 'Menú principal sobre un panel de pergamino con banda azul', 'Menú principal'),
             ('training', 'El panel del Castillo con la cola de entrenamiento y el punto de reunión', 'Cola de entrenamiento del Castillo'),
             ('editor', 'El editor de mapas con su barra de piezas y de herramientas', 'El editor de mapas'),
             ('victory', 'El panel de victoria al caer el Castillo enemigo', 'Victoria')],
    built_h='Cómo está hecho',
    built_p1='El juego son dos mitades que nunca se mezclan. La simulación es C# puro, sin nodos de Godot ni delta de frame, que avanza a paso fijo, se prueba con xUnit sin abrir el motor y se serializa a JSON para guardar. La capa de Godot dibuja ese estado y aloja una interfaz que nunca toca una entidad: solo encola órdenes, igual que la IA.',
    built_p2='Esa separación es lo que hace posible el resto. La batería de tests juega partidas enteras: diez minutos de IA contra IA en el Valle y quince con cuatro IAs en La Encrucijada corren sin ventana en unos treinta segundos, y comprueban cosas como "nadie es eliminado antes del minuto diez" o "ninguna IA se queda ociosa un minuto". Un arnés de línea de comandos maneja el motor real con entrada sintética y órdenes con guion, saca capturas y mide el tiempo por frame, así que cualquier cambio se verifica sin ratón.',
    facts=[('Motor', 'Godot 4.6.2 .NET, C# 12 sobre .NET 8, sin más dependencias'),
           ('Render', 'Compatibility (OpenGL 3.3), filtro nearest, ajuste al píxel'),
           ('Código', 'Unas <b data-count="16000">0</b> líneas de C# en <b data-count="88">0</b> ficheros, más <b data-count="4300">0</b> de tests'),
           ('Tests', '<b data-count="181">0</b>, incluidas partidas simuladas completas'),
           ('Rendimiento', '4 IAs y <b data-count="300">0</b> unidades a 60 fps con un tick de simulación de 1,3 ms'),
           ('Contenido', '<b data-count="29">0</b> tipos de unidad, 7 edificios, 9 tecnologías, <b data-count="21">0</b> tipos de campamento, 3 mapas'),
           ('Textos', '<b data-count="519">0</b> cadenas traducidas a español e inglés')],
    built_p3='El terreno y las capas estáticas son comandos de dibujo retenidos, no nodos; solo lo que se anima es un sprite; los anillos de selección, la espuma y las sombras son nodos únicos que se redibujan cuando algo cambia. La escena entera se queda en torno a una docena de draw calls con cientos de unidades en pantalla.',
    built_p4='El proyecto se ha hecho con Claude Code programando y conmigo dirigiendo el diseño, jugando cada build y decidiendo qué entra y qué se descarta. El repositorio con el código es privado; esta web y su repositorio son la presentación pública.',
    status_h='Estado',
    status_p='Jugable de principio a fin: economía, construcción, entrenamiento, combate, tecnología, IA para dos y cuatro jugadores, campamentos neutrales, guardado, audio, editor y dos idiomas. El desarrollo empezó el 8 de septiembre de 2026. La hoja de ruta apunta a Steam, y por eso las estadísticas de partida ya viven en la simulación y cada guardado es un fichero por ranura.',
    credits_h='Créditos',
    credits=['Arte: <a href="https://pixelfrog-assets.itch.io/tiny-swords">Tiny Swords</a> y su Enemy Pack, de Pixel Frog, usados bajo su licencia. Los packs no se redistribuyen aquí.',
             'Tipografía: Caladea, de Huerta Tipográfica, SIL Open Font License.', 'Sonidos: Pixabay.', 'Motor: Godot Engine.'],
    footer='Capturas, vídeo y textos © 2026 9n-dev.', footer_link='Repositorio en GitHub',
    close='Cerrar', prev='Anterior', next='Siguiente', modal_title='Tráiler de TinyRTS',
),
}


def page(s):
    lang = s['lang']
    nav = '\n      '.join(f'<a href="{h}">{t}</a>' for h, t in s['nav'])
    clips = '\n      '.join(
        f'<figure><video class="clip" muted loop playsinline preload="metadata" width="960" height="540" aria-label="{alt}">'
        f'<source src="media/clip-{n}.webm" type="video/webm"><source src="media/clip-{n}.mp4" type="video/mp4"></video>'
        f'<figcaption>{cap}</figcaption></figure>' for n, alt, cap in s['clips'])
    feats = '\n      '.join(f'<li>{("<strong>" + h + "</strong> ") if h else ""}{b}</li>' for h, b in s['features'])
    tabs = '\n        '.join(f'<button class="map-tab" role="tab" data-map="{i}">{n}</button>' for i, n in s['maps'])
    legend = '\n        '.join(f'<li><i style="background:{c}"></i>{n}</li>' for c, n in s['legend'])
    gallery = '\n      '.join(
        f'<figure><a class="shot" href="media/{n}.png"><img src="media/{n}.png" width="1280" height="720" alt="{alt}" loading="lazy"></a>'
        f'<figcaption>{cap}</figcaption></figure>' for n, alt, cap in s['gallery'])
    facts = '\n      '.join(f'<tr><th scope="row">{k}</th><td>{v}</td></tr>' for k, v in s['facts'])
    credits = '\n      '.join(f'<li>{c}</li>' for c in s['credits'])
    text = dict(s['text']); text['camps'] = CAMPS[lang]; text['mapDesc'] = s['map_desc']
    text_json = json.dumps(text, ensure_ascii=False)
    return f'''<!doctype html>
<html lang="{lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="darkreader-lock">
  <title>{s['title']}</title>
  <meta name="description" content="{s['description']}">
  <meta property="og:title" content="{s['title']}">
  <meta property="og:description" content="{s['og']}">
  <meta property="og:image" content="{SITE}media/trailer-poster.jpg">
  <meta property="og:type" content="website">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Caladea:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="site.css">
</head>
<body>

<nav class="top" aria-label="Site">
  <a class="wordmark" href="#top">TinyRTS</a>
  <div class="top-links">
      {nav}
    <a class="lang" href="{s['other']}" lang="{s['other_lang']}" hreflang="{s['other_lang']}">{s['other_label']}</a>
  </div>
</nav>

<header class="hero" id="top">
  <video id="hero-bg" class="hero-bg" autoplay muted loop playsinline preload="auto" poster="media/trailer-poster.jpg" aria-hidden="true" tabindex="-1">
    <source src="media/trailer-{lang}-720p.webm" type="video/webm">
    <source src="media/trailer-{lang}-720p.mp4" type="video/mp4">
  </video>
  <div class="hero-shade"></div>
  <div class="hero-body">
    <h1 class="banner">TinyRTS</h1>
    <p class="tagline">{s['tagline']}</p>
    <p class="hero-actions">
      <a class="btn btn-primary" id="play-trailer" href="media/trailer-{lang}-720p.mp4" data-open-trailer>{s['watch']}</a>
      <a class="btn" href="#maps">{s['explore']}</a>
    </p>
    <p class="hero-note">{s['trailer_note']} <a href="{RELEASE}">{s['release']}</a>. <a href="{REPO}">{s['repo']}</a>.</p>
  </div>
</header>

<main>
  <section class="sheet" id="game">
    <h2>{s['game_h']}</h2>
    <p>{s['game_p1']}</p>
    <p>{s['game_p2']}</p>
    <div class="pair">
      {clips}
    </div>
  </section>

  <section class="sheet" id="features">
    <h2>{s['features_h']}</h2>
    <ul>
      {feats}
    </ul>
  </section>

  <section class="sheet sheet-wide" id="maps">
    <h2>{s['maps_h']}</h2>
    <p>{s['maps_p']}</p>
    <div id="map-explorer">
      <div class="map-tabs" role="tablist">
        {tabs}
      </div>
      <p class="map-desc"></p>
      <div class="map-stage">
        <canvas aria-label="Map"></canvas>
        <div class="map-tip" hidden></div>
      </div>
      <p class="map-info"></p>
      <ul class="map-legend">
        {legend}
      </ul>
    </div>
  </section>

  <section class="sheet sheet-wide" id="gallery">
    <h2>{s['gallery_h']}</h2>
    <div class="gallery">
      {gallery}
    </div>
  </section>

  <section class="sheet" id="built">
    <h2>{s['built_h']}</h2>
    <p>{s['built_p1']}</p>
    <p>{s['built_p2']}</p>
    <table class="facts">
      {facts}
    </table>
    <p>{s['built_p3']}</p>
    <p>{s['built_p4']}</p>
  </section>

  <section class="sheet" id="status">
    <h2>{s['status_h']}</h2>
    <p>{s['status_p']}</p>
  </section>

  <section class="sheet credits" id="credits">
    <h2>{s['credits_h']}</h2>
    <ul>
      {credits}
    </ul>
  </section>
</main>

<footer>
  {s['footer']} <a href="{REPO}">{s['footer_link']}</a>.
</footer>

<div class="modal" id="trailer-modal" hidden role="dialog" aria-modal="true" aria-label="{s['modal_title']}"
     data-sources="media/trailer-{lang}-720p.webm, media/trailer-{lang}-720p.mp4" data-poster="media/trailer-poster.jpg">
  <div class="modal-box">
    <button class="modal-close" type="button" aria-label="{s['close']}">×</button>
    <div class="modal-video"></div>
  </div>
</div>

<div class="lightbox" id="lightbox" hidden role="dialog" aria-modal="true">
  <button class="lightbox-close" type="button" aria-label="{s['close']}">×</button>
  <button class="lightbox-prev" type="button" aria-label="{s['prev']}">‹</button>
  <figure><img src="" alt=""><figcaption><span class="lightbox-caption"></span> <span class="lightbox-count"></span></figcaption></figure>
  <button class="lightbox-next" type="button" aria-label="{s['next']}">›</button>
</div>

<script>window.SITE_TEXT = {text_json};</script>
<script src="site.js" defer></script>
</body>
</html>
'''


for lang, name in (('en', 'index.html'), ('es', 'es.html')):
    (ROOT / name).write_text(page(S[lang]))
    print(name)
